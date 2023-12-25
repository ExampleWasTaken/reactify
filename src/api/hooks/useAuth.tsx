import { use_internal_spotifyAPIContext } from './internal/use_internal_spotifyAPIContext.tsx';

import env from '../../utils/public-env.ts';
import utils from '../../utils/utils.ts';
import { AccessToken } from '../types/InternalTypes.ts';

export const useAuth = () => {
  const spotify = use_internal_spotifyAPIContext();

  const generateState = () => {
    return window.crypto.randomUUID().toString();
  };

  const validateState = (state: string) => {
    return state === localStorage.getItem('reactify:auth_state');
  };

  /**
   * Get a new access token using a refresh token.
   */
  const refreshToken = async () => {
    const unverifiedAccessTokenData = localStorage.getItem('reactify:access_token');

    if (!unverifiedAccessTokenData) {
      throw new Error('No access token data found in localStorage.');
    }

    const accessTokenData = JSON.parse(unverifiedAccessTokenData) as AccessToken;
    const refreshToken = accessTokenData.refresh_token;
    const url = env.AUTH_REQUEST_TOKEN_URL;

    const params = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: spotify.clientId,
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

    setTimeout(() => refreshToken, 1_800_000); // 30 minutes
  };

  /**
   * Request a code that can be traded for an access token. This function should be used to initiate authentication.
   */
  const requestAuthorization = async (): Promise<void> => {
    const authUrl = new URL(env.AUTH_URL);

    const codeVerifier = utils.generateRandomString(128);
    const hashed = await utils.sha256(codeVerifier);
    const codeChallenge = utils.base64encode(hashed);
    const state = generateState();

    localStorage.setItem('reactify:code_verifier', codeVerifier);
    localStorage.setItem('reactify:auth_state', state);

    const params = {
      client_id: spotify.clientId,
      response_type: 'code',
      redirect_uri: spotify.redirectUrl.toString(),
      state,
      scope: spotify.scopes,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  };

  /**
   * Request the access token using the code retrieved by `requestAuthorization()`.
   */
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
    const url = env.AUTH_REQUEST_TOKEN_URL;

    const params = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: spotify.redirectUrl.toString(),
      client_id: spotify.clientId,
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

    // remove state and verifier from local storage
    localStorage.removeItem('reactify:auth_state');
    localStorage.removeItem('reactify:code_verifier');

    setTimeout(() => refreshToken, 1_800_000); // 30 minutes
  };

  /**
   * Get the access token object from local storage. This function returning `null` means the user is not logged in.
   */
  const getAccessToken = (): AccessToken | null => {
    const accessToken = localStorage.getItem('reactify:access_token');
    if (!accessToken) return null;
    return JSON.parse(accessToken) as AccessToken;
  };

  /**
   * Easy way to tell if the user is logged in. Basically just checks if `getAccessToken()` is null.
   */
  const isLoggedIn = () => {
    const accessToken = getAccessToken();
    return (
      accessToken &&
      accessToken.access_token &&
      accessToken.token_type &&
      accessToken.expires_in &&
      accessToken.refresh_token &&
      accessToken.expires
    );
  };

  return {
    requestAuthorization,
    requestAccessToken,
    refreshToken,
    getAccessToken,
    isLoggedIn,
  };
};
