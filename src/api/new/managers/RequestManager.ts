import { Spotify } from '../Spotify.ts';
import { APIRequest } from '../requests/APIRequest.ts';

export class RequestManager {
  private readonly spotify: Spotify;
  private maxRetries: number;
  private timeout_ms: number;

  constructor(spotify: Spotify, maxRetries = 3, timeout_ms = 60_000) {
    this.spotify = spotify;
    this.timeout_ms = timeout_ms;

    if (maxRetries < 0) {
      throw new Error('maxRetries value cannot be smaller than 0');
    }
    this.maxRetries = maxRetries;
  }

  public async getRequest<ReturnType>(url: URL): Promise<ReturnType> {
    const req = new APIRequest<ReturnType>(this.spotify, 'GET', url);

    return await this.makeRequest<ReturnType>(req);
  }

  public async postRequest<ReturnType>(
    url: URL,
    body: BodyInit,
    contentType = 'application/json'
  ): Promise<ReturnType> {
    const req = new APIRequest<ReturnType>(this.spotify, 'POST', url, body, contentType);

    return await this.makeRequest<ReturnType>(req);
  }

  public async putRequest<ReturnType>(url: URL, body: BodyInit, contentType = 'application/json'): Promise<ReturnType> {
    const req = new APIRequest<ReturnType>(this.spotify, 'PUT', url, body, contentType);

    return await this.makeRequest<ReturnType>(req);
  }

  public async deleteRequest<ReturnType>(
    url: URL,
    body: BodyInit,
    contentType = 'application/json'
  ): Promise<ReturnType> {
    const req = new APIRequest<ReturnType>(this.spotify, 'DELETE', url, body, contentType);

    return await this.makeRequest(req);
  }

  public getMaxRetries(): number {
    return this.maxRetries;
  }

  public setMaxRetries(maxRetries: number): void {
    this.maxRetries = maxRetries;
  }

  public getTimeout_ms(): number {
    return this.timeout_ms;
  }

  public setTimeout_ms(timeout: number): void {
    this.timeout_ms = timeout;
  }

  private async makeRequest<ReturnType>(request: APIRequest<ReturnType>): Promise<ReturnType> {
    let retries = 0;
    const startTime = Date.now();

    do {
      if (Date.now() - startTime <= this.timeout_ms) {
        return Promise.reject('Request timed out');
      }
      try {
        return await request.execute();
      } catch (_e) {
        if (retries === this.maxRetries) {
          return Promise.reject(`Request failed after ${retries} retries.`);
        }

        retries++;
        const delay = Math.pow(2, retries - 1) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        console.warn('Request failed - launching retry attempt (', retries, '/', this.maxRetries, ')');
      }
    } while (retries < this.maxRetries);

    return Promise.reject(`Request failed after ${retries} retries.`);
  }
}
