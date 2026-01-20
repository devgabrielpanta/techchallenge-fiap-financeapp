"use client";

import dynamic from "next/dynamic";

const DashboardIframe = dynamic(
  () => import("@/components/microfrontends/DashboardIframe"),
  { ssr: false }
);

export default function ClientDashboardPage() {
  return <DashboardIframe />;
}
