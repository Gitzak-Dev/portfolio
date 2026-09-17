import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/adminAuth";
import { getAdminRelatedInsightOptions } from "@/lib/insightsRepository";
import { projects as canonicalProjects } from "@/data/projects";
import { publishBlogPost, unpublishBlogPost } from "../../actions";
import BlogEditForm from "../../BlogEditForm";
import styles from "../../../AdminDashboard.module.css";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!verifyAdminToken(token)) {
    redirect("/admin/login");
  }
}

export default async function AdminBlogEditPage({ params }: PageProps) {
  await requireAdmin();
  const { id } = await params;

  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) {
    redirect("/admin/blogs");
  }

  const isPublished = post.status === "published";
  const insightOptions = await getAdminRelatedInsightOptions(post.slug);
  const projectOptions = canonicalProjects.map((p) => ({ slug: p.slug, title: p.title }));

  return (
    <main className={styles.adminPage}>
      <header className={styles.header}>
        <div>
          <span>{`// ${isPublished ? "Edit Published Post" : "Edit Draft"}`}</span>
          <h1>{post.title || "Untitled"}</h1>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <a href="/admin/blogs" className={styles.clearButton}>Back to List</a>
          {!isPublished && (
            <form action={publishBlogPost}>
              <input type="hidden" name="id" value={post.id} />
              <button type="submit" data-cursor="dark" className={styles.editButton}>
                Publish
              </button>
            </form>
          )}
          {isPublished && (
            <form action={unpublishBlogPost}>
              <input type="hidden" name="id" value={post.id} />
              <button type="submit" data-cursor="dark" className={styles.unpublishButton}>
                Unpublish
              </button>
            </form>
          )}
          <form action="/api/admin/logout" method="POST">
            <button type="submit" data-cursor="dark">Logout</button>
          </form>
        </div>
      </header>

      <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
        <BlogEditForm
          initialPost={{
            id: post.id,
            title: post.title,
            slug: post.slug,
            category: post.category,
            description: post.description,
            standfirst: post.standfirst,
            contentJson: post.contentJson,
            faqsJson: post.faqsJson,
            sourcesJson: post.sourcesJson,
            relatedService: post.relatedService,
            relatedProjectsJson: post.relatedProjectsJson,
            relatedInsightsJson: post.relatedInsightsJson,
            seoTitle: post.seoTitle,
            seoDescription: post.seoDescription,
          }}
          isPublished={isPublished}
          excludeInsightSlug={post.slug}
          projectOptions={projectOptions}
          insightOptions={insightOptions}
        />
      </div>
    </main>
  );
}
