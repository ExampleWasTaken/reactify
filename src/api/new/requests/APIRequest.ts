import { HTTPMethod } from '../../types/InternalTypes.ts';
import { Spotify } from '../Spotify.ts';

/**
 * Represents a request to the Spotify API.
 */
export class APIRequest<ReturnType> {
  private readonly spotify: Spotify;
  private readonly httpMethod: HTTPMethod;
  private readonly url: URL;
  private readonly body?: BodyInit;
  private readonly contentType: string;

  constructor(
    spotify: Spotify,
    httpMethod: HTTPMethod,
    url: string | URL,
    body?: BodyInit,
    contentType = 'application/json'
  ) {
    this.spotify = spotify;
    this.httpMethod = httpMethod;
    this.url = new URL(url);
    this.body = body;
    this.contentType = contentType;
  }

  /**
   * Perform the request.
   */
  public async execute(): Promise<ReturnType> {
    try {
      const token = this.spotify.getAuthManager().getAccessToken();

      if (!token) {
        return Promise.reject('No access token found. Cannot perform request. Check if the user is still logged in.');
      }

      const options: RequestInit = {
        method: this.getHttpMethod(),
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          'Content-Type': this.getContentType(),
        },
        body: this.body ? (typeof this.body === 'string' ? this.body : JSON.stringify(this.body)) : undefined,
      };

      const response = await fetch(this.getUrl(), options);

      if (response.status === 204) {
        return null as ReturnType;
      }

      await this.spotify.validateResponse(response);

      const payload = await response.text();
      if (payload.length > 0) {
        return JSON.parse(payload) as ReturnType;
      }
      return null as ReturnType;
    } catch (e) {
      return Promise.reject(
        `Error occurred while performing request to ${this.getUrl.toString()} ${this.body ?? 'with body'} ${
          this.body ?? this.body
        }`
      );
    }
  }

  /**
   * Get the URL the request is made to.
   */
  public getUrl(): URL {
    return this.url;
  }
  /**
   * Get the HTTP request method of the request.
   */
  public getHttpMethod(): HTTPMethod {
    return this.httpMethod;
  }
  /**
   * Get the body of the request.
   */
  public getBody(): BodyInit | undefined {
    return this.body;
  }
  /**
   * Get the content type of the request.
   */
  public getContentType(): string {
    return this.contentType;
  }
}
