import crypto from "crypto";

export const hashData = (data?: string): string | undefined => {
  if (!data) return undefined;
  const trimmedData = data.trim().toLowerCase();
  if (!trimmedData) return undefined;
  return crypto.createHash("sha256").update(trimmedData).digest("hex");
};

export const normalizePhone = (phone?: string): string | undefined => {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, "");
  // Meta expects country code. We assume Turkish numbers without country code usually start with 0, 
  // we trim 0 and prepend 90. If it already starts with 90 or +, we leave it basically.
  // But for safety, let's just send the digits. For perfect matching, country code is ideal.
  let normalized = digits;
  if (normalized.startsWith("0")) {
    normalized = "90" + normalized.slice(1);
  } else if (!normalized.startsWith("90") && normalized.length === 10) {
    normalized = "90" + normalized;
  }
  return normalized;
};

export const sendToMetaCapi = async (payload: any, reqInfo: { ip: string; userAgent: string }) => {
  const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || process.env.META_PIXEL_ID || "27322011684148956";
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
  const TEST_CODE = process.env.META_TEST_EVENT_CODE || process.env.NEXT_PUBLIC_META_TEST_EVENT_CODE;

  if (!ACCESS_TOKEN) {
    console.warn("META_ACCESS_TOKEN is not defined in environment variables. CAPI request aborted.");
    return;
  }

  // Ensure event name whitelist
  const allowedEvents = ["ViewContent", "Lead", "Contact"];
  if (!allowedEvents.includes(payload.event_name)) {
    console.warn(`Event ${payload.event_name} is not in whitelist. Aborted.`);
    return;
  }

  // Process user data
  const userData = payload.user_data || {};
  
  const finalUserData: any = {
    client_ip_address: reqInfo.ip,
    client_user_agent: reqInfo.userAgent,
  };

  if (userData.fbp) finalUserData.fbp = userData.fbp;
  if (userData.fbc) finalUserData.fbc = userData.fbc;

  // Hash email, phone, name if available
  if (userData.email) finalUserData.em = hashData(userData.email);
  if (userData.phone) finalUserData.ph = hashData(normalizePhone(userData.phone));
  if (userData.first_name) finalUserData.fn = hashData(userData.first_name);
  if (userData.last_name) finalUserData.ln = hashData(userData.last_name);

  const apiPayload: any = {
    data: [
      {
        event_name: payload.event_name,
        event_time: payload.event_time,
        event_id: payload.event_id,
        event_source_url: payload.event_source_url,
        action_source: payload.action_source,
        custom_data: payload.custom_data || {},
        user_data: finalUserData,
      }
    ]
  };

  if (TEST_CODE && TEST_CODE.trim() !== "") {
    apiPayload.test_event_code = TEST_CODE;
  }

  try {
    const response = await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiPayload)
    });

    const result = await response.json();
    if (!response.ok) {
      console.error("Meta CAPI Error response:", result);
    } else {
      console.log("Meta CAPI Success:", payload.event_name, result);
    }
  } catch (error) {
    console.error("Meta CAPI Fetch Error:", error);
  }
};
