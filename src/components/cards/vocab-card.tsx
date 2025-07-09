"use client"

import type { FC } from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Edit, Trash, BookOpen, Languages, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import type { VocabularyType } from "@/types/vocabs"
import { motion } from "framer-motion"

const VocabularyCard: FC<VocabularyType> = ({ id, title }) => {
  const router = useRouter()

  const handleDelete = async () => {}

  return (
    <div
      className="h-full"
    >
      <Card className="group relative overflow-hidden border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-500 h-full rounded-2xl min-h-[140px]">
        {/* Content */}
        <div className="relative p-5 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-lg shadow-emerald-500/25">
                <Languages className="w-4 h-4 text-white" />
              </div>
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 px-2.5 py-0.5 rounded-full font-semibold text-xs shadow-md shadow-emerald-500/25">
                Vocabulary
              </Badge>
            </div>
            <Sparkles className="w-4 h-4 text-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Title */}
          <div className="flex-1 mb-4">
            <h3 className="font-bold text-lg text-slate-800 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-300 leading-tight">
              {title}
            </h3>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <BookOpen className="w-3.5 h-3.5" />
              <span className="font-medium">Word Collection</span>
            </div>

            <div className="flex gap-1.5">
              <Button
                onClick={() => router.push(`/vocabs/${id}`)}
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 rounded-lg border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-300"
              >
                <Edit className="w-3.5 h-3.5" />
              </Button>
              <Button
                size="sm"
                onClick={handleDelete}
                className="h-8 w-8 p-0 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 rounded-lg shadow-md shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300"
              >
                <Trash className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default VocabularyCard
