#!/usr/bin/env bash
# Spot-check will-irr.com after publishing Wix changes.
set -euo pipefail

BASE="${1:-https://www.will-irr.com}"

check() {
  local path="$1"
  local expect="$2"
  local code
  code=$(curl -sS -o /dev/null -w "%{http_code}" -L --max-redirs 0 "$BASE$path" 2>/dev/null || true)
  # Follow redirects separately for final URL
  local final
  final=$(curl -sS -o /dev/null -w "%{http_code} %{url_effective}" -L "$BASE$path")
  echo "$path -> $final (expect: $expect)"
}

echo "=== Direct status (no follow) for old slugs ==="
for path in /about-4 /about-4-1 /services-8 /services-4 /contact-9; do
  code=$(curl -sS -o /dev/null -w "%{http_code}" --max-redirs 0 "$BASE$path" || true)
  loc=$(curl -sS -o /dev/null -w "%{redirect_url}" --max-redirs 0 "$BASE$path" || true)
  echo "$path => HTTP $code Location: $loc"
done

echo ""
echo "=== Final destinations ==="
check "/" "200 home"
check "/holiday-lighting" "200 holiday"
check "/landscape-lighting" "200 landscape (after rename)"
check "/cities-we-serve" "200 cities"
check "/irrigation-repair-cleburne-tx" "200 cleburne"
check "/post/how-to-winterize-your-sprinkler-system-in-texas-without-using-compressed-air" "200 blog"

echo ""
echo "=== Content smoke checks ==="
html=$(curl -sS "$BASE/")
if echo "$html" | grep -q 'tel:1234567890'; then
  echo "FAIL: tel:1234567890 still present on home/footer"
else
  echo "OK: no tel:1234567890 on home HTML"
fi

cities=$(curl -sS "$BASE/cities-we-serve")
if echo "$cities" | grep -qi 'serounding'; then
  echo "FAIL: typo 'serounding' still on cities page"
else
  echo "OK: cities typo not found"
fi
if echo "$cities" | grep -q 'irrigation-repair-aledo-tx'; then
  echo "OK: Aledo linked"
else
  echo "WARN: Aledo link not found in cities HTML (may be client-rendered)"
fi

echo ""
echo "Done. Re-check visually in browser for Wix client-rendered menus."
