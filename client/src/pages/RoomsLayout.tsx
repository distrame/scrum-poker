import { useState } from "react";
import {
  Button,
  Input,
  ScrollArea,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui";
import { useStDbConn } from "@/components/StDbConnProvider";
import { EnterRoomIcon } from "@/components/icons";
import { useCurrentRoomName } from "@/hooks/useCurrentRoomName";
import { useStDbSqlSubscription } from "@/hooks/useStDbSqlSubscription";
import { useStDbTableRowsMap } from "@/hooks/useStDbTableRowsMap";

export function RoomsLayout() {
  const { conn } = useStDbConn();

  const roomsMap = useStDbTableRowsMap(conn.db.room, (room) => room.name);
  useStDbSqlSubscription("SELECT * FROM room");

  const [, setCurrentRoomName] = useCurrentRoomName();
  const [inputRoomName, setInputRoomName] = useState("");

  const filteredRooms = Array.from(roomsMap.values()).filter((room) => {
    return room.name.toLowerCase().includes(inputRoomName.toLowerCase());
  });

  const sortedRooms = filteredRooms.toSorted((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <div className="flex size-full flex-col gap-4">
      <div className="flex w-full items-center gap-2">
        <Input
          className="md:px-10"
          value={inputRoomName}
          onChange={(e) => setInputRoomName(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && setCurrentRoomName(inputRoomName)
          }
          placeholder="Room name"
        />

        <Button
          onClick={() => setCurrentRoomName(inputRoomName)}
          disabled={!inputRoomName}
          title={`Enter room ${inputRoomName}`}
        >
          <EnterRoomIcon />
        </Button>
      </div>

      <ScrollArea className="h-2/3 flex-1 md:flex-none">
        <Table className="table-fixed">
          <TableBody>
            {sortedRooms.map((room) => (
              <TableRow
                key={room.name}
                onClick={() => setCurrentRoomName(room.name)}
                className="cursor-pointer"
              >
                <TableCell
                  className="truncate text-lg md:px-10"
                  title={room.name}
                >
                  {room.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
