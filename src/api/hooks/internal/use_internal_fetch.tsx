import { RequestMethod, SpotifyResponse } from '../../types/InternalTypes.ts';
import { use_internal_spotifyAPIContext } from './use_internal_spotifyAPIContext.tsx';

export const use_internal_fetch = () => {
  const apiContext = use_internal_spotifyAPIContext();
  const performRequest = async <TReturnType,>(
    method: RequestMethod,
    url: URL,
    body?: unknown,
    contentType = 'application/json'
  ): Promise<SpotifyResponse<TReturnType>> => {
    try {
      // TODO: get token from useAuth()
      const token = '';

      const options: RequestInit = {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': contentType,
        },
        body: body ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined,
      };

      const response = await fetch(url, options);

      if (response.status === 204) {
        return null;
      }

      await apiContext.validateResponse(response);

      const payload = await response.text();
      if (payload.length > 0) {
        return {
          headers: response.headers,
          data: JSON.parse(payload) as TReturnType,
        };
      }
      return null;
    } catch (e) {
      throw new Error(
        `Error occurred while performing request to ${url.toString()} ${body ?? 'with body'} ${body ?? body}`
      );
    }
  };

  const getRequest = async <TReturnType,>(url: URL): Promise<SpotifyResponse<TReturnType>> => {
    return await performRequest<TReturnType>('GET', url);
  };

  const postRequest = async <TReturnType, TBody>(
    url: URL,
    body: TBody,
    contentType = 'application/json'
  ): Promise<SpotifyResponse<TReturnType>> => {
    return await performRequest<TReturnType>('POST', url, body, contentType);
  };

  const putRequest = async <TReturnType, TBody>(
    url: URL,
    body: TBody,
    contentType = 'application/json'
  ): Promise<SpotifyResponse<TReturnType>> => {
    return await performRequest<TReturnType>('PUT', url, body, contentType);
  };

  const deleteRequest = async <TReturnType, TBody>(
    url: URL,
    body: TBody,
    contentType = 'application/json'
  ): Promise<SpotifyResponse<TReturnType>> => {
    return await performRequest<TReturnType>('DELETE', url, body, contentType);
  };

  return {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
  };
};
