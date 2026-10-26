# Registro de validación

Fecha: 26 de octubre de 2026.

## Comprobaciones ejecutadas

| Comprobación                                                       | Resultado                                                      |
| ------------------------------------------------------------------ | -------------------------------------------------------------- |
| ESLint con `--max-warnings 0`                                      | Correcto                                                       |
| TypeScript `tsc --noEmit`                                          | Correcto                                                       |
| Vitest + Testing Library                                           | 13 pruebas correctas, 2 archivos                               |
| Build de producción en raíz                                        | Correcto                                                       |
| Build de producción con prefijo `/nerqia/` y URL pública de prueba | Correcto                                                       |
| HTML prerenderizado ES/EN                                          | Verificado en build y navegador                                |
| Hidratación de HTML en ambos idiomas                               | 2 pruebas específicas correctas, conserva los nodos existentes |
| Enlaces internos y sus destinos                                    | Sin anclas rotas en el HTML generado                           |
| Correo y asuntos con caracteres especiales                         | Verificados                                                    |
| Recursos JS, CSS, favicon e imagen social                          | Verificados contra los archivos de salida                      |
| Canonical, alternates, sitemap y robots con URL configurada        | Generados en compilación con subruta                           |
| Compilación sin URL pública                                        | Omite direcciones supuestas y sitemap; robots válido           |
| Script de instalación                                              | Sintaxis Bash comprobada                                       |

Las pruebas cubren secciones principales, ambos idiomas, rutas del selector, contacto, navegación, apertura y cierre de diálogos, productos ocultos o individuales y compatibilidad con subrutas.

## Revisión en navegador

Se utilizó una previsualización HTTP del build estático. Las vistas responsive se revisaron mediante marcos de ancho fijo, sin depender de un teléfono físico:

- Escritorio: 1280 px; también se revisó la portada en un viewport de escritorio mayor.
- Tablet: 768 px.
- Móvil: 390 px.
- Móvil angosto: 320 px, en español y en inglés.

No se detectó desbordamiento horizontal del documento en los anchos comprobados. El ancho de contenido resulta ligeramente menor por la barra de desplazamiento del navegador.

El menú móvil abre como diálogo modal. Escape lo cierra y devuelve el foco al botón de apertura. El aviso de privacidad abre y muestra el contenido correspondiente. Los enlaces de idioma y correo conservan el prefijo de publicación.

Se revisaron los colores computados de 119 elementos con texto en la vista de escritorio: ninguno quedó bajo el umbral AA aplicable a su tamaño, comparando texto con la superficie opaca de su sección. Esto no equivale a una auditoría completa de accesibilidad. Los SVG decorativos se excluyeron de esa comprobación.

La consola de la compilación de producción no registró errores de los recursos de la aplicación durante estas comprobaciones. Se descartaron mensajes propios de la extensión del entorno de revisión. La revisión detectó y corrigió un arranque de hidratación innecesario en desarrollo cuando el contenedor solo tenía el comentario de plantilla.

## Alcance y límites

- Los clics automáticos sobre enlaces de ancla se restringieron en el navegador de revisión; sus destinos y la estructura de navegación se validaron mediante pruebas y análisis del HTML generado.
- No se ejecutó Lighthouse ni se atribuyen puntuaciones de rendimiento.
- No se ejecutaron Safari, Firefox ni pruebas en dispositivos físicos.
- El workflow de GitHub Actions está preparado, pero su despliegue remoto se verificará cuando el propietario suba el proyecto y habilite GitHub Pages en el repositorio real.
- No se ha registrado una marca, contratado un dominio ni añadido servicios comerciales.

## Volver a verificar

```bash
npm ci
npm run check
npm run preview
```

Después, revisa portada, servicios, contacto y diálogos a distintos anchos. Abre `/en/` para comprobar también el contenido inglés. Antes de publicar manualmente, configura la URL pública real como indica el README.
