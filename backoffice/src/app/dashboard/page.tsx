"use client";

import { useEffect, useRef, useState } from "react";

export default function DashboardPage() {
  const dashboardUrl = process.env.NEXT_PUBLIC_MF_DASHBOARD_URL;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeReady, setIframeReady] = useState(false);

  function sendTheme() {
    const theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";

    iframeRef.current?.contentWindow?.postMessage(
      { type: "SET_THEME", theme },
      "*"
    );
  }

  // Envia quando o iframe terminar de carregar
  useEffect(() => {
    if (iframeReady) {
      sendTheme();
    }
  }, [iframeReady]);

  // Observa mudança de tema no shell
  useEffect(() => {
    const observer = new MutationObserver(() => {
      sendTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  if (!dashboardUrl) {
    return (
      <p className="text-red-500">
        Microfrontend do Dashboard não configurado.
      </p>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      src={dashboardUrl}
      onLoad={() => setIframeReady(true)}
      className="w-full h-full border-none"
      title="Dashboard Financeiro"
    />
  );
}
