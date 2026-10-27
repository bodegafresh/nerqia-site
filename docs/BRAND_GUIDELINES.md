# NERQIA · Sistema de identidad V1.0

## Identidad seleccionada y alcance

Reconstrucción vectorial de la lámina aprobada `1000108079.jpg`, recibida con el encargo. El bloque **1. Logotipo principal (Horizontal B)** define la composición principal: N geométrica de nodos y conexiones, seguida de **NERQIA**, sin punto ni «SpA». El bloque **2. Vertical C** define la composición secundaria. El bloque **4. Isotipo compacto (opción 4 N simplificada)** define el símbolo de tamaños reducidos: cuatro nodos, dos verticales y dos diagonales abiertas paralelas.

La lámina es una imagen de presentación, no un original vectorial ni una especificación de coordenadas. La reconstrucción conserva silueta, estructura, disposición y acentos; regulariza alineaciones y grosores. **No se afirma identidad matemática ni coincidencia exacta de tipografía**. No se ha recortado ni embebido la fotografía en ningún recurso. La referencia original no se redistribuye dentro del repositorio.

La N de red tiene 15 nodos, tres acentos selectivos y conexiones definidas por extremos compartidos. Se omiten dos conexiones interiores redundantes de la lámina (tramos izquierdo superior y derecho inferior) que cruzaban verticales sin nodo; se conserva la silueta exterior y la jerarquía de la N. El SVG maestro exportado es `public/brand/symbols/nerqia-network-corporate.svg`; el maestro compacto exportado es `nerqia-compact-light.svg`. `scripts/brand/geometry.mjs` es la única fuente editable de sus coordenadas, de la N compacta y del wordmark. Horizontal, vertical, monocromos y recursos corporativos utilizan esas mismas funciones. Los archivos públicos son salidas generadas: no editarlos individualmente.

## Paleta y tipografía

Todos los colores se definen en `src/styles/tokens.css`. El generador lee esos tokens; no mantiene una segunda paleta.

| Uso                     | Token           | Valor definitivo |
| ----------------------- | --------------- | ---------------- |
| Marca sobre fondo claro | `--petrol`      | `#073B46`        |
| Fondo oscuro de la web  | `--navy`        | `#0B1C26`        |
| Acento corporativo      | `--mint`        | `#91EBCB`        |
| Blanco de marca         | `--brand-white` | `#FFFFFF`        |
| Monocromo negro         | `--black`       | `#000000`        |

Se conserva `#0B1C26` del sitio en lugar del `#10212A` de referencia para mantener el diseño existente. El menta anterior `#93F0D2` se ajusta ligeramente a `#91EBCB`. Los tokens de papel, superficies, texto y bordes del sistema existente siguen vigentes. El blanco suavizado de lectura `--white` se conserva; el blanco puro se aplica a recursos de marca.

El wordmark es **lettering geométrico original reconstruido con trazados** para este encargo. Se han definido contornos N/E/R/Q/I/A y espaciado óptico explícito; no se ha convertido una fuente comercial ni se distribuyen archivos de fuente. No requiere licencias tipográficas de terceros ni fuentes instaladas para visualizarse. Su peso, Q y kerning pueden diferir de la tipografía no identificable con certeza en la lámina. La tipografía de interfaz existente (`Inter`, `Segoe UI`, Arial, sans-serif, según disponibilidad local) no cambia ni se descarga de servicios externos.

`@resvg/resvg-js` 2.6.2 (MPL-2.0) se utiliza solo como dependencia de desarrollo para rasterizar. No se incorpora al JavaScript del visitante. Su licencia está incluida en el paquete npm; los SVG no dependen de él en ejecución.

## Variantes y fondos

| Recurso                                          | Uso                                                          |
| ------------------------------------------------ | ------------------------------------------------------------ |
| Horizontal `light`                               | Fondo blanco o papel claro; petróleo y menta                 |
| Horizontal `dark`                                | Fondo navy o petróleo; blanco y menta; header y footer       |
| Horizontal `black` / `white`                     | Reproducción a una tinta sobre fondo claro / oscuro          |
| Vertical `light` / `dark`                        | Composiciones centradas y espacios con mayor altura          |
| Network `corporate` / `dark` / `black` / `white` | Símbolo de red independiente, de tamaño suficiente           |
| Compact `light` / `dark`                         | Símbolo pequeño sin fondo, petróleo / menta                  |
| Favicon y app icons                              | N compacta petróleo sobre fondo menta; nunca la red reducida |

Los logotipos, wordmarks y símbolos independientes tienen fondo transparente. No usar blanco sobre claro ni petróleo sobre oscuro. Evitar fotografías, texturas con contraste variable, sombras, deformaciones, inclinaciones y recoloraciones independientes de nodos. Los acentos menta sobre blanco son decorativos: la estructura y el nombre permanecen en petróleo y no dependen del contraste del acento para reconocerse.

## Tamaños y área de seguridad

- Horizontal: **148 px de ancho mínimo** en pantalla; 184 px recomendado para el header de escritorio. La web usa 148 px en móvil y 176 px en footer. No comprimir su proporción 488:164.
- Vertical: 120 px de ancho mínimo; proporción 240:224.
- Red independiente: 40 px de lado mínimo, preferiblemente 48 px o mayor. Para tamaños inferiores utilizar la N compacta.
- Compacto: mínimo 16 px; comprobado visualmente a 16, 32, 48, 64, 128, 256 y 512 px. Máximo detalle a partir de 32 px.
- Mantener alrededor del logotipo un espacio externo mínimo equivalente al diámetro de un nodo principal, **13 unidades de la cuadrícula maestra**, escalado junto con el símbolo. Para el compacto, mantener como mínimo un radio de nodo (6,5 unidades de su cuadrícula 80×80). El margen incorporado en los iconos forma parte del recurso: no recortarlo.
- Los `viewBox` contienen todos los trazos y nodos. La verificación calcula sus límites vectoriales; los fondos decorativos sí pueden sangrar intencionalmente fuera de su lienzo.

Estas medidas corresponden a tamaños CSS, no a puntos físicos de impresión. Para impresión, comprobar una prueba al tamaño final.

## Organización de recursos

```text
scripts/brand/geometry.mjs         Geometrías maestras editables
scripts/brand/generate.mjs         Generación determinista
scripts/brand/verify.mjs           Integridad y dimensiones
src/config/brand.ts               Referencias y proporciones para React
public/brand/logos/               4 horizontales + 2 verticales SVG
public/brand/symbols/             4 redes + 2 compactos SVG
public/brand/social/              Fuentes SVG de OG y banner; banner PNG
public/brand/documents/           Bases SVG corporativas y firma PNG
public/favicon.svg               Compacto sobre baldosa menta
public/favicon.ico               Entradas PNG reales de 16, 32 y 48 px
public/favicon-16x16.png / favicon-32x32.png / favicon-48x48.png    Tamaños individuales
public/apple-touch-icon.png      180×180, fondo cuadrado opaco
public/android-chrome-*.png       192×192 y 512×512
public/nerqia-icon-1024.png        1024×1024
public/og-image.png               1200×630, compartido por ES/EN
```

El banner es `public/brand/social/social-banner.png` (1500×500). La imagen OG y el banner priorizan el logotipo y una red discreta, sin contactos inventados ni texto diminuto. La descripción comercial sigue disponible en los metadatos de cada idioma. Se retiran las imágenes sociales provisionales, incluida la duplicación EN; ambos idiomas utilizan la misma imagen corporativa sin texto localizado.

Las bases `letterhead.svg` (A4 a proporción), `proposal-cover.svg`, `presentation-background.svg` (1920×1080) y `network-pattern.svg` permiten añadir contenido en herramientas de documentos o diseño. `email-signature.png` es una alternativa compatible con clientes que no aceptan SVG; añadir datos reales como texto HTML en el cliente de correo, no inventarlos ni incrustar toda la firma como imagen. Son recursos base, no plantillas DOCX/PPTX ni propuestas terminadas.

## Regeneración

Con Node >=22.12 (Node 24 en CI):

```bash
npm ci
npm run brand:generate
npm run brand:check
npm run check
```

Modificar geometría en `geometry.mjs` o colores en `tokens.css`, regenerar y confirmar también las salidas de `public/`. No hacen falta Python, una fuente del sistema, servicios de pago ni herramientas gráficas externas. `brand:check` regenera en memoria y compara los 31 recursos byte a byte; detecta salidas desactualizadas. Además comprueba XML seguro, SVG sin fuentes, imágenes embebidas, scripts, enlaces remotos o IDs, transparencia de logotipos, límites vectoriales, cuatro nodos del compacto, dimensiones PNG y las tres entradas ICO. En Linux y Fedora npm instala el binario de resvg correspondiente a la arquitectura desde el lockfile. No omitir dependencias opcionales durante esa instalación.

## Integración accesible

```tsx
// El enlace proporciona el nombre; la imagen interna es decorativa.
<a href="#inicio" aria-label="NERQIA" className="brand-link">
  <BrandLogo background="dark" decorative />
</a>

// Marca autónoma: alt="NERQIA", dimensiones explícitas y proporción reservada.
<BrandLogo variant="vertical" background="light" width={160} />
<BrandLogo variant="compact" background="dark" width={32} />
```

`BrandLogo` admite `horizontal`, `vertical`, `network` y `compact`; fondo `light`/`dark`, ancho, clase y uso decorativo. No inyecta SVG ni genera IDs, por lo que varias instancias no colisionan. Usa las rutas de `brandAsset`, prefijadas por `BASE_URL`; no concatena rutas desde la URL del documento EN. No recortar ni asignar anchura y altura CSS con proporciones distintas.

Header, menú móvil y footer utilizan el horizontal oscuro. El horizontal cabe en el ancho mínimo de 320 px comprobado: no es necesario ocultar el nombre en móvil. Los enlaces de marca conservan `#inicio`, nombre accesible y foco visible. El centro del hero sustituye únicamente la N provisional por el compacto; conserva red orbital, ilustración, animaciones y contenido.

`index.html` declara ICO, PNG de 32 px, SVG y Apple Touch Icon usando `%BASE_URL%`. Los metadatos OG/Twitter utilizan la URL pública absoluta más `/og-image.png`; el build valida tanto raíz como subruta de Pages. No existía manifest: se ha evaluado y **no se añade**, ya que no hay funcionalidad de instalación u operación offline que lo justifique. Los iconos Android quedan preparados para reutilización futura, sin service worker ni conversión a PWA.

## Verificación y revisión

Consultar [BRAND_VALIDATION.md](BRAND_VALIDATION.md) para resultados, capturas comparativas y limitaciones. El workflow existente se conserva: los PR ejecutan calidad/build y omiten el despliegue. Esta rama se entrega sin merge, auto-merge, release ni despliegue manual.
