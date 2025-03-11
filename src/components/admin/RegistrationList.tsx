import React, { useState } from "react";
import { Search, Download, UserX, Mail } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";

interface Attendee {
  id: string;
  name: string;
  email: string;
  department: string;
  registeredAt: string;
  dietaryRestrictions?: string;
}

interface RegistrationListProps {
  eventId?: string;
  attendees?: Attendee[];
  onExport?: () => void;
  onCancelRegistration?: (attendeeId: string) => void;
}

const RegistrationList = ({
  eventId = "1",
  attendees = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@company.com",
      department: "Engineering",
      registeredAt: "2023-06-15T10:30:00Z",
      dietaryRestrictions: "Vegetarian",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@company.com",
      department: "Marketing",
      registeredAt: "2023-06-15T11:15:00Z",
      dietaryRestrictions: "Gluten-free",
    },
    {
      id: "3",
      name: "Michael Johnson",
      email: "michael.j@company.com",
      department: "Finance",
      registeredAt: "2023-06-15T09:45:00Z",
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah.w@company.com",
      department: "Human Resources",
      registeredAt: "2023-06-15T14:20:00Z",
      dietaryRestrictions: "Dairy-free",
    },
    {
      id: "5",
      name: "Robert Brown",
      email: "robert.b@company.com",
      department: "Sales",
      registeredAt: "2023-06-15T13:10:00Z",
    },
  ],
  onExport = () => console.log("Exporting attendee list"),
  onCancelRegistration = (id) =>
    console.log(`Cancelling registration for attendee ${id}`),
}: RegistrationListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredAttendees = attendees.filter(
    (attendee) =>
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.department.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleCancelRegistration = () => {
    if (selectedAttendee) {
      onCancelRegistration(selectedAttendee.id);
      setDialogOpen(false);
    }
  };

  const openCancelDialog = (attendee: Attendee) => {
    setSelectedAttendee(attendee);
    setDialogOpen(true);
  };

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Registration List</h2>
        <Button onClick={onExport} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export List
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by name, email, or department"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Table>
        <TableCaption>
          Total Registrations: {filteredAttendees.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Registered At</TableHead>
            <TableHead>Dietary Restrictions</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAttendees.length > 0 ? (
            filteredAttendees.map((attendee) => (
              <TableRow key={attendee.id}>
                <TableCell className="font-medium">{attendee.name}</TableCell>
                <TableCell>{attendee.email}</TableCell>
                <TableCell>{attendee.department}</TableCell>
                <TableCell>{formatDate(attendee.registeredAt)}</TableCell>
                <TableCell>{attendee.dietaryRestrictions || "None"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(`mailto:${attendee.email}`)}
                      title="Send Email"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openCancelDialog(attendee)}
                      title="Cancel Registration"
                    >
                      <UserX className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                No registrations found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Registration</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedAttendee && (
              <p>
                Are you sure you want to cancel the registration for{" "}
                <span className="font-semibold">{selectedAttendee.name}</span>?
                This action cannot be undone.
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleCancelRegistration}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegistrationList;
