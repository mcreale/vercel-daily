"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { getSubscriptionStatus, subscribeUser, unsubscribeUser } from "@/app/actions/subscription";

type SubscriptionContextValue = {
  subscribed: boolean;
  initialLoading: boolean;
  /** True during initial load, subscribe request, and until the next RSC payload is observed */
  busy: boolean;
  /** Resolves to the subscription state after the operation (or current state if a toggle was skipped). */
  toggle: () => Promise<boolean>;
  refresh: () => Promise<boolean>;
  onRscRevalidateComplete: () => void;
};

const SubscriptionContext = createContext<SubscriptionContextValue | null>(
  null,
);

const RSC_ACK_TIMEOUT_MS = 8000;

export function SubscriptionProvider({
  children,
  rscRevalidateAck = null,
}: {
  children: ReactNode;
  /** Server slot: RscRevalidateAckServer; fires after each RSC revalidation so we can end the post-toggle spinner */
  rscRevalidateAck?: ReactNode;
}) {
  const router = useRouter();
  const [subscribed, setSubscribed] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [rscRevalidatePending, setRscRevalidatePending] = useState(false);
  const awaitingRscRef = useRef(false);
  const rscAckSafetyRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const busy = initialLoading || fetching || rscRevalidatePending;

  const onRscRevalidateComplete = useCallback(() => {
    if (!awaitingRscRef.current) return;
    awaitingRscRef.current = false;
    if (rscAckSafetyRef.current) {
      clearTimeout(rscAckSafetyRef.current);
      rscAckSafetyRef.current = null;
    }
    setRscRevalidatePending(false);
  }, []);

  const beginRscRevalidate = useCallback(() => {
    if (rscAckSafetyRef.current) {
      clearTimeout(rscAckSafetyRef.current);
    }
    awaitingRscRef.current = true;
    setRscRevalidatePending(true);
    rscAckSafetyRef.current = setTimeout(() => {
      awaitingRscRef.current = false;
      rscAckSafetyRef.current = null;
      setRscRevalidatePending(false);
    }, RSC_ACK_TIMEOUT_MS);
  }, []);

  const refresh = useCallback(async (): Promise<boolean> => {
    try {
      const data = await getSubscriptionStatus();
      const next = Boolean(data.subscribed);
      setSubscribed(next);
      return next;
    } catch {
      setSubscribed(false);
      return false;
    } finally {
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const toggle = useCallback(async (): Promise<boolean> => {
    if (fetching || rscRevalidatePending) return subscribed;
    setFetching(true);
    try {
      let next: boolean;
      if (!subscribed) {
        const data = await subscribeUser();
        next = Boolean(data.subscribed);
        setSubscribed(next);
      } else {
        const data = await unsubscribeUser();
        next = Boolean(data.subscribed);
        setSubscribed(next);
      }
      beginRscRevalidate();
      try {
        router.refresh();
      } catch {
        onRscRevalidateComplete();
      }
      return next;
    } catch {
      return await refresh();
    } finally {
      setFetching(false);
    }
  }, [
    subscribed,
    fetching,
    rscRevalidatePending,
    router,
    refresh,
    beginRscRevalidate,
    onRscRevalidateComplete,
  ]);

  const value = useMemo(
    () => ({
      subscribed,
      initialLoading,
      busy,
      toggle,
      refresh,
      onRscRevalidateComplete,
    }),
    [subscribed, initialLoading, busy, toggle, refresh, onRscRevalidateComplete],
  );

  return (
    <SubscriptionContext.Provider value={value}>
      {rscRevalidateAck}
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription(): SubscriptionContextValue {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) {
    throw new Error("useSubscription must be used within SubscriptionProvider");
  }
  return ctx;
}
