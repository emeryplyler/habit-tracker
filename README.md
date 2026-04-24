This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## To Run

After cloning from Git, install the required packages:

```bash
npm install
```

Afterwards, you'll need to create a file called ".env" and populate it as follows:

```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.lybzmpo.mongodb.net/
JWT_SECRET=<secret>
DOMAIN=http://localhost:3000
```

Once the .env file is complete, you can run the project:

```bash
npm run dev
```

To run the backend unit tests:
```bash
npm run test
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
