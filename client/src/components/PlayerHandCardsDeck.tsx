import { cn } from "@/lib/utils";
import {
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui";
import { PlayerCardBack } from "@/components/PlayerCard";
import { useStDbConn } from "@/components/StDbConnProvider";

const CARD_DECK_CARD_POSITIONS = [
  "top-1.5 left-0",
  "top-1 left-0.5",
  "top-0.5 left-1",
  "top-0 left-1.5",
  "-top-0.5 left-2",
  "-top-1 left-2.5",
] as const;

export function PlayerHandCardsDeck({
  handTypes,
  handType,
  setHandType,
}: {
  handTypes: string[];
  handType: string;
  setHandType: (handType: string) => void;
}) {
  const { conn } = useStDbConn();

  return (
    <div className="size-fit md:absolute md:-top-40 md:right-1/6 lg:top-0 lg:-right-5 xl:-right-1/12">
      {CARD_DECK_CARD_POSITIONS.map((position, index) => (
        <PlayerCardBack
          key={index}
          className={cn("invisible absolute h-28 w-20 md:visible", position)}
        />
      ))}

      <Popover>
        <PopoverTrigger className="w-fit cursor-pointer md:absolute md:-top-1.5 md:left-3">
          <PlayerCardBack className="h-28 w-20" />
        </PopoverTrigger>

        <PopoverContent className="flex w-fit max-w-xs flex-col gap-2">
          <RadioGroup
            value={handType}
            onValueChange={(value) => {
              conn.reducers.setCard(undefined);
              setHandType(value);
            }}
            className="flex flex-col"
          >
            {handTypes.map((handType) => (
              <div className="flex items-center" key={handType}>
                <RadioGroupItem
                  value={handType}
                  id={handType}
                  className="cursor-pointer"
                />

                <Label htmlFor={handType} className="cursor-pointer">
                  {handType}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </PopoverContent>
      </Popover>
    </div>
  );
}
