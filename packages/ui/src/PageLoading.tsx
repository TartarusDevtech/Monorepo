import { Spinner } from "../src/Spinner";

interface PageLoadingProps {
  message?: string;
}

export const PageLoading = ({ message }: PageLoadingProps) => {
  return (
    <div className="flex h-full grow items-center justify-center">
      <div className="space-y-3">
        <Spinner className="mx-auto" />
        <div>{message}</div>
      </div>
    </div>
  );
};
