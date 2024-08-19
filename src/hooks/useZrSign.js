import { useState } from "react";
import { getZrSignContract } from "../utils/web3Provider";

export const useZrSign = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signData = async (data) => {
    setLoading(true);
    try {
      const contract = getZrSignContract();
      const tx = await contract.signData(data);
      await tx.wait();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { signData, loading, error };
};
