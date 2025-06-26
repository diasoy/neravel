"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, TrendingUp, TrendingDown, Activity } from "lucide-react";

export default function AnalyticsPage() {
  const metrics = [
    {
      title: "Page Views",
      value: "45,321",
      change: "+12.5%",
      trend: "up",
      icon: Activity,
    },
    {
      title: "Unique Visitors",
      value: "12,854",
      change: "+8.2%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Bounce Rate",
      value: "24.8%",
      change: "-3.1%",
      trend: "down",
      icon: TrendingDown,
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+0.8%",
      trend: "up",
      icon: BarChart3,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">
          Monitor performa dan aktivitas website Anda.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const isPositive = metric.trend === "up";

          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {metric.value}
                    </p>
                    <p
                      className={`text-sm ${
                        isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {metric.change} dari minggu lalu
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-gray-50">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>
              Ringkasan traffic 30 hari terakhir
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>
              Halaman yang paling banyak dikunjungi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { page: "/dashboard", views: "8,432", percentage: "28%" },
                { page: "/analytics", views: "5,621", percentage: "19%" },
                { page: "/users", views: "4,893", percentage: "16%" },
                { page: "/reports", views: "3,245", percentage: "11%" },
                { page: "/settings", views: "2,876", percentage: "10%" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.page}</p>
                    <p className="text-sm text-gray-500">{item.views} views</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-blue-600">
                      {item.percentage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
