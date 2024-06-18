import { BackendError } from "@/types/error.type";
import { HttpStatusCode } from "axios";

export const checkIsBackendError = (error: unknown): error is BackendError =>
  error instanceof Object &&
  error.hasOwnProperty("response") &&
  (error as BackendError).response instanceof Object &&
  (error as BackendError).response.hasOwnProperty("statusCode") &&
  typeof (error as BackendError).response.statusCode === "number";

export const checkIsNotFound = (error: unknown): error is BackendError =>
  checkIsBackendError(error) &&
  error.response.statusCode === HttpStatusCode.NotFound;

export const checkIsConflict = (error: unknown): error is BackendError =>
  checkIsBackendError(error) &&
  error.response.statusCode === HttpStatusCode.Conflict;
