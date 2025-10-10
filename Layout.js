import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { 
  Home,
  Mail, 
  DollarSign, 
  TrendingUp, 
  Wrench,
  Menu,
  X,
  ChevronDown,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const toolsItems = [
  {
    title: "Shorts Generator",
    url: createPageUrl("ShortsGenerator"),
  },
  {
    title: "Product Creator",
    url: createPageUrl("ProductCreator"),
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch notification counts
  const { data: emails = [] } = useQuery({
    queryKey: ['emails'],
    queryFn: () => base44.entities.Email.list(),
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => base44.entities.Notification.list(),
  });

  const unreadEmailCount = emails.filter(e => !e.is_read).length;
  const financeNotifications = notifications.filter(n => n.type === 'finance' && !n.is_read).length;
  const toolNotifications = notifications.filter(n => n.type === 'tool' && !n.is_read).length;

  const navigationItems = [
    {
      title: "Home",
      url: createPageUrl("Home"),
      icon: Home,
      badge: null
    },
    {
      title: "Finances",
      url: createPageUrl("Finances"),
      icon: DollarSign,
      badge: financeNotifications
    },
    {
      title: "Metrics",
      url: createPageUrl("Metrics"),
      icon: TrendingUp,
      badge: null
    },
    {
      title: "Emails",
      url: createPageUrl("Emails"),
      icon: Mail,
      badge: unreadEmailCount
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col">
      <style>{`
        :root {
          --primary: 210 100% 12%;
          --primary-foreground: 0 0% 100%;
          --accent: 45 93% 47%;
          --accent-foreground: 0 0% 100%;
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center group">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e8eda219e135b5d9dd26c4/688a84da6_CarlsonCompanyBanner.jpeg"
                alt="Carlson Company"
                className="h-16 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <Link
                    key={item.title}
                    to={item.url}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-slate-900 text-white shadow-lg"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.title}
                    {item.badge > 0 && (
                      <Badge className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0 h-5 min-w-5">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}

              {/* Tools Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative flex items-center gap-2 text-slate-700 hover:bg-slate-100"
                  >
                    <Wrench className="w-4 h-4" />
                    Tools
                    <ChevronDown className="w-3 h-3" />
                    {toolNotifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0 h-5 min-w-5">
                        {toolNotifications}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {toolsItems.map((tool) => (
                    <DropdownMenuItem key={tool.title} asChild>
                      <Link to={tool.url} className="cursor-pointer">
                        {tool.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl">
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <Link
                    key={item.title}
                    to={item.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      {item.title}
                    </div>
                    {item.badge > 0 && (
                      <Badge className="bg-red-500 text-white text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
              
              <DropdownMenuSeparator />
              
              <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Tools
                {toolNotifications > 0 && (
                  <Badge className="ml-2 bg-red-500 text-white text-xs">
                    {toolNotifications}
                  </Badge>
                )}
              </div>
              
              {toolsItems.map((tool) => (
                <Link
                  key={tool.title}
                  to={tool.url}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-all"
                >
                  {tool.title}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>

      {/* Footer with Settings */}
      <footer className="border-t border-slate-200 mt-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © 2025 Carlson Company. All rights reserved.
            </p>
            <Link 
              to={createPageUrl("Settings")}
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
