"""Generate the repository's social preview from the existing Kroma mark."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SCALE = 2
image = Image.new("RGB", (1200 * SCALE, 630 * SCALE), "#08090d")
draw = ImageDraw.Draw(image)
font_root = Path("/usr/share/fonts/truetype/dejavu")

def font(size, bold=False):
    name = "DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"
    return ImageFont.truetype(str(font_root / name), size * SCALE)

def text(x, y, value, size, color="#ffffff", bold=False):
    draw.text((x * SCALE, y * SCALE), value, font=font(size, bold), fill=color)

draw.rounded_rectangle((72*SCALE, 70*SCALE, 132*SCALE, 130*SCALE), radius=15*SCALE, fill="#2563eb")
for points in [[(92,85),(92,115)],[(92,100),(113,85)],[(97,97),(113,115)]]:
    draw.line([(x*SCALE,y*SCALE) for x,y in points], fill="white", width=5*SCALE)
text(151, 74, "Kroma", 40, bold=True)
text(300, 74, "Web", 40, "#80aaff", True)
text(74, 199, "Uma presença melhor.", 59, bold=True)
text(74, 277, "Um caminho mais claro.", 59, "#b4c9fb", True)
text(76, 409, "Sites  ·  Landing pages  ·  Sistemas", 27, "#b5bece")
draw.rounded_rectangle((76*SCALE, 487*SCALE, 612*SCALE, 551*SCALE), radius=12*SCALE, fill="#2563eb")
text(98, 504, "Escopo claro. Atendimento direto.", 24, bold=True)
image = image.resize((1200, 630), Image.Resampling.LANCZOS)
image.save(ROOT / "public/og-kroma.png", optimize=True)
print("Imagem social gerada: 1200 × 630.")
