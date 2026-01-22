"use client";

import { config } from "@/lib/config";
import { useEffect, useRef, useState } from "react";

export default function DashboardIframe() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);

  function sendTheme() {
    const theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";

    iframeRef.current?.contentWindow?.postMessage(
      { type: "SET_THEME", theme },
      "*",
    );
  }

  useEffect(() => {
    if (ready) sendTheme();
  }, [ready]);

  useEffect(() => {
    const observer = new MutationObserver(sendTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={config.dashboard}
      onLoad={() => setReady(true)}
      className="w-full h-full border-none"
      title="Dashboard Financeiro"
    />
  );
}
