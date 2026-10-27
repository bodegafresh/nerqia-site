# NERQIA — Tecnología que trabaja para ti.

Sitio institucional de **NERQIA SpA**, compatible con GitHub Pages. La iteración V1.1 conserva la identidad original y añade problemas cotidianos, ejemplos de soluciones posibles y un contacto con borrador revisable. Español de Chile e inglés mantienen paridad de contenido y funcionamiento.

## Inicio rápido

Requisitos: **Node.js 24 LTS** (mínimo 22.12), npm y, para publicar, Git y una cuenta de GitHub.

```bash
cd nerqia-site
npm ci
npm run dev
```

Abre la dirección `Local` que imprime Vite. No abras `index.html` con doble clic: los módulos necesitan un servidor HTTP.

En Linux/macOS, también puedes ejecutar:

```bash
bash install.sh
npm run dev
```

El instalador comprueba Node, instala las versiones del lockfile y ejecuta las verificaciones. No requiere `sudo`, no cambia tu configuración y no publica el sitio.

## Stack y estructura

- React 19, TypeScript y Vite 8.
- CSS con variables, sin framework de estilos ni bibliotecas de animación.
- Vitest, Testing Library, ESLint y Prettier.
- GitHub Actions para validación y despliegue.
- Prerenderizado con React DOM Server **solo durante la compilación**: no hay backend en producción.

```text
src/
  app/App.tsx                  Composición del sitio
  components/
    layout/                    Header, footer y diálogos
    sections/                  Secciones, ejemplos y ContactForm
    ui/                        Iconos, marca, encabezados y red SVG
  config/site.ts               Empresa, correo, productos, URLs y redes
  content/copy.ts              Todos los textos de ES y EN
  styles/                     Tokens y estilos responsive
  lib/contact.ts               Validación y composición del borrador
  main.tsx                     Hidratación en navegador
  entry-server.tsx              HTML y metadatos durante el build
public/                        Favicon e imágenes para redes sociales
scripts/                       Prerenderizado y verificación de producción
.github/workflows/pages.yml    Calidad + despliegue
tests/                        Pruebas de contenido e interacciones
 docs/                         Diseño y registro de validación
```

Las dependencias exactas están en `package-lock.json`. Utiliza `npm ci` para reproducir la instalación. `node_modules` se excluye del ZIP.

## Comandos

```bash
npm run dev          # Servidor de desarrollo
npm run lint         # ESLint sin advertencias
npm run typecheck    # Tipos de TypeScript
npm test             # Pruebas automatizadas
npm run test:watch   # Pruebas mientras editas
npm run build        # Build, HTML ES/EN, SEO y verificación de recursos
npm run preview      # Vista local de dist después de compilar
npm run check        # Lint + tipos + pruebas + build
npm run format       # Dar formato al código
```

`dist/` es una salida generada y no se versiona. Vuelve a compilar después de cualquier cambio. El workflow genera su propia compilación a partir de las fuentes verificadas.

## Publicar gratis en GitHub Pages

Para usar GitHub Free, crea un repositorio **público**. Publicarlo hará visible el código y el contenido incluidos.

1. Crea un repositorio vacío en GitHub, con el nombre que elijas; por ejemplo `nerqia-site`. No inicialices otro README si vas a seguir los comandos siguientes.
2. Descomprime el ZIP y abre una terminal dentro de `nerqia-site/`. Confirma que `.github/` se extrajo; es una carpeta oculta en muchos exploradores.
3. Comprueba el proyecto:

   ```bash
   npm ci
   npm run check
   ```

4. Inicia el repositorio local. Sustituye `URL_REAL_DEL_REPOSITORIO` por la URL HTTPS o SSH que GitHub muestra en tu repositorio:

   ```bash
   git init -b main
   git add .
   git commit -m "feat: sitio institucional NERQIA"
   git remote add origin URL_REAL_DEL_REPOSITORIO
   ```

5. En GitHub, entra a **Settings → Pages → Build and deployment → Source** y selecciona **GitHub Actions**. Si la organización restringe Actions, habilita los workflows y las acciones oficiales utilizadas.
6. Sube el proyecto:

   ```bash
   git push -u origin main
   ```

7. Revisa **Actions → Quality and GitHub Pages**. El trabajo `deploy` se ejecuta únicamente después de que `build` complete lint, tipos, pruebas y compilación.
8. Abre la URL que aparezca en el entorno **github-pages** o en **Settings → Pages**. También puedes iniciar una ejecución con **Actions → Quality and GitHub Pages → Run workflow**, seleccionando `main`.

El workflow deduce la URL real desde el propietario y el nombre del repositorio. Configura automáticamente el prefijo `/NOMBRE_DEL_REPOSITORIO/`; para un repositorio llamado igual que el sitio de usuario de GitHub Pages utiliza `/`. No necesitas editar Vite ni insertar un usuario ficticio en el código.

En los pull requests se ejecutan las mismas comprobaciones, sin despliegue ni permisos de escritura. El único trabajo con permisos `pages: write` e `id-token: write` es `deploy`.

### Compilación manual para una URL pública

Copia `.env.example` a `.env.local` y configura **tu URL real**, sin fragmentos ni parámetros. Incluye el nombre del repositorio cuando corresponda:

```bash
cp .env.example .env.local
```

Edita `VITE_SITE_URL` y elimina la línea `VITE_BASE_PATH` para inferirla automáticamente desde la URL. Después:

```bash
npm run build
npm run preview
```

La ruta raíz es español; `en/` contiene la versión inglesa. No se necesitan redirecciones SPA ni una regla que convierta todos los errores 404 en la portada.

Cuando no se configura una URL pública, el build local omite canonical, URLs absolutas de Open Graph y sitemap para evitar publicar direcciones inventadas. El workflow configura esa URL y genera `sitemap.xml` y `robots.txt` correctos al publicar.

## Actualizar contenidos y productos

### Empresa y correo corporativo

Edita `src/config/site.ts`:

- `name`, `legalName` y `descriptor`: identidad de empresa.
- `email`: cambia el correo una sola vez; se actualizan todos los enlaces `mailto:`.
- `socials`: lista de perfiles reales con `{ label, href }`. Mientras esté vacía no aparecen enlaces sociales.

Los asuntos de los correos están traducidos y codificados para conservar tildes, espacios y signos. El navegador abre la aplicación de correo del visitante; el sitio no simula el envío.

### Textos e idiomas

Edita `src/content/copy.ts`. Incluye títulos, menús, metadatos, problemas, servicios, ejemplos, productos, formulario y privacidad en `es` y `en`. TypeScript exige que la traducción inglesa tenga la misma estructura. La marca y su descriptor se conservan en ambos idiomas.

El selector usa enlaces HTML a páginas reales. No usa cookies, almacenamiento local ni detección de ubicación. El HTML está prerenderizado en ambos idiomas y declara `lang`, canonical y `hreflang` al configurar la URL pública.

### Ocultar o mostrar productos

En `src/config/site.ts`:

```ts
products: {
  enabled: true,
  visible: [] as ProductId[], // Estado inicial de V1.1: ambos productos ocultos.
},
```

Con `visible: []` no se renderiza la sección ni aparecen enlaces de innovación en el menú o footer. Los contenidos y visuales se conservan para una publicación posterior a la revisión empresarial y de propiedad intelectual. Para mostrar solo uno, deja `enabled: true` y agrega su identificador (`match-alpha` o `galactic-explorer`) a `visible`. Para ocultar globalmente la sección, usa `enabled: false`.

Para agregar un producto, amplía `ProductId`, sus textos en ambos idiomas y su visual en `ProductVisual`. Las pruebas cubren el estado inicial oculto, un producto visible y ambos visibles. No hay enlaces comerciales ni fechas de lanzamiento inventadas.

### Contacto sin backend

El enlace directo al correo sigue visible. El formulario solicita nombre, correo, necesidad y una descripción de 10 a 1000 caracteres. Al elegir **Revisar mi borrador**, valida los campos, enfoca el primer error o muestra una vista previa. No anuncia un envío exitoso ni realiza peticiones HTTP.

Desde esa vista puedes abrir tu aplicación de correo con destinatario, asunto y cuerpo ya preparados, o copiar el mensaje para pegarlo en tu cliente. Tú confirmas el envío en el correo. Cambiar un campo invalida el borrador anterior; **Borrar datos** vacía los campos, errores y borrador de esta página. No elimina mensajes ya enviados ni el contenido de un portapapeles externo.

Los datos se mantienen en estado de React, sin localStorage, sessionStorage, analítica ni un endpoint de recepción. El formulario prerenderizado permanece deshabilitado hasta que se conecta el manejador de JavaScript, para evitar un envío GET nativo de datos personales si los scripts no cargan. En ese caso sigue disponible el enlace directo al correo. La política de privacidad describe estas mismas acciones en ES y EN.

**Límites de `mailto:` y copia:**

- Necesita una aplicación de correo configurada; el navegador no confirma entrega ni recepción.
- Se codifican Unicode y caracteres reservados; los saltos del cuerpo usan CRLF conforme a RFC 6068.
- No existe un máximo universal de longitud compatible con todos los clientes. El proyecto usa un límite conservador de 2000 caracteres para la URI codificada: sobre él conserva la vista previa y la copia, y omite el enlace largo. Un mensaje más corto tampoco garantiza compatibilidad con todo cliente.
- La copia automática requiere una API de portapapeles disponible y autorizada por el navegador. Si falla, el borrador queda seleccionado y se ofrecen instrucciones para copiar manualmente. No se solicitan permisos de lectura del portapapeles.
- Los máximos de campos reducen errores de uso, pero no verifican la existencia del buzón ni sustituyen validaciones en un servicio receptor futuro.

Para incorporar posteriormente envío transaccional real, reemplaza solo el adaptador de entrega del formulario después de seleccionar un proveedor y definir costes, límites, protección contra abuso, validación en servidor y manejo de datos. Las credenciales deben quedar en un servicio de confianza, nunca en `VITE_*` ni en el bundle. Actualiza privacidad, estados de envío y pruebas, y confirma recepción real antes de anunciar que el formulario envía.

### Diseño

`src/styles/tokens.css` centraliza colores. `src/styles/index.css` contiene layout, puntos de adaptación, foco visible, impresión y `prefers-reduced-motion`. Se utilizan tipografías del sistema para evitar solicitudes a Google Fonts o a otra CDN.

Los SVG de marca y diagramas son originales y editables. El logotipo es provisional; este proyecto no acredita su registro como marca. Las imágenes Open Graph en `public/` se incluyen en PNG y SVG editable; si cambias la marca, actualiza ambas versiones e idiomas con tu editor habitual.

## Dominio propio

Solo cuando tengas un dominio real bajo tu control:

1. En **Settings → Pages → Custom domain**, ingresa tu dominio y sigue las instrucciones de GitHub para configurar el DNS.
2. En **Settings → Secrets and variables → Actions → Variables**, crea una variable de repositorio llamada `PUBLIC_SITE_URL` con la URL HTTPS real del dominio, sin ruta si el sitio vivirá en la raíz.
3. Activa **Enforce HTTPS** cuando el certificado esté disponible.
4. Ejecuta nuevamente el workflow. Se actualizarán rutas, canonical, idiomas, sitemap e imágenes sociales.

Para volver al dominio de GitHub Pages, elimina el dominio personalizado y la variable `PUBLIC_SITE_URL`, y vuelve a ejecutar. No se incluye un archivo `CNAME` con un dominio supuesto.

## Accesibilidad, privacidad y rendimiento

- HTML semántico, un `h1` por idioma, encabezados ordenados y regiones con nombre.
- Enlace para saltar al contenido, foco visible y enlaces con nombres comprensibles.
- Menú móvil y aviso de privacidad con el elemento nativo `dialog`: foco modal, cierre con Escape y retorno al control de apertura.
- Animación SVG decorativa y lenta, desactivada si se pide reducir movimiento.
- Contrastes revisados para el texto principal y secundario.
- Sin cookies de seguimiento, analítica, cuentas, endpoints de formularios ni fuentes externas.
- Solo React y React DOM como dependencias de ejecución.

El aviso de privacidad describe el borrador local, la apertura del cliente de correo, el portapapeles y el contacto directo. Revísalo si posteriormente cambian el alojamiento o los datos tratados. No se han realizado auditorías legales ni certificaciones de accesibilidad.

## Resolución de problemas

| Síntoma                                      | Solución                                                                                                                                |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `npm ci` falla por versión de Node           | Usa Node 24 LTS; verifica `node --version` y `npm --version`. Con nvm: `nvm install && nvm use`.                                        |
| Puerto de desarrollo ocupado                 | `npm run dev -- --port 5174`.                                                                                                           |
| Pantalla en blanco al abrir un archivo       | Usa `npm run dev` o, tras compilar, `npm run preview`; no `file://`.                                                                    |
| Recursos 404 en Pages                        | Comprueba la URL del repositorio, `PUBLIC_SITE_URL` si existe y que el workflow haya compilado con el prefijo correcto.                 |
| Selector inglés falla en un hosting distinto | Publica todo `dist/`, incluyendo `en/index.html`; conserva la barra final de `en/`.                                                     |
| No aparece sitemap al compilar localmente    | Configura `VITE_SITE_URL`. La URL real es necesaria para generar un sitemap válido.                                                     |
| Error entre URL pública y base               | Elimina `VITE_BASE_PATH` para inferirlo o hazlo coincidir exactamente con la ruta de `VITE_SITE_URL`.                                   |
| Pages devuelve 404 tras publicar             | Habilita Pages con Source = GitHub Actions, usa la rama `main` y revisa el entorno `github-pages`.                                      |
| El correo no abre una ventana                | Configura una aplicación predeterminada para `mailto:` o usa **Copiar mensaje** desde la vista previa y envíalo a la dirección visible. |
| Se ve una versión anterior                   | Comprueba que el workflow finalizó y recarga sin caché. Las redes sociales pueden conservar su propia caché de vista previa.            |
| Quiero publicar bajo otra rama               | Ajusta `on.push.branches`, `pull_request.branches` y las condiciones `refs/heads/main` del workflow.                                    |

## Referencias

- [RFC 6068: URI mailto y codificación](https://www.rfc-editor.org/rfc/rfc6068.html)
- [MDN: API de portapapeles](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
- [Vite: publicación de sitios estáticos](https://vite.dev/guide/static-deploy.html)
- [GitHub Pages: configurar el origen de publicación](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Pages: workflows personalizados](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Pages: dominios personalizados](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

Consulta `docs/DISENO_Y_ARQUITECTURA.md` y `docs/VALIDACION.md` para las decisiones de implementación y el alcance de las comprobaciones realizadas.
