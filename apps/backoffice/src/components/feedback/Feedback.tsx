"use client";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useRef } from "react";
import { clearFeedback } from "@/store/slices/globalSlice";

export default function Feedback() {
  const dispatch = useDispatch<AppDispatch>();
  const feedback = useSelector((state: RootState) => state.global.feedback);
  const status = feedback.status;
  const message = feedback.message;

  const alertClassName = `fixed top-0 right-0 z-200 w-full md:w-md rounded-none text-[var(--color-white)] border-0 min-h-16 items-center
    ${status === "error" ? "bg-[var(--color-error)]" : "bg-[var(--color-success)]"}`;

  const feedbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }
    if (status) {
      feedbackTimeoutRef.current = setTimeout(() => {
        dispatch(clearFeedback());
      }, 3000);
    }
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, [status]);

  switch (status) {
    case "error":
      return (
        <Alert
          role="alert"
          aria-live="assertive"
          className={alertClassName}
          variant="destructive"
        >
          <AlertCircleIcon />
          <AlertTitle>{message}</AlertTitle>
        </Alert>
      );
    case "success":
      return (
        <Alert
          role="alert"
          aria-live="assertive"
          className={alertClassName}
          variant="default"
        >
          <CheckCircle2Icon />
          <AlertTitle>{message}</AlertTitle>
        </Alert>
      );
    default:
      return null;
  }
}
