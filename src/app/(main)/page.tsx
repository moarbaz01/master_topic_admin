"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import {
  Users,
  BookOpen,
  GraduationCap,
  FileText,
  DollarSign,
  TrendingUp,
  Star,
  Clock,
  Target,
  Award,
  RefreshCw,
  ArrowUpRight,
  Crown,
  Lightbulb,
  ImageIcon,
  Video,
  FileAudio,
  WholeWord,
} from "lucide-react";

// Mock data - replace with your actual data fetching
const mockData = {
  users: [
    {
      id: "1",
      role: "admin",
      subscription: "premium",
      phone: "+1234567890",
      name: "John Doe",
      gender: "Male",
    },
    {
      id: "2",
      role: "user",
      subscription: "basic",
      phone: "+1987654321",
      name: "Jane Smith",
      gender: "Female",
    },
    {
      id: "3",
      role: "user",
      subscription: "premium",
      phone: "+1122334455",
      name: "Mike Johnson",
      gender: "Male",
    },
    {
      id: "4",
      role: "user",
      subscription: "basic",
      phone: "+1555666777",
      name: "Sarah Wilson",
      gender: "Female",
    },
    {
      id: "5",
      role: "user",
      subscription: "premium",
      phone: "+1999888777",
      name: "David Brown",
      gender: "Male",
    },
  ],
  vocabularies: [
    { id: "1", title: "Business English" },
    { id: "2", title: "Medical Terms" },
    { id: "3", title: "Technology Vocabulary" },
  ],
  vocabularyWords: [
    {
      id: "1",
      section_id: "1",
      word: "Revenue",
      definition: "Income generated",
      image: null,
      audio: null,
    },
    {
      id: "2",
      section_id: "1",
      word: "Profit",
      definition: "Financial gain",
      image: null,
      audio: null,
    },
    {
      id: "3",
      section_id: "2",
      word: "Cardiac",
      definition: "Related to heart",
      image: "url",
      audio: "url",
    },
  ],
  quizzes: [
    {
      id: "1",
      title: "English Grammar Quiz",
      total_questions: 20,
      total_time: 30,
    },
    { id: "2", title: "Math Basics", total_questions: 15, total_time: 25 },
    { id: "3", title: "Science Quiz", total_questions: 25, total_time: 40 },
  ],
  courses: [
    {
      id: "1",
      title: "React Development",
      duration: 1200,
      level: "intermediate",
      category: "programming",
      rating: 4.8,
      price: 99,
      is_paid: true,
      is_new: false,
      total_lectures: 45,
      students_count: 1250,
      status: "published",
    },
    {
      id: "2",
      title: "UI/UX Design",
      duration: 800,
      level: "beginner",
      category: "design",
      rating: 4.6,
      price: 79,
      is_paid: true,
      is_new: true,
      total_lectures: 32,
      students_count: 890,
      status: "published",
    },
  ],
  media: [
    {
      id: "1",
      type: "image",
      name: "banner.jpg",
      url: "",
      size: 1024000,
      format: "jpg",
      tags: ["banner"],
    },
    {
      id: "2",
      type: "video",
      name: "intro.mp4",
      url: "",
      size: 5120000,
      format: "mp4",
      tags: ["intro"],
    },
    {
      id: "3",
      type: "audio",
      name: "pronunciation.mp3",
      url: "",
      size: 512000,
      format: "mp3",
      tags: ["audio"],
    },
  ],
  books: [
    {
      id: "1",
      title: "JavaScript Guide",
      description: "Complete JS guide",
      pdf_url: "",
      is_paid: true,
      price: 29,
    },
    {
      id: "2",
      title: "React Handbook",
      description: "React best practices",
      pdf_url: "",
      is_paid: false,
      price: 0,
    },
  ],
};

// Chart colors
const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
];

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("overview");

  // Calculate analytics
  const analytics = useMemo(() => {
    const totalUsers = mockData.users.length;
    const premiumUsers = mockData.users.filter(
      (u) => u.subscription === "premium"
    ).length;
    const adminUsers = mockData.users.filter((u) => u.role === "admin").length;

    const totalCourses = mockData.courses.length;
    const publishedCourses = mockData.courses.filter(
      (c) => c.status === "published"
    ).length;
    const totalStudents = mockData.courses.reduce(
      (sum, course) => sum + (course.students_count || 0),
      0
    );
    const totalRevenue = mockData.courses.reduce(
      (sum, course) => sum + (course.price || 0) * (course.students_count || 0),
      0
    );

    const totalQuizzes = mockData.quizzes.length;
    const totalQuestions = mockData.quizzes.reduce(
      (sum, quiz) => sum + quiz.total_questions,
      0
    );

    const totalVocabularies = mockData.vocabularies.length;
    const totalWords = mockData.vocabularyWords.length;
    const wordsWithMedia = mockData.vocabularyWords.filter(
      (w) => w.image || w.audio
    ).length;

    const totalMedia = mockData.media.length;
    const totalMediaSize = mockData.media.reduce(
      (sum, media) => sum + media.size,
      0
    );

    const totalBooks = mockData.books.length;
    const paidBooks = mockData.books.filter((b) => b.is_paid).length;

    return {
      users: {
        total: totalUsers,
        premium: premiumUsers,
        basic: totalUsers - premiumUsers,
        admin: adminUsers,
        premiumRate: (premiumUsers / totalUsers) * 100,
      },
      courses: {
        total: totalCourses,
        published: publishedCourses,
        students: totalStudents,
        revenue: totalRevenue,
        avgRating:
          mockData.courses.reduce((sum, c) => sum + (c.rating || 0), 0) /
          totalCourses,
      },
      quizzes: {
        total: totalQuizzes,
        questions: totalQuestions,
        avgQuestions: totalQuestions / totalQuizzes,
      },
      vocabularies: {
        total: totalVocabularies,
        words: totalWords,
        withMedia: wordsWithMedia,
        mediaRate: (wordsWithMedia / totalWords) * 100,
      },
      media: {
        total: totalMedia,
        size: totalMediaSize,
        avgSize: totalMediaSize / totalMedia,
      },
      books: {
        total: totalBooks,
        paid: paidBooks,
        free: totalBooks - paidBooks,
      },
    };
  }, []);

  // Chart data
  const userGrowthData = [
    { month: "Jan", users: 120, premium: 45 },
    { month: "Feb", users: 150, premium: 60 },
    { month: "Mar", users: 180, premium: 75 },
    { month: "Apr", users: 220, premium: 95 },
    { month: "May", users: 280, premium: 125 },
    { month: "Jun", users: 320, premium: 150 },
  ];

  const contentDistribution = [
    { name: "Courses", value: analytics.courses.total, color: COLORS[0] },
    { name: "Quizzes", value: analytics.quizzes.total, color: COLORS[1] },
    {
      name: "Vocabularies",
      value: analytics.vocabularies.total,
      color: COLORS[2],
    },
    { name: "Books", value: analytics.books.total, color: COLORS[3] },
  ];

  const revenueData = [
    { month: "Jan", revenue: 12500, courses: 8, students: 145 },
    { month: "Feb", revenue: 18200, courses: 12, students: 210 },
    { month: "Mar", revenue: 24800, courses: 15, students: 285 },
    { month: "Apr", revenue: 31200, courses: 18, students: 360 },
    { month: "May", revenue: 42500, courses: 22, students: 485 },
    { month: "Jun", revenue: 58900, courses: 28, students: 650 },
  ];

  const mediaTypeData = [
    { name: "Images", value: 45, color: COLORS[0] },
    { name: "Videos", value: 23, color: COLORS[1] },
    { name: "Audio", value: 18, color: COLORS[2] },
    { name: "Documents", value: 14, color: COLORS[3] },
  ];

  const formatFileSize = (bytes: number) => {
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Comprehensive overview of your platform performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Users
                </p>
                <p className="text-2xl font-bold">{analytics.users.total}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">
                    +12.5%
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(analytics.courses.revenue)}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">
                    +18.2%
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-600" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Courses
                </p>
                <p className="text-2xl font-bold">
                  {analytics.courses.published}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">
                    +8.1%
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-600" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Students
                </p>
                <p className="text-2xl font-bold">
                  {analytics.courses.students.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">
                    +24.3%
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs
        value={selectedMetric}
        onValueChange={setSelectedMetric}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>
                  Monthly user acquisition and premium conversions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stackId="1"
                      stroke={COLORS[0]}
                      fill={COLORS[0]}
                    />
                    <Area
                      type="monotone"
                      dataKey="premium"
                      stackId="1"
                      stroke={COLORS[1]}
                      fill={COLORS[1]}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Content Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Content Distribution</CardTitle>
                <CardDescription>
                  Breakdown of content types on your platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={contentDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {contentDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Quizzes
                    </p>
                    <p className="text-xl font-bold">
                      {analytics.quizzes.total}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <WholeWord className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Vocabulary Words
                    </p>
                    <p className="text-xl font-bold">
                      {analytics.vocabularies.words}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Digital Books
                    </p>
                    <p className="text-xl font-bold">{analytics.books.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Media Files</p>
                    <p className="text-xl font-bold">{analytics.media.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>User Analytics</CardTitle>
                <CardDescription>
                  Detailed breakdown of your user base
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">
                      {analytics.users.total}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <Crown className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-amber-600">
                      {analytics.users.premium}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Premium Users
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">
                      {analytics.users.premiumRate.toFixed(1)}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Premium Rate
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Premium Subscription Rate
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {analytics.users.premiumRate.toFixed(1)}%
                      </span>
                    </div>
                    <Progress
                      value={analytics.users.premiumRate}
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Admin Users</span>
                      <span className="text-sm text-muted-foreground">
                        {analytics.users.admin} of {analytics.users.total}
                      </span>
                    </div>
                    <Progress
                      value={
                        (analytics.users.admin / analytics.users.total) * 100
                      }
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Subscription breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-amber-600" />
                      <span className="font-medium">Premium</span>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800">
                      {analytics.users.premium}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span className="font-medium">Basic</span>
                    </div>
                    <Badge variant="secondary">{analytics.users.basic}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Admin</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {analytics.users.admin}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Overview</CardTitle>
                <CardDescription>Summary of all content types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-xl font-bold">
                      {analytics.courses.total}
                    </p>
                    <p className="text-sm text-muted-foreground">Courses</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Lightbulb className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-xl font-bold">
                      {analytics.quizzes.total}
                    </p>
                    <p className="text-sm text-muted-foreground">Quizzes</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <WholeWord className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-xl font-bold">
                      {analytics.vocabularies.total}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Vocabularies
                    </p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <BookOpen className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <p className="text-xl font-bold">{analytics.books.total}</p>
                    <p className="text-sm text-muted-foreground">Books</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Quality Metrics</CardTitle>
                <CardDescription>
                  Quality indicators for your content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Vocabulary Words with Media
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {analytics.vocabularies.mediaRate.toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={analytics.vocabularies.mediaRate}
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Published Courses
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {analytics.courses.published} of {analytics.courses.total}
                    </span>
                  </div>
                  <Progress
                    value={
                      (analytics.courses.published / analytics.courses.total) *
                      100
                    }
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Average Course Rating
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {analytics.courses.avgRating.toFixed(1)}/5.0
                    </span>
                  </div>
                  <Progress
                    value={(analytics.courses.avgRating / 5) * 100}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Questions
                    </p>
                    <p className="text-xl font-bold">
                      {analytics.quizzes.questions}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Avg Questions/Quiz
                    </p>
                    <p className="text-xl font-bold">
                      {analytics.quizzes.avgQuestions.toFixed(1)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Avg Course Rating
                    </p>
                    <p className="text-xl font-bold">
                      {analytics.courses.avgRating.toFixed(1)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>
                Track your platform's financial performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      formatCurrency(Number(value)),
                      name,
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke={COLORS[0]}
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Revenue
                    </p>
                    <p className="text-xl font-bold">
                      {formatCurrency(analytics.courses.revenue)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Paying Students
                    </p>
                    <p className="text-xl font-bold">
                      {analytics.courses.students.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Avg Revenue/Course
                    </p>
                    <p className="text-xl font-bold">
                      {formatCurrency(
                        analytics.courses.revenue / analytics.courses.total
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Crown className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Premium Revenue
                    </p>
                    <p className="text-xl font-bold">
                      {formatCurrency(analytics.courses.revenue * 0.7)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Media Type Distribution</CardTitle>
                <CardDescription>
                  Breakdown of media files by type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={mediaTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {mediaTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Storage Analytics</CardTitle>
                <CardDescription>
                  Media storage usage and statistics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <ImageIcon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-xl font-bold">45</p>
                    <p className="text-sm text-muted-foreground">Images</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Video className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-xl font-bold">23</p>
                    <p className="text-sm text-muted-foreground">Videos</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <FileAudio className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-xl font-bold">18</p>
                    <p className="text-sm text-muted-foreground">Audio</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <FileText className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <p className="text-xl font-bold">14</p>
                    <p className="text-sm text-muted-foreground">Documents</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Total Storage Used
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatFileSize(analytics.media.size)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Average File Size
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatFileSize(analytics.media.avgSize)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Files</span>
                    <span className="text-sm text-muted-foreground">
                      {analytics.media.total}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
