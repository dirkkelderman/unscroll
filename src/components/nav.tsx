import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays, Upload, User } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 h-14">
        <div className="flex items-center space-x-4">
          <Link href="/feed">
            <Button variant="ghost">
              <CalendarDays className="h-4 w-4 mr-2" />
              Memory Feed
            </Button>
          </Link>

          <Link href="/upload">
            <Button variant="ghost">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </Link>

          <Link href="/account">
            <Button variant="ghost">
              <User className="h-4 w-4 mr-2" />
              Account
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
