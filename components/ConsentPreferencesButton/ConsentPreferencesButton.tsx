"use client";

type ConsentPreferencesButtonProps = {
  className?: string;
};

export default function ConsentPreferencesButton({
  className,
}: ConsentPreferencesButtonProps) {
  const openPreferences = () => {
    window.dispatchEvent(new Event("stackspacer:open-consent-preferences"));
  };

  return (
    <button
      type="button"
      className={className}
      onClick={openPreferences}
    >
      Analytics Preferences
    </button>
  );
}
