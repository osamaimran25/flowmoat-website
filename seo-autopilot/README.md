# SEO autopilot

Every Monday at 10:00 (this laptop's time), `run.sh`:

1. Pings IndexNow (Bing, and through it ChatGPT search) with the current sitemap, so last week's merged post gets crawled.
2. Takes the next `pending` keyword from `keywords.json`.
3. Has Claude (the `claude` CLI, no tools) write a 1200–1600 word post in the site's blog format. The post links to that keyword's solution or service pages and to `/contact/`.
4. Draws the post's OG image with `og-image.py`.
5. Runs `npm run seo:audit`. If the audit fails, the draft is thrown away.
6. Opens a pull request `seo/auto-<slug>`.

**Nothing goes live until you merge the PR.** Read it first and remove anything that isn't true for Flowmoat. Merging deploys the post to GitHub Pages.

## Commands

```bash
seo-autopilot/run.sh                 # run now instead of waiting for Monday
tail -50 seo-autopilot/logs/*.log    # what happened
crontab -l                           # the schedule
```

## Adding keywords

Add an object to `keywords.json` with `status: "pending"`. `service` must be one of `ai-engineering`, `ai-modernization`, `custom-software-development` or `workflow-automation`. `links` are the pages the post must link to.

## Requirements

The laptop must be on at run time (cron skips runs while it's off), `gh` must be logged in, and the `claude` CLI must be signed in.
