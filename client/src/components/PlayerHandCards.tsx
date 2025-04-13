import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import {
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/ui";
import { useCurrentPlayer } from "@/components/CurrentPlayerProvider";
import { PlayerCardFront } from "@/components/PlayerCard";
import { useStDbConn } from "@/components/StDbConnProvider";

export function PlayerHandCards({
  handCards,
  onCardClicked,
}: {
  handCards: string[];
  onCardClicked?: () => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { conn } = useStDbConn();

  const currentPlayer = useCurrentPlayer();

  const toggleCard = (value: string) => {
    conn.reducers.setCard(value === currentPlayer.card ? undefined : value);
    onCardClicked?.();
  };

  return (
    <TooltipProvider disableHoverableContent>
      {handCards.map((value, index) =>
        isDesktop ? (
          <div
            key={index}
            className={cn(
              "w-0.5 transition-transform duration-100 transform-3d not-last:grow last:w-fit",
              value === currentPlayer.card && "-translate-y-1/3",
            )}
          >
            <TooltipRoot>
              <TooltipTrigger className="cursor-pointer">
                <PlayerCardFront
                  className={cn(
                    "h-32 w-24 hover:scale-105",
                    value === currentPlayer.card && "border-foreground",
                  )}
                  value={value}
                  onClick={() => toggleCard(value)}
                />
              </TooltipTrigger>

              <TooltipContent className="text-4xl" sideOffset={32}>
                {value}
              </TooltipContent>
            </TooltipRoot>
          </div>
        ) : (
          <PlayerCardFront
            className={cn(
              "h-28 w-20",
              value === currentPlayer.card && "border-foreground",
            )}
            key={index}
            value={value}
            onClick={() => toggleCard(value)}
          />
        ),
      )}
    </TooltipProvider>
  );
}
