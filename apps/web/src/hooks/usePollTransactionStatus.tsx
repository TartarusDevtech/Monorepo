import { useTransactionStatusLazyQuery } from "@hey/indexer";
import { useCallback } from "react";

const POLL_INTERVAL = 1000;
const MAX_CHECK_COUNT = 5;

const usePollTransactionStatus = () => {
  const [getTransactionStatus] = useTransactionStatusLazyQuery({
    fetchPolicy: "no-cache"
  });

  const pollTransactionStatus = useCallback(
    async (hash: string, onFinished: () => void, checkCount = 0) => {
      if (checkCount >= MAX_CHECK_COUNT) {
        return onFinished();
      }

      const { data } = await getTransactionStatus({
        variables: { request: { txHash: hash } }
      });

      if (data?.transactionStatus?.__typename === "FinishedTransactionStatus") {
        onFinished();
      } else {
        setTimeout(
          () => pollTransactionStatus(hash, onFinished, checkCount + 1),
          POLL_INTERVAL
        );
      }
    },
    [getTransactionStatus]
  );

  return pollTransactionStatus;
};

export default usePollTransactionStatus;
