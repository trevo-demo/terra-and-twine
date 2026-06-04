# Terra & Twine 🌿

Thoughtful goods for people who talk to their plants. A small Next.js (App Router)
storefront: a catalog, product pages, a cookie cart, a demo checkout that takes no
payment, and a newsletter form.

```sh
npm install
npm run dev
```

Experiments run through [Trevo](https://trevosdk.com). Set `NEXT_PUBLIC_TREVO_API_KEY`
to the workspace's publishable key; the middleware gives every visitor a stable
`trevo_id` cookie so the server and the client agree on one identity.

The shipping rule lives on the server (`lib/shipping.ts`) and is only revealed at
checkout. No real plants were harmed.
