enum env {
  AUTH_URL = 'https://accounts.spotify.com/authorize',
  AUTH_REQUEST_TOKEN_URL = 'https://accounts.spotify.com/api/token',
  AUTH_CLIENT_ID = '5ca64c0a829949428154075795560d0d',
  AUTH_SCOPE = 'user-read-playback-state user-modify-playback-state user-read-currently-playing streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read user-read-email user-read-private',
  AUTH_REDIRECT_URL = 'https://localhost:5173/auth',
}

export default env;
