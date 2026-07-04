import { prisma } from "@/app/lib/prisma";
import MessageListClient from "./MessageListClient";

export const metadata = {
  title: "Gelen Mesajlar | Admin Panel",
};

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Gelen Mesajlar</h1>
        <p className="admin-page-desc">İletişim formundan gönderilen mesajları buradan yönetebilirsiniz.</p>
      </div>

      <MessageListClient initialMessages={messages} />
    </div>
  );
}
