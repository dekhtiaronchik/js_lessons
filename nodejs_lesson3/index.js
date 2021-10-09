const fs = require("fs");
const readline = require("readline");

const readStream = fs.createReadStream("./access.log", "utf8");
const writeStream1 = fs.createWriteStream("./89.123.1.41_requests.log", {
  flags: "a",
  encoding: "utf8",
});
const writeStream2 = fs.createWriteStream("./34.48.240.111_requests.log", {
  flags: "a",
  encoding: "utf8",
});

const rl = readline.createInterface({
  input: readStream,
});
rl.on("line", (line) => {
  if (line.includes("89.123.1.41")) {
    writeStream1.write(line + "\n");
  } else if (line.includes("34.48.240.111")) {
    writeStream2.write(line + "\n");
  }
});
