export class Spotify {
  private readonly _clientId: string;
  private readonly _redirectUrl: URL;
  private readonly _scopes: string[];

  private readonly _baseUrl: string;

  constructor(clientId: string, redirectUrl: URL, scopes: string[]) {
    this._clientId = clientId;
    this._redirectUrl = redirectUrl;
    this._scopes = scopes;

    this._baseUrl = 'https://api.spotify.com/v1/';
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

  get baseUrl(): string {
    return this._baseUrl;
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
}
