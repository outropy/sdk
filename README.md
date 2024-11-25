# Outropy SDK (beta)

## Install

```bash
npm install @outropy/ts-sdk
```

## Setup

Add environment variables to your project.

```bash
OUTROPY_API_KEY=your-api-key
OUTROPY_API_ENDPOINT=you-outropy-endpoint
```

Your endpoint should look something like `https://XXXXX.outropy.ai`

## Recommended usage

Setup the Outropy client.

```ts
import { outropyClient } from '@outropy/ts-sdk';

const outropy = outropyClient();
```

By default, `outropyClient` uses the environment variables `OUTROPY_API_KEY` and `OUTROPY_API_ENDPOINT` for configuration. However, you can override these values by passing an options object directly to the client.

```ts
import { outropyClient } from '@outropy/ts-sdk';

const outropy = outropyClient({
  apiKey: 'your-api-key',
  endPoint: 'your-outropy-endpoint',
});
```

Check the [API reference](https://docs.outropy.ai/api-reference/introduction) for more information.

## Contributing

This project uses [changesets](https://github.com/changesets/changesets) to manage versioning and changelog.

After developing, run the following command to generate a changeset for your changes.

```bash
npx changeset
```

This will create a changeset file in the `.changeset` folder where you can add more details about your changes. Once you're done, commit and push the changes to the repository.
