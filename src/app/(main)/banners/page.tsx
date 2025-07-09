"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, ImageIcon, Grid, List } from "lucide-react";
import BannerCard from "@/components/cards/banner-card";
import BannerForm from "@/components/modals/banner-modal";
import { useGetBanners } from "@/queries/banner";

interface BannerType {
  id: string;
  title: string;
  image_url?: string | null;
  video_url?: string | null;
  created_at?: string;
}

export default function BannerManagement() {
  const [filteredBanners, setFilteredBanners] = useState<BannerType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerType | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { data: banners, isLoading } = useGetBanners();

  // Filter banners based on search
  useEffect(() => {
    const filtered = banners?.filter((banner) =>
      banner.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBanners(filtered ?? []);
  }, [searchTerm, banners]);

  const handleEdit = (banner: BannerType) => {
    setEditingBanner(banner);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingBanner(null);
  };

  // const stats = {
  //   total: banners.length,
  //   withImage: banners.filter((b) => b.image_url).length,
  //   withVideo: banners.filter((b) => b.video_url).length,
  //   withBoth: banners.filter((b) => b.image_url && b.video_url).length,
  // };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Banner Management</h1>
          <p className="text-gray-600">
            Manage your website banners and promotional content
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Banner
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <BannerForm
          banner={editingBanner}
          banners={banners}
          onClose={handleFormClose}
        />
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search banners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="md:flex hidden items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Banner List */}
      {filteredBanners.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {searchTerm ? "No banners found" : "No banners yet"}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Create your first banner to get started"}
            </p>
            {!searchTerm && (
              <Button onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Banner
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredBanners.map((banner) => (
            <BannerCard key={banner.id} banner={banner} onEdit={handleEdit} />
          ))}
        </div>
      )}
    </div>
  );
}
