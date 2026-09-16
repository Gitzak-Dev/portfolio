"use client";

import { useState, useEffect, useRef, useCallback, useId } from "react";
import type { ContactSubmissionItem } from "./page";
import styles from "./AdminDashboard.module.css";

type ServerAction = (formData: FormData) => void | Promise<void>;

type AdminSubmissionsClientProps = {
  submissions: ContactSubmissionItem[];
  updateSubmissionStatus: ServerAction;
  deleteSubmission: ServerAction;
};

type StatusDropdownProps = {
  currentStatus: string;
  onStatusChange: (newStatus: string) => void;
};

function StatusDropdown({ currentStatus, onStatusChange }: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();
  const options = ["new", "read", "replied"] as const;

  const openMenu = useCallback(() => {
    setIsOpen(true);
    const currentIndex = options.indexOf(currentStatus as (typeof options)[number]);
    setSelectedIndex(currentIndex >= 0 ? currentIndex : 0);
  }, [currentStatus, options]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const selectOption = useCallback(
    (value: string) => {
      onStatusChange(value);
      closeMenu();
    },
    [onStatusChange, closeMenu]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  const handleTriggerClick = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          openMenu();
        } else {
          setSelectedIndex((prev) => (prev + 1) % options.length);
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) {
          openMenu();
        } else {
          setSelectedIndex((prev) => (prev - 1 + options.length) % options.length);
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (isOpen) {
          selectOption(options[selectedIndex]);
        } else {
          openMenu();
        }
        break;
      case "Escape":
        event.preventDefault();
        closeMenu();
        break;
    }
  };

  const handleOptionKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % options.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + options.length) % options.length);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        selectOption(options[index]);
        break;
      case "Escape":
        event.preventDefault();
        closeMenu();
        triggerRef.current?.focus();
        break;
    }
  };

  const displayLabel =
    currentStatus === "new"
      ? "NEW"
      : currentStatus === "read"
      ? "READ"
      : "REPLIED";

  return (
    <div ref={containerRef} className={styles.statusDropdownWrapper}>
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.statusTrigger} ${isOpen ? styles.statusTriggerOpen : ""}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={handleTriggerClick}
        onKeyDown={handleKeyDown}
      >
        <span className={styles.statusTriggerLabel}>{displayLabel}</span>
        <svg
          className={styles.statusChevron}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          className={styles.statusDropdownMenu}
          aria-label="Submission status"
        >
          {options.map((option, index) => {
            const isSelected = option === currentStatus;
            const isFocused = index === selectedIndex;
            const label = option === "new" ? "NEW" : option === "read" ? "READ" : "REPLIED";

            return (
              <div
                key={option}
                role="option"
                aria-selected={isSelected}
                tabIndex={-1}
                className={`${styles.statusOption} ${
                  isSelected ? styles.statusOptionSelected : ""
                } ${isFocused ? styles.statusOptionFocused : ""}`}
                onClick={() => selectOption(option)}
                onMouseMove={() => setSelectedIndex(index)}
                onKeyDown={(e) => handleOptionKeyDown(e, index)}
              >
                {label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminSubmissionsClient({
  submissions,
  updateSubmissionStatus,
  deleteSubmission,
}: AdminSubmissionsClientProps) {
  const [selectedSubmission, setSelectedSubmission] =
    useState<ContactSubmissionItem | null>(null);

  const [deleteTarget, setDeleteTarget] =
    useState<ContactSubmissionItem | null>(null);

  const [localStatuses, setLocalStatuses] = useState<Record<string, string>>({});

  const closeDetailModal = () => {
    setSelectedSubmission(null);
  };

  const closeDeleteModal = () => {
    setDeleteTarget(null);
  };

  const getLocalStatus = (item: ContactSubmissionItem) => {
    return localStatuses[item.id] ?? item.status;
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setLocalStatuses((prev) => ({ ...prev, [id]: newStatus }));
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

                  <StatusDropdown
                    currentStatus={getLocalStatus(item)}
                    onStatusChange={(newStatus) => handleStatusChange(item.id, newStatus)}
                  />

                  <input
                    type="hidden"
                    name="status"
                    value={getLocalStatus(item)}
                  />

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
                <span>{'// Submission Detail'}</span>

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
            <span>{'// Delete Confirmation'}</span>

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
