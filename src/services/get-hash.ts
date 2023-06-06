import * as dotenv from "dotenv";
import { MD5 } from "crypto-js";
dotenv.config();

export function getHash() {
  const privateToken = process.env.API_TOKEN_KEY ?? "";
  const publicToken = process.env.VITE_API_TOKEN_KEY ?? "";

  const ts = new Date().getTime();
  const hash = MD5(ts + privateToken + publicToken);

  return {
    ts,
    hash,
    publicToken,
  };
}
