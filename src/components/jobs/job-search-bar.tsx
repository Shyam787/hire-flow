"use client";

import { Search, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function JobSearchBar() {
  return (
    <form
      className="
        w-full rounded-2xl border bg-background p-2 shadow-sm
        md:flex md:items-center
      "
    >
      {/* Job Title */}
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Job title, keyword, or skill"
          className="border-0 pl-11 shadow-none focus-visible:ring-0"
        />
      </div>

      {/* Divider */}
      <div className="mx-2 hidden h-8 w-px bg-border md:block" />

      {/* Location */}
      <div className="relative flex-1">
        <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Location"
          className="border-0 pl-11 shadow-none focus-visible:ring-0"
        />
      </div>

      {/* Button */}
      <Button
        type="submit"
        size="lg"
        className="mt-2 w-full md:ml-2 md:mt-0 md:w-auto"
      >
        Search Jobs
      </Button>
    </form>
  );
}