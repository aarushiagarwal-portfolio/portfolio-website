# American Express carousel: Tech talent (B2 style, 6 slides)

Saved from the design canvas on 10 Nov 2026:
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
  - All three posts are square (1:1). 1080×1080 fits every frame.
  - The current images are 400px. Sharper versions will look better in the PNGs.
- **Re-export PNGs:** double-click `export-png.sh`, or run `./export-png.sh` in Terminal from this folder. It needs Google Chrome.

## Links (slide 6)

- US: https://www.instagram.com/p/DMz5duxsbKX/
- UK: https://www.instagram.com/p/DODonVpAOO4/
- India: https://www.instagram.com/p/DODqSzMjIuE/

## Design tokens (from americanexpress.com)

- Background (Deep Blue): `#00175A`
- Highlighted words, Clicks card, accents (Bright Blue): `#006FCF`
- Light card (click-through rate): `#F2F3F7`
- Text: `#ffffff`, secondary text `rgba(255,255,255,0.7–0.8)`
- Instagram ring gradient: `#8B1A1A → #C0392B → #E91E8C → #FF6B35`
- Fonts: Bricolage Grotesque (800/700, headlines and numbers) and Roboto (700/500, labels and body)
- Layout: 24px margins, slide label top-left, page number top-right
