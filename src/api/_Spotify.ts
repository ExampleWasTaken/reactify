import { AuthorizationCodeWithPKCEStrategy, SpotifyApi } from '@spotify/web-api-ts-sdk';

const CLIENT_ID = '5ca64c0a829949428154075795560d0d';
const REDIRECT_URL = 'https://localhost:5173/app/authflow';
const SCOPE = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
  'user-follow-modify',
  'user-follow-read',
  'user-read-playback-position',
  'user-top-read',
  'user-read-recently-played',
  'user-library-modify',
  'user-library-read',
  'user-read-email',
  'user-read-private',
];

export class _Spotify {
  private static instance: _Spotify;
  private auth = new AuthorizationCodeWithPKCEStrategy(CLIENT_ID, REDIRECT_URL, SCOPE);
  private _sdk = new SpotifyApi(this.auth);

  public get sdk(): SpotifyApi {
    return this._sdk;
  }

  public static getInstance(): _Spotify {
    if (!this.instance) this.instance = new _Spotify();
    return this.instance;
  }
}
