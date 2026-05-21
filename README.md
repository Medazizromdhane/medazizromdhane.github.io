# Chess8an

Chess8an is a free static Chess.com game analyzer for GitHub Pages. It imports public Chess.com games by username, analyzes PGN locally in the browser, recommends better moves, and explains each decision with board arrows and candidate lines.

Copyright (c) 2026 Mohamed Aziz Romdhane.

## What is included

- Free GitHub Pages hosting: no paid backend needed.
- Chess.com public API import by username and monthly archive.
- PGN paste/import workflow.
- Browser-side chess move generator, evaluator, and minimax search.
- Illustrated move review with amber arrows for the played move and green arrows for the recommendation.
- Local browser database using `localStorage` for saved analyses.
- PWA manifest and service worker so the site can be added to an iPhone home screen.

## Important Chess.com integration note

Chess.com's public API is read-only and does not require authentication. Official Chess.com password login/OAuth is not openly available to every static site; Chess.com requires developers to apply for OAuth access before building authenticated login. Chess8an therefore uses the free public API and never asks users for a Chess.com password.

## Run locally

```bash
node server.cjs
```

Open:

```text
http://localhost:4173
```

You can also open `index.html` directly, but the PWA service worker needs `http://localhost` or GitHub Pages.

## Push to GitHub

From this folder:

```bash
git add .
git commit -m "Build Chess8an analyzer"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/chess8an.git
git push -u origin main
```

If your repository already has a remote, use this instead of `git remote add`:

```bash
git remote set-url origin https://github.com/YOUR_GITHUB_USERNAME/chess8an.git
git push -u origin main
```

## Turn on free GitHub Pages

1. Open the repository on GitHub.
2. Go to `Settings`.
3. Go to `Pages`.
4. Under `Build and deployment`, set `Source` to `Deploy from a branch`.
5. Select branch `main` and folder `/ (root)`.
6. Save.

Your free URL will look like:

```text
https://YOUR_GITHUB_USERNAME.github.io/chess8an/
```

## Add it to iPhone as an app

1. Open the GitHub Pages URL in Safari on iPhone.
2. Tap the Share button.
3. Tap `Add to Home Screen`.
4. Name it `Chess8an`.
5. Tap `Add`.

## Legal

Chess8an is independent and is not affiliated with Chess.com, LLC. Chess.com is a trademark of Chess.com, LLC. This project uses Chess.com public data where available and avoids copying Chess.com private features, board palettes, piece designs, sound effects, and move classification glyphs.
