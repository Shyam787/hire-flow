"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LoaderCircle, Search, MapPin, RotateCcw } from "lucide-react";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobFiltersProps {
  defaultQuery?: string;
  defaultLocation?: string;
  defaultEmploymentType?: string;
  defaultExperienceLevel?: string;
  defaultSort?: string;
}

export function JobFilters({
  defaultQuery = "",
  defaultLocation = "",
  defaultEmploymentType = "all",
  defaultExperienceLevel = "all",
  defaultSort = "latest",
}: JobFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState(defaultQuery);
  const [location, setLocation] = useState(defaultLocation);
  const [employmentType, setEmploymentType] = useState(
    defaultEmploymentType
  );
  const [sort, setSort] = useState(defaultSort);
  const [experienceLevel, setExperienceLevel] = useState(defaultExperienceLevel);

  function applyFilters() {
    const params = new URLSearchParams(searchParams.toString());

    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }

    if (location.trim()) {
      params.set("location", location.trim());
    } else {
      params.delete("location");
    }

    if (employmentType !== "all") {
      params.set("employmentType", employmentType);
    } else {
      params.delete("employmentType");
    }

    if (sort !== "latest") {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }

    if (experienceLevel !== "all") params.set("experienceLevel", experienceLevel);
    else params.delete("experienceLevel");

    params.delete("page");

    startTransition(() => {
      router.push(`/jobs?${params.toString()}`);
    });
  }

  function resetFilters() {
    setQuery("");
    setLocation("");
    setEmploymentType("all");
    setSort("latest");
    setExperienceLevel("all");

    startTransition(() => {
      router.push("/jobs");
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        applyFilters();
      }}
      className="rounded-2xl border bg-background p-4 shadow-sm"
    >
      <div className="grid gap-4 lg:grid-cols-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Job title, company, skill..."
            className="pl-10"
          />
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="pl-10"
          />
        </div>

        <Select
          value={employmentType}
          onValueChange={setEmploymentType}
        >
          <SelectTrigger className="h-10 w-full">
            <SelectValue placeholder="Employment Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Part-time">Part-time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
            <SelectItem value="Internship">Internship</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={experienceLevel}
          onValueChange={setExperienceLevel}
        >
          <SelectTrigger className="h-10 w-full">
            <SelectValue placeholder="Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Experience</SelectItem>
            <SelectItem value="Entry-level">Entry-level</SelectItem>
            <SelectItem value="Mid-level">Mid-level</SelectItem>
            <SelectItem value="Senior-level">Senior-level</SelectItem>
            <SelectItem value="Lead">Lead</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sort}
          onValueChange={setSort}
        >
          <SelectTrigger className="h-10 w-full">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="title-asc">Title (A-Z)</SelectItem>
            <SelectItem value="title-desc">Title (Z-A)</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button type="submit" className="flex-1" disabled={isPending}>
            {isPending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
            Search
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={resetFilters}
            disabled={isPending}
            aria-label="Reset filters"
          >
            {isPending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </form>
  );
}
