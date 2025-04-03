import { useState, useEffect } from "react";
import { RefreshCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { realtimeCollection } from "@/hooks/firestore-hook"; // Ensure this hook returns QuerySnapshot

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function SimplifiedUserView() {
  const { isEnglish } = useLanguage();
  const { data: querySnapshot, isLoading: isLoading } = realtimeCollection("users"); // Fetching QuerySnapshot
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Map QuerySnapshot to users
  useEffect(() => {
    if (querySnapshot) {
      const usersData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.username,
          email: data.email,
          role: data.role,
        };
      });
      setUsers(usersData);
    }
  }, [querySnapshot]);

  // Apply filters and search whenever users, searchQuery, or roleFilter changes
  useEffect(() => {
    let result = [...users];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (user) => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
      );
    }

    if (roleFilter !== "all") {
      result = result.filter((user) => user.role === roleFilter);
    }

    setFilteredUsers(result);
    setCurrentPage(1); // Reset to first page on filter change
  }, [users, searchQuery, roleFilter]);

  // Paginate users
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6">
      {/* Filters and actions */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder={isEnglish ? "Search users..." : "Rechercher des utilisateurs..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-gray-300"
        />

        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[200px] border-gray-300">
            <SelectValue placeholder={isEnglish ? "Filter by role" : "Filtrer par rôle"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{isEnglish ? "All Roles" : "Tous les rôles"}</SelectItem>
            <SelectItem value="Administrator">{isEnglish ? "Administrator" : "Administrateur"}</SelectItem>
            <SelectItem value="Manager">{isEnglish ? "Manager" : "Gestionnaire"}</SelectItem>
            <SelectItem value="Field Worker">{isEnglish ? "Field Worker" : "Ouvrier de terrain"}</SelectItem>
            <SelectItem value="Agronomist">{isEnglish ? "Agronomist" : "Agronome"}</SelectItem>
            <SelectItem value="Viewer">{isEnglish ? "Viewer" : "Spectateur"}</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => console.log("Refetch triggered (handled automatically by Firestore real-time listener)")}
          disabled={isLoading}
          className="border-gray-300"
        >
          <RefreshCcw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          {isEnglish ? "Refresh" : "Rafraîchir"}
        </Button>
      </div>

      {/* Users table */}
      <Card className="border-green-200 shadow-md" style={{ padding: 0 }}>
        <CardHeader className="border-b border-green-200 py-4 bg-green-50">
          <CardTitle>{isEnglish ? "User Management" : "Gestion des utilisateurs"}</CardTitle>
          <CardDescription>
            {isEnglish ? "View and manage all users in your system" : "Voir et gérer tous les utilisateurs de votre système"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-green-100">
                <TableHead>{isEnglish ? "Username" : "Nom d'utilisateur"}</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>{isEnglish ? "Role" : "Rôle"}</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    <RefreshCcw className="animate-spin text-gray-500" />
                    <span className="ml-2">{isEnglish ? "Loading users..." : "Chargement des utilisateurs..."}</span>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-100">
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge className="bg-gray-100 text-gray-800">{user.role}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Select value={String(pageSize)} onValueChange={(value) => setPageSize(Number(value))}>
          <SelectTrigger className="w-[100px] border-gray-300">
            <SelectValue placeholder="Page size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span>{`${currentPage} / ${totalPages}`}</span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
