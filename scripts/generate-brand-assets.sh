
#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(git rev-parse --show-toplevel)"
BRAND="$ROOT/public/brand"
PUBLIC="$ROOT/public"

command -v inkscape >/dev/null || {
  echo "ERROR: instala inkscape"
  exit 1
}

command -v magick >/dev/null || {
  echo "ERROR: instala ImageMagick"
  exit 1
}

render() {
  local src="$1"
  local dest="$2"
  local width="$3"

  mkdir -p "$(dirname "$dest")"

  inkscape "$src" \
    --export-filename="$dest" \
    --export-width="$width" \
    --export-background-opacity=0

  echo "OK: ${dest#"$ROOT"/}"
}

echo "=== NERQIA Brand Assets ==="

# 1. Logos horizontales y verticales
for svg in "$BRAND"/logos/*.svg; do
  name="$(basename "$svg" .svg)"

  for width in 512 1024 2048; do
    render "$svg" \
      "$BRAND/logos/${name}-${width}.png" \
      "$width"
  done
done

# 2. Símbolos de marca
for svg in "$BRAND"/symbols/*.svg; do
  name="$(basename "$svg" .svg)"

  for width in 64 128 256 512 1024; do
    render "$svg" \
      "$BRAND/symbols/${name}-${width}.png" \
      "$width"
  done
done

# 3. Documentos corporativos
for svg in "$BRAND"/documents/*.svg; do
  name="$(basename "$svg" .svg)"

  render "$svg" \
    "$BRAND/documents/${name}.png" \
    2048
done

# 4. Recursos para redes sociales
render "$BRAND/social/og-image.svg" \
  "$BRAND/social/og-image.png" 1200

render "$BRAND/social/social-banner.svg" \
  "$BRAND/social/social-banner-generated.png" 1500

# 5. Iconos web y PWA
# Usar una variante cuadrada y contrastante.
ICON="$BRAND/symbols/nerqia-network-corporate.svg"

mkdir -p "$PUBLIC/icons"

for size in 16 32 48 64 72 96 128 144 180 192 256 384 512; do
  render "$ICON" \
    "$PUBLIC/icons/icon-${size}.png" \
    "$size"
done

# 6. Favicon multiresolución
magick \
  "$PUBLIC/icons/icon-16.png" \
  "$PUBLIC/icons/icon-32.png" \
  "$PUBLIC/icons/icon-48.png" \
  "$PUBLIC/favicon.ico"

# 7. Apple Touch Icon
cp "$PUBLIC/icons/icon-180.png" \
   "$PUBLIC/apple-touch-icon.png"

echo ""
echo "Generación finalizada."
