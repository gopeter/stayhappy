// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: smile;
// share-sheet-inputs: plain-text;

const jwt = args.widgetParameter;
const data = await fetchData(jwt);
const widget = createWidget(data);

Script.setWidget(widget);
Script.complete();

function createWidget(data) {
  const w = new ListWidget();
  const bgColor = new LinearGradient();

  bgColor.colors = [new Color("#29323c"), new Color("#1c1c1c")];
  bgColor.locations = [0.0, 1.0];

  w.backgroundGradient = bgColor;
  w.setPadding(6, 12, 6, 12);
  w.spacing = 2;

  data.events.length = 4;

  data.events.forEach((event, i) => {
    const formattedStart = new DateFormatter();
    formattedStart.dateFormat = "EEEE, d MMM YY";
    const dateText = w.addText(formattedStart.string(new Date(event.start)));
    dateText.textColor = Color.white();
    dateText.textOpacity = 0.6;
    dateText.font = Font.boldSystemFont(9);

    const contentText = w.addText(event.content);
    contentText.textColor = Color.white();
    contentText.textOpacity = 1;
    contentText.font = Font.lightSystemFont(11);

    if (i < data.events.length - 1) w.addSpacer(6);
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
