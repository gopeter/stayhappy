import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData } from "react-router";
import { translations } from "~/i18n/translations";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const currentLanguage = params.lang === "de" ? "de" : "en";
  return {
    currentLanguage,
    meta: translations[currentLanguage].meta,
    privacy: translations[currentLanguage].privacy,
  };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [
      { title: "StayHappy Privacy Policy" },
      { description: "Your little helper to remember nice things" },
    ];
  }

  return [
    { title: `${data.meta.title} - ${data.privacy.title}` },
    { name: "description", content: data.meta.description },
  ];
};

export default function Index() {
  const { privacy: t } = useLoaderData<typeof loader>();

  return (
    <div
      className="relative text-foreground md:columns-2 lg:columns-3 xl:columns-4 column bg-clip-text bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-300 via-purple-300 to-indigo-400 privacy"
      style={{
        columnRuleStyle: "solid",
        columnRuleWidth: "1px",
        columnRuleColor: "var(--border)",
        columnGap: "4rem",
      }}
    >
      <h2 className="text-4xl md:text-5xl font-light font-crimson-pro mb-4 text-transparent">
        {t.title}
      </h2>
      <p>{t.intro}</p>
      <br />
      <h3>{t.infoTitle}</h3>
      <p>{t.infoText}</p>
      <br />
      <h3>{t.locationTitle}</h3>
      <p>{t.locationText}</p>
      <br />
      <h3>{t.thirdPartyTitle}</h3>
      <p>{t.thirdPartyText}</p>
      <br />
      <h3>{t.optOutTitle}</h3>
      <p>{t.optOutText}</p>
      <br />
      <h3>{t.childrenTitle}</h3>
      <p>{t.childrenText1}</p>
      <br />
      <p>{t.childrenText2}</p>
      <br />
      <h3>{t.securityTitle}</h3>
      <p>{t.securityText}</p>
      <br />
      <h3>{t.changesTitle}</h3>
      <p>{t.changesText}</p>
      <br />
      <p>{t.effectiveDate}</p>
      <br />
      <h3>{t.consentTitle}</h3>
      <p>{t.consentText}</p>
      <br />
      <h3>{t.contactTitle}</h3>
      <p>{t.contactText}</p>
      <br />
      <p>
        {t.generatedBy}{" "}
        <a
          href="https://app-privacy-policy-generator.nisrulz.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.generatorLink}
        </a>
        .
      </p>
    </div>
  );
}
