"use client";

import { useState } from "react";
import ModernSidebar from "./ModernSidebar";
import ModernNavbar from "./ModernNavbar";
import { ChatProvider } from "@/Context/ChatContext";
import ChatIcon from "@/Components/chat/ChatIcon";
import ChatWindow from "@/Components/chat/ChatWindow";

interface AdminLayoutClientProps {
  children: React.ReactNode;
  adminName: string;
  adminEmail: string;
}

export default function AdminLayoutClient({
  children,
  adminName,
  adminEmail,
}: AdminLayoutClientProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <ChatProvider>
      <div className="min-h-screen bg-gray-50">
        <ModernSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        
        <div className={`flex flex-col min-h-screen transition-all duration-300 ${
          isCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}>
          <ModernNavbar 
            adminName={adminName}
            adminEmail={adminEmail}
          />
          
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>

        {/* Chat Components */}
        <ChatIcon />
        <ChatWindow />
      </div>
    </ChatProvider>
  );
}
