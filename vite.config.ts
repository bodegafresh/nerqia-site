import { defineConfig, loadEnv } from "vite";
import { defineConfig as testConfig } from "vitest/config";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const publicUrl = env.VITE_SITE_URL?.replace(/\/+$/, "");
  if (publicUrl) {
    const url = new URL(publicUrl);
    if (!["http:", "https:"].includes(url.protocol) || url.search || url.hash) {
      throw new Error(
        "VITE_SITE_URL must be an HTTP(S) URL without query or hash.",
      );
    }
  }
  const base =
    env.VITE_BASE_PATH ||
    (publicUrl ? `${new URL(publicUrl).pathname.replace(/\/$/, "")}/` : "/");
  if (!base.startsWith("/") || !base.endsWith("/") || base.includes("..")) {
    throw new Error(
      "VITE_BASE_PATH must start and end with / and have no .. segments.",
    );
  }
  if (
    publicUrl &&
    `${new URL(publicUrl).pathname.replace(/\/$/, "")}/` !== base
  ) {
    throw new Error("VITE_BASE_PATH must match the pathname of VITE_SITE_URL.");
  }
  return {
    base,
    server: { allowedHosts: ["terminal.local"] },
    preview: { allowedHosts: ["terminal.local"] },
    build: { target: "es2022", sourcemap: false },
    ...testConfig({
      test: {
        environment: "jsdom",
        setupFiles: ["./tests/setup.ts"],
        include: ["tests/**/*.test.{ts,tsx}"],
        clearMocks: true,
      },
    }),
  };
});
