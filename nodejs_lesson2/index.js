const EventEmitter = require("events");
const emitter = new EventEmitter();
let eventName = "runTimer";

let entryDate = {
  seconds: 0,
  minutes: 0,
  hour: Number(process.argv[2]),
  day: Number(process.argv[3]),
  month: Number(process.argv[4]),
  year: Number(process.argv[5]),
};
let finishDate = Date.parse(
  new Date(
    entryDate.year,
    entryDate.month,
    entryDate.day,
    entryDate.hour,
    entryDate.minutes,
    entryDate.seconds
  )
);

function diffDates(start, end) {
  return end - start;
}

function run(endDate) {
  let timer = setInterval(() => {
    let startDate = Date.parse(new Date());
    let leftMs = diffDates(startDate, endDate);
    if (leftMs <= 0) {
      clearInterval(timer);
      console.log("Время вышло!");
    } else {
      console.clear();
      let leftTime = new Date(leftMs);
      console.log(
        `${leftTime.getUTCFullYear() - 1970}.${leftTime.getUTCMonth()}.${
          leftTime.getUTCDate() - 1
        }  ${leftTime.getUTCHours()}:${leftTime.getUTCMinutes()}:${leftTime.getUTCSeconds()}`
      );
    }
  }, 1000);
}

emitter.on("runTimer", () => run(finishDate));
emitter.emit(eventName);
