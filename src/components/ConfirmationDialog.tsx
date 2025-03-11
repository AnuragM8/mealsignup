import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { CalendarCheck, AlertCircle } from "lucide-react";

interface ConfirmationDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  eventTitle?: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ConfirmationDialog = ({
  open = true,
  onOpenChange = () => {},
  eventTitle = "Italian Pasta Day",
  eventDate = "June 15, 2023",
  eventTime = "12:00 PM",
  eventLocation = "Main Cafeteria",
  onConfirm = () => console.log("Registration confirmed"),
  onCancel = () => console.log("Registration cancelled"),
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <CalendarCheck className="h-5 w-5 text-primary" />
            Confirm Registration
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-muted/50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-lg mb-2">{eventTitle}</h3>
            <div className="space-y-1 text-sm">
              <p className="flex items-center gap-2">
                <span className="font-medium">Date:</span> {eventDate}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Time:</span> {eventTime}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Location:</span> {eventLocation}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>
              By confirming, you are registering for this lunch event. Please
              cancel your registration at least 24 hours in advance if you
              cannot attend.
            </p>
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm Registration</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
