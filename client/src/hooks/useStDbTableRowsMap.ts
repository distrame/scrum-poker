import { useMap } from "usehooks-ts";
import {
  type TableHandle,
  useStDbTableHandleSubscription,
} from "./useStDbTableHandleSubscription";

export function useStDbTableRowsMap<T>(
  tableHandle: TableHandle<T>,
  getPk: (row: T) => string,
) {
  const [map, mapActions] = useMap<string, T>();

  useStDbTableHandleSubscription(tableHandle, {
    onInsert: (_ctx, row) => mapActions.set(getPk(row), row),
    onUpdate: (_ctx, _oldRow, newRow) => mapActions.set(getPk(newRow), newRow),
    onDelete: (_ctx, row) => mapActions.remove(getPk(row)),
  });

  return map;
}
