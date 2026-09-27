 "use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type VertexTheme =
  | "blue"
  | "purple"
  | "red"
  | "green"
  | "orange"
  | "cyan"
  | "light"
  | "dark";

type ThemeTokens = {
  bg: string;
  surface: string;
  surface2: string;
  border: string;
  accent: string;
  accentSoft: string;
  accentStrong: string;
  text: string;
  muted: string;
  sidebar: string;
  header: string;
};

type ThemeContextValue = {
  theme: VertexTheme;
  setTheme: (theme: VertexTheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "vertex-admin-theme";

export const themeOptions: {
  id: VertexTheme;
  label: string;
  color: string;
}[] = [
  { id: "blue", label: "Blue", color: "#3b82f6" },
  { id: "purple", label: "Purple", color: "#8b5cf6" },
  { id: "red", label: "Red", color: "#ef4444" },
  { id: "green", label: "Green", color: "#10b981" },
  { id: "orange", label: "Orange", color: "#f97316" },
  { id: "cyan", label: "Cyan", color: "#06b6d4" },
  { id: "light", label: "Light", color: "#f8fafc" },
  { id: "dark", label: "Dark", color: "#111827" },
];

const themeTokens: Record<VertexTheme, ThemeTokens> = {
  blue: {
    bg: "#060914",
    surface: "#0b1020",
    surface2: "#10172a",
    border: "rgba(59,130,246,0.16)",
    accent: "#3b82f6",
    accentSoft: "rgba(59,130,246,0.10)",
    accentStrong: "rgba(59,130,246,0.20)",
    text: "#ffffff",
    muted: "#94a3b8",
    sidebar: "#070b16",
    header: "#070b16",
  },
  purple: {
    bg: "#080611",
    surface: "#100c1d",
    surface2: "#171127",
    border: "rgba(139,92,246,0.18)",
    accent: "#8b5cf6",
    accentSoft: "rgba(139,92,246,0.10)",
    accentStrong: "rgba(139,92,246,0.20)",
    text: "#ffffff",
    muted: "#a1a1aa",
    sidebar: "#090711",
    header: "#090711",
  },
  red: {
    bg: "#100607",
    surface: "#180b0d",
    surface2: "#241013",
    border: "rgba(239,68,68,0.18)",
    accent: "#ef4444",
    accentSoft: "rgba(239,68,68,0.10)",
    accentStrong: "rgba(239,68,68,0.20)",
    text: "#ffffff",
    muted: "#a1a1aa",
    sidebar: "#0d0607",
    header: "#0d0607",
  },
  green: {
    bg: "#04100c",
    surface: "#081711",
    surface2: "#0e2119",
    border: "rgba(16,185,129,0.18)",
    accent: "#10b981",
    accentSoft: "rgba(16,185,129,0.10)",
    accentStrong: "rgba(16,185,129,0.20)",
    text: "#ffffff",
    muted: "#94a3b8",
    sidebar: "#06100c",
    header: "#06100c",
  },
  orange: {
    bg: "#100904",
    surface: "#191008",
    surface2: "#25170b",
    border: "rgba(249,115,22,0.18)",
    accent: "#f97316",
    accentSoft: "rgba(249,115,22,0.10)",
    accentStrong: "rgba(249,115,22,0.20)",
    text: "#ffffff",
    muted: "#a1a1aa",
    sidebar: "#0d0805",
    header: "#0d0805",
  },
  cyan: {
    bg: "#031014",
    surface: "#07181d",
    surface2: "#0c2229",
    border: "rgba(6,182,212,0.18)",
    accent: "#06b6d4",
    accentSoft: "rgba(6,182,212,0.10)",
    accentStrong: "rgba(6,182,212,0.20)",
    text: "#ffffff",
    muted: "#94a3b8",
    sidebar: "#051014",
    header: "#051014",
  },
  light: {
    bg: "#f8fafc",
    surface: "#ffffff",
    surface2: "#f1f5f9",
    border: "rgba(15,23,42,0.10)",
    accent: "#2563eb",
    accentSoft: "rgba(37,99,235,0.08)",
    accentStrong: "rgba(37,99,235,0.14)",
    text: "#0f172a",
    muted: "#64748b",
    sidebar: "#ffffff",
    header: "#ffffff",
  },
  dark: {
    bg: "#03050a",
    surface: "#080c14",
    surface2: "#0d1320",
    border: "rgba(148,163,184,0.14)",
    accent: "#64748b",
    accentSoft: "rgba(100,116,139,0.10)",
    accentStrong: "rgba(100,116,139,0.18)",
    text: "#ffffff",
    muted: "#94a3b8",
    sidebar: "#05070c",
    header: "#05070c",
  },
};

function isVertexTheme(value: string | null): value is VertexTheme {
  return !!value && themeOptions.some((option) => option.id === value);
}

function applyTheme(theme: VertexTheme) {
  const root = document.documentElement;
  const tokens = themeTokens[theme];

  root.setAttribute("data-vertex-theme", theme);
  root.style.colorScheme = theme === "light" ? "light" : "dark";

  root.style.setProperty("--vertex-bg", tokens.bg);
  root.style.setProperty("--vertex-surface", tokens.surface);
  root.style.setProperty("--vertex-surface-2", tokens.surface2);
  root.style.setProperty("--vertex-border", tokens.border);
  root.style.setProperty("--vertex-accent", tokens.accent);
  root.style.setProperty("--vertex-accent-soft", tokens.accentSoft);
  root.style.setProperty("--vertex-accent-strong", tokens.accentStrong);
  root.style.setProperty("--vertex-text", tokens.text);
  root.style.setProperty("--vertex-muted", tokens.muted);
  root.style.setProperty("--vertex-sidebar", tokens.sidebar);
  root.style.setProperty("--vertex-header", tokens.header);
  root.style.setProperty("--vertex-theme-name", `"${theme}"`);
}

export function VertexThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<VertexTheme>("blue");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (isVertexTheme(saved)) {
      setThemeState(saved);
      applyTheme(saved);
    } else {
      applyTheme("blue");
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
  }, [theme, mounted]);

  function setTheme(nextTheme: VertexTheme) {
    setThemeState(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  }

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useVertexTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useVertexTheme must be used inside VertexThemeProvider"
    );
  }

  return context;
}
