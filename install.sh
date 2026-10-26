#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")"
if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo 'Instala Node.js 24 LTS (incluye npm) antes de continuar.' >&2
  exit 1
fi
node --input-type=module -e 'const [major,minor]=process.versions.node.split(".").map(Number); if (major<22 || (major===22 && minor<12)) { console.error("Requiere Node >=22.12. Recomendado: Node 24 LTS."); process.exit(1); }'
npm ci
npm run check
printf '\nInstalación y verificaciones completadas. Inicia con: npm run dev\n'
