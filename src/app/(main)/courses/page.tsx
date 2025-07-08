"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, BookOpen, Grid3X3, List } from "lucide-react";
import { CourseGridCard, CourseListCard } from "@/components/cards/course-card";
import { useRouter } from "next/navigation";
import { useCourses } from "@/queries/course";
import { useDebounce } from "use-debounce";
import PaginationControl from "@/components/pagination-control";
import Loader from "@/components/ui/loader";

const levels = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];

const statuses = [
  { value: "all", label: "All Status" },
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

export default function CoursesList() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [titleSearch, setTitleSearch] = useState("");
  const [titleSearchDebounce] = useDebounce(titleSearch, 200);
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created_at");
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { data: coursesData, isLoading: coursesLoading } = useCourses({
    level: levelFilter,
    limit: 10,
    page,
    status: statusFilter,
    title: titleSearchDebounce,
    sort: sortBy,
  });
  const courses = coursesData?.data ?? [];
  const total = coursesData?.count ?? 0;

  return (
    <div className="max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
          <p className="text-muted-foreground">
            Manage and track your course portfolio
          </p>
        </div>
        <Button
          onClick={() => router.push("/courses/new")}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create New Course
        </Button>
      </div>

      {/* <CoursesStatus /> */}

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <CardTitle className="text-lg">Filters</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Tabs
                value={viewMode}
                onValueChange={(value: any) => setViewMode(value)}
              >
                <TabsList className="grid w-full md:grid-cols-2">
                  <TabsTrigger value="grid" className="flex items-center gap-1">
                    <Grid3X3 className="w-4 h-4" />
                    Grid
                  </TabsTrigger>
                  <TabsTrigger value="list" className="md:flex hidden items-center gap-1">
                    <List className="w-4 h-4" />
                    List
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-10"
                value={titleSearch}
                onChange={(e) => setTitleSearch(e.target.value)}
              />
            </div>

            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at">Date Created</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                {/* <SelectItem value="students_count">Students</SelectItem> */}
                {/* <SelectItem value="rating">Rating</SelectItem> */}
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseGridCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <CourseListCard key={course.id} course={course} />
          ))}
        </div>
      )}

      {coursesLoading ? (
        <Loader label="Courses Loading" />
      ) : (
        courses.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-4">
                {titleSearch || levelFilter !== "all" || statusFilter !== "all"
                  ? "Try adjusting your filters to see more courses"
                  : "Get started by creating your first course"}
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create New Course
              </Button>
            </CardContent>
          </Card>
        )
      )}

      {courses.length !== 0 && (
        <PaginationControl
          onPageChange={setPage}
          page={page}
          total={total}
          limit={10}
        />
      )}
    </div>
  );
}

// const CoursesStatus = () => {
//   const [courses] = useState<CourseType[]>(mockCourses);

//   const totalStudents = courses.reduce(
//     (sum, course) => sum + (course.students_count || 0),
//     0
//   );
//   const publishedCourses = courses.filter(
//     (course) => course.status === "published"
//   ).length;
//   const totalRevenue = courses.reduce(
//     (sum, course) => sum + (course.price || 0) * (course.students_count || 0),
//     0
//   );
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//       <Card>
//         <CardContent className="p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">
//                 Total Courses
//               </p>
//               <p className="text-2xl font-bold">{courses.length}</p>
//             </div>
//             <BookOpen className="w-8 h-8 text-muted-foreground" />
//           </div>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardContent className="p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">
//                 Published
//               </p>
//               <p className="text-2xl font-bold">{publishedCourses}</p>
//             </div>
//             <TrendingUp className="w-8 h-8 text-green-600" />
//           </div>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardContent className="p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">
//                 Total Students
//               </p>
//               <p className="text-2xl font-bold">
//                 {totalStudents.toLocaleString()}
//               </p>
//             </div>
//             <Users className="w-8 h-8 text-blue-600" />
//           </div>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardContent className="p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">
//                 Revenue
//               </p>
//               <p className="text-2xl font-bold">
//                 ${totalRevenue.toLocaleString()}
//               </p>
//             </div>
//             <DollarSign className="w-8 h-8 text-amber-600" />
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };
