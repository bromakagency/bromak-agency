"use server";

import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function markAsRead(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });
    revalidatePath("/bromakhome/messages");
    return { success: true };
  } catch (error) {
    console.error("Failed to mark message as read:", error);
    return { success: false, error: "Mesaj güncellenemedi." };
  }
}

export async function deleteMessage(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  try {
    await prisma.contactMessage.delete({
      where: { id },
    });
    revalidatePath("/bromakhome/messages");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete message:", error);
    return { success: false, error: "Mesaj silinemedi." };
  }
}
