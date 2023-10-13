import { MetaFunction } from "@vercel/remix";
import { RoughNotation } from "react-rough-notation";

export const meta: MetaFunction = () => [
  {
    title: "StayHappy",
  },
  {
    description: "Your little helper to remember nice things",
  },
];

export default function Index() {
  return (
    <div
      className="relative text-foreground md:columns-2 lg:columns-3 xl:columns-4 column bg-clip-text bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-300 via-purple-300 to-indigo-400 landingpage"
      style={{
        columnRuleStyle: "solid",
        columnRuleWidth: "1px",
        columnRuleColor: "var(--border)",
        columnGap: "4rem",
      }}
    >
      <h2 className="text-4xl md:text-5xl font-light font-crimson-pro mb-4 text-transparent">
        Fuck depression
      </h2>
      <p>
        Never give up. Your brain is just tricking you. Even on the darkest
        days, there is something to look forward to. The new album of your
        favourite band. Snow. The birthday of a good friend. A few days off when
        the kids are with grandma and grandpa. Eggnog at Christmas.
      </p>
      <p>You get the idea. Your brain forgets all the good stuff, though.</p>
      <h3>How does it work</h3>
      <p>
        So let yourself remember those good things. It doesn't matter if it's
        tomorrow or a few months from now. There's so much to look forward to.
        StayHappy was built to help you focus on these things. We distinguish
        between three categories.
      </p>
      <p>
        <RoughNotation
          type="highlight"
          color="#efdef6"
          show={true}
          padding={2}
          animationDuration={1000}
        >
          <strong>Gratefulness.</strong>
        </RoughNotation>{" "}
        All the things, no matter small or big, you're grateful for each day.
        Your child's cold feet when they crawl under your covers in the morning.
        The coffee from your portafilter. The scent of your favorite perfume
        that will always remind you of that one vacation.
      </p>
      <p>
        <RoughNotation
          type="highlight"
          color="#efdef6"
          show={true}
          padding={2}
          animationDelay={800}
          animationDuration={1000}
        >
          <strong>Memories.</strong>
        </RoughNotation>{" "}
        Some things that have happened in your life that always bring a smile to
        your face. Your wedding. The day you purchased your motor cycle. Your
        graduation.
      </p>
      <p>
        <RoughNotation
          type="highlight"
          color="#efdef6"
          show={true}
          padding={2}
          animationDelay={1800}
          animationDuration={1000}
        >
          <strong>Events.</strong>
        </RoughNotation>{" "}
        The next BBQ at your best friend's house. The upcoming ski vacation. The
        PlayStation game you've been waiting for for months.
      </p>
      <p>
        Whenever you need a smile, just look up what you've experienced and
        achieved in your life. And what's coming next, because, you know, there
        is always something to look forward to.
      </p>
      <h3>When will it be ready?</h3>
      <p>
        StayHappy is currently under active development. While you have to feed
        it with data in the web-app, it's main purpose is a widget on your
        smartphone, which should always remind you of the beautiful sides of
        your life.
        <br />
        It shows you the next things to look forward to. And if there is
        currently nothing, then you will simply be shown the things that please
        you every day – or that have pleased you in the past.
      </p>
      <p>
        You can follow the development on{" "}
        <a
          href="https://github.com/gopeter/stayhappy"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        .
      </p>
      <p>
        For the moment, you have to read the instructions on GitHub to run it on
        your own and to use the{" "}
        <a href="https://scriptable.app/" target="_blank" rel="noreferrer">
          Scriptable
        </a>{" "}
        widget. While it's basically possible to open registrations on
        stayhappy.app for all users too, I'm afraid of the data protection
        regulations at the moment. Something I don't want to deal (or rather
        mess around) with. If there's someone who wants to take over this part –
        you're warmly welcome!
      </p>
      <h3>What's about the pricing?</h3>
      <p>
        Our tool will always be free (as long as we can host it for free) and
        open source. You can also self-host it on your own servers.
      </p>
      <p>
        Please note that StayHappy is built by a few people who are affected
        themselves and who could draw some good from this approach. To say it
        short and clear: this thing has no medical or therapeutic background!
      </p>
    </div>
  );
}
