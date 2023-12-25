import { SearchParams } from '../Spotify.ts';
import { AuthManager } from './managers/AuthManager.ts';
import { RequestManager } from './managers/RequestManager.ts';

export class Spotify {
  private readonly clientId: string;
  private readonly redirectUrl: URL;
  private readonly scopes: string;

  private readonly baseUrl: string;

  // Managers
  private readonly authManager: AuthManager;
  private readonly requestManager: RequestManager;

  constructor(clientId: string, redirectUrl: string, scopes: string) {
    this.clientId = clientId;
    this.redirectUrl = new URL(redirectUrl);
    this.scopes = scopes;

    this.baseUrl = 'https://api.spotify.com/v1';

    // Initialize managers
    this.authManager = new AuthManager(this);
    this.requestManager = new RequestManager(this);
  }

  public async validateResponse(response: Response): Promise<void> {
    switch (response.status) {
      case 401:
        throw new Error(
          'Bad or expired token. The user may have revoked the token or the token has expired. Try re-authenticating the user.'
        );
      case 403:
        throw new Error('Bad OAuth request');
      case 429:
        throw new Error('The app has exceeded its rate limits.');
    }
  }

  public async buildUrl(endpoint: string, params?: SearchParams): Promise<URL> {
    if (!params) {
      return new URL(this.baseUrl + endpoint);
    }

    return new URL(this.baseUrl + endpoint + params.toString());
  }

  public getClientId(): string {
    return this.clientId;
  }

  public getRedirectUrl(): URL {
    return this.redirectUrl;
  }

  public getScopes(): string {
    return this.scopes;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public getAuthManager(): AuthManager {
    return this.authManager;
  }

  public getRequestManager(): RequestManager {
    return this.requestManager;
  }
}
