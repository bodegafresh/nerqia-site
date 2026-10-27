import { readFile } from "node:fs/promises";

export async function readColorTokens() {
  const tokens = await readFile(
    new URL("../../src/styles/tokens.css", import.meta.url),
    "utf8",
  );
  return (name) => {
    const value = tokens.match(
      new RegExp(`--${name}:\\s*(#[\\da-f]{6})`, "i"),
    )?.[1];
    if (!value) throw new Error(`Missing CSS brand token --${name}`);
    return value;
  };
}
