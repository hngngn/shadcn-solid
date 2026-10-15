# SolidStart v2: Full-Stack Architecture, Nitro v3, and Vite Environment API

> Sources cited:
> - SolidStart v2 Migration & Docs: https://docs.solidjs.com/solid-start/v2/migrating-from-v1
> - SolidStart v2 Entrypoints: https://docs.solidjs.com/solid-start/v2/reference/entrypoints/vite-config

---

## 1. Critical Disambiguation: SolidStart v2 is Built on SolidJS v1!
- SolidStart v2 is the meta-framework build system upgrade (Vite 8 Environment API + Nitro v3, Node.js 24+).
- **SolidStart v2 runs on SolidJS v1 (`solid-js@^1.x`)!**
- Do not apply experimental Solid 2 reactivity syntax to SolidStart v2 unless `package.json` pins `solid-js: ^2.x`.

## 2. Configuration & Entrypoints
- `vite.config.ts`: `plugins: [solidStart({ middleware: "./src/middleware/index.ts" }), nitro()]`.
- `src/app.tsx`: Root `<Router>` and `<FileRoutes />`.
- `src/entry-client.tsx`: Mounts `<StartClient />`.
- `src/entry-server.tsx`: Wraps `<StartServer document={Document} />`.

## 3. Server Functions ("use server")
- `query(fn, key)` + `createAsync(fn)`.
- `action(fn, name)` + `<form action={action} method="post">`.
- `revalidate(key)`.
