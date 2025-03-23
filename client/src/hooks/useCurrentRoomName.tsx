import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useStDbConn } from "@/components/StDbConnProvider";

export function useCurrentRoomName(): [string, (newRoomName: string) => void] {
  const navigate = useNavigate();
  const location = useLocation();
  const roomNameFromUri = decodeURI(
    `${location.pathname.slice(1)}${location.search}${location.hash}`,
  );

  const { conn } = useStDbConn();

  const setCurrentRoomName = useCallback(
    (newRoomName: string) => {
      navigate(`/${newRoomName}`);
    },
    [navigate],
  );

  useEffect(() => {
    conn.reducers.enterRoom(roomNameFromUri);
  }, [roomNameFromUri, conn]);

  return [roomNameFromUri, setCurrentRoomName];
}
