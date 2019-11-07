export interface BadRequest {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}
