<div align="center"><h1><b>Rarimo Proof of Humanity Collab.Land Action</b></h1></div>

This repo implements an [Collab.Land] action to add `/verify` command to your Discord server and
allow members to verify their humanity using the [Rarimo Proof of Humanity] case.

## Table of Contents

- [Getting Started](#getting-started)
  * [Pre-requisites](#pre-requisites)
    + [Environment](#environment)
    + [Tunnel Forwarding](#tunnel-forwarding)
- [Configuration](#configuration)
  * [Slash command names](#slash-command-names)
- [Setup](#setup)
  * [Starting the server](#starting-the-server)
- [Run with Docker](#run-with-docker)
  * [Build](#build)
  * [Run](#run)
- [Installing the Collab.Land actions](#installing-the-collabland-actions)
- [API Specifications](#api-specifications)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

## Getting Started

### Pre-requisites

#### Environment

- **[Node.JS >= version 18]**
- **[Docker]**

#### Tunnel Forwarding

- **[ngrok]**

## Configuration

- Set `NEXT_PUBLIC_APP_URL` to the URL of your application in the `.env` file. This URL will be used
  to redirect users after they verify their humanity. By default, it should be `http://localhost:8000`
  if you didn't change the port (check [Starting the server](#starting-the-server))
- Set `NEXT_PUBLIC_ENVIRONMENT` to `devnet` or `mainnet` in the `.env` file to specify which Rarimo
  Proof of Humanity network you want to use. For the `devnet` Goerli network is used, for the
  `mainnet` Polygon network is used.
- Set `NEXT_PUBLIC_POH_APP_URL` to the according url of the Rarimo Proof of Humanity application in
  the `.env` file. By default, it should be `https://robotornot.mainnet-beta.rarimo.com` for the
  `devnet` and `https://robotornot.rarimo.com` for the `mainnet`.
- Set `NEXT_PUBLIC_COLLABLAND_API_URL` to the according url of the Collab.Land API in the `.env`
  file. By default, it should be `https://api-qa.collab.land` for the `devnet` and
  `https://api.collab.land` for the `mainnet`.
- Set `DB_URL` to the URL of your Postgres database in the `.env` file. By default, it should be
  `postgresql://rarimo-poh:rarimo-poh@localhost:15432/rarimo-poh-db?sslmode=disable` (by default
  [docker-compose.yml](./docker-compose.yml)) expose `15432` port for Postgres.
- (Optional) In order to verify the webhook requests coming from the Collab.Land bot, please set
  the `SKIP_VERIFICATION` variable in your `.env` file to `false`.
- Please, fetch the public key from the [**[Collab.Land Config]**], and replace
  your `COLLABLAND_ECDSA_PUBLIC_KEY`, `COLLABLAND_ED25519_PUBLIC_KEY_HEX`
  variables in the `.env` file.
- [Register OAuth2 Client Application] and set the `NEXT_PUBLIC_COLLABLAND_CLIENT_ID`,
  `COLLABLAND_CLIENT_SECRET`, `COLLABLAND_API_KEY` variables in the `.env` file.
- (Optional) Set `LOG_LEVEL` to `debug` or `info` in the `.env` file to specify the log level. By default, it
  will be `debug`.

Check the full `.env` file [example](./env-example) config for more details.

### Slash command names

Slash command names could be changed in `.env` file, if needed, by the default, they are `setup` and
`verify` accordingly:

```bash
# file: .env

SETUP_ACTION_NAME="my-setup-command"
VERIFY_ACTION_NAME="my-verify-command
```

## Setup

### Starting the server

- Clone the repository to your machine
- Open the folder in a code editor of your choice
- Install dependencies:
  ```bash
  yarn install
  ```
- Run Postgres in Docker:
  ```bash
  docker-compose up -d
  ```
- Start the server (The server starts in port `8000` by default):
  ```bash
  yarn dev
  ```
- If the server fails due to the port being occupied, change the server port in the [package.json]
  file and in the `.env` file accordingly:
  ```json
  // file: package.json

  {
    "scripts": {
      "dev-server": "next dev -p <PORT>"
    }
  }
  ```
  ```bash
  # file: .env

  NEXT_PUBLIC_APP_URL="http://localhost:<PORT>"
  ```
- To expose your localhost API to public domain, open a new terminal and start NGROK:
  ```bash
  ngrok http <PORT>
  ```
- Copy the `.ngrok.io` link shown in your terminal:
  ```bash
  # Example:

  https://0c49-2601-646-9e00-80-3964-47d-7146-ff13.ngrok.io/
  ```

## Run with Docker

### Build

Before the build replace database url in the `.env` file with the following:

```bash
# file: .env

DB_URL="postgresql://rarimo-poh:rarimo-poh@rarimo-poh-db:5432/rarimo-poh-db?sslmode=disable"
```

To build the Docker image, run the following command:

```bash
docker build . -t rarimo-poh:latest
```

### Run

1. Uncomment following lines in the [docker-compose.yml](./docker-compose.yml) file:
    ```yaml
    # file: docker-compose.yml

    # uncomment to test local build
    #
    #  rarimo-poh:
    #    image: rarimo-poh:latest
    #    restart: unless-stopped
    #    entrypoint: sh -c "node_modules/.bin/knex migrate:up && node_modules/.bin/next start"
    #    ports:
    #      - "8000:8000"
    ```

2. Run the following command:

    ```bash
    docker-compose up -d
    ```

    Application will be available at `http://localhost:8000`, if you didn't change the port in the
    [package.json] file and in the `.env` file, otherwise, you have to change the port accordingly in
    the `docker-compose.yml` file in the `ports` section:

    ```yaml
    # file: docker-compose.yml

    services:
      rarimo-poh:
        image: rarimo-poh:latest
        restart: unless-stopped
        entrypoint: sh -c "node_modules/.bin/knex migrate:up && node_modules/.bin/next start"
        ports:
          - "<PORT>:8000"
    ```

## Installing the Collab.Land actions

- Follow these steps to install the Collab.Land actions: [Test the Actions in a Discord server]
- Setup action with the `/setup` command
- Verify your humanity with the `/verify` command

## API Specifications

- The API exposes two routes per slash command:
  - GET `/verify/metadata`: To provide the metadata for the `/verify` command
  - POST `/verify/interactions`: To handle the Discord interactions corresponding to the `/verify`
    command
- The slash commands provide example codes for the following Discord interactions:
  - `/setup`: Allows you to setup Rarimo Proof of Humanity Verify Action for your Discord server.
  - `/verify`: Verify your humanity with Rarimo Proof of Humanity use case and get the verified role
    in your Discord server.

## Contributing

We welcome contributions from the community! To contribute to this project, follow these steps:

1. Please go through the following ["build a custom action"] article to understand the deep
   technical details regarding building on the [Collab.Land] actions platform.
1. Fork the repository.
1. Create a new branch with a descriptive name for your feature or bug fix.
1. Make your changes and commit them.
1. Push your changes to your branch on your GitHub fork.
1. Create a pull request from your branch to the `main` branch of this repository.

Please ensure your pull request adheres to the following guidelines:

- Add a clear pull request title;
- Add a comprehensive pull request description that includes the motivation behind the changes,
  steps needed to test them, etc;
- Update the CHANGELOG.md accordingly;
- Keep the codebase clean and well-documented;
- Make sure your code is properly tested;
- Reference any related issues in your pull request;

The maintainers will review your pull request and may request changes or provide feedback before
merging. We appreciate your contributions!

## Changelog

For the changelog, see [CHANGELOG.md](./CHANGELOG.md).

## License

This project is under the MIT License — see the [LICENSE](./LICENSE) file for details.

[Rarimo Proof of Humanity]: https://docs.rarimo.com/use-cases/proof-of-humanity

[ngrok]: https://ngrok.com/docs/getting-started

[Node.JS >= version 18]: https://nodejs.org/en/download/

[Docker]: https://docs.docker.com/engine/install/

[Collab.Land]: https://www.collab.land/

[Collab.Land Config]: https://api-qa.collab.land/config

["build a custom action"]: https://dev.collab.land/docs/upstream-integrations/collab-actions/getting-started-with-collab-actions

[package.json]: ./package.json

[Test the Actions in a Discord server]: https://dev.collab.land/docs/upstream-integrations/collab-actions/getting-started-with-collab-actions#test-the-actions-in-a-discord-server

[OAuth2 Client Application]: https://dev.collab.land/docs/downstream-integrations/api/authentication#register-your-oauth2-client-application
