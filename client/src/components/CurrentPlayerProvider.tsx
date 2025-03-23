import { createContext, useContext } from "react";
import { Player } from "@/lib/module_bindings";
import { useStDbConn } from "@/components/StDbConnProvider";
import { useStDbSqlSubscription } from "@/hooks/useStDbSqlSubscription";
import { useStDbTableRow } from "@/hooks/useStDbTableRow";
import { Splashscreen } from "./Splashscreen";

const CurrentPlayerContext = createContext<Player | undefined>(undefined);

export function CurrentPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { conn, currentPlayerId } = useStDbConn();

  const currentPlayer = useStDbTableRow(
    conn.db.player,
    (player) => player.id.toHexString() === currentPlayerId.toHexString(),
  );
  useStDbSqlSubscription(
    `SELECT * FROM player WHERE id = 0x${currentPlayerId.toHexString()}`,
  );

  if (!currentPlayer) {
    return <Splashscreen />;
  }

  return (
    <CurrentPlayerContext.Provider value={currentPlayer}>
      {children}
    </CurrentPlayerContext.Provider>
  );
}

export function useCurrentPlayer() {
  const currentPlayer = useContext(CurrentPlayerContext);

  if (!currentPlayer) {
    throw new Error("useCurrentPlayer must be used within a StDbConnProvider");
  }

  return currentPlayer;
}
