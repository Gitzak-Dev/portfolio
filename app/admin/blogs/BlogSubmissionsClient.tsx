"use client";

import { useState } from "react";
import {
  deleteDraftBlogPostById,
  unpublishBlogPostById,
  publishBlogPostById,
} from "./actions";
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

export default function BlogSubmissionsClient({
  posts,
}: BlogSubmissionsClientProps) {
  const [deleteTarget, setDeleteTarget] = useState<BlogPostItem | null>(null);
  const [unpublishTarget, setUnpublishTarget] =
    useState<BlogPostItem | null>(null);
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);

  const closeDeleteModal = () => {
    setDeleteTarget(null);
    setModalError(null);
  };
  const closeUnpublishModal = () => {
    setUnpublishTarget(null);
    setModalError(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setModalError(null);
    setSubmitting(deleteTarget.id);
    const result = await deleteDraftBlogPostById(deleteTarget.id);
    setSubmitting(null);
    if (result?.success) {
      closeDeleteModal();
      window.location.reload();
    } else {
      setModalError(result?.error ?? "Failed to delete.");
    }
  };

  const handleUnpublish = async () => {
    if (!unpublishTarget) return;
    setModalError(null);
    setSubmitting(unpublishTarget.id);
    const result = await unpublishBlogPostById(unpublishTarget.id);
    setSubmitting(null);
    if (result?.success) {
      closeUnpublishModal();
      window.location.reload();
    } else {
      setModalError(result?.error ?? "Failed to unpublish.");
    }
  };

  const handlePublish = async () => {
    if (!unpublishTarget) return;
    setModalError(null);
    setSubmitting(unpublishTarget.id);
    const result = await publishBlogPostById(unpublishTarget.id);
    setSubmitting(null);
    if (result?.success) {
      closeUnpublishModal();
      window.location.reload();
    } else {
      setModalError(result?.error ?? "Failed to publish.");
    }
  };

  const isDraftAction =
    unpublishTarget?.status !== "published";

  return (
    <>
      <section className={styles.submissionsGrid}>
        {posts.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>No blog posts yet.</h2>
            <p>Create your first insight article.</p>
          </div>
        ) : (
          posts.map((post) => {
            const isPublished = post.status === "published";
            return (
              <article
                key={post.id}
                className={`${styles.submissionCard} ${isPublished ? styles.postCardPublished : styles.postCardDraft}`}
              >
                <div className={styles.cardTop}>
                  <div>
                    <span
                      className={`${styles.statusBadge} ${isPublished ? styles.publishedBadge : styles.draftBadge}`}
                      aria-label={`Status: ${post.status}`}
                    >
                      {isPublished ? "Published" : "Draft"}
                    </span>
                    <h2>{post.title}</h2>
                    <span
                      style={{
                        color: "rgba(255,255,255,0.44)",
                        fontSize: "0.82rem",
                      }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <time
                    style={{
                      color: "rgba(255,255,255,0.38)",
                      fontSize: "0.82rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {isPublished && post.publishedAt
                      ? new Intl.DateTimeFormat("en", {
                          dateStyle: "medium",
                        }).format(new Date(post.publishedAt))
                      : new Intl.DateTimeFormat("en", {
                          dateStyle: "medium",
                        }).format(new Date(post.createdAt))}
                  </time>
                </div>

                <div className={styles.cardActions}>
                  <a
                    href={`/admin/blogs/${post.id}/edit`}
                    className={styles.editButton}
                    data-cursor="dark"
                  >
                    EDIT
                  </a>
                  {isPublished && (
                    <button
                      type="button"
                      onClick={() => {
                        setUnpublishTarget(post);
                        setModalError(null);
                      }}
                      data-cursor="dark"
                      className={styles.unpublishButton}
                    >
                      Unpublish
                    </button>
                  )}
                  {!isPublished && (
                    <button
                      type="button"
                      onClick={() => {
                        setUnpublishTarget(post);
                        setModalError(null);
                      }}
                      data-cursor="dark"
                      className={styles.publishButton}
                    >
                      Publish
                    </button>
                  )}
                  {!isPublished && (
                    <button
                      type="button"
                      className={styles.deleteButton}
                      onClick={() => {
                        setDeleteTarget(post);
                        setModalError(null);
                      }}
                      data-cursor="dark"
                    >
                      Delete
                    </button>
                  )}
                </div>

                <div style={{ marginTop: "12px" }}>
                  {isPublished ? (
                    <a
                      href={`/insights/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.liveArticleLink}
                    >
                      View Live Article →
                    </a>
                  ) : (
                    <span className={styles.notPublishedText}>
                      Not published yet
                    </span>
                  )}
                </div>
              </article>
            );
          })
        )}
      </section>

      {deleteTarget && (
        <div className={styles.modalBackdrop} onClick={closeDeleteModal}>
          <div
            className={styles.deleteModal}
            onClick={(event) => event.stopPropagation()}
          >
            <span>{"// Delete Confirmation"}</span>
            <h2>Delete this draft?</h2>
            <p>
              This will permanently remove &quot;<strong>
                {deleteTarget.title}
              </strong>&quot;. This action cannot be undone.
            </p>
            {modalError && (
              <p
                className={styles.formFieldError}
                style={{ marginTop: "12px" }}
              >
                {modalError}
              </p>
            )}
            <div className={styles.deleteModalActions}>
              <button type="button" onClick={closeDeleteModal}>
                Cancel
              </button>
              <button
                type="button"
                className={styles.confirmDeleteButton}
                data-cursor="dark"
                onClick={handleDelete}
                disabled={submitting === deleteTarget.id}
              >
                {submitting === deleteTarget.id
                  ? "Deleting..."
                  : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {unpublishTarget && (
        <div
          className={styles.modalBackdrop}
          onClick={closeUnpublishModal}
        >
          <div
            className={styles.detailModal}
            onClick={(event) => event.stopPropagation()}
            style={{ width: "min(100%, 560px)" }}
          >
            <button
              type="button"
              onClick={closeUnpublishModal}
              className={styles.closeModalButton}
              aria-label={
                isDraftAction
                  ? "Close publish confirmation"
                  : "Close unpublish confirmation"
              }
              style={{ position: "absolute", top: "18px", right: "18px" }}
            >
              ×
            </button>
            <div className={styles.modalTopContent}>
              <span>
                {`// ${isDraftAction ? "Confirm Publish" : "Confirm Unpublish"}`}
              </span>
              <h2>
                {isDraftAction
                  ? `Publish "${unpublishTarget.title}"?`
                  : `Unpublish "${unpublishTarget.title}"?`}
              </h2>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                marginTop: "20px",
                fontFamily: "var(--font-plus-jakarta), sans-serif",
                lineHeight: "1.6",
              }}
            >
              {isDraftAction
                ? "The article will become publicly visible on /insights. You can unpublish it later from the editor."
                : "The article will become inaccessible publicly. The published date will be preserved for when it is republished."}
            </p>
            {modalError && (
              <p
                className={styles.formFieldError}
                style={{ marginTop: "14px" }}
              >
                {modalError}
              </p>
            )}
            <div className={styles.modalActions}>
              <button type="button" onClick={closeUnpublishModal}>
                Cancel
              </button>
              <button
                type="button"
                onClick={
                  isDraftAction ? handlePublish : handleUnpublish
                }
                data-cursor="dark"
                disabled={submitting === unpublishTarget.id}
                className={
                  isDraftAction
                    ? styles.confirmPublishButton
                    : styles.confirmUnpublishButton
                }
                style={{
                  background: isDraftAction
                    ? "var(--gold)"
                    : undefined,
                  color: isDraftAction
                    ? "#000"
                    : undefined,
                  border: isDraftAction ? "0" : undefined,
                }}
              >
                {submitting === unpublishTarget.id
                  ? isDraftAction
                    ? "Publishing..."
                    : "Unpublishing..."
                  : isDraftAction
                  ? "Publish"
                  : "Unpublish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
