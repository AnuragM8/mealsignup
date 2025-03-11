import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Home,
  Settings,
  PlusCircle,
  Users,
  Calendar,
  LogOut,
} from "lucide-react";

interface AdminHeaderProps {
  username?: string;
  onLogout?: () => void;
}

const AdminHeader = ({
  username = "Admin User",
  onLogout = () => console.log("Logout clicked"),
}: AdminHeaderProps) => {
  return (
    <header className="w-full h-20 bg-background border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <div className="bg-primary rounded-md p-1.5">
            <Calendar className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold">Lunch Admin</h1>
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-6">
        <Link
          to="/admin/dashboard"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/events"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Events
        </Link>
        <Link
          to="/admin/registrations"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Registrations
        </Link>
        <Link
          to="/"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          View Portal
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          className="hidden md:flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          New Event
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <span className="text-sm font-medium">
                  {username.charAt(0)}
                </span>
              </div>
              <span className="hidden md:inline-block">{username}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Home className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Events</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              <span>Registrations</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;
