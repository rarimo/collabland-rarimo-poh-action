# GitHub Action environment variables used during the build process.

If update is required, update the env variables on the following link
[https://github.com/rarimo/collabland-rarimo-poh-action/settings/secrets/actions](https://github.com/rarimo/collabland-rarimo-poh-action/settings/secrets/actions),
and after it trigger the CI pipeline (update it here and add change to the [CHANGELOG](./CHANGELOG.md)).

**ENV_TESTFLIGHT:**

```bash
APP_URL="https://collabland.robotornot.mainnet-beta.rarimo.com"
POH_APP_URL="https://robotornot.mainnet-beta.rarimo.com"
COLLABLAND_ED25519_PUBLIC_KEY_HEX="bc9b6e5b99a10481e47aad74dbfdadb125e3c50a642ed2546b3602e43373c93a"
```

**ENV_DEVNET:**

```bash
APP_URL="https://collabland.robotornot.mainnet-beta.rarimo.com"
POH_APP_URL="https://robotornot.rarimo.com"
COLLABLAND_ED25519_PUBLIC_KEY_HEX="6a6e03cf267fc37761f7e74c59b4f4cc35c6c9cf3111587a4f394f58b5d54c1f"
```

**ENV_MAINNET:**

```bash
APP_URL="https://collabland.robotornot.rarimo.com"
POH_APP_URL="https://robotornot.rarimo.com"
COLLABLAND_ED25519_PUBLIC_KEY_HEX="e18b5a557a8d3b5cb5fae098a02c83f3c61fcf910c1996e92881f885ae9e0da2"
```
