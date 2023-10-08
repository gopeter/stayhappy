# Fuck depression

Never give up. Your brain is just fucking with you. Even on the darkest days, there is something to look forward to. The new album of your favorite band. Snow. The birthday of a good friend. A few days off when the kids are with grandma and grandpa. Eggnog at Christmas. You get the idea.

## Status

Built on top of Remix, Prisma and Postgres, deployed to Vercel. [stayhappy.app](https://stayhappy.app) will always be open source and free (as long as I can host it for free). Host your own version or you use the hosted one on [stayhappy.app](https://stayhappy.app). For now, I'm not sure how to handle terms of use, data protection clauses and so on. Any help would be appreciated!

## Development

The app is based on the Remix template [`remix-prisma-starter`](https://github.com/jfranciscosousa/remix-prisma-starter). Please check the repo for all details.

### Quickstart

- Make sure to have Postgresql installed
- `cp .env.sample .env` and enter the right database credentials
- Run migrations with `npx prisma migrate dev`
- Start with `npm run dev`

### Testing

This template repo has `playwright` setup with `react-testing-library` utilities. You can see some example tests on the repo itself.

It loads up `.env.test` file config, so it uses a different database and a different dev server port for the E2E tests.

All tests are run in sync by a single worker so we can safely reset the database before each test starts.

Before running `npm run dev test` for the first time, make sure to run these commands:
- `npx playwright install`
- `npx playwright install-deps`
