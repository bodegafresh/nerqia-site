import {
  site,
  visibleProducts,
  type Locale,
  type ProductId,
} from "../config/site";
import { copy } from "../content/copy";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import {
  Hero,
  Services,
  Audience,
  Process,
  Innovation,
  Why,
  Contact,
} from "../components/sections/Sections";
export function App({
  locale,
  products = visibleProducts(site.products),
}: {
  locale: Locale;
  products?: ProductId[];
}) {
  const text = copy[locale];
  return (
    <>
      <a className="skip-link" href="#contenido">
        {text.skip}
      </a>
      <div id="inicio" />
      <Header
        text={text}
        locale={locale}
        showInnovation={products.length > 0}
      />
      <main id="contenido" tabIndex={-1}>
        <Hero text={text} />
        <Services text={text} />
        <Audience text={text} />
        <Process text={text} />
        <Innovation text={text} products={products} />
        <Why text={text} />
        <Contact text={text} />
      </main>
      <Footer text={text} showInnovation={products.length > 0} />
    </>
  );
}
