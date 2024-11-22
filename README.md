# Outropy SDK (beta)

## Install

```bash
echo "@outropy:registry=https://npm.pkg.github.com" >> ~/.npmrc
npm install @outropy/ts-sdk@0.0.1
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
import { outropy as outropyClient } from '@outropy/ts-sdk';

const outropy = outropyClient({
  apiKey: process.env.OUTROPY_API_KEY,
  apiEndpoint: process.env.OUTROPY_API_ENDPOINT,
});
```

Check the [API reference](https://docs.outropy.ai/api-reference/introduction) for more information.
