import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./app/App";
import { copy } from "./content/copy";
import { currentLocale } from "./config/site";
import "./styles/index.css";
const root = document.getElementById("root");
if (!root) throw new Error("Missing root element");
const locale = currentLocale(window.location.pathname);
document.title = copy[locale].seo.title;
document.documentElement.lang = copy[locale].lang;
const app = (
  <StrictMode>
    <App locale={locale} />
  </StrictMode>
);
if (root.children.length > 0) hydrateRoot(root, app);
else createRoot(root).render(app);
