import { useEffect, useState } from "react";
import { useReward } from "react-rewards";
import { useMediaQuery } from "usehooks-ts";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/ui";
import { DrawerDescription } from "@/components/ui/drawer";
import { PlayerHand } from "@/components/PlayerHand";
import { PlayersCardsTable } from "@/components/PlayersCardsTable";
import { useStDbConn } from "@/components/StDbConnProvider";
import { CardsIcon } from "@/components/icons";
import { useCurrentRoomName } from "@/hooks/useCurrentRoomName";
import { useStDbSqlSubscription } from "@/hooks/useStDbSqlSubscription";
import { useStDbTableRowsMap } from "@/hooks/useStDbTableRowsMap";

export function RoomLayout() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { conn } = useStDbConn();

  const [currentRoomName] = useCurrentRoomName();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { reward } = useReward("confettiReward", "confetti", {
    spread: 360,
    startVelocity: isDesktop ? 30 : 10,
  });

  const playersMap = useStDbTableRowsMap(conn.db.player, (player) =>
    player.id.toHexString(),
  );
  useStDbSqlSubscription(
    `SELECT * FROM player WHERE room_name = '${currentRoomName}'`,
  );

  const sortedPlayers = Array.from(playersMap.values()).toSorted((a, b) => {
    return a.name.localeCompare(b.name);
  });

  const areAllCardsTheSame =
    sortedPlayers.length > 0 &&
    sortedPlayers[0].card !== undefined &&
    sortedPlayers.every((player) => player.card === sortedPlayers[0].card);

  useEffect(() => {
    if (areAllCardsTheSame) {
      setIsDrawerOpen(false);

      reward();

      setTimeout(() => {
        conn.reducers.setCard(undefined);
      }, 3000);
    }
  }, [conn, areAllCardsTheSame, reward]);

  return (
    <>
      <span id="confettiReward" />

      <PlayersCardsTable players={sortedPlayers} />

      {isDesktop ? (
        <PlayerHand className="md:absolute md:bottom-5 md:flex md:w-3xl md:flex-row md:gap-0 xl:w-4xl" />
      ) : (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button className="fixed bottom-5">
              <CardsIcon className="w-auto" />
            </Button>
          </DrawerTrigger>

          <DrawerContent>
            <DrawerTitle />
            <DrawerDescription />

            <div className="flex w-full flex-col items-center overflow-y-auto p-5">
              <PlayerHand onCardClicked={() => setIsDrawerOpen(false)} />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
