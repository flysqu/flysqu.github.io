from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/toptracks')
def top_tracks():
    # flying-squirrel bio site 	
    # API Key: 8b5112c880e3300928239d25ce6ea85c
    # Shared Secret: cb014300510d464883438e7b2fbd7ce7
    # Created: Tuesday 21 May 2024, 6:51pm
	# a little stats embed cuz its cool and stuff
    apiKey = '8b5112c880e3300928239d25ce6ea85c'
    username = 'flysqu'
    apiUrl = f'https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user={username}&period=7day&limit=15&period="overall"&api_key={apiKey}&format=json'



    try:
        response = requests.get(apiUrl)
        data = response.json()
        
        # Extract track information
        tracks = data.get('toptracks', {}).get('track', [])
        
        # Create a list to store track data including images
        tracks_with_images = []
        
        # Loop through each track and fetch image
        index = 1
        for track in tracks:
            track_name = track['name']
            artist_name = track['artist']['name']
            playcount = track['playcount']
            duration = track['duration']
            playtime = float(duration)*float(playcount)
            playtime = round(playtime/3600,2)
            url = track['url']
            # Append track data along with image to the list
            tracks_with_images.append({
                'index': index,
                'name': track_name,
                'artist': artist_name,
                'playcount': playcount,
                'playtime': playtime,
                'url': url,
                'duration': duration
            })
            index += 1
            
        return jsonify(tracks_with_images)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)