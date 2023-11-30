import {
  AuthorizationCodeWithPKCEStrategy,
  SpotifyApi,
} from '@spotify/web-api-ts-sdk';

const CLIENT_ID = '5ca64c0a829949428154075795560d0d';
const REDIRECT_URL = 'http://localhost:5173/app/authflow';
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

export class Spotify {
  private static instance: Spotify;
  private auth = new AuthorizationCodeWithPKCEStrategy(
    CLIENT_ID,
    REDIRECT_URL,
    SCOPE
  );
  private _sdk = new SpotifyApi(this.auth);

  public get sdk(): SpotifyApi {
    return this._sdk;
  }

  public static getInstance(): Spotify {
    if (!this.instance) this.instance = new Spotify();
    return this.instance;
  }
}
