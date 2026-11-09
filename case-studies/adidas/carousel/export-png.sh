#!/bin/zsh
# Re-export every slide-*.html in this folder as a 1080x1350 PNG into ./png
cd "$(dirname "$0")"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
mkdir -p png
for f in slide-*.html; do
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2.5 \
    --window-size=432,540 --virtual-time-budget=6000 \
    --screenshot="$PWD/png/${f%.html}.png" "file://$PWD/$f" >/dev/null 2>&1
  echo "png/${f%.html}.png"
done
