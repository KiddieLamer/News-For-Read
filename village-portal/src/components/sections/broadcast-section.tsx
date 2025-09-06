"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Radio, Calendar, Bell, BellOff, Users, Play } from "lucide-react";

export default function BroadcastSection() {
  const [isLive, setIsLive] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
      setNotificationEnabled(Notification.permission === 'granted');
    }
  }, []);

  const upcomingBroadcasts = [
    {
      id: 1,
      title: "Musyawarah Desa",
      description: "Pembahasan program kerja tahun 2025 dan anggaran desa",
      date: "15 September 2025",
      time: "19:30 WIB",
      type: "important",
      estimatedViewers: 150
    },
    {
      id: 2,
      title: "Sosialisasi Program Bantuan",
      description: "Penjelasan tentang program bantuan pemerintah untuk warga desa",
      date: "22 September 2025", 
      time: "20:00 WIB",
      type: "informational",
      estimatedViewers: 100
    },
    {
      id: 3,
      title: "Pelatihan UMKM",
      description: "Workshop pengembangan usaha kecil dan menengah untuk warga",
      date: "28 September 2025",
      time: "14:00 WIB",
      type: "educational",
      estimatedViewers: 80
    }
  ];

  const handleNotificationToggle = async () => {
    if (!('Notification' in window)) {
      alert('Browser Anda tidak mendukung notifikasi');
      return;
    }

    if (notificationPermission === 'granted') {
      setNotificationEnabled(!notificationEnabled);
      if (!notificationEnabled) {
        new Notification('Portal Desa', {
          body: 'Notifikasi siaran langsung telah diaktifkan!',
          icon: '/favicon.ico'
        });
      }
    } else if (notificationPermission === 'default') {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') {
        setNotificationEnabled(true);
        new Notification('Portal Desa', {
          body: 'Notifikasi siaran langsung telah diaktifkan!',
          icon: '/favicon.ico'
        });
      }
    } else {
      alert('Notifikasi telah diblokir. Aktifkan melalui pengaturan browser.');
    }
  };

  const simulateLiveBroadcast = () => {
    setIsLive(true);
    if (notificationEnabled) {
      new Notification('Siaran Langsung Dimulai!', {
        body: 'Musyawarah desa sedang berlangsung. Klik untuk menyaksikan.',
        icon: '/favicon.ico'
      });
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'important':
        return 'bg-red-100 text-red-800';
      case 'informational':
        return 'bg-blue-100 text-blue-800';
      case 'educational':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'important':
        return 'Penting';
      case 'informational':
        return 'Informasi';
      case 'educational':
        return 'Edukasi';
      default:
        return 'Umum';
    }
  };

  return (
    <section id="siaran" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <Radio className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Siaran Langsung
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Saksikan acara penting desa secara langsung dan tetap terhubung dengan komunitas
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Status Siaran */}
          <Card>
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className={`flex items-center gap-2 ${isLive ? 'animate-pulse' : ''}`}>
                  <div className={`h-3 w-3 rounded-full ${isLive ? 'bg-red-500' : 'bg-gray-400'}`} />
                  <span className={`font-semibold text-lg ${isLive ? 'text-red-600' : 'text-gray-600'}`}>
                    {isLive ? 'SIARAN LANGSUNG AKTIF' : 'Tidak ada siaran aktif'}
                  </span>
                </div>
              </div>

              {isLive ? (
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-red-800 mb-2">
                      Musyawarah Desa - Pembahasan Anggaran 2025
                    </h3>
                    <p className="text-red-700 mb-4">
                      Diskusi program kerja dan alokasi dana pembangunan desa
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-red-600">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>127 penonton</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Radio className="h-4 w-4" />
                        <span>LIVE SEKARANG</span>
                      </div>
                    </div>
                  </div>
                  <Button size="lg" className="bg-red-600 hover:bg-red-700">
                    <Play className="mr-2 h-5 w-5" />
                    Tonton Siaran
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Saat ini tidak ada siaran yang sedang berlangsung
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={simulateLiveBroadcast}
                    className="text-sm"
                  >
                    <Radio className="mr-2 h-4 w-4" />
                    Simulasi Siaran (Demo)
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notifikasi */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Pengaturan Notifikasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notifikasi Siaran Langsung</p>
                  <p className="text-sm text-muted-foreground">
                    Dapatkan pemberitahuan ketika ada siaran penting dimulai
                  </p>
                </div>
                <Button
                  onClick={handleNotificationToggle}
                  variant={notificationEnabled ? "default" : "outline"}
                  size="sm"
                >
                  {notificationEnabled ? (
                    <>
                      <Bell className="mr-2 h-4 w-4" />
                      Aktif
                    </>
                  ) : (
                    <>
                      <BellOff className="mr-2 h-4 w-4" />
                      Nonaktif
                    </>
                  )}
                </Button>
              </div>
              
              {notificationPermission === 'denied' && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    Notifikasi telah diblokir. Untuk mengaktifkan, buka pengaturan browser dan izinkan notifikasi untuk situs ini.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Jadwal Siaran */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Jadwal Siaran Mendatang
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingBroadcasts.map((broadcast) => (
                  <div key={broadcast.id} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-foreground">{broadcast.title}</h4>
                          <Badge className={getTypeColor(broadcast.type)}>
                            {getTypeLabel(broadcast.type)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {broadcast.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{broadcast.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Radio className="h-4 w-4" />
                          <span>{broadcast.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>~{broadcast.estimatedViewers} penonton</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Ingatkan Saya
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Info Tambahan */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="text-center">
                <Radio className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold text-blue-800 mb-2">
                  Cara Mengakses Siaran Langsung
                </h3>
                <p className="text-sm text-blue-700">
                  Siaran langsung dapat diakses langsung dari halaman ini. Pastikan Anda memiliki 
                  koneksi internet yang stabil untuk pengalaman menonton yang optimal.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}