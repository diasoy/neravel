
import TitleContent from "@/components/dashboard/TitleContent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AnalyticsPage() {

  return (
    <div className="space-y-6">
      <TitleContent
        title="Analytics & Reports"
        description="Analisis performa dan laporan website Anda"
      />

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Visitors</CardTitle>
            <CardDescription>Pengunjung dalam 30 hari terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">45,231</div>
            <p className="text-sm text-green-600">+12.5% dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Page Views</CardTitle>
            <CardDescription>Total halaman dilihat</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">156,789</div>
            <p className="text-sm text-green-600">+8.2% dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bounce Rate</CardTitle>
            <CardDescription>
              Persentase pengunjung yang langsung pergi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24.5%</div>
            <p className="text-sm text-red-600">+2.1% dari bulan lalu</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Traffic Overview</CardTitle>
          <CardDescription>Grafik pengunjung website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart akan ditampilkan di sini</p>
          </div>
        </CardContent>
      </Card>

      {/* Top Pages */}
      <Card>
        <CardHeader>
          <CardTitle>Top Pages</CardTitle>
          <CardDescription>Halaman dengan traffic tertinggi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { page: "/dashboard", views: 12453, change: "+15%" },
              { page: "/analytics", views: 8932, change: "+8%" },
              { page: "/users", views: 6721, change: "+12%" },
              { page: "/settings", views: 4567, change: "-2%" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.page}</p>
                  <p className="text-sm text-gray-500">{item.views} views</p>
                </div>
                <span
                  className={`text-sm ${
                    item.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
