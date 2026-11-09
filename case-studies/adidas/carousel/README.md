# adidas carousel: Paid social (B2 style, 6 slides)

Saved from the design canvas on 9 Nov 2026:
https://claude.ai/artifact/EZBsWhiJEXzEUUrEsstnqm

## What's in this folder

| File | What it is |
|---|---|
| `index.html` | All 6 slides side by side. Open it in a browser to review. |
| `slide-1-cover.html` … `slide-6-the-work.html` | One editable file per slide (432×540 design size). |
| `images/` | Every picture the slides use. |
| `png/` | Finished 1080×1350 PNGs, ready to post or drop into Canva. |
| `export-png.sh` | Re-creates the PNGs after you edit a slide. |

## Making changes

- **Change text:** open the slide's `.html` file in any text editor and edit the words between the tags.
- **Swap a picture:** replace the file in `images/` and keep the same name, or point the slide's `src="images/…"` at a new file.
  - All four posts are square (1:1). Square pictures at 1080×1080 fit every frame.
  - The current images are 400px. Sharper versions will look better in the PNGs.
- **Re-export PNGs:** double-click `export-png.sh`, or run `./export-png.sh` in Terminal from this folder. It needs Google Chrome.

## Links (slide 6)

- Global: https://www.instagram.com/p/Cuj_R7ENunk/
- Retail: https://www.instagram.com/p/CumjooJNT1e/
- Digital & Tech: https://www.instagram.com/p/Corw1hujRMj/
- Early Careers: https://www.instagram.com/p/Cs_i5bXtyC5/

## Design tokens (from adidas.co.uk)

- Background: `#ffffff`
- Text and feature cards: `#000000`
- Highlighted words, labels, secondary text: `#767677`
- Light panel (Clicks card): `#ECEFF1`
- Instagram ring gradient: `#8B1A1A → #C0392B → #E91E8C → #FF6B35`
- Fonts: Bricolage Grotesque (800/700, headlines and numbers) and Roboto (700/500, labels and body)
- Layout: 24px margins, slide label top-left, page number top-right
