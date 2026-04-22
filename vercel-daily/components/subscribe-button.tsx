"use client";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSubscription } from "@/components/subscription-provider";

export default function SubscribeButton() {
  const { subscribed, busy, toggle } = useSubscription();

  return (
    <button
      type="button"
      className="button"
      onClick={() => void toggle()}
      disabled={busy}
    >
      {!busy && (subscribed ? "Unsubscribe" : "Subscribe")}
      {busy && <FontAwesomeIcon icon={faSpinner} spin className="ml-2" />}
    </button>
  );
}