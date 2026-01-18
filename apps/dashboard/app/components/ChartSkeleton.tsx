export default function ChartSkeleton() {
  return (
    <div className="animate-pulse h-full w-full flex flex-col gap-4">
      <div className="h-4 bg-[var(--color-border)] rounded w-1/3" />
      <div className="flex-1 bg-[var(--color-border)] rounded" />
    </div>
  );
}
