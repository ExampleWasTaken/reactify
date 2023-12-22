import { SearchParamsObject } from './types/InternalTypes.ts';

export class Spotify {
  private readonly _clientId: string;
  private readonly _redirectUrl: URL;
  private readonly _scopes: string[];

  private readonly baseUrl: string;

  constructor(clientId: string, redirectUrl: URL, scopes: string[]) {
    this._clientId = clientId;
    this._redirectUrl = redirectUrl;
    this._scopes = scopes;

    this.baseUrl = 'https://api.spotify.com/v1';
  }

  get clientId(): string {
    return this._clientId;
  }

  get redirectUrl(): URL {
    return this._redirectUrl;
  }

  get scopes(): string[] {
    return this._scopes;
  }

  public async validateResponse(response: Response): Promise<void> {
    switch (response.status) {
      case 401:
        throw new Error(
          'Bad or expired token. The user may have revoked the token or the token as expired. Try re-authenticating the user.'
        );
      case 403:
        throw new Error('Bad OAuth request');
      case 429:
        throw new Error('The app has exceeded its rate limits.');
    }
  }

  // eslint-disable-next-line
  public async buildUrl(endpoint: string, params?: SearchParams): Promise<URL> {
    if (!params) {
      return new URL(this.baseUrl + endpoint);
    }

    return new URL(this.baseUrl + endpoint + params.toString());
  }
}

export class SearchParams {
  private readonly params: SearchParamsObject;

  constructor(params: SearchParamsObject) {
    this.params = params;
  }

  public toString(): string {
    const keys = Object.keys(this.params);
    const values = Object.values(this.params);

    let string = '?';
    for (let i = 0; i < keys.length; i++) {
      if (values[i]) {
        string += `${keys[i]}=${values[i]}&`;
      }
    }
    return string;
  }
}
