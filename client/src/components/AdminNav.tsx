"use client"

import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@shadcn/components/ui/button";
import logo from "../assets/logo.png";
import {
  Home,
  Users,
  Settings,
  BarChart,
  LogOut,
  Menu,
  Calendar,
} from "lucide-react";

const AdminNav = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Bookings", href: "/admin/adminBooking", icon: Calendar },
    { name: "Reports", href: "/admin/reports", icon: BarChart },
    { name: "Settings", href: "/admin/settings", icon: Settings },
    
  ];

  return (
    <aside
      className={`flex flex-col h-screen border-r bg-background transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="flex gap-2 items-center">
            <img src={logo} alt="logo" className="w-10 h-10" />
            <h1 className="font-bold text-lg">Khwopa Futsal</h1>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 flex flex-col">
        {navItems.map((item, id) => (
          <Button
            key={id}
            variant="ghost"
            asChild
            className={`w-full mb-1 ${
              collapsed ? "justify-center" : "justify-start"
            }`}
          >
            <Link
              to={item.href}
              className="flex items-center w-full gap-2 px-2 py-2 rounded hover:bg-gray-100 transition-colors"
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && item.name}
            </Link>
          </Button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          asChild
          className={`w-full ${collapsed ? "justify-center" : "justify-start"}`}
        >
          <Link to="/logout" className="flex items-center w-full gap-2 px-2 py-2 rounded hover:bg-gray-100 transition-colors">
            <LogOut className="h-5 w-5" />
            {!collapsed && "Logout"}
          </Link>
        </Button>
      </div>
    </aside>
  );
};

export default AdminNav;
