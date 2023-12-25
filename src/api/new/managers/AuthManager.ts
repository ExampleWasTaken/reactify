import { AccessToken, TokenRefreshResponse } from '../../types/InternalTypes.ts';
import env from '../../../utils/public-env.ts';
import { Spotify } from '../Spotify.ts';

export class AuthManager {
  private readonly spotify: Spotify;

  constructor(spotify: Spotify) {
    this.spotify = spotify;
  }

  public async requestAuthorization(): Promise<void> {
    const authUrl = new URL(env.AUTH_URL);

    const codeVerifier = this.generateRandomString(128);
    const hashed = await this.sha256(codeVerifier);
    const codeChallenge = this.base64encode(hashed);
    const state = this.generateState();

    localStorage.setItem('reactify:code_verifier', codeVerifier);
    localStorage.setItem('reactify:auth_state', state);

    const params = {
      client_id: this.spotify.getClientId(),
      response_type: 'code',
      redirect_uri: this.spotify.getRedirectUrl().toString(),
      state,
      scope: this.spotify.getScopes(),
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  }

  public async requestAccessToken(): Promise<void> {
    const urlParams = new URLSearchParams(window.location.search);

    const code = urlParams.get('code');
    const error = urlParams.get('error');
    const state = urlParams.get('state');

    const codeVerifier = localStorage.getItem('reactify:code_verifier');

    if (!state) {
      return Promise.reject('Expected "state" field in URL query parameters.');
    }

    if (!this.validateState(state)) {
      this.abortAuthenticationFlow();
      return Promise.reject('State does not match. Aborting authentication flow');
    }

    if (!code) {
      if (!error) {
        return Promise.reject('Expected either "code" or "error" field in URL query parameters.');
      }
      return Promise.reject(`An error occurred while trying to exchange access token: ${error}`);
    }

    if (!codeVerifier) {
      return Promise.reject('No code verifier found in local storage.');
    }

    // Authorization was successful -> request token
    const url = env.AUTH_REQUEST_TOKEN_URL;

    const params = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.spotify.getRedirectUrl().toString(),
      client_id: this.spotify.getClientId(),
      code_verifier: codeVerifier,
    };

    const payload: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(params),
    };

    const response = await fetch(url, payload);

    const body = await response.json();

    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers);
    console.log('Response Body:', body);

    if (response.status !== 200) {
      console.error(
        'Authentication request returned status:',
        response.status,
        ' ',
        response.statusText,
        '\nBody:',
        body
      );
      return;
    }

    // Log the response body
    console.log('Response Body:', body);

    const accessToken: AccessToken = {
      access_token: body.access_token,
      token_type: body.token_type,
      refresh_token: body.refresh_token,
      expires_in: body.expires_in,
      expires: Date.now() + body.expires_in * 1000,
    };

    localStorage.setItem('reactify:access_token', JSON.stringify(accessToken));

    setTimeout(this.refreshToken, 1_800_000); // 30 minutes
  }

  public async refreshToken(): Promise<void> {
    const accessToken = this.getAccessToken();

    if (!accessToken) {
      return Promise.reject('No access token found in localStorage');
    }

    const refreshToken = accessToken.refresh_token;
    const url = env.AUTH_REQUEST_TOKEN_URL;

    const params = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: this.spotify.getClientId(),
    };

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(params),
    };

    const response = await fetch(url, payload);

    if (response.status !== 200) {
      return Promise.reject(`Trying to refresh token returned status ${response.status}.`);
    }

    const body = (await response.json()) as TokenRefreshResponse;

    const newAccessToken: AccessToken = {
      access_token: body.access_token,
      token_type: body.token_type,
      refresh_token: body.refresh_token,
      expires_in: body.expires_in,
      expires: Date.now() + body.expires_in * 1000,
    };

    localStorage.setItem('reactify:access_token', JSON.stringify(newAccessToken));

    setTimeout(this.refreshToken, 1_800_000); // 30 minutes
  }

  public getAccessToken(): AccessToken | null {
    const lsValue = localStorage.getItem('reactify:access_token');

    if (!lsValue) return null;
    const token = JSON.parse(lsValue) as AccessToken;

    if (!(token.access_token && token.token_type && token.expires_in && token.refresh_token && token.expires)) {
      return null;
    }

    return token;
  }

  public isLoggedIn(): boolean {
    const accessToken = this.getAccessToken();

    return (
      !!accessToken &&
      !!accessToken.access_token &&
      !!accessToken.token_type &&
      !!accessToken.expires_in &&
      !!accessToken.refresh_token &&
      !!accessToken.expires
    );
  }

  private generateState(): string {
    return window.crypto.randomUUID().toString();
  }

  private validateState(state: string): boolean {
    return state === localStorage.getItem('reactify:auth_state');
  }

  private abortAuthenticationFlow(): void {
    localStorage.removeItem('reactify:auth_state');
    localStorage.removeItem('reactify:code_verifier');
  }

  private generateRandomString(length: number): string {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
  }

  private async sha256(plain: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  }

  private base64encode(input: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }
}
