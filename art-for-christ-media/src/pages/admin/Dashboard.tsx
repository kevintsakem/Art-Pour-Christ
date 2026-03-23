import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboardApi, DashboardStats } from '@/services/api';
import { Image, Video, Megaphone, Activity, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await dashboardApi.getStats();
      setStats(data);
    } catch (err) {
      setError('Impossible de charger les statistiques. Vérifiez que votre backend est en ligne.');
      // Données de démonstration en cas d'erreur
      setStats({
        totalPhotos: 0,
        totalVideos: 0,
        totalAnnouncements: 0,
        recentActivity: [],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Photos',
      value: stats?.totalPhotos || 0,
      icon: Image,
      color: 'bg-blue-500/10 text-blue-600',
    },
    {
      title: 'Vidéos',
      value: stats?.totalVideos || 0,
      icon: Video,
      color: 'bg-purple-500/10 text-purple-600',
    },
    {
      title: 'Annonces',
      value: stats?.totalAnnouncements || 0,
      icon: Megaphone,
      color: 'bg-primary/10 text-primary',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Gérez votre contenu Art pour Christ
          </p>
        </div>

        {error && (
          <Card className="border-destructive/50 bg-destructive/10">
            <CardContent className="pt-6">
              <p className="text-sm text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              {statCards.map((stat) => (
                <Card key={stat.title} className="shadow-card">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <stat.icon className="w-4 h-4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Activité récente
                </CardTitle>
                <CardDescription>
                  Les dernières modifications sur votre contenu
                </CardDescription>
              </CardHeader>
              <CardContent>
                {stats?.recentActivity && stats.recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {stats.recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {activity.type === 'photo' && <Image className="w-4 h-4 text-primary" />}
                          {activity.type === 'video' && <Video className="w-4 h-4 text-primary" />}
                          {activity.type === 'announcement' && (
                            <Megaphone className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.action === 'created' && 'Créé'}
                            {activity.action === 'updated' && 'Modifié'}
                            {activity.action === 'deleted' && 'Supprimé'}
                            {' le '}
                            {new Date(activity.date).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Aucune activité récente. Commencez à ajouter du contenu!
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Backend Info */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Configuration Backend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <strong>URL API:</strong>{' '}
                  <code className="bg-background px-2 py-1 rounded">
                    {import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}
                  </code>
                </p>
                <p className="text-muted-foreground">
                  Créez un fichier <code>.env</code> avec <code>VITE_API_URL=votre_url</code> pour
                  configurer l'URL de votre backend.
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
