// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: smile;
// share-sheet-inputs: plain-text;

const jwt = args.widgetParameter;
const data = await fetchData(jwt);
const widget = createWidget(data);

Script.setWidget(widget);
Script.complete();

function relativeDate(date) {
  const to = new Date(date);
  to.setHours(0, 0, 0, 0);

  const from = new Date();
  from.setHours(0, 0, 0, 0);

  const timeDiff = to - from;
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  if (daysDiff === 0) {
    return "Heute";
  } else if (daysDiff === 1) {
    return "Morgen";
  } else {
    return `In ${daysDiff} Tagen`;
  }
}

function createWidget(data) {
  const w = new ListWidget();
  const bgColor = new LinearGradient();

  bgColor.colors = [new Color("#642B73"), new Color("#C6426E")];
  bgColor.locations = [0.0, 1.0];

  w.backgroundGradient = bgColor;
  w.setPadding(6, 12, 6, 12);
  w.spacing = 2;

  data.events.length = 4;

  data.events.forEach((event, i) => {
    const formattedStart = new DateFormatter();
    formattedStart.dateFormat = "EEEE, d MMM YY";

    const startDate = new Date(event.start);
    const relativeDateText = relativeDate(startDate);

    const dateText = w.addText(
      config.widgetFamily === "small"
        ? relativeDateText
        : `${relativeDateText} – ${formattedStart.string(
            new Date(event.start),
          )}`,
    );

    dateText.textColor = Color.white();
    dateText.textOpacity = 0.5;
    dateText.font = Font.heavySystemFont(9);

    const contentText = w.addText(event.content);
    contentText.textColor = Color.white();
    contentText.textOpacity = 1;
    contentText.font = Font.mediumSystemFont(12);

    if (i < data.events.length - 1) w.addSpacer(5);
  });

  return w;
}

async function fetchData(auth) {
  const url = "https://stayhappy.app/api/events";

  const request = new Request(url);
  request.headers = { Authentication: auth };
  const res = await request.loadJSON();

  return res;
}
