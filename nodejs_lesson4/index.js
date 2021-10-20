const http = require("http");
const path = require("path");
const fs = require("fs");

(async () => {
  const isFile = (filePath) => {
    return fs.lstatSync(filePath).isFile();
  };
  console.log("starting");

  http
    .createServer((req, res) => {
      const fullPath = path.join(process.cwd(), req.url);
      const file = isFile(fullPath);
      const exists = fs.existsSync(fullPath);
      if (file) {
        return fs.createReadStream(fullPath).pipe(res);
      }
      if (!exists) {
        return res.end("File or directory not found!");
      }

      let listItems = "";

      fs.readdirSync(fullPath).forEach((fileName) => {
        const filePath = path.join(req.url, fileName);
        listItems += `<li><a href='${filePath}'>${fileName}</a></li>`;
      });

      const HTML = fs
        .readFileSync(path.join(__dirname, "index.html"), "utf-8")
        .replace("##links", listItems);
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(HTML);
    })
    .listen(5555);
})();
