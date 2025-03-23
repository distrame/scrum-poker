import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { useCurrentPlayer } from "@/components/CurrentPlayerProvider";
import { PlayerSettings } from "@/components/PlayerSettings";
import { useStDbConn } from "@/components/StDbConnProvider";
import { SettingsIcon } from "./icons";

export function PlayerSettingsButton({ className }: { className?: string }) {
  const { conn } = useStDbConn();
  const currentPlayer = useCurrentPlayer();

  const [currentPlayerName, setCurrentPlayerName] = useLocalStorage(
    "playerName",
    currentPlayer.name,
  );

  useEffect(() => {
    conn.reducers.setName(currentPlayerName);
  }, [conn, currentPlayerName]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={cn("size-full cursor-pointer", className)}>
          <SettingsIcon />
        </div>
      </DialogTrigger>

      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <PlayerSettings
          currentPlayerName={currentPlayerName}
          setCurrentPlayerName={setCurrentPlayerName}
        />
      </DialogContent>
    </Dialog>
  );
}
