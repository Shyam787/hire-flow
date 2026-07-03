"use client";

import { useEffect, useRef, useState } from "react";

export function UnsavedChangesGuard({
  children,
  ...props
}: React.ComponentProps<"form">) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const form = formRef.current;

    if (!form) {
      return;
    }

    const markDirty = () => setIsDirty(true);
    const markClean = () => setIsDirty(false);

    form.addEventListener("input", markDirty);
    form.addEventListener("change", markDirty);
    form.addEventListener("submit", markClean);

    return () => {
      form.removeEventListener("input", markDirty);
      form.removeEventListener("change", markDirty);
      form.removeEventListener("submit", markClean);
    };
  }, []);

  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty) {
        return;
      }

      event.preventDefault();
      event.returnValue = "";
    };

    const onDocumentClick = (event: MouseEvent) => {
      if (!isDirty) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const link = target?.closest("a[href]") as HTMLAnchorElement | null;

      if (!link || link.target || link.href === window.location.href) {
        return;
      }

      const shouldLeave = window.confirm(
        "You have unsaved changes. Save them or discard them before leaving this page."
      );

      if (!shouldLeave) {
        event.preventDefault();
      } else {
        setIsDirty(false);
      }
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    document.addEventListener("click", onDocumentClick, true);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      document.removeEventListener("click", onDocumentClick, true);
    };
  }, [isDirty]);

  return (
    <form ref={formRef} {...props}>
      {children}
    </form>
  );
}
