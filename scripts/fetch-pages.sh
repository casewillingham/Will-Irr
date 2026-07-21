#!/bin/bash
set -euo pipefail
export PATH="/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin"
mkdir -p /tmp/will-pages
for path in services about commercial design cities-we-serve \
  irrigation-repair-benbrook-tx irrigation-repair-fortworth-tx \
  irrigation-repair-cleburne-tx irrigation-repair-aledo-tx \
  irrigation-repair-whitesettlement-texas irrigation-repair-palmilla-springs-tx; do
  curl -sL "https://www.will-irr.com/$path" -o "/tmp/will-pages/${path}.html"
  echo "page $path $(wc -c < /tmp/will-pages/${path}.html)"
done
python3 << 'PY'
from pathlib import Path
import re
for name in ["services","about","commercial","design","cities-we-serve","irrigation-repair-benbrook-tx","irrigation-repair-cleburne-tx"]:
    p=Path(f"/tmp/will-pages/{name}.html")
    if not p.exists():
        print(name, "MISSING"); continue
    html=p.read_text(errors="replace")
    title=re.search(r"<title[^>]*>(.*?)</title>", html, re.I|re.S)
    desc=re.search(r'og:description"\s+content="([^"]+)"', html)
    h1=re.search(r"<h1[^>]*>(.*?)</h1>", html, re.I|re.S)
    print("\n====", name, "====")
    print("TITLE:", (title.group(1).strip() if title else None)[:140])
    print("DESC:", (desc.group(1)[:180] if desc else None))
    print("H1:", re.sub(r"<[^>]+>","",h1.group(1)).strip()[:140] if h1 else None)
    # Grab visible paragraphs near middle of page
    texts = re.findall(r'<p[^>]*>([^<]{40,300})</p>', html)
    for t in texts[:8]:
        print(" P:", t[:160])
PY
