import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";

import { requireUser } from "@/lib/auth-user";
import { prisma } from "@/lib/prisma";
import { PageContainer } from "@/components/shared/page-container";
import { PendingLink } from "@/components/shared/pending-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function ApplicantProfilePage({ params }: { params: Promise<{ id: string; applicationId: string }> }) {
  const user = await requireUser();
  if (user.role !== "EMPLOYER") redirect("/dashboard");
  const { id, applicationId } = await params;
  const application = await prisma.application.findFirst({ where: { id: applicationId, jobId: id, status: { not: "WITHDRAWN" }, job: { company: { ownerId: user.id } } }, include: { user: true, job: { include: { company: true } } } });
  if (!application) notFound();
  const candidate = application.user;
  return <PageContainer className="py-10"><Button variant="ghost" asChild><PendingLink href={`/dashboard/employer/jobs/${id}/applicants`}><ArrowLeft />Back to applicants</PendingLink></Button>
    <header className="mt-5 flex items-start gap-4 border-b pb-7"><div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">{(candidate.firstName ?? candidate.name ?? candidate.email).charAt(0).toUpperCase()}</div><div><p className="text-sm text-muted-foreground">Applied for {application.job.title}</p><h1 className="mt-1 text-3xl font-bold">{candidate.name ?? candidate.email}</h1><div className="mt-2 flex gap-2"><Badge variant="secondary">{application.status.toLowerCase()}</Badge>{candidate.lookingForJob && <Badge>Open to work</Badge>}</div></div></header>
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]"><div className="space-y-6"><Section title="Professional summary"><p className="whitespace-pre-line text-muted-foreground">{candidate.bio ?? "No summary provided."}</p></Section><Section title="Skills"><div className="flex flex-wrap gap-2">{candidate.skills.length ? candidate.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>) : <p className="text-muted-foreground">No skills provided.</p>}</div></Section><Section title="Application"><p className="whitespace-pre-line text-muted-foreground">{application.coverLetter ?? "No cover letter provided."}</p></Section></div>
    <aside className="space-y-6"><Section title="Details"><dl className="space-y-3 text-sm"><Item label="Email" value={candidate.email} /><Item label="Phone" value={candidate.phone} /><Item label="Location" value={candidate.location} /><Item label="Current title" value={candidate.currentJobTitle} /><Item label="Experience" value={candidate.yearsExperience != null ? `${candidate.yearsExperience} years` : null} /><Item label="Education" value={[candidate.degree, candidate.college].filter(Boolean).join(", ")} /></dl></Section><Section title="Links"><div className="space-y-2">{application.resumeUrl || candidate.resumeUrl ? <Button variant="outline" className="w-full" asChild><Link href={application.resumeUrl ?? candidate.resumeUrl!} target="_blank"><Download />Resume</Link></Button> : null}{candidate.linkedinUrl && <Button variant="outline" className="w-full" asChild><Link href={candidate.linkedinUrl} target="_blank"><ExternalLink />LinkedIn</Link></Button>}{candidate.portfolioUrl && <Button variant="outline" className="w-full" asChild><Link href={candidate.portfolioUrl} target="_blank"><ExternalLink />Portfolio</Link></Button>}</div></Section></aside></div>
  </PageContainer>;
}
function Section({ title, children }: { title: string; children: React.ReactNode }) { return <section className="rounded-lg border bg-card p-6"><h2 className="mb-4 text-xl font-semibold">{title}</h2>{children}</section>; }
function Item({ label, value }: { label: string; value: string | null | undefined }) { return <div className="flex justify-between gap-4"><dt className="text-muted-foreground">{label}</dt><dd className="text-right font-medium">{value || "Not provided"}</dd></div>; }
