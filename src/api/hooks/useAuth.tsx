import { use_internal_spotifyAPIContext } from './internal/use_internal_spotifyAPIContext.tsx';
import { AccessToken } from '@spotify/web-api-ts-sdk';
import { AccessTokenResponse } from '../types/InternalTypes.ts';

export const useAuth = () => {
  const { clientId, redirectUrl, scopes } = use_internal_spotifyAPIContext();
  const authUrl = new URL('https://accounts.spotify.com/authorize');

  const generateRandomString = (length: number) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
  };

  const sha256 = async (plain: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  };

  const base64encode = (input: ArrayBuffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  const generateState = () => {
    return window.crypto.randomUUID().toString();
  };

  const validateState = (state: string) => {
    return state === localStorage.getItem('reactify:auth_state');
  };

  const refreshToken = async () => {
    const unverifiedAccessTokenData = localStorage.getItem('reactify:access_token');

    if (!unverifiedAccessTokenData) {
      throw new Error('No access token data found in localStorage.');
    }

    const accessTokenData = JSON.parse(unverifiedAccessTokenData) as AccessToken;
    const refreshToken = accessTokenData.refresh_token;
    const url = 'https://accounts.spotify.com/api/token';

    const params = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId,
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
      console.error('Token refresh fail');
    }

    const body = await response.json();

    const accessToken: AccessToken = {
      access_token: body.access_token,
      token_type: body.token_type,
      refresh_token: body.refresh_token,
      expires_in: body.expires_in,
      expires: Date.now() + body.expires_in,
    };

    localStorage.setItem('reactify:access_token', JSON.stringify(accessToken));
  };

  const requestAuthorization = async (): Promise<void> => {
    const codeVerifier = generateRandomString(128);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    const state = generateState();

    localStorage.setItem('reactify:code_verifier', codeVerifier);
    localStorage.setItem('reactify:auth_state', state);

    const params = {
      client_id: clientId,
      response_type: 'code',
      redirect_uri: redirectUrl.toString(),
      state,
      scope: scopes.join(' '),
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  };

  const requestAccessToken = async () => {
    const urlParams = new URLSearchParams(window.location.search);

    const code = urlParams.get('code');
    const error = urlParams.get('error');
    const state = urlParams.get('state');

    const codeVerifier = localStorage.getItem('reactify:code_verifier');

    if (!state) {
      throw new Error('Expected "state" field in URL query parameters.');
    }

    if (!validateState(state)) {
      throw new Error('State does not match. Aborting authentication flow.');
    }

    if (!code) {
      if (!error) {
        throw new Error('Expected either "code" or "error" field in URL search parameters');
      }
      throw new Error(`Error occurred while requesting access token: ${error}`);
    }

    if (!codeVerifier) {
      throw new Error('No code verifier found in localStorage.');
    }

    // Response is valid -> request token
    const params = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUrl.toString(),
      client_id: clientId,
      code_verifier: codeVerifier,
    };

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(params),
    };

    const response = await fetch(authUrl, payload);
    const body = (await response.json()) as AccessTokenResponse;

    const accessToken: AccessToken = {
      access_token: body.access_token,
      token_type: body.token_type,
      refresh_token: body.refresh_token,
      expires_in: body.expires_in,
      expires: Date.now() + body.expires_in,
    };

    localStorage.setItem('reactify:access_token', JSON.stringify(accessToken));

    setTimeout(() => refreshToken, body.expires_in - 300000);
  };

  const getAccessToken = (): AccessToken | null => {
    const accessToken = localStorage.getItem('reactify:access_token');
    if (!accessToken) return null;
    return JSON.parse(accessToken) as AccessToken;
  };

  return {
    requestAuthorization,
    requestAccessToken,
    getAccessToken,
  };
};
