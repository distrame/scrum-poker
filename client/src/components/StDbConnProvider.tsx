import { Identity } from "@clockworklabs/spacetimedb-sdk";
import { createContext, useContext, useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import { DbConnection, ErrorContext } from "@/lib/module_bindings";
import { Splashscreen } from "./Splashscreen";

const AUTH_TOKEN_KEY = "authToken";

const StDbConnContext = createContext<State | undefined>(undefined);

interface State {
  conn: DbConnection;
  currentPlayerId: Identity;
}

export function StDbConnProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>();

  useInterval(() => {
    if (state?.conn.isActive) {
      state?.conn.reducers.ping();
    }
  }, 20000);

  const onConnect = (
    conn: DbConnection,
    currentPlayerId: Identity,
    token: string,
  ) => {
    setState({ conn, currentPlayerId });

    localStorage.setItem(AUTH_TOKEN_KEY, token);
  };

  const reset = () => {
    setState(undefined);

    localStorage.removeItem(AUTH_TOKEN_KEY);
  };

  useEffect(() => {
    if (!state?.conn.isActive) {
      connect({ onConnect, onDisconnect: reset, onConnectError: reset });
    }
  }, [state]);

  if (!state) {
    return <Splashscreen />;
  }

  return (
    <StDbConnContext.Provider value={state}>
      {children}
    </StDbConnContext.Provider>
  );
}

function connect({
  onConnect,
  onDisconnect,
  onConnectError,
}: {
  onConnect: (
    conn: DbConnection,
    currentPlayerId: Identity,
    token: string,
  ) => void;
  onDisconnect: (ctx: ErrorContext, error?: Error | undefined) => void;
  onConnectError: (ctx: ErrorContext, error: Error) => void;
}) {
  DbConnection.builder()
    .withUri(import.meta.env.VITE_SPACETIMEDB_URL)
    .withModuleName(import.meta.env.VITE_SPACETIMEDB_MODULE_NAME)
    .withToken(localStorage.getItem(AUTH_TOKEN_KEY) || "")
    .onConnect(onConnect)
    .onDisconnect(onDisconnect)
    .onConnectError(onConnectError)
    .build();
}

export function useStDbConn() {
  const context = useContext(StDbConnContext);
  if (context === undefined) {
    throw new Error("useStDbConn must be used within a StDbConnProvider");
  }
  return context;
}
