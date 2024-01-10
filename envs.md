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
COLLABLAND_ED25519_PUBLIC_KEY_HEX="622a25e27b1547daf61d2349fe328f9c3e17e48fb9884934f3d60bd2ab750a0b"
```
