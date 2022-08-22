export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface JokeInterface {
  id: number;
  category: string;
  type: string;
  setup: string;
  delivery: string;
  joke: string;
  flags: Flag;
  error: string;
}

export interface Flag {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
}
