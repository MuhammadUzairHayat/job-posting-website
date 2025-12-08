"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FaChartLine, 
  FaBriefcase, 
  FaUsers, 
  FaEnvelope, 
  FaChevronLeft,
  FaChevronRight,
  FaHome
} from "react-icons/fa";

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface ModernSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const links: SidebarLink[] = [
  { href: "/admin", label: "Dashboard", icon: <FaHome className="w-5 h-5" /> },
  { href: "/admin/jobs", label: "Manage Jobs", icon: <FaBriefcase className="w-5 h-5" /> },
  { href: "/admin/users", label: "Manage Users", icon: <FaUsers className="w-5 h-5" /> },
  { href: "/admin/messages", label: "Messages", icon: <FaEnvelope className="w-5 h-5" /> },
];

export default function ModernSidebar({ isCollapsed, setIsCollapsed }: ModernSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        } h-screen fixed top-0 left-0 shadow-2xl`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-700 flex-shrink-0">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FaChartLine className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg">Admin</h2>
                  <p className="text-gray-400 text-xs">Control Panel</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
            >
              {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group relative ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <span className={isActive ? "text-white" : "text-gray-400 group-hover:text-white"}>
                  {link.icon}
                </span>
                {!isCollapsed && (
                  <span className="font-medium">{link.label}</span>
                )}
                {isCollapsed && (
                  <span className="absolute left-full ml-6 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl">
                    {link.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-700 flex-shrink-0">
            <div className="px-4 py-3 bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-400">Version</p>
              <p className="text-sm text-white font-semibold">1.0.0</p>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button title="sidebar toggle" className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl">
          <FaChartLine className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}
