import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken } from "@/lib/adminAuth";
import BlogPostForm from "../BlogPostForm";
import styles from "../../AdminDashboard.module.css";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!verifyAdminToken(token)) {
    redirect("/admin/login");
  }
}

export default async function AdminBlogNewPage() {
  await requireAdmin();

  return (
    <main className={styles.adminPage}>
      <header className={styles.header}>
        <div>
          <span>{'// New Blog Post'}</span>
          <h1>Create Insight</h1>
        </div>
        <a href="/admin/blogs" className={styles.clearButton}>
          Back to List
        </a>
      </header>

      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <BlogPostForm />
      </div>
    </main>
  );
}
