import { RoughNotation } from "react-rough-notation";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData } from "react-router";
import { translations } from "~/i18n/translations";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const currentLanguage: "en" | "de" = params.lang === "de" ? "de" : "en";
  return {
    currentLanguage,
    meta: translations[currentLanguage].meta,
  };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [
      { title: "StayHappy" },
      { description: "Your little helper to remember nice things" },
    ];
  }

  return [
    { title: data.meta.title },
    { name: "description", content: data.meta.description },
  ];
};

export default function Index() {
  const { currentLanguage } = useLoaderData<typeof loader>();
  const t = translations[currentLanguage as keyof typeof translations];

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
        {t.home.hero}
      </h2>
      <p>{t.home.intro}</p>
      <p>
        <a
          href="https://apps.apple.com/de/app/stayhappy/id6502288134"
          target="_blank"
          rel="noopener"
        >
          <img
            src={`/images//Download_on_the_App_Store_Badge_${currentLanguage.toUpperCase()}_RGB_wht_092917.svg`}
            alt={t.home.appStoreAlt}
            className="dark"
          />
          <img
            src={`/images/Download_on_the_App_Store_Badge_${currentLanguage.toUpperCase()}_RGB_blk_092917.svg`}
            alt={t.home.appStoreAlt}
            className="light"
          />
        </a>
      </p>
      <p>
        {t.home.availability}{" "}
        <a
          href="https://github.com/gopeter/stayhappy-app"
          target="_blank"
          rel="noopener"
        >
          {t.home.github}
        </a>
        {t.home.availability2}
      </p>
      <p>
        <RoughNotation
          key={currentLanguage}
          type="highlight"
          color="var(--happy)"
          show={true}
          padding={2}
          animationDuration={1000}
        >
          <strong>{t.home.moments}</strong>
        </RoughNotation>{" "}
        {t.home.momentsText}
      </p>
      <p>
        <RoughNotation
          key={currentLanguage}
          type="highlight"
          color="var(--happy)"
          show={true}
          padding={2}
          animationDelay={800}
          animationDuration={1000}
        >
          <strong>{t.home.resources}</strong>
        </RoughNotation>{" "}
        {t.home.resourcesText}
      </p>
      <p>
        <RoughNotation
          key={currentLanguage}
          type="highlight"
          color="var(--happy)"
          show={true}
          padding={2}
          animationDelay={1800}
          animationDuration={1000}
        >
          <strong>{t.home.highlights}</strong>
        </RoughNotation>{" "}
        {t.home.highlightsText}
      </p>
      <p>{t.home.outro1}</p>
      <p>{t.home.outro2}</p>
      <h3>{t.home.contact}</h3>
      <p>{t.home.contactText}</p>
    </div>
  );
}
