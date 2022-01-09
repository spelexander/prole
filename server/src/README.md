## backend setup

This assumes you already have:
- Cloudflare page and zone setup
- Cloudflare worker created
- Cloudflare KV store
- FaunaDB instance

## Setup config file

1. Rename `wrangler-example.toml` -> `wrangler.toml`
2. After following the steps below all REDACTED ids must be substituted in `wrangler.toml` and 

## FaunaDB Setup

The main data for prole is stored in fauna db.

Create collections in the fauna DB web UI or shell
```
CreateCollection({name: "Endorsements"})
CreateCollection({name: "Party"})
CreateCollection({name: "Source"})

```

We also need to create the following indexes in the fauna DB web UI or shell
```
CreateIndex({
    name: "endoresement_source_index_1",
    source: Collection("Endorsements"),
    terms: [
      { field: ["data", "source"] }
    ]
  }),
CreateIndex({
    name: "party_link_index_1",
    source: Collection("Party"),
    terms: [
      { field: ["data", "link"] }
    ]
  }),
CreateIndex({
    name: "party_name_index_1",
    source: Collection("Party"),
    terms: [
      { field: ["data", "name"] }
    ]
  }),
CreateIndex({
    name: "source_domain_index_1",
    source: Collection("Source"),
    terms: [
      { field: ["data", "domain"] }
    ]
  }),
CreateIndex({
    name: "source_link_index_1",
    source: Collection("Source"),
    terms: [
      { field: ["data", "link"] }
    ]
  })
CreateIndex({
    name: "source_name_index_1",
    source: Collection("Source"),
    terms: [
      { field: ["data", "name"] }
    ]
  })
```

Add FAUNA DB access secret to worker env
```shell
wrangler secret put FAUNA_SECRET
wrangler secret put SEND_GRID_SECRET
wrangler secret put HELP_EMAIL_TO
wrangler secret put HELP_EMAIL_FROM
```

## KV setup

KV is used to store bearer token auth information (generated token) for writing to prole.

```shell
wrangler kv:namespace create "USERS"
wrangler kv:namespace create "previewUSERS"
```

Adding user access must be done through the KV web ui where:
- the generated token is the key
- the value is the user email or name in an object serliased like: `{ "user": "spelexander93@gmail.com" }`

generate keys using (after `node` in the command line):
```javascript
crypto.randomBytes(64).toString('hex')
```

Note that for local dev this is done for `previewUsers`
