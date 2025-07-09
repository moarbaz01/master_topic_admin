"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Edit, HelpCircle, Trash, Zap, Target } from "lucide-react";
import type { QuizType } from "@/types/quiz";
import { useRouter } from "next/navigation";

const QuizCard = ({
  id,
  title,
  total_questions,
  total_time,
  handleDelete,
}: QuizType & { handleDelete: () => void }) => {
  const router = useRouter();

  return (
    <div className="h-full">
      <Card className="group relative overflow-hidden  bg-white border hover:shadow-sm transition-all duration-500 h-full rounded-2xl">
        {/* Header Section */}
        <div className="relative p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-red-400 to-primary/50 rounded-xl shadow-lg shadow-violet-500/25">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <Badge className="bg-gradient-to-r from-red-400 to-primary/50 text-white border-0 px-3 py-1 rounded-full font-semibold text-xs shadow-lg shadow-primary/25">
                Quiz Challenge
              </Badge>
            </div>
          </div>

          <h3 className="font-bold text-xl text-slate-800 line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300 mb-4">
            {title}
          </h3>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100/50 group-hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                  Questions
                </span>
              </div>
              <p className="text-2xl font-bold text-emerald-800">
                {total_questions}
              </p>
            </div>

            <div className="relative p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100/50 group-hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                  Duration
                </span>
              </div>
              <p className="text-2xl font-bold text-amber-800">
                {total_time}
                <span className="text-sm font-medium ml-1">min</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="relative px-6 pb-6">
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Est. {total_time} minutes</span>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => router.push(`/quizzes/${id}`)}
                size="sm"
                variant="outline"
                className="h-10 w-10 p-0 rounded-xl border-2 border-slate-200 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600 transition-all duration-300"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                onClick={handleDelete}
                className="h-10 w-10 p-0 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 rounded-xl shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QuizCard;
