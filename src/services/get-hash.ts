import { MD5 } from "crypto-js";

export function getHash(privateString: string) {
  const privateToken = privateString;
  const publicToken = import.meta.env.VITE_API_TOKEN_KEY ?? "";

  const ts = new Date().getTime();
  const hash = MD5(ts + privateToken + publicToken);

  return {
    ts,
    hash,
    publicToken,
  };
}
