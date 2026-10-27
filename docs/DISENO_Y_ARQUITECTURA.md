# Diseño y arquitectura

## Identidad y relato

Azul profundo para transmitir precisión; menta/cian moderado para acciones y conexiones; superficies marfil para dar descanso al recorrido. El contraste entre secciones distingue servicios, enfoque y contacto. No hay fotografías de stock, robots, supuestos clientes ni métricas comerciales.

La marca provisional combina una N geométrica con un punto de conexión y un logotipo tipográfico. La red de portada representa cómo datos y procesos se conectan para producir soluciones. Los visuales de productos son ilustraciones conceptuales, no capturas de funcionalidades existentes ni estadísticas de rendimiento.

V1.1 conecta cuatro problemas cotidianos con capacidades del sitio y añade cuatro ejemplos explícitamente hipotéticos. Conserva la tipografía, paleta, logotipo y red de portada; reduce el espaciado vertical general de 108 a 84 px en escritorio y de 65 a 56 px en móvil. El contacto usa una segunda columna para el formulario, que pasa a una sola columna en pantallas menores.

Los productos siguen implementados, pero la lista central de visibilidad parte vacía. Cuando no hay productos aprobados, no se generan sección, enlaces ni huecos. Match Alpha conserva su descripción de análisis e información y no promete resultados.

## Arquitectura

Una sola aplicación React con contenido tipado ES/EN. Cada build genera HTML completo para `/` y `/en/`, usando React DOM Server como herramienta de compilación. El navegador hidrata el contenido. El despliegue recibe únicamente archivos estáticos: no requiere Node, servidor de aplicaciones, base de datos ni secretos en ejecución.

`site.ts` contiene datos empresariales y switches de productos. `copy.ts` contiene el texto comercial, navegación y metadatos. Los componentes reciben contenido por propiedades para facilitar cambios sin duplicación. Se evita una biblioteca de internacionalización o un router para solo dos páginas equivalentes.

La URL pública proviene de configuración de compilación. El workflow la deduce del repositorio o utiliza la variable explícita `PUBLIC_SITE_URL` para un dominio propio. Vite y el prerenderizado reciben el mismo prefijo; una inconsistencia provoca un error de build.

Canonical, alternates y sitemap se generan solo cuando existe una URL pública. No se incorporan datos estructurados con ubicación, teléfono, reseñas, antigüedad o servicios certificados no confirmados.

## Accesibilidad e interacciones

Los enlaces de navegación y de idioma son HTML real. Cada región referencia su encabezado. Los SVG decorativos se ocultan al lector de pantalla. Los diálogos nativos administran modalidad y Escape; los controles tienen etiquetas en el idioma activo. Las animaciones se detienen con reducción de movimiento y no transportan información necesaria para usar el sitio.

El formulario tiene etiquetas nativas, errores relacionados mediante `aria-describedby`, resumen de errores y foco en el primer control inválido. El borrador se enfoca al prepararlo y los resultados de copia o borrado se anuncian mediante una región de estado.

No hay un banner de cookies porque la aplicación no añade rastreadores ni cookies. El alojamiento y el correo tienen sus propias prácticas, descritas de manera general en el aviso de privacidad.

## Evolución y mantenimiento

El proyecto puede extenderse con páginas de servicios, productos o contenidos manteniendo rutas estáticas y metadatos por página. El formulario actual compone un borrador en memoria mediante `src/lib/contact.ts`; no tiene transporte de red. `ContactForm` mantiene únicamente el estado de edición y la presentación, sin bibliotecas nuevas. Los saltos CRLF se conservan en la URI de correo, mientras el textarea usa LF para evitar que una actualización de estado reinicie la selección de copia manual.

La hidratación habilita los controles después de conectar el manejador; antes de eso permanecen deshabilitados y el correo directo sigue operativo. Los datos no forman parte del HTML estático ni del sitemap. Sustituir el borrador por entrega transaccional requiere definir un servicio receptor, validar en servidor, manejar errores y revisar privacidad, sin exponer credenciales al navegador.

Mantén el lockfile versionado. Ejecuta `npm run check` al modificar dependencias o contenido y revisa visualmente ambos idiomas. Las acciones de GitHub están fijadas por commit; su actualización debe revisarse junto con el pipeline. El workflow existente se conserva: los PR validan y únicamente `main` puede desplegar. Esta iteración se entrega mediante PR; no modifica ajustes del repositorio, permisos, secretos ni hosting.
