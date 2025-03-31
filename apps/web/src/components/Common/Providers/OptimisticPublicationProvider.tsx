import { useOptimisticPublicationStore } from "@/store/persisted/useOptimisticPublicationStore";
import { useApolloClient } from "@apollo/client";
import {
  PostDocument,
  usePostLazyQuery,
  useTransactionStatusQuery
} from "@hey/indexer";
import type { OptimisticPublication } from "@hey/types/misc";
import { useEffect, useState } from "react";

const POLL_INTERVAL = 1500;
const MAX_CHECK_COUNT = 10;

interface TransactionProps {
  transaction: OptimisticPublication;
}

const Transaction = ({ transaction }: TransactionProps) => {
  const { removePublication } = useOptimisticPublicationStore();
  const { cache } = useApolloClient();
  const [getPost] = usePostLazyQuery();
  const [checkCount, setCheckCount] = useState(0);

  const { stopPolling } = useTransactionStatusQuery({
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
    pollInterval: POLL_INTERVAL,
    variables: { request: { txHash: transaction.txHash } },
    onCompleted: async ({ transactionStatus }) => {
      setCheckCount((prev) => prev + 1);

      if (
        transactionStatus?.__typename === "FailedTransactionStatus" ||
        transactionStatus?.__typename === "FinishedTransactionStatus"
      ) {
        // Push new post to the feed
        if (
          !transaction.commentOn &&
          transactionStatus.__typename === "FinishedTransactionStatus"
        ) {
          const { data } = await getPost({
            variables: { request: { txHash: transaction.txHash } }
          });

          if (data?.post) {
            cache.modify({
              fields: {
                posts: () => {
                  cache.writeQuery({ data: data.post, query: PostDocument });
                }
              }
            });
          }
        }

        // Push new comment to the feed
        if (
          transaction.commentOn &&
          transactionStatus.__typename === "FinishedTransactionStatus"
        ) {
          const post = await getPost({
            variables: { request: { txHash: transaction.txHash } }
          });

          if (post) {
            cache.modify({
              fields: {
                postReferences: () => {
                  cache.writeQuery({ data: post, query: PostDocument });
                }
              }
            });
          }
        }

        return removePublication(transaction.txHash as string);
      }
    }
  });

  useEffect(() => {
    if (checkCount >= MAX_CHECK_COUNT) {
      stopPolling();
      removePublication(transaction.txHash as string);
    }
  }, [checkCount, stopPolling, removePublication, transaction.txHash]);

  return null;
};

const OptimisticPublicationProvider = () => {
  const { txnQueue } = useOptimisticPublicationStore();

  return (
    <>
      {txnQueue.map((txn) => (
        <Transaction key={txn.txHash} transaction={txn} />
      ))}
    </>
  );
};

export default OptimisticPublicationProvider;
