import { ModeToggle } from "@/components/theme/mode-toggle";
import { Routes, Route, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Package2 } from "lucide-react";
import Homepage from "@/pages/app/user/home";
import MultiStepFormRoutes from "./job";

const User = () => {
  // const location = useLocation();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            href="#"
            to={"/"}
            className="text-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
        </nav>
        <div className="flex w-full justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <ModeToggle />
        </div>
      </header>
      <main className="flex-1 items-start p-4 sm:px-6 sm:py-6">
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/jobs/applicationForm/personalInfo/:jobId" element={<Homepage />} /> */}
          <Route
            path="/jobs/applicationForm/*"
            element={<MultiStepFormRoutes />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default User;
