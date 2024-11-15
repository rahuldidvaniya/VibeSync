from typing import Optional
import requests
from django.conf import settings
import base64


def get_spotify_access_token() -> Optional[str]:
    """
    Get spotify access token using client credentials from Django settings.

    Returns:
        Optional[str]: Access token if successful, None otherwise.
    """
    auth_string = f"{settings.SPOTIFY_CLIENT_ID}:{settings.SPOTIFY_CLIENT_SECRET}"
    auth_bytes = auth_string.encode("utf-8")
    auth_base64 = base64.b64encode(auth_bytes).decode("utf-8")

    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": f"Basic {auth_base64}",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {"grant_type": "client_credentials"}
    
    try:
        response = requests.post(url, headers=headers, data=data)
        response.raise_for_status()
        
        json_result = response.json()
        # Use dictionary get() method instead of calling it
        return json_result.get('access_token')
        
    except requests.exceptions.RequestException as e:
        print(f"Error getting Spotify access token: {e}")
        return None