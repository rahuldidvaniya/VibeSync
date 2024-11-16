from django.urls import path
from .views import SpotifyRecommendationView, ArtistSearchView, TrackSearchView, GenreSearchView

urlpatterns = [
    path('recommendations/', SpotifyRecommendationView.as_view(), name='spotify-recommendations'),
    path('search/artists/', ArtistSearchView.as_view(), name='artist-search'),
    path('search/tracks/', TrackSearchView.as_view(), name='track-search'),
    path('available-genres/', GenreSearchView.as_view(), name='available-genres'),
]
