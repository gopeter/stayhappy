# Fuck depression, stay happy

Never give up. Your brain is just fucking with you. Even on the darkest days, there is something to look forward to. The new album of your favorite band. Snow. The birthday of a good friend. A few days off when the kids are with grandma and grandpa. Eggnog at Christmas. You get the idea.

Your brain forgets all the good stuff, though.

So let yourself remember those good things. It doesn't matter if it's tomorrow or a few months from now. There's so much to look forward to.

stayhappy.app is designed to help you focus on these things. We differentiate between the following three areas:
- Gratefulness: all the things, no matter small or big, you're grateful for each day. Your child's cold feet when they crawl under your covers in the morning. The coffee from your portafilter. The scent of your favorite perfume that will always remind you of that one vacation.
- Memories: some things that have happened in your life that always bring a smile to your face. Your wedding. The day you purchased your motor cycle. Your graduation.
- Events: the next BBQ at your best friend's house. The upcoming ski vacation. Das PlayStation-Spiel, auf das du die letzten Monate gewartet hast.

Whenever you need a smile, just look up what you've experienced and achieved in your life. And what's coming next, because, you know, there is *always* something to look forward to.

# Concept/Todos

- Login/Register
- Navigation for Gratefulness, Memories and Events
- CRUD for Gratefulness, Memories and Events
- Calendar view for past and future events
- CardDAV would be nice
- Push notifications if CardDAV is not an option
- All done as progressive web app

## Development

- [Remix Docs](https://remix.run/docs)
- [Fly deployment](https://remix-prisma-starter.fly.dev/)
- [Vercel deployment](https://remix-prisma-starter.vercel.app/)

## Custom things to this repo

- Authentication with cookies
- Backed by Prisma and postgres
- Authorizing resource access
- Locale handling with SSR
- UI components via [shadcnui](https://ui.shadcn.com/)

## Quickstart

Just create a new `remix` project using this template with the following command:

```
npx create-remix@latest --template jfranciscosousa/remix-prisma-starter
```

This will prompt you to add your postgres database details. Make sure to use different databases for development and for testing.

## Deployment

After having run the `create-remix` command and selected "Vercel" as a deployment target, you only need to [import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed.

If you'd like to avoid using a Git repository, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
npm install --global vercel
vercel
```

It is generally recommended to use a Git repository, because future commits will then automatically be deployed by Vercel, through its [Git Integration](https://vercel.com/docs/concepts/git).

You can also deploy this to [Fly](https://fly.io). You just have to run `fly deploy --remote-only`. This template already has a Github action that does that for you, you just need to setup a `FLY_API_TOKEN` for your Github repo.

## Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
npm i
```

Afterward, start the Remix development server like so:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!


## Testing

This template repo has `playwright` setup with `react-testing-library` utilities. You can see some example tests on the repo itself.

It loads up `.env.test` file config, so it uses a different database and a different dev server port for the E2E tests.

All tests are run in sync by a single worker so we can safely reset the database before each test starts.

Before running `npm run dev test` for the first time, make sure to run these commands:
- `npx playwright install`
- `npx playwright install-deps`
