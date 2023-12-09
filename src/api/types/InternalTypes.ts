export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface Response<TReturnType> {
  headers: Headers;
  data: TReturnType;
}

export type SpotifyResponse<TReturnType> = Response<TReturnType> | null;

export interface AuthorizationResponse {
  code: string;
  state: string;
}

export interface AccessTokenResponse {
  access_token: string;
  token_type: 'Bearer';
  scope: string;
  expires_in: number;
  refresh_token: string;
}

export interface TokenRefreshResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token: string;
  scope: string;
}
