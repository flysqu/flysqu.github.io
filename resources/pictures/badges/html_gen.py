import os

BADGES_DIR = "resources/pictures/badges"
OUTPUT_FILE = "badges.html"

files = sorted(os.listdir(BADGES_DIR))
img_tags = [
    f'<img src="..{BADGES_DIR}/{fname}" class="badge" alt="{fname}">'
    for fname in files if not fname.startswith('.')
]

html = ""
for imgs in img_tags:
    html += imgs
    html += " \n"

print("Generated HTML: \n")
print(f"{html}")