// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: smile;
// share-sheet-inputs: plain-text;

const jwt = args.widgetParameter;
const data = await fetchData(jwt);
const widget = await createWidget(data);

if (!config.runsInWidget) widget.presentSmall();
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

async function loadImage(imgUrl) {
  const req = new Request(imgUrl);
  return await req.loadImage();
}

async function getImage(image) {
  let fm = FileManager.local();
  let dir = fm.documentsDirectory();
  let path = fm.joinPath(dir, image);
  if (fm.fileExists(path)) {
    return fm.readImage(path);
  } else {
    // download once
    let imageUrl;
    switch (image) {
      case "coffee":
        imageUrl =
          "https://cdn.jsdelivr.net/gh/gopeter/stayhappy/scriptable/coffee.png";
        break;
      default:
        console.log(`FP: Sorry, couldn't find ${image}.`);
    }
    let iconImage = await loadImage(imageUrl);

    fm.writeImage(path, iconImage);
    return iconImage;
  }
}

function writeEvent(event, stack, isLast) {
  const formattedStart = new DateFormatter();

  formattedStart.dateFormat = "E";
  const weekDayOfFormattedStart = formattedStart
    .string(new Date(event.start))
    .slice(0, -1);

  formattedStart.dateFormat = "d MMM YY";
  const fullDateOfFormattedStart = formattedStart.string(new Date(event.start));

  const startDate = new Date(event.start);
  const relativeDateText = relativeDate(startDate);

  const dateText = stack.addText(
    config.widgetFamily === "small"
      ? relativeDateText
      : `${relativeDateText} – ${weekDayOfFormattedStart}, ${fullDateOfFormattedStart}`,
  );

  dateText.textColor = Color.white();
  dateText.textOpacity = 0.5;
  dateText.font = Font.heavySystemFont(9);

  stack.addSpacer(2);

  const contentText = stack.addText(event.content);
  contentText.textColor = Color.white();
  contentText.textOpacity = 1;
  contentText.font = Font.mediumSystemFont(12);

  if (!isLast) stack.addSpacer(6);
}

async function createWidget(data) {
  const w = new ListWidget();
  const bgColor = new LinearGradient();

  bgColor.colors = [new Color("#642B73"), new Color("#C6426E")];
  bgColor.locations = [0.0, 1.0];

  w.backgroundGradient = bgColor;
  w.setPadding(20, 14, 20, 14);
  w.spacing = 0;

  const eventLength = data.events.length;

  let mainStack = w.addStack();
  mainStack.layoutHorizontally();

  let leftStack = mainStack.addStack();
  leftStack.layoutVertically();

  for (let i = 0; i < 4; i++) {
    const event = data.events[i];
    const isLast = i === 3;
    if (event) writeEvent(event, leftStack, isLast);
  }

  mainStack.addSpacer();

  if (config.widgetFamily !== "small") {
    let rightStack = mainStack.addStack();
    rightStack.layoutVertically();

    if (eventLength > 4) {
      for (let i = 4; i < 8; i++) {
        const event = data.events[i];
        const isLast = i === 7;
        if (event) writeEvent(event, rightStack, isLast);
      }
    } else {
      // TODO: add dynamic memories or things you're grateful for
      rightStack.setPadding(0, 20, 0, 0);
      const gratefulText = rightStack.addText(
        "Die Ruhe am Morgen, während du deinen frisch gebrühten Cappuchino genießt",
      );

      gratefulText.textColor = Color.white();
      gratefulText.font = Font.mediumSystemFont(14);
    }
  }

  w.addSpacer();

  return w;
}

async function fetchData(auth) {
  const url = `https://stayhappy.app/api/events?limit=${
    config.widgetFamily === "small" ? 4 : 8
  }`;

  const request = new Request(url);
  request.headers = { Authentication: auth };
  const res = await request.loadJSON();

  return res;
}
