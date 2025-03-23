import { cn } from "@/lib/utils";
import { Card, CardContent, FitText } from "@/components/ui";
import { Logo, ThinkingEmoji } from "./icons";

export function PlayerCardWithTitleContainer({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("flex size-full flex-col gap-0.5", className)}>
      <div
        className="flex h-3.5 max-w-full items-center truncate px-1 text-xs/tight font-medium"
        title={title}
      >
        {title}
      </div>

      {children}
    </div>
  );
}

export function PlayerCard({
  className,
  isFront,
  value,
  onClick,
}: {
  className?: string;
  isFront?: boolean;
  value: string | undefined;
  onClick?: () => void;
}) {
  return (
    <div
      className={cn("size-full perspective-normal", className)}
      onClick={onClick}
    >
      <div
        className={cn(
          "relative size-full transition-transform duration-1000 transform-3d",
          isFront && "rotate-y-180",
        )}
      >
        <PlayerCardBack
          className="absolute backface-hidden"
          isThinking={value === undefined}
        />

        <PlayerCardFront
          className="absolute rotate-y-180 backface-hidden"
          value={value ?? ""}
        />
      </div>
    </div>
  );
}

export function PlayerCardFront({
  value,
  className,
  onClick,
}: {
  value: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <PlayerCardSide className={className} onClick={onClick}>
      <FitText className="flex items-center justify-center">{value}</FitText>
    </PlayerCardSide>
  );
}

export function PlayerCardBack({
  className,
  isThinking,
  onClick,
}: {
  className?: string;
  isThinking?: boolean;
  onClick?: () => void;
}) {
  return (
    <PlayerCardSide className={className} onClick={onClick}>
      {isThinking ? (
        <ThinkingEmoji className="h-auto animate-pulse" />
      ) : (
        <Logo className="h-auto" />
      )}
    </PlayerCardSide>
  );
}

export function PlayerCardSide({
  children,
  className,
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Card
      className={cn(
        "flex size-full items-center justify-center overflow-hidden p-4",
        className,
      )}
      onClick={onClick}
    >
      <CardContent className="text-foreground flex size-full items-center justify-center px-0">
        {children}
      </CardContent>
    </Card>
  );
}
