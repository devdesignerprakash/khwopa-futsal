"use client"

import{ Link }from "react-router-dom"
import { useState } from "react"
import { Button } from "@shadcn/components/ui/button"
import logo from '../assets/logo.png'
import {
  Home,
  Users,
  Settings,
  BarChart,
  LogOut,
  Menu,
} from "lucide-react"

const AdminNav = () => {
    const [collapsed, setCollapsed] = useState(false)
    const navItems = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Reports", href: "/admin/reports", icon: BarChart },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]
  return (
     <aside
      className={`flex flex-col h-screen border-r bg-background transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && 
        <div className='flex gap-2 items-center justify-center'>
        <img src={logo} alt="logo" className="w-10 h-10"/>
        <h1 className="font-bold text-lg">Khwopa Futsal</h1>
        </div>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        {navItems.map((item) => (
          <Link to={item.href}>
            <Button
              variant="ghost"
              className={`w-full mb-1 ${
                collapsed ? "justify-center" : "justify-start"
              }`}
            >
              <item.icon className="h-5 w-5 mr-2" />
              {!collapsed && item.name}
            </Button>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className={`w-full ${
            collapsed ? "justify-center" : "justify-start"
          }`}
        >
          <LogOut className="h-5 w-5 mr-2" />
          {!collapsed && "Logout"}
        </Button>
      </div>
    </aside>
  )
}

export default AdminNav