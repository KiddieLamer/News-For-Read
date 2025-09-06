"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Send, CheckCircle } from "lucide-react";

interface ReportForm {
  title: string;
  category: string;
  description: string;
  location: string;
  photos: FileList | null;
}

export default function ReportSection() {
  const [form, setForm] = useState<ReportForm>({
    title: '',
    category: '',
    description: '',
    location: '',
    photos: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<ReportForm>>({});

  const categories = [
    { value: "infrastruktur", label: "Infrastruktur" },
    { value: "kebersihan", label: "Kebersihan" },
    { value: "keamanan", label: "Keamanan" },
    { value: "kesehatan", label: "Kesehatan" },
    { value: "lainnya", label: "Lainnya" }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<ReportForm> = {};
    
    if (!form.title.trim()) {
      newErrors.title = 'Judul laporan harus diisi';
    }
    
    if (!form.category) {
      newErrors.category = 'Kategori harus dipilih';
    }
    
    if (!form.description.trim()) {
      newErrors.description = 'Deskripsi masalah harus diisi';
    }

    if (form.photos && form.photos.length > 3) {
      newErrors.photos = 'Maksimal 3 foto dapat diunggah';
    }

    if (form.photos) {
      for (let i = 0; i < form.photos.length; i++) {
        const file = form.photos[i];
        if (file.size > 2 * 1024 * 1024) { // 2MB
          newErrors.photos = 'Ukuran file maksimal 2MB';
          break;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Save to localStorage for demo purposes
      const reports = JSON.parse(localStorage.getItem('villageReports') || '[]');
      reports.push({
        id: Date.now(),
        ...form,
        timestamp: new Date().toISOString(),
        status: 'pending'
      });
      localStorage.setItem('villageReports', JSON.stringify(reports));

      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form
      setForm({
        title: '',
        category: '',
        description: '',
        location: '',
        photos: null
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 2000);
  };

  const handleInputChange = (field: keyof ReportForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, photos: e.target.files }));
    if (errors.photos) {
      setErrors(prev => ({ ...prev, photos: undefined }));
    }
  };

  return (
    <section id="lapor" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Laporkan Masalah
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sampaikan keluhan atau masalah di lingkungan Anda untuk ditindaklanjuti oleh perangkat desa
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-green-800 font-medium">
                Laporan berhasil dikirim! Terima kasih atas partisipasi Anda. 
                Tim kami akan segera menindaklanjuti laporan Anda.
              </p>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Form Laporan</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Judul Laporan <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Contoh: Jalan Rusak di RT 03"
                    value={form.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <Select value={form.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Deskripsi Masalah <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    placeholder="Jelaskan masalah secara detail..."
                    rows={4}
                    value={form.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className={errors.description ? 'border-red-500' : ''}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Lokasi (Opsional)
                  </label>
                  <Input
                    placeholder="RT/RW atau alamat spesifik"
                    value={form.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Foto Pendukung
                  </label>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className={errors.photos ? 'border-red-500' : ''}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Maksimal 3 foto, ukuran masing-masing maksimal 2MB
                  </p>
                  {errors.photos && (
                    <p className="text-red-500 text-sm mt-1">{errors.photos}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Kirim Laporan
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}