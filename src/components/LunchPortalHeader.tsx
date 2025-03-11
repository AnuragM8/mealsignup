import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Calendar, User, LogIn, Menu, X } from "lucide-react";

interface LunchPortalHeaderProps {
  isLoggedIn?: boolean;
  username?: string;
  onLogin?: () => void;
  onLogout?: () => void;
}

const LunchPortalHeader = ({
  isLoggedIn = false,
  username = "Guest User",
  onLogin = () => console.log("Login clicked"),
  onLogout = () => console.log("Logout clicked"),
}: LunchPortalHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="w-full h-20 bg-background border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary rounded-md p-1.5">
            <Calendar className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold">Company Lunch Portal</h1>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        <Link
          to="/"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Home
        </Link>
        <Link
          to="/upcoming"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Upcoming Lunches
        </Link>
        <Link
          to="/my-registrations"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          My Registrations
        </Link>
        <Link
          to="/volunteer-signup"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Volunteer Signup
        </Link>
        {isLoggedIn && (
          <Link
            to="/admin/dashboard"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Admin
          </Link>
        )}
      </nav>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
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
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>My Registrations</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogIn className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button size="sm" onClick={onLogin}>
            Login
          </Button>
        )}

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bg-background border-b border-border z-20 py-4 px-6 flex flex-col gap-4">
          <Link
            to="/"
            className="text-sm font-medium py-2 hover:text-primary transition-colors"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/upcoming"
            className="text-sm font-medium py-2 hover:text-primary transition-colors"
            onClick={toggleMobileMenu}
          >
            Upcoming Lunches
          </Link>
          <Link
            to="/my-registrations"
            className="text-sm font-medium py-2 hover:text-primary transition-colors"
            onClick={toggleMobileMenu}
          >
            My Registrations
          </Link>
          <Link
            to="/volunteer-signup"
            className="text-sm font-medium py-2 hover:text-primary transition-colors"
            onClick={toggleMobileMenu}
          >
            Volunteer Signup
          </Link>
          {isLoggedIn && (
            <Link
              to="/admin/dashboard"
              className="text-sm font-medium py-2 hover:text-primary transition-colors"
              onClick={toggleMobileMenu}
            >
              Admin
            </Link>
          )}
          {!isLoggedIn && (
            <Button size="sm" onClick={onLogin} className="mt-2">
              Login
            </Button>
          )}
        </div>
      )}
    </header>
  );
};

export default LunchPortalHeader;
