import { Track } from '@spotify/web-api-ts-sdk';

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type SearchParamsObject = Record<string, string | number | undefined>;

export interface AccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  expires: number;
}

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

/* Recommendations types */
export interface RecommendationsRequest {
  [key: string]: string | string[] | number | undefined;

  limit?: number;
  market?: string;
  seed_artists?: string[];
  seed_genres?: string[];
  seed_tracks?: string[];
  min_acousticness?: number;
  max_acousticness?: number;
  target_acousticness?: number;
  min_danceability?: number;
  max_danceability?: number;
  target_danceability?: number;
  min_duration_ms?: number;
  max_duration_ms?: number;
  target_duration_ms?: number;
  min_energy?: number;
  max_energy?: number;
  target_energy?: number;
  min_instrumentalness?: number;
  max_instrumentalness?: number;
  target_instrumentalness?: number;
  min_key?: number;
  max_key?: number;
  target_key?: number;
  min_liveness?: number;
  max_liveness?: number;
  target_liveness?: number;
  min_loudness?: number;
  max_loudness?: number;
  target_loudness?: number;
  min_mode?: number;
  max_mode?: number;
  target_mode?: number;
  min_popularity?: number;
  max_popularity?: number;
  target_popularity?: number;
  min_speechiness?: number;
  max_speechiness?: number;
  target_speechiness?: number;
  min_tempo?: number;
  max_tempo?: number;
  target_tempo?: number;
  min_time_signature?: number;
  max_time_signature?: number;
  target_time_signature?: number;
  min_valence?: number;
  max_valence?: number;
  target_valence?: number;
}

export interface RecommendationsResponse {
  seeds: RecommendationSeed[];
  tracks: Track[];
}

export interface RecommendationSeed {
  afterFilteringSize: number;
  afterRelinkingSize: number;
  href: string;
  id: string;
  initialPoolSize: number;
  type: string;
}
