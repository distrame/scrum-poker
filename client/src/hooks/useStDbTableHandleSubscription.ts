import { useEffect } from "react";
import { EventContext } from "@/lib/module_bindings";

type RowCb<T> = (ctx: EventContext, row: T) => void;
type RowChangeCb<T> = (ctx: EventContext, oldRow: T, newRow: T) => void;

export interface TableHandle<T> {
  onInsert: (cb: RowCb<T>) => void;
  onUpdate: (cb: RowChangeCb<T>) => void;
  onDelete: (cb: RowCb<T>) => void;
  removeOnInsert: (cb: RowCb<T>) => void;
  removeOnUpdate: (cb: RowChangeCb<T>) => void;
  removeOnDelete: (cb: RowCb<T>) => void;
}

export function useStDbTableHandleSubscription<T>(
  tableHandle: TableHandle<T>,
  cbs: {
    onInsert?: RowCb<T>;
    onUpdate?: RowChangeCb<T>;
    onDelete?: RowCb<T>;
  } = {},
) {
  useEffect(() => {
    if (cbs.onInsert) {
      tableHandle.onInsert(cbs.onInsert);
    }
    if (cbs.onUpdate) {
      tableHandle.onUpdate(cbs.onUpdate);
    }
    if (cbs.onDelete) {
      tableHandle.onDelete(cbs.onDelete);
    }

    return () => {
      if (cbs.onInsert) {
        tableHandle.removeOnInsert(cbs.onInsert);
      }
      if (cbs.onUpdate) {
        tableHandle.removeOnUpdate(cbs.onUpdate);
      }
      if (cbs.onDelete) {
        tableHandle.removeOnDelete(cbs.onDelete);
      }
    };
  }, [tableHandle, cbs]);
}
