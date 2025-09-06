import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Sprout, Phone, Clock, MapPin, User } from "lucide-react";

export default function InformationSection() {
  const schedules = [
    {
      name: "Posyandu Melati",
      schedule: "Setiap Minggu ke-2",
      time: "08:00 WIB",
      location: "Balai RW 02"
    },
    {
      name: "Posyandu Mawar", 
      schedule: "Setiap Minggu ke-4",
      time: "09:00 WIB",
      location: "Balai RW 02"
    }
  ];

  const prices = [
    { commodity: "Beras", price: "Rp 12.000/kg", trend: "stabil" },
    { commodity: "Cabai", price: "Rp 35.000/kg", trend: "naik" },
    { commodity: "Jagung", price: "Rp 8.500/kg", trend: "turun" },
    { commodity: "Bawang Merah", price: "Rp 28.000/kg", trend: "stabil" },
  ];

  const contacts = [
    {
      role: "Kepala Desa",
      name: "Bapak Suharto",
      phone: "08123456789",
      icon: User
    },
    {
      role: "Bidan Desa", 
      name: "Ibu Sari",
      phone: "08198765432",
      icon: User
    },
    {
      role: "Polsek Terdekat",
      name: "Polsek Kecamatan",
      phone: "08111222333", 
      icon: User
    }
  ];

  return (
    <section id="informasi" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Informasi Praktis
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Akses cepat ke informasi penting yang dibutuhkan warga desa sehari-hari
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Jadwal Posyandu */}
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-primary" />
                Jadwal Posyandu
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {schedules.map((item, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">{item.name}</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{item.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{item.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Harga Komoditas */}
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center gap-3">
                <Sprout className="h-6 w-6 text-green-600" />
                Harga Komoditas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {prices.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="font-medium">{item.commodity}</span>
                    <div className="text-right">
                      <div className="font-semibold text-lg">{item.price}</div>
                      <Badge 
                        variant={item.trend === 'naik' ? 'destructive' : item.trend === 'turun' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {item.trend}
                      </Badge>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground text-center pt-2">
                  Update terakhir: 6 September 2025
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Kontak Darurat */}
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader className="bg-red-50">
              <CardTitle className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-red-600" />
                Kontak Darurat
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {contacts.map((contact, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <contact.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{contact.role}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{contact.name}</p>
                        <a 
                          href={`tel:${contact.phone}`}
                          className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                        >
                          <Phone className="h-4 w-4" />
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}