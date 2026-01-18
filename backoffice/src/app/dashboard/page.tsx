"use client";

export default function DashboardPage() {
  return (
    <div className="w-full h-full">
      <iframe
        src="http://localhost:4200/dashboard"
        className="w-full h-full border-0"
        title="Dashboard Microfrontend"
        style={{ minHeight: "calc(100vh - 64px)" }}
      />
    </div>
  );
}
