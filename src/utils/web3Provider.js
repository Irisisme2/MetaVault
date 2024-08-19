import { ethers } from "ethers";
import { zrSignConfig } from "../config/zrSignConfig";

const provider = new ethers.providers.Web3Provider(window.ethereum);

export const getZrSignContract = () => {
  const signer = provider.getSigner();
  return new ethers.Contract(zrSignConfig.contractAddress, zrSignConfig.abi, signer);
};
