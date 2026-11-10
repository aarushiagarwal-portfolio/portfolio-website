# Siemens carousel: New business pitch (B2 style, 4 slides)

Saved from the design canvas on 10 Nov 2026:
https://claude.ai/artifact/EZBsWhiJEXzEUUrEsstnqm

The pitch deck is confidential, so this carousel uses no images. The visuals are drawn in code: the gold trophy, the confetti and the icons.

## What's in this folder

| File | What it is |
|---|---|
| `index.html` | All 4 slides side by side. Open it in a browser to review. |
| `slide-1-cover.html` … `slide-4-what-i-delivered.html` | One editable file per slide (432×540 design size). |
| `png/` | Finished 1080×1350 PNGs, ready to post or drop into Canva. |
| `export-png.sh` | Re-creates the PNGs after you edit a slide. |

## Making changes

- **Change text:** open the slide's `.html` file in any text editor and edit the words between the tags.
- **Re-export PNGs:** double-click `export-png.sh`, or run `./export-png.sh` in Terminal from this folder. It needs Google Chrome.

## Design tokens

- Text and dark accents (Siemens deep blue): `#000028`
- Accent, highlighted words, numbers (mint): `#08F4C7`
- Feature panels, highlight blocks (navy): `#001234`
- Background: `#F5F6F8`, cards `#ffffff`
- Secondary text: `rgba(0,0,40,0.62)`
- Trophy gold: `#FFE27A → #F4C430 → #C9931A`
- Fonts: Bricolage Grotesque (800/700, headlines and numbers) and Roboto (700/500, labels and body)
- Layout: 24px margins, slide label top-left with a mint dot, page number top-right
- Highlighted words sit in a navy block with mint text.
