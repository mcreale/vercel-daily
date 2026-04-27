"use client";

import { useEffect } from "react";
import { useSubscription } from "./subscriptions/subscription-provider";

/** Calls into context when a new RSC payload has committed (server passes a fresh `epoch` each request). */
export function RscRevalidateAck({ epoch }: { epoch: number }) {
  const { onRscRevalidateComplete } = useSubscription();

  useEffect(() => {
    onRscRevalidateComplete();
  }, [epoch, onRscRevalidateComplete]);

  return null;
}
