"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MediaPreview } from "./media-preview";
import { useState } from "react";
import { MediaPickerModal } from "./modals/media-picker-modal";
import {
  ImageIcon,
  Video,
  FileAudio,
  File,
  Upload,
  X,
  Eye,
  Download,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mediaTypes } from "../../data";

// Media type configurations

export function MediaSelectInput({
  label,
  title = "Select Media",
  value,
  icon,
  onChange,
  onRemove,
  filterFormat,
  placeholder = "No media selected",
  description,
  required = false,
  disabled = false,
  variant = "default",
  showPreview = true,
  showMetadata = true,
  allowRemove = true,
  className,
}: {
  label?: string;
  title?: string;
  icon?: React.ReactNode;
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  filterFormat?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  variant?: "default" | "compact" | "card";
  showPreview?: boolean;
  showMetadata?: boolean;
  allowRemove?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get media type from URL
  const getMediaTypeFromUrl = (url: string) => {
    const extension = url.split(".").pop()?.toLowerCase() || "";
    for (const [type, config] of Object.entries(mediaTypes)) {
      if (config.formats.includes(extension)) {
        return { type, config };
      }
    }
    return { type: "document", config: mediaTypes.document };
  };

  // Get file name from URL
  const getFileName = (url: string) => {
    return url.split("/").pop()?.split("?")[0] || "Unknown file";
  };

  // Handle media selection
  const handleSelect = async (url: string) => {
    setIsLoading(true);
    try {
      onChange(url);
      setOpen(false);
    } catch (error) {
      console.error("Error selecting media:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle remove
  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    } else {
      onChange("");
    }
  };

  const { type: mediaType, config: typeConfig } = value
    ? getMediaTypeFromUrl(value)
    : { type: null, config: null };
  const TypeIcon = typeConfig?.icon || File;

  // Compact variant
  if (variant === "compact") {
    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </p>
          </div>
        )}
        <div className="flex items-center gap-2">
          {value && showPreview && (
            <div className="h-10 w-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
              <MediaPreview url={value} small />
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(true)}
            disabled={disabled || isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
            ) : (
              icon && <span className="mr-2">{icon}</span>
            )}
            {value ? "Change" : title}
          </Button>
          {value && allowRemove && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRemove}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <MediaPickerModal
          open={open}
          onClose={() => setOpen(false)}
          onSelect={handleSelect}
          filterFormat={filterFormat}
        />
      </div>
    );
  }

  // Card variant
  if (variant === "card") {
    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </p>
          </div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}

        <Card
          className={cn(
            "transition-all duration-200",
            value ? "border-primary/20" : "border-dashed"
          )}
        >
          <CardContent className="p-4">
            {value ? (
              <div className="space-y-4">
                {showPreview && (
                  <div className="relative aspect-video w-fit rounded-lg overflow-hidden bg-muted">
                    <MediaPreview url={value} />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors" />
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* {showMetadata && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">
                        {getFileName(value)}
                      </p>
                      {typeConfig && (
                        <Badge className={typeConfig.color}>
                          <TypeIcon className="h-3 w-3 mr-1" />
                          {typeConfig.label}
                        </Badge>
                      )}
                    </div>
                  </div>
                )} */}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setOpen(true)}
                    disabled={disabled || isLoading}
                    className="flex-1"
                  >
                    {isLoading ? (
                      <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Sparkles className="h-4 w-4 mr-2" />
                    )}
                    Change Media
                  </Button>
                  {allowRemove && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRemove}
                      disabled={disabled}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  {icon || <Upload className="h-8 w-8 text-muted-foreground" />}
                </div>
                <h3 className="text-sm font-medium mb-1">{placeholder}</h3>
                {description && (
                  <p className="text-xs text-muted-foreground mb-4">
                    {description}
                  </p>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpen(true)}
                  disabled={disabled || isLoading}
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    icon && <span className="mr-2">{icon}</span>
                  )}
                  {title}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <MediaPickerModal
          open={open}
          onClose={() => setOpen(false)}
          onSelect={handleSelect}
          filterFormat={filterFormat}
        />
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </p>
        </div>
      )}
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      <div className="space-y-3">
        {value ? (
          <div className="flex flex-col items-start gap-4 p-4 border rounded-lg bg-muted/20">
            {showPreview && (
              <div className=" rounded-md   flex-shrink-0">
                <MediaPreview url={value} small />
              </div>
            )}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium truncate">
                  {getFileName(value)}
                </p>
                {typeConfig && (
                  <Badge className={typeConfig.color}>
                    <TypeIcon className="h-3 w-3 mr-1" />
                    {typeConfig.label}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpen(true)}
                  disabled={disabled || isLoading}
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Sparkles className="h-4 w-4 mr-2" />
                  )}
                  Change
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                {allowRemove && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemove}
                    disabled={disabled}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-lg hover:border-primary/50 transition-colors">
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                {icon || <Upload className="h-6 w-6 text-muted-foreground" />}
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {placeholder}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(true)}
                disabled={disabled || isLoading}
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  icon && <span className="mr-2">{icon}</span>
                )}
                {title}
              </Button>
            </div>
          </div>
        )}
      </div>

      <MediaPickerModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={handleSelect}
        filterFormat={filterFormat}
      />
    </div>
  );
}
