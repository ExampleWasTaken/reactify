import { RequestMethod } from '../../types/InternalTypes.ts';
import { use_internal_spotifyAPIContext } from './use_internal_spotifyAPIContext.tsx';
import { useAuth } from '../useAuth.tsx';

export const use_internal_fetch = () => {
  const apiContext = use_internal_spotifyAPIContext();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getAccessToken } = useAuth();

  const performRequest = async <TReturnType,>(
    method: RequestMethod,
    url: URL,
    body?: unknown,
    contentType = 'application/json'
  ): Promise<TReturnType> => {
    try {
      const token = getAccessToken();

      if (!token) {
        console.error('No access token found. Cannot perform request.');
        return null as TReturnType;
      }

      const options: RequestInit = {
        method: method,
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          'Content-Type': contentType,
        },
        body: body ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined,
      };

      const response = await fetch(url, options);

      if (response.status === 204) {
        return null as TReturnType;
      }

      await apiContext.validateResponse(response);

      const payload = await response.text();
      if (payload.length > 0) {
        return JSON.parse(payload) as TReturnType;
      }
      return null as TReturnType;
    } catch (e) {
      throw new Error(
        `Error occurred while performing request to ${url.toString()} ${body ?? 'with body'} ${body ?? body}`
      );
    }
  };

  const getRequest = async <TReturnType,>(url: URL): Promise<TReturnType> => {
    return await performRequest<TReturnType>('GET', url);
  };

  const postRequest = async <TReturnType, TBody>(
    url: URL,
    body: TBody,
    contentType = 'application/json'
  ): Promise<TReturnType> => {
    return await performRequest<TReturnType>('POST', url, body, contentType);
  };

  const putRequest = async <TReturnType, TBody>(
    url: URL,
    body: TBody,
    contentType = 'application/json'
  ): Promise<TReturnType> => {
    return await performRequest<TReturnType>('PUT', url, body, contentType);
  };

  const deleteRequest = async <TReturnType, TBody>(
    url: URL,
    body: TBody,
    contentType = 'application/json'
  ): Promise<TReturnType> => {
    return await performRequest<TReturnType>('DELETE', url, body, contentType);
  };

  return {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
  };
};
