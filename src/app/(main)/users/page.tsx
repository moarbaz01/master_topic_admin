"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetUsers } from "@/queries/user";
import { UserType } from "@/types/user";
import { useState } from "react";
import { Edit, Search } from "lucide-react";
import EditUserModal from "@/components/modals/edit-user-modal";
import PaginationControl from "@/components/pagination-control";

export default function ManageUsersPage() {
  const [roleFilter, setRoleFilter] = useState("all");
  const [subscriptionFilter, setSubscriptionFilter] = useState("all");
  const [nameFilter, setNameFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const [editUserModal, setEditUserModal] = useState(false);
  const [editedUser, setEditedUser] = useState<UserType | null>(null);

  const { data, isLoading } = useGetUsers({
    page,
    limit,
    name: nameFilter,
    phone: phoneFilter,
    role: roleFilter !== "all" ? roleFilter : undefined,
    subscription: subscriptionFilter !== "all" ? subscriptionFilter : undefined,
  });

  const users = data?.data || [];
  const count = data?.count || 0;

  const handleEditUser = (user: UserType) => {
    setEditedUser(user);
    setEditUserModal(true);
  };

  const handleCloseUserEditModal = () => {
    setEditedUser(null);
    setEditUserModal(false);
  };

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Manage Users</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Filter by Name
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                className="pl-10"
                value={nameFilter}
                onChange={(e) => {
                  setPage(1);
                  setNameFilter(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Filter by Phone
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by phone..."
                className="pl-10"
                value={phoneFilter}
                onChange={(e) => {
                  setPage(1);
                  setPhoneFilter(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Filter by Role
            </label>
            <Select
              value={roleFilter}
              onValueChange={(value) => {
                setPage(1);
                setRoleFilter(value);
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Filter by Subscription
            </label>
            <Select
              value={subscriptionFilter}
              onValueChange={(value) => {
                setPage(1);
                setSubscriptionFilter(value);
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6}>Loading...</TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>No users found</TableCell>
                </TableRow>
              ) : (
                users.map((user: UserType) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-semibold">{user.name}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.subscription}</TableCell>
                    <TableCell className="space-x-4">
                      <Button onClick={() => handleEditUser(user)} size="icon">
                        <Edit />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <PaginationControl
          page={page}
          limit={limit}
          total={count} // from useGetUsers
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>

      {/* Edit Modal */}
      <EditUserModal
        user={editedUser}
        open={editUserModal}
        onClose={handleCloseUserEditModal}
      />
    </>
  );
}
