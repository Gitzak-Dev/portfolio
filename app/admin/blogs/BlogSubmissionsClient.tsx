"use client";

import { useState } from "react";
import { deleteDraftBlogPostById, unpublishBlogPostById } from "./actions";
import styles from "../AdminDashboard.module.css";

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

type BlogSubmissionsClientProps = {
  posts: BlogPostItem[];
};

export default function BlogSubmissionsClient({ posts }: BlogSubmissionsClientProps) {
  const [deleteTarget, setDeleteTarget] = useState<BlogPostItem | null>(null);
  const [unpublishTarget, setUnpublishTarget] = useState<BlogPostItem | null>(null);
  const [submitting, setSubmitting] = useState<string | null>(null);

  const closeDeleteModal = () => setDeleteTarget(null);
  const closeUnpublishModal = () => setUnpublishTarget(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setSubmitting(deleteTarget.id);
    const result = await deleteDraftBlogPostById(deleteTarget.id);
    setSubmitting(null);
    closeDeleteModal();
    if (result?.success) window.location.reload();
  };

  const handleUnpublish = async () => {
    if (!unpublishTarget) return;
    setSubmitting(unpublishTarget.id);
    const result = await unpublishBlogPostById(unpublishTarget.id);
    setSubmitting(null);
    closeUnpublishModal();
    if (result?.success) window.location.reload();
  };

  return (
    <>
      <section className={styles.submissionsGrid}>
        {posts.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>No blog posts yet.</h2>
            <p>Create your first insight article.</p>
          </div>
        ) : (
          posts.map((post) => (
            <article key={post.id} className={styles.submissionCard}>
              <div className={styles.cardTop}>
                <div>
                  <span className={`${styles.statusBadge} ${post.status === "published" ? styles.newBadge : styles.readBadge}`}>
                    {post.status}
                  </span>
                  <h2>{post.title}</h2>
                  <span style={{ color: "rgba(255,255,255,0.44)", fontSize: "0.82rem" }}>{post.category}</span>
                </div>
                <time style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                  {post.publishedAt
                    ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(post.publishedAt))
                    : "—"}
                </time>
              </div>

              <div className={styles.cardActions}>
                <a
                  href={`/admin/blogs/${post.id}/edit`}
                  className={styles.viewButton}
                  data-cursor="dark"
                >
                  Edit
                </a>
                {post.status === "published" && (
                  <button
                    type="button"
                    onClick={() => setUnpublishTarget(post)}
                    data-cursor="dark"
                    style={{ background: "rgba(255,193,7,0.15)", color: "#ffc107", border: "1px solid rgba(255,193,7,0.3)", borderRadius: "999px", height: "42px", padding: "0 17px", fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.62rem", fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer" }}
                  >
                    Unpublish
                  </button>
                )}
                {post.status === "draft" && (
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => setDeleteTarget(post)}
                    data-cursor="dark"
                  >
                    Delete
                  </button>
                )}
              </div>

              <div style={{ marginTop: "12px" }}>
                <a href={`/insights/${post.slug}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", fontSize: "0.82rem", textDecoration: "none" }}>
                  View public article →
                </a>
              </div>
            </article>
          ))
        )}
      </section>

      {deleteTarget && (
        <div className={styles.modalBackdrop} onClick={closeDeleteModal}>
          <div className={styles.deleteModal} onClick={(event) => event.stopPropagation()}>
            <span>// Delete Confirmation</span>
            <h2>Delete this draft?</h2>
            <p>
              This will permanently remove &quot;<strong>{deleteTarget.title}</strong>&quot;. This action cannot be undone.
            </p>
            <div className={styles.deleteModalActions}>
              <button type="button" onClick={closeDeleteModal}>Cancel</button>
              <button
                type="button"
                className={styles.confirmDeleteButton}
                data-cursor="dark"
                onClick={handleDelete}
                disabled={submitting === deleteTarget.id}
              >
                {submitting === deleteTarget.id ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {unpublishTarget && (
        <div className={styles.modalBackdrop} onClick={closeUnpublishModal}>
          <div className={styles.detailModal} onClick={(event) => event.stopPropagation()} style={{ width: "min(100%, 480px)" }}>
            <div className={styles.modalTop}>
              <div>
                <span>// Confirm Unpublish</span>
                <h2>Unpublish &quot;{unpublishTarget.title}&quot;?</h2>
              </div>
              <button type="button" onClick={closeUnpublishModal} className={styles.closeModalButton}>×</button>
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", marginTop: "16px", fontFamily: "var(--font-plus-jakarta), sans-serif", lineHeight: "1.6" }}>
              The article will become inaccessible publicly. The published date will be preserved for when it is republished.
            </p>
            <div className={styles.modalActions}>
              <button type="button" onClick={closeUnpublishModal}>Cancel</button>
              <button
                type="button"
                onClick={handleUnpublish}
                data-cursor="dark"
                disabled={submitting === unpublishTarget.id}
                style={{ background: "var(--gold)", color: "#000", border: "0", borderRadius: "999px", height: "44px", padding: "0 18px", fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.62rem", fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", cursor: submitting === unpublishTarget.id ? "not-allowed" : "pointer" }}
              >
                {submitting === unpublishTarget.id ? "Unpublishing..." : "Unpublish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
