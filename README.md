# Helium Air purchase-flow prototype

A Vercel-ready, clickable prototype covering:

- room-size selection for every AC in the order;
- recommended, caution and blocked room-fit states;
- transparent standard-installation pricing;
- included work, common optional charges and payment timing;
- responsive desktop and mobile layouts.

## Fastest deployment: Vercel website

1. Extract this folder.
2. Create a new GitHub repository, such as `helium-purchase-flow-concept`.
3. Upload every file and folder from this package to that repository. Keep `app`, `public`, `package.json`, `package-lock.json`, `tsconfig.json` and `next-env.d.ts` at the repository root.
4. Sign in to Vercel and select **Add New → Project**.
5. Import the GitHub repository.
6. Vercel should detect **Next.js** automatically. Leave the root directory as `.` and keep the default build settings.
7. Select **Deploy**.
8. After deployment, open **Project Settings → Domains** to change the generated project name or connect a custom domain.

No environment variables, database or server configuration are required.

## Command-line deployment

1. Install Node.js 22 or newer.
2. In this folder, run `npm install`.
3. Run `npm run dev` to preview locally.
4. Run `npm run build` to verify the production build.
5. Run `npx vercel` and follow the prompts.
6. Run `npx vercel --prod` when you are ready to publish the production version.

## Suggested Vercel project name

`helium-purchase-flow-concept`

That normally produces a URL similar to:

`https://helium-purchase-flow-concept.vercel.app`

## Updating the prototype

Push later changes to the connected GitHub repository. Vercel automatically creates a preview for non-production branches and publishes the production branch according to the project settings.

## Important note

This is an independent product-design concept. It is not the live Helium checkout and does not submit orders or collect payments.
