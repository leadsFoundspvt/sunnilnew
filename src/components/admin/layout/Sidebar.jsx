import React from "react";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  Image,
  BarChart3,
  LogOut,
  BookOpen,
  Star,
  File,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const { logout } = useAuth();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "blogs", label: "Blog Management", icon: BookOpen },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "pages", label: "Page Management", icon: File },
    { id: "terms", label: "Terms & Conditions", icon: FileText },
    { id: "privacy", label: "Privacy Policy", icon: ShieldCheck },
    { id: "users", label: "User Management", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-[#00353E] text-white w-64 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-600">
        <h1 className="text-xl font-bold">Sophic Designs Pvt CMS</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                    activeSection === item.id
                      ? "bg-[#9ACD32] text-[#00353E] font-medium"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <IconComponent className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-600">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
