"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMedia } from "@/queries/media";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState, useMemo } from "react";
import { MediaPreview } from "../media-preview";
import UploadMediaModal from "../cloudinary-widget";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  ImageIcon,
  Video,
  FileAudio,
  File,
  Tag,
  Download,
  Eye,
  X,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getThumbnailUrl } from "@/utils/thumbGenerater";
import Image from "next/image";

// Media type configurations
const mediaTypes = {
  image: {
    icon: ImageIcon,
    label: "Images",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    formats: ["jpg", "jpeg", "png", "gif", "webp", "svg"],
  },
  video: {
    icon: Video,
    label: "Videos",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    formats: ["mp4", "avi", "mov", "wmv", "flv", "webm"],
  },
  audio: {
    icon: FileAudio,
    label: "Audio",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    formats: ["mp3", "wav", "ogg", "m4a", "flac"],
  },
  document: {
    icon: File,
    label: "Documents",
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    formats: ["pdf", "doc", "docx", "txt", "rtf"],
  },
};

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "name", label: "Name A-Z" },
  { value: "size", label: "File Size" },
];

interface MediaItem {
  id: string;
  name: string;
  url: string;
  format: string;
  tags?: string[];
  size?: number;
  created_at?: string;
  width?: number;
  height?: number;
}

export function MediaPickerModal({
  open,
  onClose,
  onSelect,
  filterFormat,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  filterFormat?: string;
}) {
  const { data, isLoading } = useMedia({});
  const mediaData: MediaItem[] = data?.data ?? [];

  // State management
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>(
    filterFormat || "all"
  );
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    mediaData.forEach((media) => {
      media.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [mediaData]);

  // Get media type from format
  const getMediaType = (format: string) => {
    for (const [type, config] of Object.entries(mediaTypes)) {
      if (config.formats.includes(format.toLowerCase())) {
        return type;
      }
    }
    return "document";
  };

  // Filter and sort media
  const filteredMedia = useMemo(() => {
    const filtered = mediaData.filter((media) => {
      // Search filter
      const searchMatch =
        media.name.toLowerCase().includes(search.toLowerCase()) ||
        media.tags?.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        );

      // Format filter
      const formatMatch =
        selectedFormat === "all" || media.format === selectedFormat;

      // Type filter
      const typeMatch =
        selectedType === "all" || getMediaType(media.format) === selectedType;

      // Tags filter
      const tagsMatch =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => media.tags?.includes(tag));

      return searchMatch && formatMatch && typeMatch && tagsMatch;
    });

    // Sort media
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.created_at || "").getTime() -
            new Date(a.created_at || "").getTime()
          );
        case "oldest":
          return (
            new Date(a.created_at || "").getTime() -
            new Date(b.created_at || "").getTime()
          );
        case "name":
          return a.name.localeCompare(b.name);
        case "size":
          return (b.size || 0) - (a.size || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [mediaData, search, selectedFormat, selectedType, selectedTags, sortBy]);

  // Format file size
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Unknown";
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString();
  };

  // Handle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setSelectedTags([]);
    setSelectedFormat("all");
    setSelectedType("all");
    setSortBy("newest");
  };

  // Get active filters count
  const activeFiltersCount = [
    search !== "",
    selectedTags.length > 0,
    selectedFormat !== "all",
    selectedType !== "all",
  ].filter(Boolean).length;

  return (
    <Dialog open={open} onOpenChange={onClose} modal={false}>
      <DialogContent
        onInteractOutside={(e) => {
          if (isWidgetOpen) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (isWidgetOpen) e.preventDefault();
        }}
        className="w-full max-w-[95vw] md:max-w-6xl max-h-[85vh] overflow-hidden overflow-y-auto"
      >
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">Media Library</DialogTitle>
                <p className="text-sm text-muted-foreground">
                  {filteredMedia.length} of {mediaData.length} files
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <UploadMediaModal onWidgetOpenChange={setIsWidgetOpen} />
              {/* <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button> */}
            </div>
          </div>
        </DialogHeader>
        <div className="flex w-full flex-col lg:flex-row gap-4 h-full overflow-hidden">
          {/* Sidebar Filters */}
          <div className="min-w-[320px]  space-y-3 overflow-y-auto">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search media..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters</span>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="h-5">
                    {activeFiltersCount}
                  </Badge>
                )}
              </div>
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all
                </Button>
              )}
            </div>

            {/* Media Type Tabs */}
            <Tabs value={selectedType} onValueChange={setSelectedType}>
              <TabsList className="grid w-full grid-cols-1 h-auto flex-col space-y-1">
                <TabsTrigger value="all" className="w-full justify-start">
                  All Media
                </TabsTrigger>
                {Object.entries(mediaTypes).map(([type, config]) => {
                  const Icon = config.icon;
                  const count = mediaData.filter(
                    (m) => getMediaType(m.format) === type
                  ).length;
                  return (
                    <TabsTrigger
                      key={type}
                      value={type}
                      className="w-full justify-start gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{config.label}</span>
                      <Badge variant="secondary" className="ml-auto">
                        {count}
                      </Badge>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>

            {/* Format Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="All formats" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Formats</SelectItem>
                  {Array.from(new Set(mediaData.map((m) => m.format)))
                    .sort()
                    .map((format) => (
                      <SelectItem key={format} value={format}>
                        {format.toUpperCase()}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tags Filter */}
            {allTags.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <ScrollArea className="h-32">
                  <div className="space-y-1">
                    {allTags.map((tag) => (
                      <div
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={cn(
                          "flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors",
                          selectedTags.includes(tag)
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Tag className="h-3 w-3" />
                          <span className="text-sm">{tag}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {
                            mediaData.filter((m) => m.tags?.includes(tag))
                              .length
                          }
                        </Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Selected Tags</label>
                <div className="flex flex-wrap gap-1">
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="default"
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator orientation="vertical" className="hidden lg:block" />

          {/* Main Content */}
          <div className="space-y-4 flex-[1] overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Tabs
                value={viewMode}
                onValueChange={(value: any) => setViewMode(value)}
              >
                <TabsList>
                  <TabsTrigger value="grid">
                    <Grid3X3 className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="list">
                    <List className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Media Grid/List */}
            <ScrollArea className="h-[calc(85vh-200px)] flex-1 p-4">
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-muted rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : filteredMedia.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No media found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filters
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear filters
                  </Button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {filteredMedia.map((media) => {
                    const mediaType = getMediaType(media.format);
                    const typeConfig =
                      mediaTypes[mediaType as keyof typeof mediaTypes];
                    const Icon = typeConfig.icon;

                    return (
                      <div
                        key={media.id}
                        onClick={(e) => {
                          setSelectedMedia(media.id);
                          onSelect(media.url);
                        }}
                        className={cn(
                          "group relative max-w-full cursor-pointer rounded-lg border-1 transition-all duration-200",
                          "hover:border-primary hover:shadow-lg ",
                          selectedMedia === media.id
                            ? "border-primary shadow-lg "
                            : "border-border"
                        )}
                      >
                        <div className="aspect-square p-3">
                          <div className="relative h-full w-full rounded-md overflow-hidden bg-muted">
                            <div className="h-[150px] w-[150px] relative">
                              <Image
                                src={getThumbnailUrl(media.url, media.format)}
                                alt={media.name}
                                width={200}
                                height={200}
                                className="object-contain  h-full w-full"
                              />
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <a
                                href={media.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-black"
                                title="View full size"
                              >
                                <Eye className="h-4 w-4" />
                              </a>
                            </div>
                            <div className="absolute bottom-2 left-2">
                              <Badge className={typeConfig.color}>
                                <Icon className="h-3 w-3 mr-1" />
                                {media.format.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 pt-0">
                          <p
                            className="text-sm font-medium truncate"
                            title={media.name}
                          >
                            {media.name}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(media.size)}
                            </p>
                            {media.width && media.height && (
                              <p className="text-xs text-muted-foreground">
                                {media.width}×{media.height}
                              </p>
                            )}
                          </div>
                          {media.tags && media.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {media.tags.slice(0, 2).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {media.tags.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{media.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredMedia.map((media) => {
                    const mediaType = getMediaType(media.format);
                    const typeConfig =
                      mediaTypes[mediaType as keyof typeof mediaTypes];
                    const Icon = typeConfig.icon;

                    return (
                      <div
                        key={media.id}
                        onClick={() => {
                          setSelectedMedia(media.id);
                          onSelect(media.url);
                        }}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all",
                          "hover:border-primary hover:shadow-md",
                          selectedMedia === media.id
                            ? "border-primary shadow-md"
                            : "border-border"
                        )}
                      >
                        <div className="h-16 w-16 rounded-md overflow-hidden  bg-muted ">
                          <Image
                            src={getThumbnailUrl(media.url, media.format)}
                            alt={media.name}
                            width={64}
                            height={64}
                            className="object-contain h-full w-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium truncate">
                              {media.name}
                            </h4>
                            <Badge className={typeConfig.color}>
                              <Icon className="h-3 w-3 mr-1" />
                              {media.format.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{formatFileSize(media.size)}</span>
                            {media.width && media.height && (
                              <span>
                                {media.width}×{media.height}
                              </span>
                            )}
                            <span>{formatDate(media.created_at)}</span>
                          </div>
                          {media.tags && media.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {media.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
