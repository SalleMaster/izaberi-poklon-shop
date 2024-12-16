### Izaberi poklon shop

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

- Preview deployment: vercel
- Production deployment: vercel --prod

## Prisma commands

- `npx prisma db push` - Update database when we change schema
- `npx prisma studio` - Database preview in the browser
- `npx prisma db seed` - Seed the database
- `npx prisma migrate dev` - Similar to db push, but it creates a migrate file also

## Next.js 15 Upgrade notes

- `"prisma": "^5.22.0",` - Moved Prisma as main dependency, try to move it back to devDeps after some time
- `"installCommand": "npm install --force"` - Created vercel.json installation script. Remove it once React 19 is stable
- `adapter: PrismaAdapter(prisma) as Adapter,` - Remove type casting from auth.ts file
- ESLint does not work when doing production build on Vercel
