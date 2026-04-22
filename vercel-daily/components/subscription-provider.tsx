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

type SubscriptionContextValue = {
  subscribed: boolean;
  initialLoading: boolean;
  /** True during initial load, subscribe request, and until the next RSC payload is observed */
  busy: boolean;
  toggle: () => Promise<void>;
  refresh: () => Promise<void>;
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

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/subscribe", { credentials: "same-origin" });
      const data = await res.json();
      setSubscribed(Boolean(data.subscribed));
    } catch {
      setSubscribed(false);
    } finally {
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const toggle = useCallback(async () => {
    if (fetching || rscRevalidatePending) return;
    setFetching(true);
    try {
      if (!subscribed) {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          credentials: "same-origin",
        });
        const data = await res.json();
        setSubscribed(Boolean(data.subscribed));
      } else {
        const res = await fetch("/api/subscribe", {
          method: "DELETE",
          credentials: "same-origin",
        });
        const data = await res.json();
        setSubscribed(Boolean(data.subscribed));
      }
      beginRscRevalidate();
      try {
        router.refresh();
      } catch {
        onRscRevalidateComplete();
      }
    } catch {
      await refresh();
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
