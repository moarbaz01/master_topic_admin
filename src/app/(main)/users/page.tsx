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
import { Crown, Edit, Phone, RefreshCw, Search, Users } from "lucide-react";
import EditUserModal from "@/components/modals/edit-user-modal";
import PaginationControl from "@/components/pagination-control";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/ui/loader";
import { useDebounce } from "use-debounce";

export default function ManageUsersPage() {
  const [roleFilter, setRoleFilter] = useState("all");
  const [subscriptionFilter, setSubscriptionFilter] = useState("all");
  const [nameFilter, setNameFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");
  const [debounceName] = useDebounce(nameFilter, 300);
  const [debouncePhone] = useDebounce(phoneFilter, 300);
  const [page, setPage] = useState(1);
  const limit = 10;

  const [editUserModal, setEditUserModal] = useState(false);
  const [editedUser, setEditedUser] = useState<UserType | null>(null);

  const { data, isLoading } = useGetUsers({
    page,
    limit,
    name: debounceName,
    phone: debouncePhone,
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

  const getRoleBadge = (role: string) => {
    return role === "admin" ? (
      <Badge
        variant="default"
        className="bg-purple-100 text-purple-800 hover:bg-purple-100"
      >
        <Crown className="w-3 h-3 mr-1" />
        Admin
      </Badge>
    ) : (
      <Badge variant="outline">
        <Users className="w-3 h-3 mr-1" />
        User
      </Badge>
    );
  };

  const getSubscriptionBadge = (subscription: string) => {
    return subscription === "premium" ? (
      <Badge
        variant="default"
        className="bg-amber-100 text-amber-800 hover:bg-amber-100"
      >
        Premium
      </Badge>
    ) : (
      <Badge variant="outline">Basic</Badge>
    );
  };

  const clearFilters = () => {
    setRoleFilter("all");
    setSubscriptionFilter("all");
    setNameFilter("");
    setPhoneFilter("");
    setPage(1);
  };

  const activeFiltersCount = [
    roleFilter !== "all",
    subscriptionFilter !== "all",
    nameFilter !== "",
    phoneFilter !== "",
  ].filter(Boolean).length;

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              User Management
            </h1>
            <p className="text-muted-foreground">
              Manage and monitor your user base
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
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
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
          <Select
            value={roleFilter}
            onValueChange={(value) => {
              setPage(1);
              setRoleFilter(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={subscriptionFilter}
            onValueChange={(value) => {
              setPage(1);
              setSubscriptionFilter(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Subscription" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
            </SelectContent>
          </Select>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          )}
        </div>

        {/* Filters */}

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Index</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                   <Loader label="Loading users..."/>
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="w-8 h-8 text-muted-foreground" />
                      <p className="text-muted-foreground">No users found</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearFilters}
                      >
                        Clear filters
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user: UserType, index: number) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium ">{index + 1}</TableCell>
                    <TableCell>
                      <p className="font-medium">{user.name}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-muted-foreground">
                        {user.gender}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm">{user.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>
                      {getSubscriptionBadge(user.subscription)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() => handleEditUser(user)}
                        className=" transition text-white"
                        size="icon"
                      >
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
        user={editedUser as UserType}
        open={editUserModal}
        onClose={handleCloseUserEditModal}
      />
    </>
  );
}
