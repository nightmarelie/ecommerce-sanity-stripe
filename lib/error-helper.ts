import { stringify } from "querystring";

type ErrorWithMessage = {
  message: string;
};

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error == "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message == "string"
  );
};

const toErrorWithMessage = (error: unknown): ErrorWithMessage => {
  if (isErrorWithMessage(error)) return error;

  try {
    return new Error(JSON.stringify(error));
  } catch {
    return new Error(String(error));
  }
};

const getErrorMsg = (error: unknown) => {
  return toErrorWithMessage(error);
};

export { getErrorMsg };
