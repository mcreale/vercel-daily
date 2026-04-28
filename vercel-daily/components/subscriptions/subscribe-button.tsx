"use client";

import { faBell, faBellSlash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useSubscription } from "@/components/subscriptions/subscription-provider";
import { useState } from "react";

 function ButtonText ({ subscribed, variant }: { subscribed: boolean; variant: "default" | "header"  }){
    if(subscribed){
      return (
      <>
        <span className={`mr-2 ${variant==="header" ? "hidden md:inline" : ""}`}>Unsubscribe</span>
        <FontAwesomeIcon icon={faBellSlash} className="" />
      </>
      )
    }else{
      return (
        <>
          <span className={`mr-2 ${variant==="header" ? "hidden md:inline" : ""}`}>Subscribe</span>
          <FontAwesomeIcon icon={faBell} className="" />
        </>
      )
    }
  }

export default function SubscribeButton({
  className = "button",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "header";
}) {
  const { subscribed, busy, toggle } = useSubscription();
  const [thanksOpen, setThanksOpen] = useState(false);
  const [unsubscribeConfirmOpen, setUnsubscribeConfirmOpen] = useState(false);

  const handleSubscribe = async () => {
    const wasSubscribed = subscribed;
    const nowSubscribed = await toggle();
    if (!wasSubscribed && nowSubscribed) {
      setThanksOpen(true);
    }
  };

  const handlePrimaryClick = () => {
    if (subscribed) {
      setUnsubscribeConfirmOpen(true);
    } else {
      void handleSubscribe();
    }
  };

  const handleConfirmUnsubscribe = async () => {
    setUnsubscribeConfirmOpen(false);
    await toggle();
  };

 

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={handlePrimaryClick}
        disabled={busy}
      >
        {!busy && 
          <ButtonText subscribed={subscribed} variant={variant} />
        }
        {busy && <FontAwesomeIcon icon={faSpinner} spin className="" />}
      </button>

      <Dialog
        open={thanksOpen}
        onClose={() => setThanksOpen(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/70"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-2xl border border-zinc-200 bg-background p-6 shadow-xl dark:border-zinc-700">
            <DialogTitle className="text-lg font-semibold tracking-tight text-foreground">
              Thank you for subscribing!
            </DialogTitle>
            <Description
              as="p"
              className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-300"
            >
              You now have full access to all of our articles!
            </Description>
            <button
              type="button"
              className="button mt-6 w-full dark-button"
              onClick={() => setThanksOpen(false)}
            >
              Close
            </button>
          </DialogPanel>
        </div>
      </Dialog>

      <Dialog
        open={unsubscribeConfirmOpen}
        onClose={() => setUnsubscribeConfirmOpen(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/70"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-2xl border border-zinc-200 bg-background p-6 shadow-xl dark:border-zinc-700">
            <DialogTitle className="text-lg font-semibold tracking-tight text-foreground">
              Unsubscribe?
            </DialogTitle>
            <Description
              as="p"
              className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-300"
            >
              You will lose access to full articles until you subscribe again.
            </Description>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="button-border inline-flex justify-center rounded-lg px-6 py-3 font-semibold text-foreground transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={() => setUnsubscribeConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-lg border border-red-600 bg-transparent px-6 py-3 font-semibold text-red-600 transition-colors hover:bg-red-50 dark:border-red-500 dark:text-red-400 dark:hover:bg-red-950/50"
                onClick={() => void handleConfirmUnsubscribe()}
              >
                Unsubscribe
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
