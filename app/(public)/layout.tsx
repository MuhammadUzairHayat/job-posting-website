import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import { ChatProvider } from "@/Context/ChatContext";
import ChatIcon from "@/Components/chat/ChatIcon";
import ChatWindow from "@/Components/chat/ChatWindow";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChatProvider>
      <div className="bg-gray-50">
        <Navbar />
        {children}
        <Footer />
        <ChatIcon />
        <ChatWindow />
      </div>
    </ChatProvider>
  );
}
