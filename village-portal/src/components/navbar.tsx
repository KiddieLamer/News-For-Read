"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Wifi, Bell } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLightMode = () => {
    setIsLightMode(!isLightMode);
    document.body.classList.toggle('light-mode');
  };

  const navItems = [
    { href: "#beranda", label: "Beranda" },
    { href: "#informasi", label: "Informasi Praktis" },
    { href: "#lapor", label: "Lapor" },
    { href: "#umkm", label: "UMKM Desa" },
    { href: "#forum", label: "Forum" },
    { href: "#siaran", label: "Siaran Langsung" },
  ];

  return (
    <>
      {/* Light Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={toggleLightMode}
          variant={isLightMode ? "default" : "outline"}
          size="sm"
          className="gap-2"
        >
          <Wifi className="h-4 w-4" />
          {isLightMode ? "Mode Normal" : "Mode Ringan"}
        </Button>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-40 w-full bg-primary/95 backdrop-blur-md border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-primary-foreground rounded-md flex items-center justify-center">
                <span className="text-primary font-bold">PD</span>
              </div>
              <h1 className="text-xl font-bold text-primary-foreground">
                Portal Desa
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-primary-foreground/90 hover:text-primary-foreground transition-colors duration-200 font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-primary-foreground"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary border-t">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-primary-foreground/90 hover:text-primary-foreground transition-colors duration-200 font-medium py-2"
                  onClick={toggleMenu}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}