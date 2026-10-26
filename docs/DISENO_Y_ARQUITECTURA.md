# Diseño y arquitectura

## Identidad y relato

Azul profundo para transmitir precisión; menta/cian moderado para acciones y conexiones; superficies marfil para dar descanso al recorrido. El contraste entre secciones distingue servicios, enfoque y contacto. No hay fotografías de stock, robots, supuestos clientes ni métricas comerciales.

La marca provisional combina una N geométrica con un punto de conexión y un logotipo tipográfico. La red de portada representa cómo datos y procesos se conectan para producir soluciones. Los visuales de productos son ilustraciones conceptuales, no capturas de funcionalidades existentes ni estadísticas de rendimiento.

El recorrido explica qué hace NERQIA, adapta la oferta a distintos problemas, presenta un proceso concreto, identifica los productos como iniciativas en desarrollo y termina con contacto directo. Match Alpha se describe como análisis e información sobre fútbol; no promete resultados.

## Arquitectura

Una sola aplicación React con contenido tipado ES/EN. Cada build genera HTML completo para `/` y `/en/`, usando React DOM Server como herramienta de compilación. El navegador hidrata el contenido. El despliegue recibe únicamente archivos estáticos: no requiere Node, servidor de aplicaciones, base de datos ni secretos en ejecución.

`site.ts` contiene datos empresariales y switches de productos. `copy.ts` contiene el texto comercial, navegación y metadatos. Los componentes reciben contenido por propiedades para facilitar cambios sin duplicación. Se evita una biblioteca de internacionalización o un router para solo dos páginas equivalentes.

La URL pública proviene de configuración de compilación. El workflow la deduce del repositorio o utiliza la variable explícita `PUBLIC_SITE_URL` para un dominio propio. Vite y el prerenderizado reciben el mismo prefijo; una inconsistencia provoca un error de build.

Canonical, alternates y sitemap se generan solo cuando existe una URL pública. No se incorporan datos estructurados con ubicación, teléfono, reseñas, antigüedad o servicios certificados no confirmados.

## Accesibilidad e interacciones

Los enlaces de navegación y de idioma son HTML real. Cada región referencia su encabezado. Los SVG decorativos se ocultan al lector de pantalla. Los diálogos nativos administran modalidad y Escape; los controles tienen etiquetas en el idioma activo. Las animaciones se detienen con reducción de movimiento y no transportan información necesaria para usar el sitio.

No hay un banner de cookies porque la aplicación no añade rastreadores ni cookies. El alojamiento y el correo tienen sus propias prácticas, descritas de manera general en el aviso de privacidad.

## Evolución y mantenimiento

El proyecto puede extenderse con páginas de servicios, productos o contenidos manteniendo rutas estáticas y metadatos por página. Incorporar formularios reales, datos personales adicionales, analítica o un backend requiere definir primero el servicio receptor, errores de envío, seguridad y aviso de privacidad apropiados.

Mantén el lockfile versionado. Ejecuta `npm run check` al modificar dependencias o contenido y revisa visualmente ambos idiomas. Las acciones de GitHub están fijadas por commit; su actualización debe revisarse junto con el pipeline. El despliegue remoto se comprobará al ejecutar el workflow en el repositorio real.
