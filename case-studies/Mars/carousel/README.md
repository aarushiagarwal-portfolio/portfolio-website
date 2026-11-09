# Mars carousel: Made By You Podcast (B2 style, 7 slides)

Saved from the design canvas on 9 Nov 2026:
https://claude.ai/artifact/EZBsWhiJEXzEUUrEsstnqm

## What's in this folder

| File | What it is |
|---|---|
| `index.html` | All 7 slides side by side. Open it in a browser to review. |
| `slide-1-cover.html` … `slide-7-the-work.html` | One editable file per slide (432×540 design size). |
| `images/` | Every picture the slides use. |
| `png/` | Finished 1080×1350 PNGs, ready to post or drop into Canva. |
| `export-png.sh` | Re-creates the PNGs after you edit a slide. |

## Making changes

- **Change text:** open the slide's `.html` file in any text editor and edit the words between the tags.
- **Swap a picture:** replace the file in `images/` and keep the same name, or point the slide's `src="images/…"` at a new file.
  - Slide 1 player artwork and slide 2 post card use `made-by-you-logo.jpeg`, zoomed in on the logo. If you swap in a clean logo file, adjust the `left`, `top` and `width` values on that image.
  - Slide 7 reels: 9:16 (1080×1920) fits exactly.
  - Slide 7 quote card: 4:5 (1080×1350) fits exactly.
- **Re-export PNGs:** double-click `export-png.sh`, or run `./export-png.sh` in Terminal from this folder. It needs Google Chrome.

## Links

- Trailer: https://www.instagram.com/p/Cz86n6rNtiX/
- Social cut 1 (frame at 0:32.7): https://www.instagram.com/p/CzY3Wqct2ir/
- Social cut 2 (frame at 0:19, subtitle removed): https://www.instagram.com/p/Cz9AC3otdHJ/
- Quote card: https://www.instagram.com/p/CzrG0ULNxWU/
- Podcast on Spotify: https://open.spotify.com/show/1U1QkaQYnV6KCxJSel6RMc

## Design tokens

- Background: `#ffffff`
- Mars Blue (text, cards): `#0000A0`
- Mars turquoise (highlighted words, accents): `#00D7B9`
- Body text: `rgba(0,0,160,0.78)`
- Instagram ring gradient: `#8B1A1A → #C0392B → #E91E8C → #FF6B35`
- Fonts: Bricolage Grotesque (800/700, headlines and numbers) and Roboto (700/500, labels and body)
- Layout: 24px margins, slide label top-left, page number top-right
