# Validación de NERQIA V1.1

Fecha: 26 de octubre de 2026. Base inspeccionada: `main`, commit `82f74e219bd90ed8d0755b4b675d2077eec0fa71`. La línea base pasó sus 13 pruebas antes de editar.

## Automatización ejecutada

| Comprobación                                        | Resultado                              |
| --------------------------------------------------- | -------------------------------------- |
| `npm ci` con el lockfile existente                  | Correcto; sin dependencias nuevas      |
| `npm run lint`                                      | Correcto, cero advertencias            |
| `npm run typecheck`                                 | Correcto                               |
| `npm test`                                          | 30 pruebas correctas en 3 archivos     |
| `npm run build` en raíz, sin URL pública            | Correcto; no publica URLs supuestas    |
| `npm run check`                                     | Correcto: lint, tipos, pruebas y build |
| Build con la URL de Pages y prefijo `/nerqia-site/` | Correcto                               |
| `git diff --check`                                  | Correcto                               |

La última compilación valida directamente `dist`: un H1 y un título por idioma, `lang`, descripciones, Open Graph, Twitter Cards, canonical, alternates `hreflang`, rutas de idioma, favicon, JS/CSS y anclas. Con URL pública también verifica sitemap y robots; sin URL omite sitemap y canonical.

Las pruebas cubren contenido institucional y ejemplos ES/EN, productos ocultos de forma predeterminada, activación individual o conjunta, menú, privacidad e hidratación. El contacto añade validaciones, foco en errores, borrador completo, normalización CRLF, Unicode y caracteres reservados, descarte del borrador obsoleto, borrado, copia autorizada y copia manual ante rechazo del portapapeles. Los borradores largos conservan el texto y omiten el enlace `mailto:` potencialmente incompatible. También se verifica que preparar el borrador no llame a `fetch` ni escriba en almacenamiento local.

El formulario está deshabilitado en el HTML estático y se habilita al conectar JavaScript. Una prueba y la verificación de build cubren esta protección frente a un envío GET nativo sin manejador.

## Navegador y responsive

Se revisó el build estático en Chrome mediante marcos de anchos nominales **320, 360, 390, 768, 1024 y 1440 px**, en español e inglés. El viewport interno descuenta la barra de desplazamiento. En los 12 casos el ancho de contenido coincidió con el viewport, sin desbordamiento horizontal, y no apareció la sección de productos.

Se inspeccionaron portada, problemas, servicios, formulario y borrador. El formulario en móvil muestra errores, enfoca el primer campo inválido, prepara y copia el mensaje, y borra los datos de prueba. Se verificó el orden de tabulación Nombre → Correo en escritorio. El menú móvil enfoca su cierre al abrir, permite tabular a la navegación, cierra con Escape y devuelve el foco al botón de apertura.

Se revisaron los colores computados de **142 elementos con texto** en la vista de escritorio, sin resultados bajo el contraste AA correspondiente a su tamaño. Es una comprobación de texto contra superficies opacas, no una certificación ni una auditoría completa de WCAG 2.2. Los controles tienen bordes distinguibles, etiquetas, errores asociados y foco visible; el CSS conserva reducción de movimiento.

No se registraron errores de los recursos de la aplicación en la consola durante las revisiones de producción. Se excluyeron mensajes de la extensión del entorno de pruebas.

## Tamaño y límites

La compilación para Pages produjo aproximadamente **82,51 kB gzip de JavaScript** y **6,18 kB gzip de CSS**. Frente a la línea base, el aumento es de unos 4,3 kB y 1,1 kB respectivamente. No cambió el lockfile ni se añadieron bibliotecas.

- No hay Lighthouse instalado en este entorno; no se atribuyen puntuaciones.
- No se probaron Safari, Firefox ni dispositivos físicos.
- La navegación por anclas se comprueba por sus destinos y las pruebas; el automatizador restringió ese tipo de clic durante la revisión inicial.
- No se enviaron correos reales. `mailto:` depende del cliente y no confirma entrega; la copia manual es una alternativa disponible.
- El pipeline se conserva y la ejecución remota se consulta en el PR. No se habilita auto-merge, no se fusiona ni se despliega manualmente.
- El aviso de privacidad describe las funciones reales; no representa una revisión jurídica ni una afirmación de cumplimiento integral.

## Reproducir

```bash
npm ci
npm run check
VITE_SITE_URL=https://bodegafresh.github.io/nerqia-site VITE_BASE_PATH=/nerqia-site/ npm run build
npm run preview
```

Revisa ambas páginas y el formulario a los anchos indicados, incluyendo datos inválidos, borrador, copia y borrado. El enlace de correo permanece disponible sin el formulario.

## Actualización de identidad V1.0

La revisión de marca parte del `main` que integra V1.1 y conserva sus 30 pruebas. La suite pasa a 40 pruebas en cuatro archivos. Ver [BRAND_VALIDATION.md](BRAND_VALIDATION.md) para integridad SVG/PNG/ICO, generación reproducible, rutas de Pages, revisión responsive y capturas comparativas.
