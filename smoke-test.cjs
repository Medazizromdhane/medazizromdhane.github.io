const fs = require("node:fs");
const vm = require("node:vm");

const fakeApp = {
  innerHTML: "",
  addEventListener() {}
};

const sandbox = {
  console,
  setTimeout,
  clearTimeout,
  crypto: { randomUUID: () => "test-id" },
  localStorage: {
    getItem() {
      return null;
    },
    setItem() {}
  },
  location: { protocol: "http:" },
  navigator: {},
  window: {
    addEventListener() {}
  },
  document: {
    addEventListener() {},
    getElementById() {
      return fakeApp;
    },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    createElement() {
      return {
        click() {},
        remove() {},
        set href(value) {
          this._href = value;
        },
        set download(value) {
          this._download = value;
        }
      };
    },
    head: { appendChild() {} },
    body: { appendChild() {} }
  },
  Blob: class Blob {},
  URL: {
    createObjectURL() {
      return "blob:test";
    },
    revokeObjectURL() {}
  }
};

sandbox.window = { ...sandbox.window, ...sandbox };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync("app.js", "utf8"), sandbox, { filename: "app.js" });

vm.runInContext(
  `
  (async () => {
    const game = playPgn(SAMPLE_PGN);
    if (game.moves.length < 20) throw new Error("Sample PGN did not parse enough moves.");
    const start = parseFen(START_FEN);
    const candidates = rootCandidates(start, 1);
    if (!candidates.length) throw new Error("No candidate moves generated.");
    const analysis = await analyzePgn(SAMPLE_PGN, 1, 8);
    if (analysis.items.length !== 8) throw new Error("Unexpected analysis item count.");
    const insight = scanGameBrilliance({ pgn: SAMPLE_PGN });
    if (!["brilliant", "none", "unknown"].includes(insight.state)) throw new Error("Unexpected game insight state.");
    console.log("Smoke test passed:", game.moves.length, "moves parsed,", candidates.length, "opening candidates.");
  })()
`,
  sandbox
);
