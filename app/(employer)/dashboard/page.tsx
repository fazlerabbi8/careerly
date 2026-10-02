import { requireRole } from "@/lib/session";

export default async function DashboardPage() {
  const user = await requireRole("EMPLOYER");
  return (
    <>
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
    </>
  );
}
