import { HttpStatusCode } from "axios";

export interface BackendError {
  message: string;
  name: HttpStatusCode;
  response: {
    error: string;
    message: string;
    statusCode: HttpStatusCode;
  };
  status: HttpStatusCode;
}
