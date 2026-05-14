from PIL import Image
import sys

img = Image.open(sys.argv[1]).convert("RGBA")
data = img.getdata()

new_data = []
threshold = 230  # pixels with R,G,B all above this are treated as "white"

for pixel in data:
    r, g, b, a = pixel
    if r > threshold and g > threshold and b > threshold:
        new_data.append((r, g, b, 0))  # make transparent
    else:
        new_data.append(pixel)

img.putdata(new_data)
img.save(sys.argv[2], "PNG")
print(f"Done: {sys.argv[2]}")
