import axios from 'axios';
import { useCallback, useState } from 'react';

import { getPublicClient } from '../lib/utils';

const publicClient = getPublicClient();

export const useWatchBundle = () => {
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);

  const watchBundle = useCallback(
    async (txHash: `0x${string}`, blockNumber: bigint) => {
      let result;
      try {
        result = await axios.get(
          `/api/get-block-countdown?blockNumber=${blockNumber}`,
        );
      } catch (error) {
        console.log('WatchBundleError', error);
        result = { data: { data: { EstimateTimeInSec: '360' } } };
      }
      // 15s buffer
      const timeout = Number(result.data.data.EstimateTimeInSec) * 1000 + 15000;

      try {
        const receipt = await publicClient.waitForTransactionReceipt({
          hash: txHash,
          timeout,
        });
        if (receipt.status === 'success') {
          setSuccess(true);
        } else {
          setFailed(true);
        }
      } catch (error) {
        setFailed(true);
        console.log('WatchBundleError', error);
      }
      setLoading(false);
    },
    [],
  );

  return {
    watchBundle,
    loading,
    failed,
    success,
    setLoading,
    setSuccess,
    setFailed,
  };
};
