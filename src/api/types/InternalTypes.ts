export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type SearchParamsObject = Record<string, string | number | undefined>;

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

// Our own API types
export type ArtistAlbumsIncludeGroup = 'album' | 'single' | 'appears_on' | 'compilation';
