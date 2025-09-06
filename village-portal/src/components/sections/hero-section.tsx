"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Info, MessageSquare } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="beranda" className="relative bg-gradient-to-br from-primary to-secondary py-20 lg:py-32">
      <div className="absolute inset-0 bg-black/10" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Selamat Datang di 
            <span className="block text-blue-200">Portal Desa</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Pusat informasi terpadu untuk seluruh warga desa. Akses informasi praktis, 
            laporkan keluhan, dan tetap terhubung dengan komunitas Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 h-auto"
              onClick={() => scrollToSection('informasi')}
            >
              <Info className="mr-2 h-5 w-5" />
              Lihat Informasi
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 h-auto border-2 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={() => scrollToSection('lapor')}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Laporkan Masalah
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}