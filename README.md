# scrum-poker

A simple web application for [Scrum Poker](https://en.wikipedia.org/wiki/Planning_poker)

## Built With

* [![React][React.js]][React-url]
* [![SpacetimeDB][SpacetimeDB.com]][SpacetimeDB-url]

## Development

### Requirements

* [Node.js/npm](https://nodejs.org/en/download) or any package manager of your choice
* [Spacetime](https://spacetimedb.com/install) (Required only for self-hosted SpacetimeDb server)

Any requirement may be replaced with [Docker](https://docs.docker.com/engine/install)

### Run

The app will be available at <http://localhost:5173>

#### With docker

Start containers

```shell
# starts only spacetimedb server container
docker compose --profile stdb up --build

# starts only client container
docker compose --profile client up --build

# starts both containers
docker compose --profile all up --build
```

Publish SpacetimeDb server module to local server

```shell
docker compose --profile stdb exec spacetime spacetime publish -y scrum-poker
```

If server code changed, generate client code

```shell
docker compose --profile stdb exec spacetime spacetime generate --lang typescript -o /client-app/src/lib/module_bindings/
```

Stop and remove containers

```shell
docker compose --profile all down
```

#### No docker

##### Server

If self-hosted, start spacetime server

```shell
spacetime start
```

Publish SpacetimeDb server module

```shell
# Hosted at https://spacetimedb.com
spacetime publish -p server/ -s maincloud scrum-poker

# Hosted locally (by default at http://localhost:3000)
spacetime publish -y -p server/ -s local scrum-poker

# Hosted at <url>
spacetime publish -p server/ -s <url> scrum-poker
```

If server code changed, generate client code

```shell
spacetime generate --lang typescript -o client/src/lib/module_bindings/ -p server/
```

##### Client

Install dependencies and run dev server

```shell
cd client

npm ci
npm run dev
```

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org
[SpacetimeDB.com]: https://img.shields.io/badge/SpacetimeDB-20232A?style=for-the-badge
[SpacetimeDB-url]: https://spacetimedb.com
