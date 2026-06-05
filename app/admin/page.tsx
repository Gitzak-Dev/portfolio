import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/adminAuth";
import AdminSubmissionsClient from "./AdminSubmissionsClient";
import styles from "./AdminDashboard.module.css";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AdminPageProps = {
  searchParams?: Promise<{
    q?: string;
    status?: string;
  }>;
};

export type ContactSubmissionItem = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: Date;
};

const statusOptions = ["all", "new", "read", "replied"] as const;
type StatusFilter = (typeof statusOptions)[number];

const editableStatuses = ["new", "read", "replied"] as const;
type EditableStatus = (typeof editableStatuses)[number];

function normalizeStatusFilter(status?: string): StatusFilter {
  if (statusOptions.includes(status as StatusFilter)) {
    return status as StatusFilter;
  }

  return "all";
}

function normalizeEditableStatus(status?: string): EditableStatus | null {
  if (editableStatuses.includes(status as EditableStatus)) {
    return status as EditableStatus;
  }

  return null;
}

function buildAdminUrl(status: StatusFilter, query: string) {
  const params = new URLSearchParams();

  if (status !== "all") {
    params.set("status", status);
  }

  if (query) {
    params.set("q", query);
  }

  const queryString = params.toString();

  return queryString ? `/admin?${queryString}` : "/admin";
}

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!verifyAdminToken(token)) {
    redirect("/admin/login");
  }
}

async function updateSubmissionStatus(formData: FormData) {
  "use server";

  await requireAdmin();

  const id = String(formData.get("id") || "").trim();
  const status = normalizeEditableStatus(String(formData.get("status") || ""));

  if (!id || !status) return;

  await prisma.contactSubmission.updateMany({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin");
}

async function deleteSubmission(formData: FormData) {
  "use server";

  await requireAdmin();

  const id = String(formData.get("id") || "").trim();

  if (!id) return;

  await prisma.contactSubmission.deleteMany({
    where: { id },
  });

  revalidatePath("/admin");
}

export default async function AdminDashboardPage({
  searchParams,
}: AdminPageProps) {
  await requireAdmin();

  const params = searchParams ? await searchParams : {};
  const query = String(params?.q || "").trim();
  const activeStatus = normalizeStatusFilter(params?.status);

  const andFilters: any[] = [];

  if (query) {
    andFilters.push({
      OR: [
        {
          name: {
            contains: query,
          },
        },
        {
          email: {
            contains: query,
          },
        },
        {
          message: {
            contains: query,
          },
        },
      ],
    });
  }

  if (activeStatus !== "all") {
    andFilters.push({
      status: activeStatus,
    });
  }

  const where =
    andFilters.length > 0
      ? {
          AND: andFilters,
        }
      : undefined;

  const [submissions, totalCount, newCount, readCount, repliedCount] =
    await prisma.$transaction([
      prisma.contactSubmission.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.contactSubmission.count(),
      prisma.contactSubmission.count({
        where: {
          status: "new",
        },
      }),
      prisma.contactSubmission.count({
        where: {
          status: "read",
        },
      }),
      prisma.contactSubmission.count({
        where: {
          status: "replied",
        },
      }),
    ]);

  const typedSubmissions = submissions as ContactSubmissionItem[];

  return (
    <main className={styles.adminPage}>
      <header className={styles.header}>
        <div>
          <span>// Admin Panel</span>

          <h1>Contact Submissions</h1>

          <p>
            {typedSubmissions.length} showing · {totalCount} total messages
          </p>
        </div>

        <form action="/api/admin/logout" method="POST">
          <button type="submit" data-cursor="dark">
            Logout
          </button>
        </form>
      </header>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span>Total</span>
          <strong>{totalCount}</strong>
        </div>

        <div className={styles.statCard}>
          <span>New</span>
          <strong>{newCount}</strong>
        </div>

        <div className={styles.statCard}>
          <span>Read</span>
          <strong>{readCount}</strong>
        </div>

        <div className={styles.statCard}>
          <span>Replied</span>
          <strong>{repliedCount}</strong>
        </div>
      </section>

      <section className={styles.toolbar}>
        <form className={styles.searchForm} action="/admin" method="GET">
          {activeStatus !== "all" && (
            <input type="hidden" name="status" value={activeStatus} />
          )}

          <div className={styles.searchBox}>
            <span>Search</span>

            <input
              type="search"
              name="q"
              placeholder="Search by name, email, or message..."
              defaultValue={query}
            />
          </div>

          <button type="submit" data-cursor="dark">
            Search
          </button>

          {(query || activeStatus !== "all") && (
            <a href="/admin" className={styles.clearButton}>
              Clear
            </a>
          )}
        </form>

        <div className={styles.filterTabs}>
          {statusOptions.map((status) => (
            <a
              key={status}
              href={buildAdminUrl(status, query)}
              className={activeStatus === status ? styles.activeFilter : ""}
            >
              {status}
            </a>
          ))}
        </div>
      </section>

      <AdminSubmissionsClient
        submissions={typedSubmissions}
        updateSubmissionStatus={updateSubmissionStatus}
        deleteSubmission={deleteSubmission}
      />
    </main>
  );
}