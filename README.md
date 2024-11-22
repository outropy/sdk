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
```

If you want to use a custom Outropy API domain, you can set it as well.

```bash
OUTROPY_API_DOMAIN=https://outropy-api-domain
```

By default, it will use `https://app.outropy.ai`.

## Recommended usage

Setup the Outropy client.

```ts
import { outropy as outropyClient } from '@outropy/ts-sdk';

const outropy = outropyClient({
  apiKey: process.env.OUTROPY_API_KEY,
});
```

Check the [API reference](https://docs.outropy.ai/api-reference/introduction) for more information.
