import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/adminAuth";
import BlogSubmissionsClient from "./BlogSubmissionsClient";
import styles from "../AdminDashboard.module.css";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type BlogPostItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: string;
  publishedAt: Date | null;
  contentUpdatedAt: Date | null;
  createdAt: Date;
};

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!verifyAdminToken(token)) {
    redirect("/admin/login");
  }
}

export default async function AdminBlogsPage() {
  await requireAdmin();

  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  const typedPosts = posts as unknown as BlogPostItem[];
  const draftCount = typedPosts.filter((p) => p.status === "draft").length;
  const publishedCount = typedPosts.filter((p) => p.status === "published").length;

  return (
    <main className={styles.adminPage}>
      <header className={styles.header}>
        <div>
          <span>// Blog Posts</span>
          <h1>Insights CMS</h1>
          <p>
            {typedPosts.length} total · {publishedCount} published · {draftCount} drafts
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <a href="/admin/blogs/new" data-cursor="dark" style={{ height: "46px", padding: "0 22px", border: "0", borderRadius: "999px", color: "#000", background: "var(--gold)", fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
            New Post
          </a>
          <a href="/admin" className={styles.clearButton}>
            Back to Dashboard
          </a>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" data-cursor="dark">Logout</button>
          </form>
        </div>
      </header>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span>Total</span>
          <strong>{typedPosts.length}</strong>
        </div>
        <div className={styles.statCard}>
          <span>Published</span>
          <strong>{publishedCount}</strong>
        </div>
        <div className={styles.statCard}>
          <span>Drafts</span>
          <strong>{draftCount}</strong>
        </div>
      </section>

      <BlogSubmissionsClient posts={typedPosts} />
    </main>
  );
}
