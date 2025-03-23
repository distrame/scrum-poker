import { useState } from "react";
import {
  type TableHandle,
  useStDbTableHandleSubscription,
} from "./useStDbTableHandleSubscription";

export function useStDbTableRow<T>(
  tableHandle: TableHandle<T>,
  predicate: (row: T) => boolean,
) {
  const [row, setRow] = useState<T | undefined>();

  useStDbTableHandleSubscription(tableHandle, {
    onInsert: (_ctx, row) => predicate(row) && setRow(row),
    onUpdate: (_ctx, _oldRow, newRow) => predicate(newRow) && setRow(newRow),
    onDelete: (_ctx, row) => predicate(row) && setRow(undefined),
  });

  return row;
}
