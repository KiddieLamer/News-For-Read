import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">PD</span>
              </div>
              <h3 className="text-xl font-bold">Portal Desa</h3>
            </div>
            <p className="text-secondary-foreground/80 leading-relaxed">
              Menghubungkan warga desa dengan informasi dan layanan yang dibutuhkan. 
              Bersama membangun desa yang lebih maju dan sejahtera.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Kontak Desa</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-secondary-foreground/60" />
                <div>
                  <p className="font-medium">Kantor Desa</p>
                  <p className="text-sm text-secondary-foreground/80">
                    Jl. Raya Desa No. 123<br />
                    RT 01 RW 01, Kec. Contoh<br />
                    Kab. Contoh, Prov. Contoh
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary-foreground/60" />
                <div>
                  <p className="font-medium">Telepon</p>
                  <p className="text-sm text-secondary-foreground/80">(0274) 123-456</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary-foreground/60" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-secondary-foreground/80">admin@portaldesa.id</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Tautan Cepat</h4>
            <div className="grid grid-cols-2 gap-2">
              <a href="#beranda" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                Beranda
              </a>
              <a href="#informasi" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                Informasi Praktis
              </a>
              <a href="#lapor" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                Lapor Masalah
              </a>
              <a href="#umkm" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                UMKM Desa
              </a>
              <a href="#forum" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                Forum Diskusi
              </a>
              <a href="#siaran" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                Siaran Langsung
              </a>
            </div>
            
            <div className="pt-4 border-t border-secondary-foreground/20">
              <h5 className="font-medium mb-2 text-sm">Jam Pelayanan</h5>
              <div className="text-sm text-secondary-foreground/80">
                <p>Senin - Jumat: 08:00 - 16:00</p>
                <p>Sabtu: 08:00 - 12:00</p>
                <p>Minggu: Tutup</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-secondary-foreground/60 text-center md:text-left">
              &copy; {currentYear} Portal Desa. Semua hak dilindungi undang-undang.
            </p>
            <div className="flex items-center gap-6 text-sm text-secondary-foreground/60">
              <a href="#" className="hover:text-secondary-foreground transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="hover:text-secondary-foreground transition-colors">
                Syarat & Ketentuan
              </a>
              <a href="#" className="hover:text-secondary-foreground transition-colors">
                Bantuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}