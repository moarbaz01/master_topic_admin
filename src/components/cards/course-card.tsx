import {
  BookOpen,
  Clock,
  Copy,
  Edit,
  Eye,
  MoreHorizontal,
  PlayCircle,
  Star,
  Trash2,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { CourseType } from "@/types/course";
import { useRouter } from "next/navigation";
import { useDeleteCourse } from "@/queries/course";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "published":
      return <Badge className="bg-green-100 text-green-800">Published</Badge>;
    case "draft":
      return <Badge variant="secondary">Draft</Badge>;
    case "archived":
      return <Badge variant="outline">Archived</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

const getLevelBadge = (level: string) => {
  const colors = {
    beginner: "bg-blue-100 text-blue-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-orange-100 text-orange-800",
    expert: "bg-red-100 text-red-800",
  };
  return (
    <Badge
      className={
        colors[level as keyof typeof colors] || "bg-gray-100 text-gray-800"
      }
    >
      {level}
    </Badge>
  );
};

export const CourseGridCard = ({ course }: { course: CourseType }) => {
  const router = useRouter();
  const deleteCourse = useDeleteCourse();
  return (
    <Card
      key={course.id}
      className="hover:shadow-lg transition-all duration-200"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div
            className="w-12 h-8 rounded flex items-center justify-center mb-2"
            style={{
              background: course.thumbnail_color
                ? `linear-gradient(135deg, ${course.thumbnail_color[0]}, ${course.thumbnail_color[1]})`
                : "linear-gradient(135deg, #3B82F6, #1E40AF)",
            }}
          >
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => router.push(`/courses/${course.id}`)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Course
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => deleteCourse.mutate(course.id)}
                className="text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {course.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          {getStatusBadge(course.status || "draft")}
          {course.level && getLevelBadge(course.level)}
          {course.is_new && (
            <Badge className="bg-green-100 text-green-800">New</Badge>
          )}
          {course.is_paid ? (
            <Badge className="bg-blue-100 text-blue-800">Paid</Badge>
          ) : (
            <Badge className="bg-gray-100 text-gray-800">Free</Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-1">
            <PlayCircle className="w-4 h-4 text-muted-foreground" />
            <span>{course.total_lectures} lectures</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{formatDuration(course.duration || 0)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span>{course.rating?.toFixed(1) || "0.0"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>{course.students_count || 0}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {course.original_price &&
              course.original_price > (course.price || 0) && (
                <span className="text-sm text-muted-foreground line-through">
                  ${course.original_price}
                </span>
              )}
            <span className="font-semibold">${course.price || 0}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const CourseListCard = ({ course }: { course: CourseType }) => {
  return (
    <Card
      key={course.id}
      className="hover:shadow-md  transition-all duration-200"
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-12 rounded flex items-center justify-center flex-shrink-0"
            style={{
              background: course.thumbnail_color
                ? `linear-gradient(135deg, ${course.thumbnail_color[0]}, ${course.thumbnail_color[1]})`
                : "linear-gradient(135deg, #3B82F6, #1E40AF)",
            }}
          >
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">
                  {course.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-1">
                  {course.description}
                </p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {getStatusBadge(course.status || "draft")}
                  {course.level && getLevelBadge(course.level)}
                  {course.is_new && (
                    <Badge className="bg-green-100 text-green-800">New</Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <PlayCircle className="w-4 h-4" />
                    {course.total_lectures} lectures
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {formatDuration(course.duration || 0)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    {course.rating?.toFixed(1) || "0.0"}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {course.students_count || 0}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${course.price || 0}</div>
                  {course.original_price &&
                    course.original_price > (course.price || 0) && (
                      <div className="text-sm text-muted-foreground line-through">
                        ${course.original_price}
                      </div>
                    )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Course
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
