#!/usr/bin/env bash
# Weekly SEO autopilot for flowmoat.com.
# Picks the next pending keyword in keywords.json, has Claude write a blog post for it,
# draws its OG image, runs the SEO audit, and opens a pull request for you to review.
# Nothing is published until you merge the PR. See seo-autopilot/README.md.
set -euo pipefail
export PATH="/usr/local/bin:/usr/bin:/bin:$HOME/.local/bin:$PATH"
REPO="$(cd "$(dirname "$0")/.." && pwd)"
DIR="$REPO/seo-autopilot"
mkdir -p "$DIR/logs"
exec >>"$DIR/logs/$(date +%F).log" 2>&1
echo "=== $(date -Is) start"

CLAUDE="$(command -v claude || ls -d "$HOME"/.vscode/extensions/anthropic.claude-code-*/resources/native-binary/claude 2>/dev/null | sort -V | tail -1)"
[ -x "$CLAUDE" ] || { echo "claude CLI not found"; exit 1; }

cd "$REPO"
git fetch -q origin
git checkout -q main
git pull -q --ff-only origin main

# Ping IndexNow so last week's merged post gets crawled
node scripts/indexnow.mjs || true

# Next pending keyword with no post and no open PR
PICK=""
for slug in $(python3 "$DIR/helper.py" pending "$DIR/keywords.json"); do
  [ -f "src/content/blog/$slug.md" ] && continue
  [ -n "$(gh pr list --head "seo/auto-$slug" --state open --json number -q '.[].number')" ] && continue
  PICK="$slug"; break
done
[ -n "$PICK" ] || { echo "No pending keywords left. Add more to keywords.json."; exit 0; }
eval "$(python3 "$DIR/helper.py" keyword "$DIR/keywords.json" "$PICK")"   # sets KEYWORD SERVICE LINKS
echo "keyword: $KEYWORD -> $PICK ($SERVICE)"

BRANCH="seo/auto-$PICK"
git checkout -q -B "$BRANCH"

POSTS="$(ls src/content/blog | sed 's/\.md$//; s|^|/blog/|; s|$|/|' | tr '\n' ' ')"
PROMPT="$(cat <<P
Write one blog post for flowmoat.com, an AI engineering and automation company serving businesses in the US, UK and Europe.

Target search keyword: "$KEYWORD"
Service this post funnels toward: $SERVICE

Output ONLY the Markdown file, starting with the --- frontmatter line. No commentary, no code fence around the file.

Frontmatter fields, exactly these, in this order:
title (natural headline containing the keyword), metaTitle (max 55 characters), description (140-155 characters, contains the keyword),
excerpt (1-2 sentences), answer (a 40-60 word direct answer to the search query that an AI engine could quote),
published: $(date +%F), service: $SERVICE, readingTime (integer minutes), faqs (4 items, each with q and a, answers 1-3 sentences).
Quote every string value with double quotes.

Body rules:
- 1200-1600 words, plain English, short paragraphs, ## and ### headings, at least one table or numbered list.
- Practical and specific: real tools, real trade-offs, cost and time stated as typical ranges.
- Never invent statistics, studies, client names, case results or quotes. No "we helped X achieve Y%".
- Do not use: delve, leverage, seamless, cutting-edge, game-changer, unlock, "in today's fast-paced world".
- Link naturally (Markdown links, relative URLs) to: $LINKS, and to /contact/ once near the end.
  You may also link one of these existing posts if relevant: $POSTS
- End with a short section on when to get outside help, mentioning Flowmoat once, without hype.

An existing post from the site, for format and tone only (do not reuse its content):

$(cat src/content/blog/n8n-vs-make-vs-custom-code.md)
P
)"

OUT="src/content/blog/$PICK.md"
"$CLAUDE" -p "$PROMPT" --tools "" --output-format text > "$OUT.raw"
python3 "$DIR/helper.py" clean "$OUT.raw" "$OUT"
rm -f "$OUT.raw"
eval "$(python3 "$DIR/helper.py" meta "$OUT")"   # sets TITLE SUB MINUTES
python3 "$DIR/og-image.py" "$PICK" "$TITLE" "$SUB" "$SERVICE" "$MINUTES"

if ! npm run --silent seo:audit; then
  echo "SEO audit failed; draft discarded"
  rm -f "$OUT" "public/og/blog-$PICK.jpg"
  git checkout -q main; git branch -q -D "$BRANCH"
  exit 1
fi

python3 "$DIR/helper.py" done "$DIR/keywords.json" "$PICK"
git add "$OUT" "public/og/blog-$PICK.jpg" "$DIR/keywords.json"
git commit -qm "Blog: $TITLE

Target keyword: $KEYWORD. Drafted by the SEO autopilot.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push -q -u origin "$BRANCH"
gh pr create --base main --head "$BRANCH" --title "Blog: $TITLE" --body "Target keyword: **$KEYWORD**

Read it, fix anything that isn't true for Flowmoat, then merge. Merging publishes it.

🤖 Generated with [Claude Code](https://claude.com/claude-code)"
git checkout -q main
echo "=== $(date -Is) done"
