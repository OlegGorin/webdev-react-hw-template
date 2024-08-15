export type ErrorType = {
    error: Error & { digest?: string };
    reset: () => void;
  };