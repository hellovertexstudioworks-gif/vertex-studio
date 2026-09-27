"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
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

function generateId() {
  return (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}-${Math.random()
          .toString(36)
          .slice(2)}`
  );
}

function getOrCreateId(storage: Storage, key: string) {
  let id = storage.getItem(key);

  if (!id) {
    id = generateId();
    storage.setItem(key, id);
  }

  return id;
}

function getTrafficSource() {
  const referrer = document.referrer;

  if (!referrer) {
    return "Direct";
  }

  try {
    const referrerUrl = new URL(referrer);
    const currentHostname = window.location.hostname;

    // Internal navigation
    if (referrerUrl.hostname === currentHostname) {
      return "Internal";
    }

    return referrerUrl.hostname;
  } catch {
    return "Referral";
  }
}

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    async function trackVisitor() {
      try {
        /*
         * ---------------------------------------------------------
         * CURRENT PAGE
         * ---------------------------------------------------------
         */

        const path = pathname || window.location.pathname;

        /*
         * Do not track Admin or Login pages.
         */

        if (
          path.startsWith("/admin") ||
          path.startsWith("/login")
        ) {
          return;
        }

        const supabase = createClient();

        /*
         * ---------------------------------------------------------
         * VISITOR ID
         * ---------------------------------------------------------
         *
         * Persists across browser sessions.
         * This lets Client Reports calculate unique visitors.
         */

        const visitorId = getOrCreateId(
          localStorage,
          "vertex_visitor_id"
        );

        /*
         * ---------------------------------------------------------
         * SESSION ID
         * ---------------------------------------------------------
         *
         * Persists while the visitor's browser session remains open.
         */

        const sessionId = getOrCreateId(
          sessionStorage,
          "vertex_visitor_session"
        );

        /*
         * ---------------------------------------------------------
         * BASIC VISITOR INFORMATION
         * ---------------------------------------------------------
         */

        const deviceType = getDeviceType();

        const referrer =
          document.referrer || null;

        const source = getTrafficSource();

        /*
         * ---------------------------------------------------------
         * CLIENT / WEBSITE CONFIGURATION
         * ---------------------------------------------------------
         */

        const clientId =
          process.env.NEXT_PUBLIC_ANALYTICS_CLIENT_ID;

        const websiteId =
          process.env.NEXT_PUBLIC_ANALYTICS_WEBSITE_ID;

        /*
         * ---------------------------------------------------------
         * EXISTING VISITOR TABLE
         * ---------------------------------------------------------
         *
         * Keep this because the current Admin Analytics dashboard
         * still reads from the visitors table.
         */

        const { error: visitorError } = await supabase
          .from("visitors")
          .insert({
            session_id: sessionId,
            page_path: path,
            referrer,
            user_agent: navigator.userAgent,
            device_type: deviceType,
          });

        if (visitorError) {
          console.error(
            "VISITOR TRACKING ERROR:",
            visitorError
          );
        }

        /*
         * ---------------------------------------------------------
         * CLIENT ANALYTICS
         * ---------------------------------------------------------
         *
         * If the website has not been configured with a client
         * and website ID, keep the existing visitor tracking
         * working but stop here.
         */

        if (!clientId || !websiteId) {
          console.warn(
            "CLIENT ANALYTICS: Missing NEXT_PUBLIC_ANALYTICS_CLIENT_ID or NEXT_PUBLIC_ANALYTICS_WEBSITE_ID."
          );

          return;
        }

        /*
         * ---------------------------------------------------------
         * ANALYTICS EVENT
         * ---------------------------------------------------------
         *
         * This is what the Client Reports system uses.
         */

        const { error: analyticsError } = await supabase
          .from("analytics_events")
          .insert({
            client_id: clientId,
            website_id: websiteId,
            event_type: "page_view",
            page_path: path,
            session_id: sessionId,
            visitor_id: visitorId,
            source,
          });

        if (analyticsError) {
          console.error(
            "CLIENT ANALYTICS ERROR:",
            analyticsError
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
  }, [pathname]);

  return null;
}