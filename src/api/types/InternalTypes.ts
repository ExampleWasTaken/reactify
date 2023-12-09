export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface Response<TReturnType> {
  headers: Headers;
  data: TReturnType;
}

export type SpotifyResponse<TReturnType> = Response<TReturnType> | null;
