"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(listener: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}

function getPreference() {
  return window.matchMedia(query).matches;
}

// Keep the server rendering still until the browser's preference is available.
function getServerPreference() {
  return true;
}

export function useReducedMotionPreference() {
  return useSyncExternalStore(subscribe, getPreference, getServerPreference);
}
