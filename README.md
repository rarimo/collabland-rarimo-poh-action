<div align="center"><h1><b>Rarimo Proof of Humanity Collab🤝Land Action</b></h1></div>

This repo implements an [Collab.Land] action to add `/verify` command to your Discord server and
allow members to
verify their humanity using the [Rarimo Proof of Humanity] case.

## Getting Started

### Pre-requisites

#### Environment:

- Node.JS 18.14.0 [**[Download Here]**]

#### Tunnel Forwarding:

- ngrok [**[Installation Instructions]**]

#### Switching on signature verification:

- In order to verify the webhook requests coming from the Collab.Land bot, please delete
  the `SKIP_VERIFICATION` variable in your `.env` file and restart the server.
- Please fetch the public key from the [**[Collab.Land Config]**], and replace
  your `COLLABLAND_ACTION_PUBLIC_KEY` variable in the `.env` file.

## Setup

### Starting the server:

- Clone the repository to your machine
- Open the folder in a code editor of your choice
- Install dependencies:
  ```bash
  yarn install
  ```
- Build the project:
  ```bash
  yarn run build
  ```
- Start the server (The server starts in port `3000` by default):
  ```bash
  yarn start
  ```
- If the server fails due to the port being occupied, start the server in a different port:
  ```bash
  PORT=5000 yarn start
  ```
- To expose your localhost API to public domain, open a new terminal and start NGROK:
  ```bash
  ngrok http <PORT>
  ```
- Copy the `.ngrok.io` link shown in your terminal

## Installing the Collab.Land actions:

- The API exposes such types of Collab.Land actions:
  - `<NGROK URL>/verify` : Verify Discord server members via [Rarimo Proof of Humanity] use case.
- Use the `/test-flight install action-url: <Your action URL>` command in the Collab.Land Bot to
  install the Rarimo Proof of Humanity verification Collab.Land action.

## API Specifications

- The API exposes two routes per slash command:
  - GET `/verify/metadata` : To provide the metadata for the `/verify` command
  - POST `/verify/interactions` : To handle the Discord interactions corresponding to the `/verify`
    command
- The slash commands provide example codes for the following Discord interactions:
  - `/verify` : It shows how to interact with a basic slash command Discord interaction, and then
    reply to that interaction.

## Contributing

We welcome contributions from the community! To contribute to this project, follow these steps:

1. Please go through the following ["build a custom action"] article to understand the deep
   technical
   details regarding building on the [Collab.Land] actions platform.
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

[Installation Instructions]: https://ngrok.com/docs/getting-started

[Download Here]: https://nodejs.org/en/download/

[Collab.Land]: https://www.collab.land/

[Collab.Land Config]: https://api-qa.collab.land/config

["build a custom action"]: https://dev.collab.land/docs/upstream-integrations/collab-actions/getting-started-with-collab-actions
