"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, Sprout, Hammer, Clock, TrendingUp } from "lucide-react";

export default function ForumSection() {
  const [joinedTopics, setJoinedTopics] = useState<number[]>([]);

  const forumTopics = [
    {
      id: 1,
      title: "Diskusi Pertanian",
      description: "Berbagi tips dan pengalaman seputar pertanian, perkebunan, dan peternakan",
      icon: Sprout,
      members: 24,
      posts: 156,
      lastActivity: "2 jam lalu",
      category: "Ekonomi",
      isActive: true
    },
    {
      id: 2,
      title: "PKK dan Kegiatan Ibu",
      description: "Forum diskusi untuk kegiatan PKK, resep masakan, dan kegiatan pemberdayaan perempuan",
      icon: Users,
      members: 18,
      posts: 89,
      lastActivity: "5 jam lalu",
      category: "Sosial",
      isActive: true
    },
    {
      id: 3,
      title: "Gotong Royong",
      description: "Koordinasi kegiatan gotong royong, kerja bakti, dan pembangunan desa",
      icon: Hammer,
      members: 35,
      posts: 234,
      lastActivity: "1 jam lalu",
      category: "Pembangunan",
      isActive: true
    },
    {
      id: 4,
      title: "Karang Taruna",
      description: "Wadah diskusi untuk pemuda desa, kegiatan olahraga, dan event komunitas",
      icon: TrendingUp,
      members: 12,
      posts: 67,
      lastActivity: "1 hari lalu", 
      category: "Pemuda",
      isActive: false
    },
    {
      id: 5,
      title: "Keamanan Desa",
      description: "Koordinasi keamanan lingkungan, sistem ronda, dan pelaporan kejadian",
      icon: Users,
      members: 28,
      posts: 145,
      lastActivity: "3 jam lalu",
      category: "Keamanan",
      isActive: true
    },
    {
      id: 6,
      title: "Pendidikan Anak",
      description: "Diskusi seputar pendidikan anak, PAUD, dan kegiatan belajar mengajar",
      icon: Users,
      members: 22,
      posts: 98,
      lastActivity: "6 jam lalu",
      category: "Pendidikan",
      isActive: true
    }
  ];

  const handleJoinTopic = (topicId: number) => {
    if (joinedTopics.includes(topicId)) {
      // Already joined, could show topic content or do nothing
      return;
    }

    setJoinedTopics(prev => [...prev, topicId]);
    
    // Update member count locally for immediate feedback
    const topicIndex = forumTopics.findIndex(topic => topic.id === topicId);
    if (topicIndex !== -1) {
      forumTopics[topicIndex].members += 1;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Ekonomi": "bg-green-100 text-green-800",
      "Sosial": "bg-purple-100 text-purple-800",
      "Pembangunan": "bg-blue-100 text-blue-800",
      "Pemuda": "bg-orange-100 text-orange-800",
      "Keamanan": "bg-red-100 text-red-800",
      "Pendidikan": "bg-indigo-100 text-indigo-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <section id="forum" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Forum Diskusi
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bergabunglah dalam diskusi dengan warga desa lainnya berdasarkan topik yang Anda minati
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forumTopics.map((topic) => {
            const IconComponent = topic.icon;
            const isJoined = joinedTopics.includes(topic.id);

            return (
              <Card key={topic.id} className="transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{topic.title}</CardTitle>
                        <Badge className={`text-xs mt-1 ${getCategoryColor(topic.category)}`}>
                          {topic.category}
                        </Badge>
                      </div>
                    </div>
                    {topic.isActive && (
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-green-600 font-medium">Aktif</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {topic.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{topic.members} anggota</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{topic.posts} post</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Aktif {topic.lastActivity}</span>
                  </div>

                  <Button
                    onClick={() => handleJoinTopic(topic.id)}
                    className="w-full"
                    variant={isJoined ? "default" : "outline"}
                    disabled={isJoined}
                  >
                    {isJoined ? (
                      <>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Tergabung
                      </>
                    ) : (
                      "Bergabung"
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="p-8">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Punya Ide Topik Baru?</h3>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                Sarankan topik diskusi baru atau kategori yang belum ada untuk memperkaya 
                forum diskusi desa kita.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  const message = "Halo, saya ingin mengusulkan topik diskusi baru untuk forum desa";
                  const encodedMessage = encodeURIComponent(message);
                  window.open(`https://wa.me/08123456789?text=${encodedMessage}`, '_blank');
                }}
              >
                Hubungi Admin
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}