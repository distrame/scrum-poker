# scrum-poker

A simple web application for [Scrum Poker](https://en.wikipedia.org/wiki/Planning_poker)

## Built With

* [![React][React.js]][React-url]
* [![SpacetimeDB][SpacetimeDB.com]][SpacetimeDB-url]

## Usage

Add to `/etc/hosts`

```text
127.0.0.1 poker.localhost
127.0.0.1 api.poker.localhost
```

If using nginx not in docker, make a link file to nginx config

```shell
sudo ln -s /path/to/repo/nginx.conf /etc/nginx/sites-enabled/scrum-poker.conf

sudo nginx -t && sudo nginx -s reload
```

### With docker

Start containers

```shell
# starts client and spacetimedb server containers (recommended)
docker compose --profile stind up --build

# starts only client container
docker compose up --build

# starts containers for client, spacetimedb server and also nginx (recommended for windows)
docker compose --profile stind --profile nind up --build
```

Publish SpacetimeDb server module

```shell
docker compose --profile stind exec spacetime spacetime publish -y scrum-poker
```

If server code changed, generate client code

```shell
docker compose --profile stind exec spacetime spacetime generate --lang typescript -o /client-app/src/lib/module_bindings/
```

Stop and remove containers

```shell
docker compose --profile stind --profile nind down
```

### No docker

#### Server

If self-hosted, start spacetime server

```shell
spacetime start
```

Publish SpacetimeDb server module

```shell
# Hosted at https://spacetimedb.com
spacetime publish -p server/ -s maincloud poker

# Hosted locally (by default at http://localhost:3000)
spacetime publish -y -p server/ -s local poker

# Hosted at <url>
spacetime publish -p server/ -s <url> poker
```

If server code changed, generate client code

```shell
spacetime generate --lang typescript -o client/src/lib/module_bindings/ -p server/
```

#### Client

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
