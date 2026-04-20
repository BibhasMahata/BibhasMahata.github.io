# Bibhas Mahata — Portfolio

Personal portfolio site. Live at: `https://BibhasMahata.github.io`

## Deploy to GitHub Pages (3 steps)

### Option A — Dedicated repo (recommended)

1. Create a new GitHub repo named exactly: **`BibhasMahata.github.io`**
2. Upload all files keeping this folder structure:
   ```
   BibhasMahata.github.io/
   ├── index.html
   ├── css/
   │   └── style.css
   ├── js/
   │   └── main.js
   └── README.md
   ```
3. Push to the `main` branch — GitHub Pages auto-deploys from root.

Your site will be live at **https://BibhasMahata.github.io** in ~60 seconds.

### Option B — Any existing repo

1. Push files to a repo (e.g. `portfolio`)
2. Go to **Settings → Pages**
3. Source: `Deploy from a branch` → Branch: `main` → Folder: `/ (root)`
4. Save — site goes live at `https://BibhasMahata.github.io/portfolio`

## Run locally (no Node needed)

Just open `index.html` directly in your browser. Or if you want a local server:

```bash
# Python (built-in, no install needed)
python3 -m http.server 3000
# then open http://localhost:3000
```

## File structure

```
portfolio/
├── index.html       ← single HTML file
├── css/
│   └── style.css    ← all styles, fonts, animations
├── js/
│   └── main.js      ← constellation, radar, skill bars, typewriter, cursor
└── README.md
```

No build step. No npm. No dependencies. Pure HTML/CSS/JS.
