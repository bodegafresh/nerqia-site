import { act } from "react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";
import { App } from "../src/app/App";

describe("prerendered React content", () => {
  it.each(["es", "en"] as const)(
    "hydrates %s without rebuilding the document",
    async (locale) => {
      const container = document.createElement("div");
      container.innerHTML = renderToString(<App locale={locale} />);
      document.body.append(container);
      const heading = container.querySelector("h1");
      const errors: unknown[] = [];
      let root: ReturnType<typeof hydrateRoot> | undefined;
      await act(async () => {
        root = hydrateRoot(container, <App locale={locale} />, {
          onRecoverableError: (error) => errors.push(error),
        });
      });
      expect(errors).toEqual([]);
      expect(container.querySelector("h1")).toBe(heading);
      await act(async () => root?.unmount());
      container.remove();
    },
  );
});
