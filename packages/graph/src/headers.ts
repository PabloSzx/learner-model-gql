import { proxy, useSnapshot } from "valtio";

export const headers = proxy<
  Record<string, string> & {
    authorization?: string;
  }
>({
  "content-type": "application/json",
});

export const useHeaders = () => useSnapshot(headers);
