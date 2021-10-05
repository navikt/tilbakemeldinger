export interface BadRequest {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

export interface HTTPError {
  code: number;
  text: string;
}
