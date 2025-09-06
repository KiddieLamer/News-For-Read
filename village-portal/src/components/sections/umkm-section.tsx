"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Store, MessageCircle, Clock, MapPin, Star } from "lucide-react";
import Image from "next/image";

export default function UMKMSection() {
  const umkmList = [
    {
      id: 1,
      name: "Warung Bu Siti",
      category: "Makanan & Minuman",
      description: "Menyediakan makanan tradisional dan jajanan khas desa. Buka setiap hari 06:00 - 21:00",
      whatsapp: "08123456789",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      isOpen: true,
      tags: ["Makanan Traditional", "Jajanan", "Halal"]
    },
    {
      id: 2,
      name: "Kerajinan Bambu Pak Joko",
      category: "Kerajinan",
      description: "Produksi berbagai kerajinan bambu seperti anyaman, furniture, dan souvenir unik.",
      whatsapp: "08198765432",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?w=300&h=200&fit=crop",
      isOpen: true,
      tags: ["Handmade", "Bambu", "Custom Order"]
    },
    {
      id: 3,
      name: "Sayuran Organik Bu Ani",
      category: "Pertanian",
      description: "Sayuran segar hasil kebun organik tanpa pestisida. Tersedia sistem antar untuk wilayah desa.",
      whatsapp: "08111222333",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop",
      isOpen: false,
      tags: ["Organik", "Fresh", "Antar"]
    },
    {
      id: 4,
      name: "Ternak Ayam Kampung Pak Budi",
      category: "Peternakan",
      description: "Menyediakan ayam kampung segar, telur kampung, dan daging ayam berkualitas tinggi.",
      whatsapp: "08155667788",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=300&h=200&fit=crop",
      isOpen: true,
      tags: ["Ayam Kampung", "Telur", "Fresh"]
    },
    {
      id: 5,
      name: "Konveksi Ibu Sari",
      category: "Fashion",
      description: "Menerima jahit dan bordir untuk pakaian seragam, kaos, dan keperluan fashion lainnya.",
      whatsapp: "08177889900",
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=200&fit=crop",
      isOpen: true,
      tags: ["Custom", "Seragam", "Bordir"]
    },
    {
      id: 6,
      name: "Toko Kelontong Pak Dedi",
      category: "Retail",
      description: "Menyediakan kebutuhan sehari-hari warga desa dengan harga terjangkau dan lengkap.",
      whatsapp: "08199887766",
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop",
      isOpen: true,
      tags: ["Kelontong", "Lengkap", "Murah"]
    }
  ];

  const handleWhatsAppClick = (whatsapp: string, umkmName: string) => {
    const message = `Halo, saya tertarik dengan produk dari ${umkmName}. Bisa info lebih lanjut?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsapp}?text=${encodedMessage}`, '_blank');
  };

  const handleRegisterUMKM = () => {
    const adminMessage = "Halo, saya ingin mendaftarkan UMKM saya ke Portal Desa";
    const encodedMessage = encodeURIComponent(adminMessage);
    window.open(`https://wa.me/08123456789?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="umkm" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Store className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              UMKM Desa
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dukung ekonomi lokal dengan berbelanja dari UMKM di desa kita
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {umkmList.map((umkm) => (
            <Card key={umkm.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative h-48">
                <Image
                  src={umkm.image}
                  alt={umkm.name}
                  fill
                  className="object-cover"
                />
                <div className="placeholder-image hidden">
                  📷 Gambar {umkm.name}<br />
                  <small>(Tersembunyi untuk menghemat kuota)</small>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant={umkm.isOpen ? "default" : "secondary"} className="bg-white/90">
                    <Clock className="h-3 w-3 mr-1" />
                    {umkm.isOpen ? "Buka" : "Tutup"}
                  </Badge>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant="outline" className="bg-white/90">
                    {umkm.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-foreground">{umkm.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{umkm.rating}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {umkm.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {umkm.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button
                  onClick={() => handleWhatsAppClick(umkm.whatsapp, umkm.name)}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Hubungi via WhatsApp
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action untuk Daftarkan UMKM */}
        <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <Store className="h-16 w-16 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-4">
                Daftarkan UMKM Anda
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Punya usaha atau produk yang ingin dipromosikan? Bergabunglah dengan komunitas 
                UMKM desa dan jangkau lebih banyak pelanggan melalui portal ini.
              </p>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4 text-sm opacity-90">
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-2 w-2 bg-primary-foreground rounded-full" />
                    <span>Gratis Pendaftaran</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-2 w-2 bg-primary-foreground rounded-full" />
                    <span>Jangkauan Luas</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-2 w-2 bg-primary-foreground rounded-full" />
                    <span>Dukungan Penuh</span>
                  </div>
                </div>
                <Button
                  onClick={handleRegisterUMKM}
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Hubungi Admin untuk Pendaftaran
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}