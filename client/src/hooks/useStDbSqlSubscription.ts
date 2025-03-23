import { useEffect } from "react";
import { useStDbConn } from "@/components/StDbConnProvider";

export function useStDbSqlSubscription(sql: string | string[]) {
  const { conn } = useStDbConn();

  useEffect(() => {
    const subscription = conn.subscriptionBuilder().subscribe(sql);
    return () => subscription.unsubscribe();
  }, [conn, sql]);
}
