import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UploadProgressTable() {
  // Sample upload data - replace with real upload tracking
  const uploads = [
    { id: "1", fileName: "lecture1.mp4", progress: 45, speed: "2.4 MB/s" },
    { id: "2", fileName: "quiz1.png", progress: 80, speed: "1.1 MB/s" },
  ];

  if (uploads.length === 0) return null;

  return (
    <div className="rounded-md border mb-6">
      <div className="bg-gray-200 p-2 rounded-t-md">
        <h2 className="text-lg font-semibold">Uploads in Progress</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>File Name</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Speed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {uploads.map((upload) => (
            <TableRow key={upload.id}>
              <TableCell className="font-medium">{upload.fileName}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={upload.progress} className="w-[60%]" />
                  <span>{upload.progress}%</span>
                </div>
              </TableCell>
              <TableCell>{upload.speed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
