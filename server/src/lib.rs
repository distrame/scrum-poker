use spacetimedb::Table;

mod name_gen;

#[spacetimedb::table(name=player, public)]
#[derive(Debug)]
pub struct Player {
    #[primary_key]
    id: spacetimedb::Identity,

    room_name: String,

    name: String,
    card: Option<String>,
    connections_count: u64,
}
impl Player {
    fn new(id: spacetimedb::Identity, name: String) -> Self {
        Self {
            id,
            name,
            room_name: String::new(),
            card: None,
            connections_count: 1,
        }
    }
}

#[spacetimedb::table(name=room, public)]
pub struct Room {
    #[primary_key]
    name: String,
}

#[spacetimedb::reducer(client_connected)]
pub fn client_connected(ctx: &spacetimedb::ReducerContext) {
    if let Some(player) = ctx.db.player().id().find(ctx.sender) {
        ctx.db.player().id().update(Player {
            connections_count: player.connections_count + 1,
            ..player
        });
    } else {
        ctx.db
            .player()
            .insert(Player::new(ctx.sender, name_gen::new_name(ctx)));
    }
}

#[spacetimedb::reducer(client_disconnected)]
pub fn client_disconnected(ctx: &spacetimedb::ReducerContext) -> Result<(), String> {
    let player = get_player(ctx, ctx.sender)?;

    if player.connections_count > 1 {
        ctx.db.player().id().update(Player {
            connections_count: player.connections_count - 1,
            ..player
        });
        return Ok(());
    }

    enter_room(ctx, String::new())?;

    ctx.db.player().id().delete(ctx.sender);

    Ok(())
}

#[spacetimedb::reducer]
pub fn ping(_ctx: &spacetimedb::ReducerContext) {}

fn get_player(
    ctx: &spacetimedb::ReducerContext,
    player_id: spacetimedb::Identity,
) -> Result<Player, String> {
    ctx.db
        .player()
        .id()
        .find(player_id)
        .ok_or("Player not found".into())
}

fn get_room_players(ctx: &spacetimedb::ReducerContext, room_name: String) -> Vec<Player> {
    ctx.db
        .player()
        .iter()
        .filter(|p| p.room_name == room_name)
        .collect()
}

#[spacetimedb::reducer]
pub fn enter_room(ctx: &spacetimedb::ReducerContext, room_name: String) -> Result<(), String> {
    let player = get_player(ctx, ctx.sender)?;

    if room_name == player.room_name {
        return Ok(());
    }

    if !room_name.is_empty() {
        if ctx.db.room().name().find(&room_name).is_none() {
            ctx.db.room().insert(Room {
                name: room_name.clone(),
            });
        };
    }

    ctx.db.player().id().update(Player {
        room_name: room_name.clone(),
        card: None,
        ..player
    });

    if !player.room_name.is_empty() {
        if get_room_players(ctx, player.room_name.clone()).is_empty() {
            ctx.db.room().name().delete(player.room_name);
        }
    };

    Ok(())
}

#[spacetimedb::reducer]
pub fn set_card(ctx: &spacetimedb::ReducerContext, card: Option<String>) -> Result<(), String> {
    let player = get_player(ctx, ctx.sender)?;

    if card == player.card {
        return Ok(());
    }

    ctx.db.player().id().update(Player { card, ..player });

    Ok(())
}

#[spacetimedb::reducer]
pub fn set_name(ctx: &spacetimedb::ReducerContext, name: String) -> Result<(), String> {
    let player = get_player(ctx, ctx.sender)?;

    if name == player.name {
        return Ok(());
    }

    ctx.db.player().id().update(Player { name, ..player });

    Ok(())
}
