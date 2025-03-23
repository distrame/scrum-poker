import { Player } from "@/lib/module_bindings";
import {
  PlayerCard,
  PlayerCardWithTitleContainer,
} from "@/components/PlayerCard";

export function PlayersCardsTable({
  players,
  areCardsShown,
}: {
  players: Player[];
  areCardsShown: boolean;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full flex-wrap justify-center gap-4">
        {players.map((player) => (
          <PlayerCardWithTitleContainer
            className="h-32 w-20"
            key={player.id.toHexString()}
            title={player.name}
          >
            <PlayerCard value={player.card} isFront={areCardsShown} />
          </PlayerCardWithTitleContainer>
        ))}
      </div>
    </div>
  );
}
