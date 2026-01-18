import { useEffect, useState } from "react";
import {
  fetchDashboardData,
  DashboardData,
  Period,
} from "../services/dashboardService";

export function useDashboardData(period: Period, simulateError = false) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchDashboardData(period, { simulateError });
        if (isMounted) setData(result);
      } catch (err: unknown) {
        if (isMounted) {
          if (isMounted) {
            if (err instanceof Error) setError(err.message);
            else setError("Erro desconhecido");
          }
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [period, simulateError]);

  return { data, isLoading, error };
}
