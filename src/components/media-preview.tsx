"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileIcon,
  ImageIcon,
  Video,
  FileAudio,
  Download,
  ExternalLink,
  Play,
  Volume2,
  Maximize,
  FileText,
  Archive,
  AlertCircle,
  Pause,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MediaPreviewProps {
  url: string
  small?: boolean
  className?: string
  showControls?: boolean
  showBadge?: boolean
  alt?: string
  title?: string
}

export function MediaPreview({
  url,
  small = false,
  className,
  showControls = true,
  showBadge = true,
  alt = "Media preview",
  title,
}: MediaPreviewProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  // Get file extension and type
  const getFileInfo = (url: string) => {
    const extension = url.split(".").pop()?.toLowerCase() || ""
    const fileName = url.split("/").pop()?.split("?")[0] || "Unknown file"

    const mediaTypes = {
      image: ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "tiff"],
      video: ["mp4", "webm", "ogg", "avi", "mov", "wmv", "flv", "m4v"],
      audio: ["mp3", "wav", "ogg", "m4a", "aac", "flac", "wma"],
      pdf: ["pdf"],
      document: ["doc", "docx", "txt", "rtf", "odt"],
      spreadsheet: ["xls", "xlsx", "csv", "ods"],
      presentation: ["ppt", "pptx", "odp"],
      archive: ["zip", "rar", "7z", "tar", "gz"],
    }

    for (const [type, extensions] of Object.entries(mediaTypes)) {
      if (extensions.includes(extension)) {
        return { type, extension, fileName }
      }
    }

    return { type: "unknown", extension, fileName }
  }

  const { type, extension, fileName } = getFileInfo(url)

  // Handle audio files - Clean and minimal design
  if (type === "audio") {
    return (
      <div
        className={cn(
          "relative w-[150px] h-[150px] bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800",
          className,
        )}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          {/* Audio Icon */}
          <div className="mb-3">
            <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
              <Volume2 className="h-6 w-6 text-white" />
            </div>
          </div>

          {/* Audio Player */}
          <div className="w-full max-w-xs">
            <audio
              controls
              className="w-full h-8 rounded"
              style={{
                filter: "sepia(1) hue-rotate(90deg) saturate(1.2)",
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={url} type={`audio/${extension}`} />
              Your browser does not support the audio element.
            </audio>
          </div>

          {/* Badge */}
          {showBadge && (
            <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-200">
              <FileAudio className="h-3 w-3 mr-1" />
              {extension.toUpperCase()}
            </Badge>
          )}
        </div>
      </div>
    )
  }

  // Handle video files - Clean video player
  if (type === "video") {
    return (
      <div className={cn("relative w-full max-w-[220px] h-full bg-black rounded-lg overflow-hidden", className)}>
        <video
          controls={showControls}
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          preload="metadata"
        >
          <source src={url} type={`video/${extension}`} />
          Your browser does not support the video element.
        </video>

        {/* Badge */}
        {showBadge && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-purple-500 text-white hover:bg-purple-500 shadow-lg">
              <Video className="h-3 w-3 mr-1" />
              {extension.toUpperCase()}
            </Badge>
          </div>
        )}

        {/* Play overlay for non-controls mode */}
        {!showControls && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer">
            <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              {isPlaying ? (
                <Pause className="h-8 w-8 text-gray-800" />
              ) : (
                <Play className="h-8 w-8 text-gray-800 ml-1" />
              )}
            </div>
          </div>
        )}

        {/* Download button */}
        {showControls && !small && (
          <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity">
            <Button size="sm" variant="secondary" asChild className="shadow-lg">
              <a href={url} download>
                <Download className="h-4 w-4" />
              </a>
            </Button>
          </div>
        )}
      </div>
    )
  }

  // Handle image files - High quality and crisp
  if (type === "image") {
    return (
      <div className={cn("relative h-[150px] w-[150px] bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-hidden", className)}>
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        )}

        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gray-50 dark:bg-gray-900">
            <AlertCircle className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 mb-3">Failed to load image</p>
            <Button size="sm" variant="outline" asChild>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Open
              </a>
            </Button>
          </div>
        ) : (
          <>
            <Image
              src={url || "/placeholder.svg"}
              alt={alt}
              fill
              className="object-contain h-full w-full"
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true)
                setImageLoading(false)
              }}
              sizes={small ? "120px" : "400px"}
              quality={90}
              priority={!small}
            />

            {/* Badge */}
            {showBadge && !imageLoading && !imageError && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-blue-500 text-white hover:bg-blue-500 shadow-lg">
                  <ImageIcon className="h-3 w-3 mr-1" />
                  {extension.toUpperCase()}
                </Badge>
              </div>
            )}

            
          </>
        )}
      </div>
    )
  }

  // Handle document files - Clean and professional
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-8 w-8 text-red-500" />
      case "document":
        return <FileText className="h-8 w-8 text-blue-500" />
      case "spreadsheet":
        return <FileText className="h-8 w-8 text-green-500" />
      case "presentation":
        return <FileText className="h-8 w-8 text-orange-500" />
      case "archive":
        return <Archive className="h-8 w-8 text-purple-500" />
      default:
        return <FileIcon className="h-8 w-8 text-gray-500" />
    }
  }

  const getDocumentBg = (type: string) => {
    switch (type) {
      case "pdf":
        return "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
      case "document":
        return "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
      case "spreadsheet":
        return "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
      case "presentation":
        return "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800"
      case "archive":
        return "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800"
      default:
        return "bg-gray-50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-800"
    }
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "pdf":
        return "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-200"
      case "document":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-200"
      case "spreadsheet":
        return "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-200"
      case "presentation":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-900 dark:text-orange-200"
      case "archive":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  // Handle all other file types
  return (
    <div
      className={cn(
        "relative w-full h-full rounded-lg border flex flex-col items-center justify-center p-4 text-center",
        getDocumentBg(type),
        className,
      )}
    >
      <div className="flex flex-col items-center gap-3">
        {/* File Icon */}
        <div className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-sm">{getDocumentIcon(type)}</div>

        {/* File Name */}
        {!small && (
          <div className="space-y-2">
            <p className="text-sm font-medium truncate max-w-[180px]" title={title || fileName}>
              {title || fileName}
            </p>
            {showBadge && <Badge className={getBadgeColor(type)}>{extension.toUpperCase()}</Badge>}
          </div>
        )}

        {/* Controls */}
        {showControls && !small && (
          <div className="flex items-center gap-2 mt-2">
            <Button size="sm" variant="outline" asChild>
              <a href={url} download>
                <Download className="h-4 w-4 mr-1" />
                Download
              </a>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Open
              </a>
            </Button>
          </div>
        )}

        {/* Small version badge */}
        {small && showBadge && (
          <Badge className={getBadgeColor(type)} size="sm">
            {extension.toUpperCase()}
          </Badge>
        )}
      </div>
    </div>
  )
}
