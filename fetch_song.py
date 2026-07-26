import urllib.request
import json

# Search Github or internet for direct MP3 files of romantic wedding / flute music or inkem inkem
headers = {'User-Agent': 'Mozilla/5.0'}

# Let's try downloading from a reliable royalty-free romantic flute / wedding track or direct mp3 CDN link
test_urls = [
    "https://actions.google.com/sounds/v1/ambiences/outdoor_theme_park.ogg",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
]

for url in test_urls:
    try:
        print(f"Testing {url}")
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            if len(data) > 500000:
                with open('public/music.mp3', 'wb') as f:
                    f.write(data)
                print(f"DOWNLOADED {len(data)} bytes to public/music.mp3")
                break
    except Exception as e:
        print(f"Error {url}: {e}")
