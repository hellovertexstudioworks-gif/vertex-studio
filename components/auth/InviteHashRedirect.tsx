"use client";

import { useEffect } from "react";

export default function InviteHashRedirect() {
  useEffect(() => {
    const hash = window.location.hash;

    // Nothing to process.
    if (!hash) {
      return;
    }

    const params = new URLSearchParams(hash.substring(1));

    const type = params.get("type");
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    /*
     * Supabase invite links can arrive using the implicit flow:
     *
     * https://vertexstudioworks.com/#access_token=...
     * &refresh_token=...
     * &type=invite
     *
     * The invite accept page is expecting the invitation flow,
     * so move the entire hash to /invite/accept.
     */

    if (
      type === "invite" &&
      accessToken &&
      refreshToken
    ) {
      const target = `/invite/accept${hash}`;

      window.location.replace(target);
    }
  }, []);

  return null;
}