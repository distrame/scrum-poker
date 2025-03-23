import { useEffect } from "react";
import { Link, Outlet } from "react-router";
import { HeaderSettings } from "@/components/HeaderSettings";
import { useStDbConn } from "@/components/StDbConnProvider";
import { Logo } from "@/components/icons";
import { useCurrentRoomName } from "@/hooks/useCurrentRoomName";

function App() {
  const { conn } = useStDbConn();

  const [currentRoomName] = useCurrentRoomName();

  useEffect(() => {
    if (currentRoomName) {
      document.title = `Scrum Poker @ ${currentRoomName}`;
    } else {
      document.title = "Scrum Poker";
    }
  }, [currentRoomName, conn]);

  return (
    <>
      <header className="flex h-16 w-full items-center justify-between p-4 md:w-3xl lg:w-5xl">
        <div className="flex h-full max-w-3/4 items-center gap-4">
          <Link to="/" className="aspect-square h-full">
            <Logo />
          </Link>

          {currentRoomName && (
            <div
              className="h-full items-center truncate text-lg font-medium"
              title={currentRoomName}
            >
              {currentRoomName}
            </div>
          )}
        </div>

        <HeaderSettings />
      </header>

      <main className="flex grow flex-col items-center overflow-auto p-4 md:w-3xl md:pt-32 lg:w-5xl">
        <Outlet />
      </main>
    </>
  );
}

export default App;
