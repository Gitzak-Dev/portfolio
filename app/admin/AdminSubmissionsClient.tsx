"use client";

import { useState } from "react";
import type { ContactSubmissionItem } from "./page";
import styles from "./AdminDashboard.module.css";

type ServerAction = (formData: FormData) => void | Promise<void>;

type AdminSubmissionsClientProps = {
  submissions: ContactSubmissionItem[];
  updateSubmissionStatus: ServerAction;
  deleteSubmission: ServerAction;
};

export default function AdminSubmissionsClient({
  submissions,
  updateSubmissionStatus,
  deleteSubmission,
}: AdminSubmissionsClientProps) {
  const [selectedSubmission, setSelectedSubmission] =
    useState<ContactSubmissionItem | null>(null);

  const [deleteTarget, setDeleteTarget] =
    useState<ContactSubmissionItem | null>(null);

  const closeDetailModal = () => {
    setSelectedSubmission(null);
  };

  const closeDeleteModal = () => {
    setDeleteTarget(null);
  };

  return (
    <>
      <section className={styles.submissionsGrid}>
        {submissions.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>No submissions found.</h2>

            <p>
              Try changing the search keyword or selecting a different status
              filter.
            </p>
          </div>
        ) : (
          submissions.map((item) => (
            <article
              className={`${styles.submissionCard} ${
                item.status === "new" ? styles.newCard : ""
              }`}
              key={item.id}
            >
              <div className={styles.cardTop}>
                <div>
                  <span
                    className={`${styles.statusBadge} ${
                      item.status === "new"
                        ? styles.newBadge
                        : item.status === "replied"
                        ? styles.repliedBadge
                        : styles.readBadge
                    }`}
                  >
                    {item.status}
                  </span>

                  <h2>{item.name}</h2>

                  <a href={`mailto:${item.email}`}>{item.email}</a>
                </div>

                <time>
                  {new Intl.DateTimeFormat("en", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(item.createdAt))}
                </time>
              </div>

              <p className={styles.message}>{item.message}</p>

              <div className={styles.cardActions}>
                <button
                  type="button"
                  className={styles.viewButton}
                  onClick={() => setSelectedSubmission(item)}
                  data-cursor="dark"
                >
                  View Details
                </button>

                <form action={updateSubmissionStatus}>
                  <input type="hidden" name="id" value={item.id} />

                  <select name="status" defaultValue={item.status}>
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>

                  <button type="submit" data-cursor="dark">
                    Update
                  </button>
                </form>

                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => setDeleteTarget(item)}
                  data-cursor="dark"
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </section>

      {selectedSubmission && (
        <div className={styles.modalBackdrop} onClick={closeDetailModal}>
          <div
            className={styles.detailModal}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalTop}>
              <div>
                <span>// Submission Detail</span>

                <h2>{selectedSubmission.name}</h2>
              </div>

              <button
                type="button"
                onClick={closeDetailModal}
                className={styles.closeModalButton}
                aria-label="Close detail modal"
              >
                ×
              </button>
            </div>

            <div className={styles.detailGrid}>
              <div>
                <small>Email</small>

                <a href={`mailto:${selectedSubmission.email}`}>
                  {selectedSubmission.email}
                </a>
              </div>

              <div>
                <small>Status</small>

                <strong>{selectedSubmission.status}</strong>
              </div>

              <div>
                <small>Date</small>

                <strong>
                  {new Intl.DateTimeFormat("en", {
                    dateStyle: "full",
                    timeStyle: "short",
                  }).format(new Date(selectedSubmission.createdAt))}
                </strong>
              </div>
            </div>

            <div className={styles.fullMessageBox}>
              <small>Message</small>

              <p>{selectedSubmission.message}</p>
            </div>

            <div className={styles.modalActions}>
              <a
                href={`mailto:${selectedSubmission.email}`}
                className={styles.replyButton}
                data-cursor="dark"
              >
                Reply by Email
              </a>

              <button type="button" onClick={closeDetailModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className={styles.modalBackdrop} onClick={closeDeleteModal}>
          <div
            className={styles.deleteModal}
            onClick={(event) => event.stopPropagation()}
          >
            <span>// Delete Confirmation</span>

            <h2>Delete this submission?</h2>

            <p>
              This will permanently remove the message from{" "}
              <strong>{deleteTarget.name}</strong>. This action cannot be
              undone.
            </p>

            <div className={styles.deleteModalActions}>
              <button type="button" onClick={closeDeleteModal}>
                Cancel
              </button>

              <form action={deleteSubmission}>
                <input type="hidden" name="id" value={deleteTarget.id} />

                <button
                  type="submit"
                  className={styles.confirmDeleteButton}
                  data-cursor="dark"
                >
                  Yes, Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}