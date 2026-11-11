"""Draws public/og/blog-<slug>.jpg in the site's OG style.
Usage: python3 seo-autopilot/og-image.py <slug> "<title>" "<subtitle>" <service> <minutes>"""
import pathlib, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONT = "/usr/share/fonts/truetype/ubuntu/UbuntuSans[wdth,wght].ttf"
W, H, PAD = 1200, 630, 72
LABELS = {"ai-engineering": "AI ENGINEERING", "ai-modernization": "AI MODERNIZATION",
          "custom-software-development": "CUSTOM SOFTWARE", "workflow-automation": "WORKFLOW AUTOMATION"}

def font(size, weight="Bold"):
    f = ImageFont.truetype(FONT, size); f.set_variation_by_name(weight); return f

def wrap(d, text, f, width):
    lines, line = [], ""
    for w in text.split():
        t = f"{line} {w}".strip()
        if d.textlength(t, font=f) <= width: line = t
        else: lines.append(line); line = w
    return lines + [line]

slug, title, subtitle, service, minutes = sys.argv[1:6]
img = Image.new("RGBA", (W, H), (7, 10, 18, 255))
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
ImageDraw.Draw(glow).ellipse([-200, -260, 420, 300], fill=(84, 215, 255, 60))
ImageDraw.Draw(glow).ellipse([900, 420, 1400, 900], fill=(118, 240, 177, 30))
img.alpha_composite(glow.filter(ImageFilter.GaussianBlur(120)))
grid = Image.new("RGBA", (W, H), (0, 0, 0, 0)); g = ImageDraw.Draw(grid)
for x in range(0, W, 60): g.line([(x, 0), (x, H)], fill=(255, 255, 255, 12))
for y in range(0, H, 60): g.line([(0, y), (W, y)], fill=(255, 255, 255, 12))
img.alpha_composite(grid)
d = ImageDraw.Draw(img)
logo = Image.open(ROOT / "public/brand/linkedin-logo-300-rounded.png").convert("RGBA").resize((52, 52), Image.LANCZOS)
img.alpha_composite(logo, (PAD, 66))
d.text((PAD + 66, 92), "Flowmoat", font=font(30), fill=(247, 251, 255), anchor="lm")
d.text((PAD, 218), LABELS.get(service, ""), font=font(17, "Medium"), fill=(118, 240, 177), anchor="lm")
for size in (64, 58, 52, 46):
    tf = font(size); lines = wrap(d, title, tf, W - 2 * PAD - 120)
    if len(lines) <= 2: break
y = 250
for line in lines[:3]:
    d.text((PAD, y), line, font=tf, fill=(247, 251, 255)); y += int(size * 1.18)
sf = font(26, "Regular"); y += 18
d.text((PAD, y), wrap(d, subtitle, sf, W - 2 * PAD)[0], font=sf, fill=(170, 183, 202)); y += 58
for i in range(112):
    t = i / 111; c = tuple(round(a + (b - a) * t) for a, b in zip((84, 215, 255), (255, 209, 102)))
    d.line([(PAD + i, y), (PAD + i, y + 4)], fill=c)
d.text((PAD, H - 76), "flowmoat.com", font=font(20, "Regular"), fill=(170, 183, 202), anchor="lm")
d.text((W - PAD, H - 76), f"{minutes} min read", font=font(20, "Regular"), fill=(170, 183, 202), anchor="rm")
out = ROOT / "public/og" / f"blog-{slug}.jpg"
img.convert("RGB").save(out, quality=88); print(out)
