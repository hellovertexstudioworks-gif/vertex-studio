"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

function getDeviceType() {
  const width = window.innerWidth;

  if (width < 768) {
    return "Mobile";
  }

  if (width < 1024) {
    return "Tablet";
  }

  return "Desktop";
}

export default function VisitorTracker() {
  useEffect(() => {
    async function trackVisitor() {
      try {
        // Do not track admin or login pages.
        const path = window.location.pathname;

        if (
          path.startsWith("/admin") ||
          path.startsWith("/login")
        ) {
          return;
        }

        const supabase = createClient();

        // Keep the same session ID while the visitor remains
        // in the same browser session.
        let sessionId = sessionStorage.getItem(
          "vertex_visitor_session"
        );

        if (!sessionId) {
          // Use crypto.randomUUID when available,
          // with a fallback for browsers/environments
          // where randomUUID is not supported.
          sessionId =
            typeof crypto !== "undefined" &&
            typeof crypto.randomUUID === "function"
              ? crypto.randomUUID()
              : `${Date.now()}-${Math.random()
                  .toString(36)
                  .slice(2)}-${Math.random()
                  .toString(36)
                  .slice(2)}`;

          sessionStorage.setItem(
            "vertex_visitor_session",
            sessionId
          );
        }

        const { error } = await supabase
          .from("visitors")
          .insert({
            session_id: sessionId,
            page_path: path,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent,
            device_type: getDeviceType(),
          });

        if (error) {
          console.error(
            "VISITOR TRACKING ERROR:",
            error
          );
        }
      } catch (error) {
        console.error(
          "VISITOR TRACKING FAILED:",
          error
        );
      }
    }

    trackVisitor();
  }, []);

  return null;
}