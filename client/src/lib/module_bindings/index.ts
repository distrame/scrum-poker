// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN YOUR MODULE SOURCE CODE INSTEAD.

/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
import {
  AlgebraicType,
  AlgebraicValue,
  BinaryReader,
  BinaryWriter,
  CallReducerFlags,
  ConnectionId,
  DbConnectionBuilder,
  DbConnectionImpl,
  DbContext,
  ErrorContextInterface,
  Event,
  EventContextInterface,
  Identity,
  ProductType,
  ProductTypeElement,
  ReducerEventContextInterface,
  SubscriptionBuilderImpl,
  SubscriptionEventContextInterface,
  SumType,
  SumTypeVariant,
  TableCache,
  TimeDuration,
  Timestamp,
  deepEqual,
} from "@clockworklabs/spacetimedb-sdk";

// Import and reexport all reducer arg types
import { ClientConnected } from "./client_connected_reducer.ts";
export { ClientConnected };
import { ClientDisconnected } from "./client_disconnected_reducer.ts";
export { ClientDisconnected };
import { EnterRoom } from "./enter_room_reducer.ts";
export { EnterRoom };
import { Ping } from "./ping_reducer.ts";
export { Ping };
import { SetCard } from "./set_card_reducer.ts";
export { SetCard };
import { SetName } from "./set_name_reducer.ts";
export { SetName };

// Import and reexport all table handle types
import { PlayerTableHandle } from "./player_table.ts";
export { PlayerTableHandle };
import { RoomTableHandle } from "./room_table.ts";
export { RoomTableHandle };

// Import and reexport all types
import { Player } from "./player_type.ts";
export { Player };
import { Room } from "./room_type.ts";
export { Room };

const REMOTE_MODULE = {
  tables: {
    player: {
      tableName: "player",
      rowType: Player.getTypeScriptAlgebraicType(),
      primaryKey: "id",
    },
    room: {
      tableName: "room",
      rowType: Room.getTypeScriptAlgebraicType(),
      primaryKey: "name",
    },
  },
  reducers: {
    client_connected: {
      reducerName: "client_connected",
      argsType: ClientConnected.getTypeScriptAlgebraicType(),
    },
    client_disconnected: {
      reducerName: "client_disconnected",
      argsType: ClientDisconnected.getTypeScriptAlgebraicType(),
    },
    enter_room: {
      reducerName: "enter_room",
      argsType: EnterRoom.getTypeScriptAlgebraicType(),
    },
    ping: {
      reducerName: "ping",
      argsType: Ping.getTypeScriptAlgebraicType(),
    },
    set_card: {
      reducerName: "set_card",
      argsType: SetCard.getTypeScriptAlgebraicType(),
    },
    set_name: {
      reducerName: "set_name",
      argsType: SetName.getTypeScriptAlgebraicType(),
    },
  },
  // Constructors which are used by the DbConnectionImpl to
  // extract type information from the generated RemoteModule.
  //
  // NOTE: This is not strictly necessary for `eventContextConstructor` because
  // all we do is build a TypeScript object which we could have done inside the
  // SDK, but if in the future we wanted to create a class this would be
  // necessary because classes have methods, so we'll keep it.
  eventContextConstructor: (imp: DbConnectionImpl, event: Event<Reducer>) => {
    return {
      ...(imp as DbConnection),
      event
    }
  },
  dbViewConstructor: (imp: DbConnectionImpl) => {
    return new RemoteTables(imp);
  },
  reducersConstructor: (imp: DbConnectionImpl, setReducerFlags: SetReducerFlags) => {
    return new RemoteReducers(imp, setReducerFlags);
  },
  setReducerFlagsConstructor: () => {
    return new SetReducerFlags();
  }
}

// A type representing all the possible variants of a reducer.
export type Reducer = never
| { name: "ClientConnected", args: ClientConnected }
| { name: "ClientDisconnected", args: ClientDisconnected }
| { name: "EnterRoom", args: EnterRoom }
| { name: "Ping", args: Ping }
| { name: "SetCard", args: SetCard }
| { name: "SetName", args: SetName }
;

export class RemoteReducers {
  constructor(private connection: DbConnectionImpl, private setCallReducerFlags: SetReducerFlags) {}

  onClientConnected(callback: (ctx: ReducerEventContext) => void) {
    this.connection.onReducer("client_connected", callback);
  }

  removeOnClientConnected(callback: (ctx: ReducerEventContext) => void) {
    this.connection.offReducer("client_connected", callback);
  }

  onClientDisconnected(callback: (ctx: ReducerEventContext) => void) {
    this.connection.onReducer("client_disconnected", callback);
  }

  removeOnClientDisconnected(callback: (ctx: ReducerEventContext) => void) {
    this.connection.offReducer("client_disconnected", callback);
  }

  enterRoom(roomName: string) {
    const __args = { roomName };
    let __writer = new BinaryWriter(1024);
    EnterRoom.getTypeScriptAlgebraicType().serialize(__writer, __args);
    let __argsBuffer = __writer.getBuffer();
    this.connection.callReducer("enter_room", __argsBuffer, this.setCallReducerFlags.enterRoomFlags);
  }

  onEnterRoom(callback: (ctx: ReducerEventContext, roomName: string) => void) {
    this.connection.onReducer("enter_room", callback);
  }

  removeOnEnterRoom(callback: (ctx: ReducerEventContext, roomName: string) => void) {
    this.connection.offReducer("enter_room", callback);
  }

  ping() {
    this.connection.callReducer("ping", new Uint8Array(0), this.setCallReducerFlags.pingFlags);
  }

  onPing(callback: (ctx: ReducerEventContext) => void) {
    this.connection.onReducer("ping", callback);
  }

  removeOnPing(callback: (ctx: ReducerEventContext) => void) {
    this.connection.offReducer("ping", callback);
  }

  setCard(card: string | undefined) {
    const __args = { card };
    let __writer = new BinaryWriter(1024);
    SetCard.getTypeScriptAlgebraicType().serialize(__writer, __args);
    let __argsBuffer = __writer.getBuffer();
    this.connection.callReducer("set_card", __argsBuffer, this.setCallReducerFlags.setCardFlags);
  }

  onSetCard(callback: (ctx: ReducerEventContext, card: string | undefined) => void) {
    this.connection.onReducer("set_card", callback);
  }

  removeOnSetCard(callback: (ctx: ReducerEventContext, card: string | undefined) => void) {
    this.connection.offReducer("set_card", callback);
  }

  setName(name: string) {
    const __args = { name };
    let __writer = new BinaryWriter(1024);
    SetName.getTypeScriptAlgebraicType().serialize(__writer, __args);
    let __argsBuffer = __writer.getBuffer();
    this.connection.callReducer("set_name", __argsBuffer, this.setCallReducerFlags.setNameFlags);
  }

  onSetName(callback: (ctx: ReducerEventContext, name: string) => void) {
    this.connection.onReducer("set_name", callback);
  }

  removeOnSetName(callback: (ctx: ReducerEventContext, name: string) => void) {
    this.connection.offReducer("set_name", callback);
  }

}

export class SetReducerFlags {
  enterRoomFlags: CallReducerFlags = 'FullUpdate';
  enterRoom(flags: CallReducerFlags) {
    this.enterRoomFlags = flags;
  }

  pingFlags: CallReducerFlags = 'FullUpdate';
  ping(flags: CallReducerFlags) {
    this.pingFlags = flags;
  }

  setCardFlags: CallReducerFlags = 'FullUpdate';
  setCard(flags: CallReducerFlags) {
    this.setCardFlags = flags;
  }

  setNameFlags: CallReducerFlags = 'FullUpdate';
  setName(flags: CallReducerFlags) {
    this.setNameFlags = flags;
  }

}

export class RemoteTables {
  constructor(private connection: DbConnectionImpl) {}

  get player(): PlayerTableHandle {
    return new PlayerTableHandle(this.connection.clientCache.getOrCreateTable<Player>(REMOTE_MODULE.tables.player));
  }

  get room(): RoomTableHandle {
    return new RoomTableHandle(this.connection.clientCache.getOrCreateTable<Room>(REMOTE_MODULE.tables.room));
  }
}

export class SubscriptionBuilder extends SubscriptionBuilderImpl<RemoteTables, RemoteReducers, SetReducerFlags> { }

export class DbConnection extends DbConnectionImpl<RemoteTables, RemoteReducers, SetReducerFlags> {
  static builder = (): DbConnectionBuilder<DbConnection, ErrorContext, SubscriptionEventContext> => {
    return new DbConnectionBuilder<DbConnection, ErrorContext, SubscriptionEventContext>(REMOTE_MODULE, (imp: DbConnectionImpl) => imp as DbConnection);
  }
  subscriptionBuilder = (): SubscriptionBuilder => {
    return new SubscriptionBuilder(this);
  }
}

export type EventContext = EventContextInterface<RemoteTables, RemoteReducers, SetReducerFlags, Reducer>;
export type ReducerEventContext = ReducerEventContextInterface<RemoteTables, RemoteReducers, SetReducerFlags, Reducer>;
export type SubscriptionEventContext = SubscriptionEventContextInterface<RemoteTables, RemoteReducers, SetReducerFlags>;
export type ErrorContext = ErrorContextInterface<RemoteTables, RemoteReducers, SetReducerFlags>;
