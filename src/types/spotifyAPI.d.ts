export interface Album {
  album_type: 'album' | 'single' | 'compilation';
  total_track: number;
  available_markets: string[];
  external_urls: {
    spotify_url: string;
  };
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  restrictions: {
    /**
     * The reason for the restriction. Albums may be restricted if the content
     * is not available in a given market, to the user's subscription type, or
     * when the user's account is set to not play explicit content. Additional
     * reasons may be added in the future.
     */
    reason: 'market' | 'product' | 'explicit';
  };
  type: 'album';
  uri: string;
  artists: SimplifiedArtistObject[];
  tracks: {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
  items: SimplifiedTrackObject[];
  copyright: CopyrightObject;
  external_urls: {
    /**
     * Internation Standard Recording Code
     */
    isrc: string;
    /**
     * International Article Number
     */
    ean: string;
    /**
     * Universal Product Code
     */
    upc: string;
  };
  genres: string[];
  label: string;
  popularity: string;
}
export interface Artist {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
}
export interface Playlist {
  collaborative: boolean;
  description: string | null;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: null;
    total: number;
  };
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  owner: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: null;
      total: number;
    };
    href: string;
    id: string;
    type: 'user';
    uri: string;
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: PlaylistTrackObject;
  };
  type: string;
  uri: string;
}
export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    /**
     * International Standard Recording Code
     */
    isrc: string;
    /**
     * International Article Number
     */
    ean: string;
    /**
     * Universal Product Code
     */
    upc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_playable?: boolean;
  /*
  Not documented by spotify
   */
  linked_from: unknown;
  restrictions: {
    reason: 'market' | 'product' | 'year';
  };
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: 'track';
  uri: string;
  is_local: boolean;
}
export interface Show {
  available_markets: string[];
  copyrights: CopyrightObject[];
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: ImageObject[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: 'show';
  uri: string;
  total_episodes: number;
}
export interface User {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: null;
    total: number;
  };
  href: string;
  id: string;
  images: ImageObject[];
  type: 'user';
  uri: string;
}

export interface SimplifiedArtistObject {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: 'artist';
  uri: string;
}
export interface SimplifiedTrackObject {
  artists: SimplifiedArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_playable: boolean;
  linked_from?: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: 'track';
    uri: string;
  };
  restrictions: {
    reason: 'market' | 'product' | 'explicit';
  };
  name: string;
  preview_url: string | null;
  track_number: number;
  type: 'track';
  uri: string;
  is_local: boolean;
}
export interface PlaylistTrackObject {
  added_at: string | null; // From the docs: Some very old playlists may return null in this field.
  added_by: null | {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: null;
      total: number;
    };
    href: string;
    id: string;
    type: 'user';
    uri: string;
  };
  is_local: boolean;
  track: TrackObject | EpisodeObject;
}

export interface TrackObject {
  album: Album;
  artist: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    /**
     * International Standard Recording Code
     */
    isrc: string;
    /**
     * International Article Number
     */
    ean: string;
    /**
     * Universal Product Code
     */
    upc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_playable?: boolean;
  /*
  This property is not documented in detail by Spotify.

  see: https://developer.spotify.com/documentation/web-api/reference/get-playlist
   */
  linked_from?: unknown;
  restrictions: {
    reason: 'market' | 'product' | 'explicit';
  };
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: 'track';
  uri: string;
  is_local: boolean;
}
export interface EpisodeObject {
  audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: ImageObject[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  /**
   * @deprecated The language used in the episode, identified by a ISO 639 code. This field is deprecated and might be removed in the future. Please use the languages field instead.
   */
  language: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  resume_point: {
    fully_played: boolean;
    resume_position_ms: number;
  };
  type: 'episode';
  uri: string;
  restrictions: {
    reason: 'market' | 'product' | 'explicit';
  };
  show: Show;
}
export interface CopyrightObject {
  text: string;
  /**
   * The type of copyright: C = the copyright, P = the sound recording (performance)
   * copyright.
   */
  type: 'C' | 'P';
}
export interface ImageObject {
  url: string;
  height: number;
  width: number;
}
