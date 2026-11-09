# RWE carousel (B2 style, 6 slides)

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
  - Slides 1 and 2 post cards: the frame is slightly wider than tall. Square (1:1) or 4:5 pictures both work, and the top and bottom get trimmed a little.
  - Slide 6 reels: 9:16 (1080×1920) fits exactly.
  - Slide 6 posts: 4:5 (1080×1350) fits exactly.
  - To show a different part of a picture, change its `object-position` (for example `center 30%`: lower numbers show more of the top).
- **Re-export PNGs:** double-click `export-png.sh`, or run `./export-png.sh` in Terminal from this folder. It needs Google Chrome.

## Design tokens

- Background (RWE navy): `#1b3a6b`
- Accent (mint): `#3ed8c3`
- Text: `#ffffff`, secondary text `#dfe7f2`, labels `#b9c8dc`
- Instagram ring gradient: `#8B1A1A → #C0392B → #E91E8C → #FF6B35`
- Fonts: Bricolage Grotesque (800/700, headlines and numbers) and Roboto (700/500, labels and body)
- Layout: 24px margins, slide label top-left, page number top-right

For another brand's case study, copy this folder and change the navy and mint values to that brand's colours.
