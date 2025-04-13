import { useLocalStorage } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { PlayerHandCards } from "@/components/PlayerHandCards";
import { PlayerHandCardsDeck } from "@/components/PlayerHandCardsDeck";
import { useCurrentRoomName } from "@/hooks/useCurrentRoomName";

const COMMON_CARDS = ["?", "☕︎"] as const;
const CARDS_BY_HAND_TYPE = {
  Fibonacci: ["1", "2", "3", "5", "8", "13", "21", "34", "55"],
  Exponent: ["1", "2", "4", "8", "16", "32", "64", "128", "256"],
  ["T-Shirt"]: ["2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
} as const;

type HandType = keyof typeof CARDS_BY_HAND_TYPE;

export function PlayerHand({
  className,
  onCardClicked,
}: {
  className?: string;
  onCardClicked?: () => void;
}) {
  const [roomName] = useCurrentRoomName();

  const [handType, setHandType] = useLocalStorage<HandType>(
    `handType:${roomName}`,
    "Fibonacci",
    {
      deserializer: (value) =>
        Object.keys(CARDS_BY_HAND_TYPE).includes(value)
          ? (value as HandType)
          : "Fibonacci",
      serializer: (value) => value,
    },
  );

  const handCards = [...CARDS_BY_HAND_TYPE[handType], ...COMMON_CARDS];

  return (
    <div className={cn("grid w-full grid-cols-4 gap-1", className)}>
      <PlayerHandCardsDeck
        handTypes={Object.keys(CARDS_BY_HAND_TYPE)}
        handType={handType}
        setHandType={setHandType as (handType: string) => void}
      />

      <PlayerHandCards handCards={handCards} onCardClicked={onCardClicked} />
    </div>
  );
}
