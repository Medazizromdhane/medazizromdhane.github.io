const FILES = "abcdefgh";
const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const PIECE_UNICODE = {
  K: "♔",
  Q: "♕",
  R: "♖",
  B: "♗",
  N: "♘",
  P: "♙",
  k: "♚",
  q: "♛",
  r: "♜",
  b: "♝",
  n: "♞",
  p: "♟"
};
const PIECE_NAMES = {
  K: "king",
  Q: "queen",
  R: "rook",
  B: "bishop",
  N: "knight",
  P: "pawn"
};
const VALUES = { P: 100, N: 320, B: 330, R: 500, Q: 900, K: 0 };
const PST = {
  P: [0, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 50, 50, 50, 50, 10, 10, 20, 30, 30, 20, 10, 10, 5, 5, 10, 28, 28, 10, 5, 5, 0, 0, 0, 22, 22, 0, 0, 0, 5, -5, -10, 0, 0, -10, -5, 5, 5, 10, 10, -22, -22, 10, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0],
  N: [-45, -30, -20, -20, -20, -20, -30, -45, -30, -10, 0, 6, 6, 0, -10, -30, -20, 8, 18, 22, 22, 18, 8, -20, -20, 4, 22, 28, 28, 22, 4, -20, -20, 0, 18, 28, 28, 18, 0, -20, -20, 4, 12, 18, 18, 12, 4, -20, -30, -10, 0, 4, 4, 0, -10, -30, -45, -30, -20, -20, -20, -20, -30, -45],
  B: [-20, -10, -10, -10, -10, -10, -10, -20, -10, 8, 0, 0, 0, 0, 8, -10, -10, 10, 12, 14, 14, 12, 10, -10, -10, 0, 14, 18, 18, 14, 0, -10, -10, 8, 14, 18, 18, 14, 8, -10, -10, 0, 12, 14, 14, 12, 0, -10, -10, 4, 0, 0, 0, 0, 4, -10, -20, -10, -10, -10, -10, -10, -10, -20],
  R: [0, 0, 0, 8, 8, 0, 0, 0, 8, 14, 14, 14, 14, 14, 14, 8, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, 0, 0, 0, 8, 8, 0, 0, 0],
  Q: [-20, -10, -10, -5, -5, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 8, 8, 8, 8, 0, -10, -5, 0, 8, 12, 12, 8, 0, -5, 0, 0, 8, 12, 12, 8, 0, -5, -10, 8, 8, 8, 8, 8, 0, -10, -10, 0, 8, 0, 0, 0, 0, -10, -20, -10, -10, -5, -5, -10, -10, -20],
  K: [20, 30, 10, 0, 0, 10, 30, 20, 20, 20, 0, 0, 0, 0, 20, 20, -10, -20, -20, -20, -20, -20, -20, -10, -20, -30, -30, -40, -40, -30, -30, -20, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -30, -30, -30, -30, -30, -30, -30, -20, -20, -20, -20, -20, -20, -20, -20]
};
const SAMPLE_PGN = `[Event "Chess8an sample"]
[Site "Local"]
[Date "2026.05.21"]
[Round "-"]
[White "Attacker"]
[Black "Defender"]
[Result "1-0"]

1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. e5 d5 7. exf6 dxc4 8. O-O O-O 9. Bg5 Qd5 10. cxd4 Nxd4 11. Nc3 Nxf3+ 12. Qxf3 Qxg5 13. Ne4 Qd5 14. Rad1 Qf5 15. fxg7 Kxg7 16. Qc3+ f6 17. Qxc4 Bb6 18. Rd3 Be6 19. Rg3+ Kh8 20. Qe2 Rae8 21. Rf3 Qg6 22. Rg3 Qf5 23. Rf3 Qg4 24. h3 Qh5 25. Ng3 Qg6 26. Qd2 Bxa2 27. b3 Bb1 28. Qb4 Bd3 29. Rd1 Be2 30. Nxe2 Rg8 31. Ng3 Qxg3 32. Rxg3 1-0`;

const state = {
  tab: "import",
  username: "",
  profile: null,
  archives: [],
  games: [],
  selectedGameIndex: 0,
  pgn: SAMPLE_PGN,
  depth: 2,
  maxPlies: 80,
  analysis: null,
  selectedMove: 0,
  boardFlipped: false,
  saved: loadSaved(),
  working: false,
  scanningGames: false,
  progress: { done: 0, total: 0, text: "" },
  toast: ""
};

const app = document.getElementById("app");

function colorOf(piece) {
  if (!piece) return null;
  return piece === piece.toUpperCase() ? "w" : "b";
}

function opponent(color) {
  return color === "w" ? "b" : "w";
}

function rowOf(index) {
  return Math.floor(index / 8);
}

function colOf(index) {
  return index % 8;
}

function sq(file, rank) {
  return (8 - rank) * 8 + FILES.indexOf(file);
}

function sqName(index) {
  return FILES[colOf(index)] + (8 - rowOf(index));
}

function parseSq(name) {
  if (!/^[a-h][1-8]$/.test(name)) return -1;
  return sq(name[0], Number(name[1]));
}

function mirror(index) {
  return 63 - index;
}

function clonePos(pos) {
  return {
    board: pos.board.slice(),
    turn: pos.turn,
    castling: pos.castling,
    ep: pos.ep,
    half: pos.half,
    full: pos.full
  };
}

function parseFen(fen) {
  const [placement, turn, castling, ep, half, full] = fen.trim().split(/\s+/);
  const board = [];
  for (const char of placement) {
    if (char === "/") continue;
    if (/\d/.test(char)) {
      for (let i = 0; i < Number(char); i += 1) board.push(null);
    } else {
      board.push(char);
    }
  }
  while (board.length < 64) board.push(null);
  return {
    board,
    turn: turn || "w",
    castling: castling === "-" ? "" : castling || "",
    ep: ep && ep !== "-" ? parseSq(ep) : -1,
    half: Number(half || 0),
    full: Number(full || 1)
  };
}

function toFen(pos) {
  const rows = [];
  for (let r = 0; r < 8; r += 1) {
    let row = "";
    let empty = 0;
    for (let c = 0; c < 8; c += 1) {
      const piece = pos.board[r * 8 + c];
      if (!piece) {
        empty += 1;
      } else {
        if (empty) row += empty;
        empty = 0;
        row += piece;
      }
    }
    if (empty) row += empty;
    rows.push(row);
  }
  return `${rows.join("/")} ${pos.turn} ${pos.castling || "-"} ${pos.ep >= 0 ? sqName(pos.ep) : "-"} ${pos.half} ${pos.full}`;
}

function inBounds(r, c) {
  return r >= 0 && r < 8 && c >= 0 && c < 8;
}

function kingSquare(pos, color) {
  const king = color === "w" ? "K" : "k";
  return pos.board.findIndex((piece) => piece === king);
}

function isSquareAttacked(pos, target, byColor) {
  const board = pos.board;
  const tr = rowOf(target);
  const tc = colOf(target);
  const pawn = byColor === "w" ? "P" : "p";
  const pawnSources = byColor === "w" ? [[tr + 1, tc - 1], [tr + 1, tc + 1]] : [[tr - 1, tc - 1], [tr - 1, tc + 1]];
  for (const [r, c] of pawnSources) {
    if (inBounds(r, c) && board[r * 8 + c] === pawn) return true;
  }

  const knight = byColor === "w" ? "N" : "n";
  for (const [dr, dc] of [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]) {
    const r = tr + dr;
    const c = tc + dc;
    if (inBounds(r, c) && board[r * 8 + c] === knight) return true;
  }

  const bishop = byColor === "w" ? "B" : "b";
  const rook = byColor === "w" ? "R" : "r";
  const queen = byColor === "w" ? "Q" : "q";
  for (const [dr, dc] of [[-1, -1], [-1, 1], [1, -1], [1, 1]]) {
    let r = tr + dr;
    let c = tc + dc;
    while (inBounds(r, c)) {
      const piece = board[r * 8 + c];
      if (piece) {
        if (piece === bishop || piece === queen) return true;
        break;
      }
      r += dr;
      c += dc;
    }
  }
  for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
    let r = tr + dr;
    let c = tc + dc;
    while (inBounds(r, c)) {
      const piece = board[r * 8 + c];
      if (piece) {
        if (piece === rook || piece === queen) return true;
        break;
      }
      r += dr;
      c += dc;
    }
  }

  const king = byColor === "w" ? "K" : "k";
  for (const [dr, dc] of [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]) {
    const r = tr + dr;
    const c = tc + dc;
    if (inBounds(r, c) && board[r * 8 + c] === king) return true;
  }
  return false;
}

function inCheck(pos, color) {
  const king = kingSquare(pos, color);
  return king >= 0 && isSquareAttacked(pos, king, opponent(color));
}

function addMove(moves, pos, from, to, extra = {}) {
  const piece = pos.board[from];
  const target = pos.board[to];
  if (!piece) return;
  if (target && colorOf(target) === colorOf(piece)) return;
  moves.push({ from, to, piece, capture: target || null, promotion: "", castle: "", enPassant: false, ...extra });
}

function pseudoMoves(pos) {
  const moves = [];
  const color = pos.turn;
  for (let i = 0; i < 64; i += 1) {
    const piece = pos.board[i];
    if (!piece || colorOf(piece) !== color) continue;
    const p = piece.toUpperCase();
    const r = rowOf(i);
    const c = colOf(i);

    if (p === "P") {
      const dir = color === "w" ? -1 : 1;
      const startRow = color === "w" ? 6 : 1;
      const promoRow = color === "w" ? 0 : 7;
      const oneR = r + dir;
      if (inBounds(oneR, c) && !pos.board[oneR * 8 + c]) {
        const to = oneR * 8 + c;
        if (oneR === promoRow) {
          for (const promotion of ["Q", "R", "B", "N"]) addMove(moves, pos, i, to, { promotion });
        } else {
          addMove(moves, pos, i, to);
        }
        const twoR = r + dir * 2;
        if (r === startRow && !pos.board[twoR * 8 + c]) addMove(moves, pos, i, twoR * 8 + c, { doublePawn: true });
      }
      for (const dc of [-1, 1]) {
        const cr = r + dir;
        const cc = c + dc;
        if (!inBounds(cr, cc)) continue;
        const to = cr * 8 + cc;
        const target = pos.board[to];
        if (target && colorOf(target) === opponent(color)) {
          if (cr === promoRow) {
            for (const promotion of ["Q", "R", "B", "N"]) addMove(moves, pos, i, to, { promotion });
          } else {
            addMove(moves, pos, i, to);
          }
        }
        if (to === pos.ep) addMove(moves, pos, i, to, { enPassant: true, capture: color === "w" ? "p" : "P" });
      }
    }

    if (p === "N") {
      for (const [dr, dc] of [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]) {
        const nr = r + dr;
        const nc = c + dc;
        if (inBounds(nr, nc)) addMove(moves, pos, i, nr * 8 + nc);
      }
    }

    if (p === "B" || p === "R" || p === "Q") {
      const dirs = [];
      if (p === "B" || p === "Q") dirs.push([-1, -1], [-1, 1], [1, -1], [1, 1]);
      if (p === "R" || p === "Q") dirs.push([-1, 0], [1, 0], [0, -1], [0, 1]);
      for (const [dr, dc] of dirs) {
        let nr = r + dr;
        let nc = c + dc;
        while (inBounds(nr, nc)) {
          const to = nr * 8 + nc;
          addMove(moves, pos, i, to);
          if (pos.board[to]) break;
          nr += dr;
          nc += dc;
        }
      }
    }

    if (p === "K") {
      for (const [dr, dc] of [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]) {
        const nr = r + dr;
        const nc = c + dc;
        if (inBounds(nr, nc)) addMove(moves, pos, i, nr * 8 + nc);
      }
      if (color === "w" && i === sq("e", 1) && !inCheck(pos, "w")) {
        if (pos.castling.includes("K") && !pos.board[sq("f", 1)] && !pos.board[sq("g", 1)] && !isSquareAttacked(pos, sq("f", 1), "b") && !isSquareAttacked(pos, sq("g", 1), "b")) {
          addMove(moves, pos, i, sq("g", 1), { castle: "K" });
        }
        if (pos.castling.includes("Q") && !pos.board[sq("d", 1)] && !pos.board[sq("c", 1)] && !pos.board[sq("b", 1)] && !isSquareAttacked(pos, sq("d", 1), "b") && !isSquareAttacked(pos, sq("c", 1), "b")) {
          addMove(moves, pos, i, sq("c", 1), { castle: "Q" });
        }
      }
      if (color === "b" && i === sq("e", 8) && !inCheck(pos, "b")) {
        if (pos.castling.includes("k") && !pos.board[sq("f", 8)] && !pos.board[sq("g", 8)] && !isSquareAttacked(pos, sq("f", 8), "w") && !isSquareAttacked(pos, sq("g", 8), "w")) {
          addMove(moves, pos, i, sq("g", 8), { castle: "k" });
        }
        if (pos.castling.includes("q") && !pos.board[sq("d", 8)] && !pos.board[sq("c", 8)] && !pos.board[sq("b", 8)] && !isSquareAttacked(pos, sq("d", 8), "w") && !isSquareAttacked(pos, sq("c", 8), "w")) {
          addMove(moves, pos, i, sq("c", 8), { castle: "q" });
        }
      }
    }
  }
  return moves;
}

function makeMove(pos, move) {
  const next = clonePos(pos);
  const color = colorOf(move.piece);
  const enemy = opponent(color);
  next.board[move.from] = null;
  next.board[move.to] = move.promotion
    ? color === "w"
      ? move.promotion
      : move.promotion.toLowerCase()
    : move.piece;

  if (move.enPassant) {
    next.board[color === "w" ? move.to + 8 : move.to - 8] = null;
  }

  if (move.castle) {
    if (move.to === sq("g", 1)) {
      next.board[sq("h", 1)] = null;
      next.board[sq("f", 1)] = "R";
    }
    if (move.to === sq("c", 1)) {
      next.board[sq("a", 1)] = null;
      next.board[sq("d", 1)] = "R";
    }
    if (move.to === sq("g", 8)) {
      next.board[sq("h", 8)] = null;
      next.board[sq("f", 8)] = "r";
    }
    if (move.to === sq("c", 8)) {
      next.board[sq("a", 8)] = null;
      next.board[sq("d", 8)] = "r";
    }
  }

  next.castling = next.castling
    .replace(color === "w" ? /[KQ]/g : /[kq]/g, move.piece.toUpperCase() === "K" ? "" : (m) => m)
    .replace(move.from === sq("h", 1) || move.to === sq("h", 1) ? "K" : "#", "")
    .replace(move.from === sq("a", 1) || move.to === sq("a", 1) ? "Q" : "#", "")
    .replace(move.from === sq("h", 8) || move.to === sq("h", 8) ? "k" : "#", "")
    .replace(move.from === sq("a", 8) || move.to === sq("a", 8) ? "q" : "#", "")
    .replaceAll("#", "");

  next.ep = -1;
  if (move.piece.toUpperCase() === "P" && Math.abs(move.to - move.from) === 16) {
    next.ep = color === "w" ? move.from - 8 : move.from + 8;
  }
  next.half = move.piece.toUpperCase() === "P" || move.capture ? 0 : pos.half + 1;
  next.full = color === "b" ? pos.full + 1 : pos.full;
  next.turn = enemy;
  return next;
}

function legalMoves(pos) {
  return pseudoMoves(pos).filter((move) => !inCheck(makeMove(pos, move), pos.turn));
}

function sanForMove(pos, move) {
  if (move.castle) {
    const castle = colOf(move.to) === 6 ? "O-O" : "O-O-O";
    const after = makeMove(pos, move);
    return castle + suffixForCheck(after);
  }
  const piece = move.piece.toUpperCase();
  const isPawn = piece === "P";
  let san = isPawn ? "" : piece;
  const legal = legalMoves(pos);
  const similar = legal.filter((other) => other.from !== move.from && other.to === move.to && other.piece.toUpperCase() === piece);
  if (!isPawn && similar.length) {
    const sameFile = similar.some((other) => colOf(other.from) === colOf(move.from));
    const sameRank = similar.some((other) => rowOf(other.from) === rowOf(move.from));
    if (!sameFile) san += FILES[colOf(move.from)];
    else if (!sameRank) san += 8 - rowOf(move.from);
    else san += sqName(move.from);
  }
  if (isPawn && (move.capture || move.enPassant)) san += FILES[colOf(move.from)];
  if (move.capture || move.enPassant) san += "x";
  san += sqName(move.to);
  if (move.promotion) san += `=${move.promotion}`;
  san += suffixForCheck(makeMove(pos, move));
  return san;
}

function suffixForCheck(pos) {
  if (!inCheck(pos, pos.turn)) return "";
  return legalMoves(pos).length ? "+" : "#";
}

function normalizeSan(san) {
  return san
    .trim()
    .replace(/[!?]+/g, "")
    .replace(/[+#]/g, "")
    .replace(/0/g, "O")
    .replace(/e\.p\./gi, "");
}

function tokenizePgn(pgn) {
  let body = pgn
    .replace(/\r/g, "\n")
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/\{[^}]*\}/g, " ")
    .replace(/;[^\n]*/g, " ");
  let old = "";
  while (old !== body) {
    old = body;
    body = body.replace(/\([^()]*\)/g, " ");
  }
  return body
    .replace(/\$\d+/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean)
    .filter((token) => !/^\d+\.(\.\.)?$/.test(token))
    .filter((token) => !/^(1-0|0-1|1\/2-1\/2|\*)$/.test(token))
    .map((token) => token.replace(/^\d+\.+/, ""))
    .filter(Boolean);
}

function parseHeaders(pgn) {
  const headers = {};
  for (const match of pgn.matchAll(/\[([A-Za-z0-9_]+)\s+"([^"]*)"\]/g)) {
    headers[match[1]] = match[2];
  }
  return headers;
}

function playPgn(pgn) {
  const headers = parseHeaders(pgn);
  const tokens = tokenizePgn(pgn);
  let pos = parseFen(headers.FEN || START_FEN);
  const moves = [];
  for (const token of tokens) {
    const legal = legalMoves(pos);
    const found = legal.find((move) => normalizeSan(sanForMove(pos, move)) === normalizeSan(token));
    if (!found) {
      throw new Error(`Could not read move "${token}" from ${toFen(pos)}. Paste a standard PGN without unsupported variants.`);
    }
    const before = clonePos(pos);
    const san = sanForMove(pos, found);
    pos = makeMove(pos, found);
    moves.push({ token, san, move: found, before, after: clonePos(pos), ply: moves.length + 1 });
  }
  return { headers, moves, final: pos, pgn };
}

function evaluateComponents(pos) {
  const components = { material: 0, placement: 0, mobility: 0, king: 0, pawns: 0 };
  const files = { w: Array(8).fill(0), b: Array(8).fill(0) };
  for (let i = 0; i < 64; i += 1) {
    const piece = pos.board[i];
    if (!piece) continue;
    const color = colorOf(piece);
    const sign = color === "w" ? 1 : -1;
    const type = piece.toUpperCase();
    components.material += sign * VALUES[type];
    components.placement += sign * (PST[type][color === "w" ? i : mirror(i)] || 0);
    if (type === "P") files[color][colOf(i)] += 1;
  }
  for (let f = 0; f < 8; f += 1) {
    if (files.w[f] > 1) components.pawns -= 18 * (files.w[f] - 1);
    if (files.b[f] > 1) components.pawns += 18 * (files.b[f] - 1);
    if (files.w[f] && !files.b[f]) components.pawns += 8;
    if (files.b[f] && !files.w[f]) components.pawns -= 8;
  }
  const turn = pos.turn;
  const mobility = legalMoves(pos).length;
  const flipped = clonePos(pos);
  flipped.turn = opponent(turn);
  const otherMobility = legalMoves(flipped).length;
  components.mobility = (turn === "w" ? mobility - otherMobility : otherMobility - mobility) * 3;
  if (inCheck(pos, "w")) components.king -= 28;
  if (inCheck(pos, "b")) components.king += 28;
  return components;
}

function evaluate(pos) {
  const c = evaluateComponents(pos);
  return c.material + c.placement + c.mobility + c.king + c.pawns;
}

function orderedMoves(pos) {
  return legalMoves(pos).sort((a, b) => moveScore(b) - moveScore(a));
}

function moveScore(move) {
  const captured = move.capture ? VALUES[move.capture.toUpperCase()] || 0 : 0;
  const attacker = VALUES[move.piece.toUpperCase()] || 0;
  return captured * 10 - attacker + (move.promotion ? VALUES[move.promotion] : 0) + (move.castle ? 25 : 0);
}

function search(pos, depth, alpha = -Infinity, beta = Infinity) {
  const moves = orderedMoves(pos);
  if (moves.length === 0) {
    if (inCheck(pos, pos.turn)) return pos.turn === "w" ? -100000 - depth : 100000 + depth;
    return 0;
  }
  if (depth === 0) return evaluate(pos);
  if (pos.turn === "w") {
    let best = -Infinity;
    for (const move of moves) {
      best = Math.max(best, search(makeMove(pos, move), depth - 1, alpha, beta));
      alpha = Math.max(alpha, best);
      if (alpha >= beta) break;
    }
    return best;
  }
  let best = Infinity;
  for (const move of moves) {
    best = Math.min(best, search(makeMove(pos, move), depth - 1, alpha, beta));
    beta = Math.min(beta, best);
    if (alpha >= beta) break;
  }
  return best;
}

function rootCandidates(pos, depth) {
  const moves = orderedMoves(pos);
  const candidates = moves.map((move) => {
    const after = makeMove(pos, move);
    return {
      move,
      san: sanForMove(pos, move),
      score: search(after, Math.max(0, depth - 1))
    };
  });
  candidates.sort((a, b) => (pos.turn === "w" ? b.score - a.score : a.score - b.score));
  return candidates;
}

function scoreForMover(score, color) {
  return color === "w" ? score : -score;
}

function classify(loss, move, best) {
  if (loss <= 8 && move.san !== best.san && (move.move.capture || move.move.promotion)) return "brilliant";
  if (loss <= 15) return "best";
  if (loss <= 40) return "excellent";
  if (loss <= 90) return "good";
  if (loss <= 180) return "inaccuracy";
  if (loss <= 350) return "mistake";
  return "blunder";
}

function cp(score) {
  if (Math.abs(score) > 90000) return score > 0 ? "+M" : "-M";
  const value = Math.round(score / 10) / 10;
  return value > 0 ? `+${value.toFixed(1)}` : value.toFixed(1);
}

function scorePercent(score) {
  const clamped = Math.max(-900, Math.min(900, score));
  return 50 + (clamped / 900) * 45;
}

function explainMove(item) {
  const mover = item.color === "w" ? "White" : "Black";
  const bestAfter = makeMove(item.before, item.best.move);
  const playedAfter = item.after;
  const bestC = evaluateComponents(bestAfter);
  const playedC = evaluateComponents(playedAfter);
  const themes = Object.keys(bestC)
    .map((key) => ({
      key,
      diff: scoreForMover(bestC[key] - playedC[key], item.color)
    }))
    .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))
    .slice(0, 2);
  const themeText = themes
    .map((theme) => {
      if (theme.key === "material") return theme.diff >= 0 ? "keeps more material on the board" : "accepts a material concession for activity";
      if (theme.key === "placement") return theme.diff >= 0 ? "puts the pieces on more active squares" : "chooses a quieter square setup";
      if (theme.key === "mobility") return theme.diff >= 0 ? "gives the pieces more legal options" : "reduces short-term mobility";
      if (theme.key === "king") return theme.diff >= 0 ? "treats king safety more carefully" : "allows a little more king pressure";
      return theme.diff >= 0 ? "leaves the pawn structure healthier" : "changes the pawn structure for practical chances";
    })
    .join(" and ");
  const lossText = item.loss <= 15 ? "The played move is essentially tied with the recommendation." : `The difference is about ${Math.round(item.loss)} centipawns for ${mover.toLowerCase()}.`;
  const piece = PIECE_NAMES[item.move.move.piece.toUpperCase()] || "piece";
  const bestPiece = PIECE_NAMES[item.best.move.piece.toUpperCase()] || "piece";
  return `${mover} played ${item.playedSan} with the ${piece}. The recommended move is ${item.best.san}, using the ${bestPiece}; it ${themeText}. ${lossText} The arrows show the game move in amber and the recommendation in green so you can compare the two plans immediately.`;
}

async function analyzePgn(pgn, depth, maxPlies) {
  const game = playPgn(pgn);
  const total = Math.min(game.moves.length, maxPlies || game.moves.length);
  const items = [];
  setProgress(0, total, "Reading PGN and starting analysis...");
  for (let i = 0; i < total; i += 1) {
    const played = game.moves[i];
    const candidates = rootCandidates(played.before, depth).slice(0, 5);
    const actual = candidates.find((candidate) => candidate.move.from === played.move.from && candidate.move.to === played.move.to && candidate.move.promotion === played.move.promotion) || {
      move: played.move,
      san: played.san,
      score: search(played.after, Math.max(0, depth - 1))
    };
    const best = candidates[0] || actual;
    const color = colorOf(played.move.piece);
    const loss = Math.max(0, scoreForMover(best.score - actual.score, color));
    const item = {
      index: i,
      ply: played.ply,
      moveNumber: Math.floor((played.ply + 1) / 2),
      color,
      before: played.before,
      after: played.after,
      playedSan: played.san,
      move: actual,
      best,
      candidates,
      loss,
      classification: classify(loss, actual, best)
    };
    item.explanation = explainMove(item);
    items.push(item);
    setProgress(i + 1, total, `Analyzed ${i + 1} of ${total} moves`);
    if (i % 2 === 1) await pause();
  }
  const counts = items.reduce((acc, item) => {
    acc[item.classification] = (acc[item.classification] || 0) + 1;
    return acc;
  }, {});
  const averageLoss = items.length ? Math.round(items.reduce((sum, item) => sum + item.loss, 0) / items.length) : 0;
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    createdAt: new Date().toISOString(),
    title: gameTitle(game.headers),
    headers: game.headers,
    pgn,
    depth,
    totalPlies: total,
    items,
    counts,
    averageLoss,
    finalFen: toFen(game.final)
  };
}

function gameTitle(headers = {}) {
  const white = headers.White || "White";
  const black = headers.Black || "Black";
  const date = headers.Date && headers.Date !== "????.??.??" ? ` - ${headers.Date}` : "";
  return `${white} vs ${black}${date}`;
}

function scanGameBrilliance(game) {
  const pgn = game?.pgn || "";
  if (!pgn.trim()) return { state: "unknown", label: "No PGN", count: 0 };
  if (/brilliant/i.test(pgn) || /(^|\s)[KQRBNOa-h][^\s{}()[\]]*!!(?=\s|$)/.test(pgn)) {
    return { state: "brilliant", label: "Brilliant marker", count: 1 };
  }
  try {
    const parsed = playPgn(pgn);
    let count = 0;
    for (const played of parsed.moves.slice(0, 72)) {
      const candidates = rootCandidates(played.before, 1).slice(0, 3);
      if (!candidates.length) continue;
      const color = colorOf(played.move.piece);
      const actual = {
        move: played.move,
        san: played.san,
        score: search(played.after, 0)
      };
      const best = candidates[0];
      const loss = Math.max(0, scoreForMover(best.score - actual.score, color));
      const capturedValue = played.move.capture ? VALUES[played.move.capture.toUpperCase()] || 0 : 0;
      const moverValue = VALUES[played.move.piece.toUpperCase()] || 0;
      const sacrificeLike = played.move.promotion || (played.move.capture && capturedValue <= moverValue + 120);
      const tacticalSwing = Math.abs(scoreForMover(actual.score, color)) >= 120;
      if (loss <= 22 && sacrificeLike && tacticalSwing) count += 1;
      if (count >= 2) break;
    }
    return count
      ? { state: "brilliant", label: `${count} likely brilliant`, count }
      : { state: "none", label: "No brilliant found", count: 0 };
  } catch {
    return { state: "unknown", label: "Scan unavailable", count: 0 };
  }
}

async function enrichGameInsights(games) {
  state.scanningGames = true;
  render();
  for (let i = 0; i < games.length; i += 1) {
    games[i].chess8anInsight = scanGameBrilliance(games[i]);
    if (i % 4 === 3) {
      render();
      await pause();
    }
  }
  state.scanningGames = false;
  render();
}

function pause() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

function setProgress(done, total, text) {
  state.progress = { done, total, text };
  const fill = document.querySelector(".progress-fill");
  const label = document.querySelector(".progress-label");
  if (fill) fill.style.width = total ? `${Math.round((done / total) * 100)}%` : "0%";
  if (label) label.textContent = text;
}

function jsonp(url) {
  return new Promise((resolve, reject) => {
    const callback = `chess8an_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("Chess.com did not answer in time. Try again in a minute."));
    }, 16000);
    function cleanup() {
      clearTimeout(timer);
      script.remove();
      delete window[callback];
    }
    window[callback] = (data) => {
      cleanup();
      resolve(data);
    };
    script.onerror = () => {
      cleanup();
      reject(new Error("Could not load Chess.com public API data."));
    };
    script.src = `${url}${url.includes("?") ? "&" : "?"}callback=${callback}`;
    document.head.appendChild(script);
  });
}

function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem("chess8an:saved") || "[]");
  } catch {
    return [];
  }
}

function saveSaved() {
  localStorage.setItem("chess8an:saved", JSON.stringify(state.saved.slice(0, 12)));
}

function saveCurrentAnalysis() {
  if (!state.analysis) return;
  const compact = {
    ...state.analysis,
    items: state.analysis.items.slice(0, 120)
  };
  state.saved = [compact, ...state.saved.filter((saved) => saved.id !== compact.id)].slice(0, 12);
  saveSaved();
  toast("Analysis saved in this browser.");
  render();
}

function toast(message) {
  state.toast = message;
  renderToast();
  setTimeout(() => {
    if (state.toast === message) {
      state.toast = "";
      renderToast();
    }
  }, 4200);
}

function renderToast() {
  document.querySelectorAll(".toast").forEach((node) => node.remove());
  if (!state.toast) return;
  const div = document.createElement("div");
  div.className = "toast";
  div.textContent = state.toast;
  document.body.appendChild(div);
}

function render() {
  app.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark">♞</div>
          <div>
            <h1>Chess8an</h1>
            <p>Free Chess.com analysis by Mohamed Aziz Romdhane</p>
          </div>
        </div>
        <nav class="nav-tabs" aria-label="Main sections">
          ${tabButton("import", "Import")}
          ${tabButton("analysis", "Analyze")}
          ${tabButton("saved", "Saved")}
          ${tabButton("about", "About")}
        </nav>
      </header>
      <main>
        ${state.tab === "import" ? renderImport() : ""}
        ${state.tab === "analysis" ? renderAnalysis() : ""}
        ${state.tab === "saved" ? renderSaved() : ""}
        ${state.tab === "about" ? renderAbout() : ""}
      </main>
      <footer class="footer">(c) ${new Date().getFullYear()} Mohamed Aziz Romdhane. Chess8an is an independent fan-made analyzer using Chess.com public data where available.</footer>
    </div>
  `;
  renderToast();
}

function tabButton(tab, label) {
  return `<button class="tab-button ${state.tab === tab ? "active" : ""}" data-tab="${tab}" type="button">${label}</button>`;
}

function renderImport() {
  return `
    <section class="main-grid">
      <div class="side-stack">
        <article class="panel">
          <h2>Chess.com Public Connect</h2>
          <p class="section-note">Enter a Chess.com username to import public games. Official password login/OAuth is available only after Chess.com approves an OAuth application, so this app uses their free public API instead of asking for credentials.</p>
          <div class="field-row">
            <label class="field">
              <span>Chess.com username</span>
              <input id="username" value="${escapeHtml(state.username)}" autocomplete="username" placeholder="hikaru" />
            </label>
            <button class="primary-button" data-action="load-profile" type="button">Connect</button>
          </div>
          ${state.profile ? `<p class="small-note"><strong>${escapeHtml(state.profile.username || state.username)}</strong> loaded. Archives refresh on Chess.com roughly every 12 hours.</p>` : ""}
          ${renderArchives()}
        </article>
        <article class="panel">
          <h2>Paste PGN</h2>
          <p class="section-note">Paste any standard PGN, or keep the included sample and press analyze.</p>
          <label class="textarea-field">
            <span>PGN</span>
            <textarea id="pgn">${escapeHtml(state.pgn)}</textarea>
          </label>
          ${renderAnalyzeControls("analyze-pgn")}
        </article>
      </div>
      <aside class="panel">
        <h2>Imported games</h2>
        <p class="section-note">Choose a game from an archive, then analyze it locally in your browser. ${state.scanningGames ? "Chess8an is scanning the list for brilliant markers now." : "Each game shows whether a brilliant marker or likely brilliant candidate was found."}</p>
        <div class="game-list">
          ${state.games.length ? state.games.map(renderGameCard).join("") : `<p class="small-note">No archive loaded yet.</p>`}
        </div>
      </aside>
    </section>
  `;
}

function renderArchives() {
  if (!state.archives.length) return "";
  const options = state.archives
    .slice()
    .reverse()
    .slice(0, 36)
    .map((url) => {
      const parts = url.split("/");
      const label = `${parts.at(-2)}-${parts.at(-1)}`;
      return `<option value="${escapeHtml(url)}">${label}</option>`;
    })
    .join("");
  return `
    <div class="field-row">
      <label class="field">
        <span>Archive month</span>
        <select id="archive-url">${options}</select>
      </label>
      <button class="primary-button alt" data-action="load-archive" type="button">Load games</button>
    </div>
  `;
}

function renderAnalyzeControls(action) {
  return `
    <div class="filters">
      <label class="field">
        <span>Depth</span>
        <select id="depth">
          ${[1, 2, 3].map((d) => `<option value="${d}" ${state.depth === d ? "selected" : ""}>${d}${d === 3 ? " slower" : ""}</option>`).join("")}
        </select>
      </label>
      <label class="field">
        <span>Max plies</span>
        <input id="maxPlies" type="number" min="4" max="180" value="${state.maxPlies}" />
      </label>
      <button class="primary-button" data-action="${action}" type="button" ${state.working ? "disabled" : ""}>Analyze</button>
    </div>
    <div class="progress ${state.working ? "active" : ""}">
      <div class="progress-bar"><div class="progress-fill" style="width:${state.progress.total ? Math.round((state.progress.done / state.progress.total) * 100) : 0}%"></div></div>
      <span class="progress-label">${escapeHtml(state.progress.text)}</span>
    </div>
  `;
}

function gameInsightBadge(game) {
  const insight = game.chess8anInsight || { state: state.scanningGames ? "scanning" : "unknown", label: state.scanningGames ? "Scanning" : "Not scanned", count: 0 };
  const label = insight.state === "brilliant" ? "Brilliant found" : insight.label;
  const text = insight.state === "brilliant" ? "!!" : insight.state === "none" ? "0" : "...";
  return `<span class="brilliance-pill ${escapeAttr(insight.state)}" title="${escapeAttr(insight.label)}"><span class="brilliance-icon">${text}</span><span>${escapeHtml(label)}</span></span>`;
}

function renderGameCard(game, index) {
  const white = game.white?.username || "White";
  const black = game.black?.username || "Black";
  const result = `${game.white?.result || "?"}-${game.black?.result || "?"}`;
  const date = game.end_time ? new Date(game.end_time * 1000).toLocaleDateString() : "unknown date";
  const timeClass = game.time_class ? game.time_class.charAt(0).toUpperCase() + game.time_class.slice(1) : "Game";
  const resultDisplay = game.white?.result === "win" ? "1-0" : game.black?.result === "win" ? "0-1" : "½-½";
  return `
    <article class="game-card">
      <div class="game-header">
        <div>
          <strong class="game-players">${escapeHtml(white)} vs ${escapeHtml(black)}</strong>
          <p class="game-result-badge">${escapeHtml(resultDisplay)}</p>
        </div>
        ${gameInsightBadge(game)}
      </div>
      <div class="game-meta">
        <span class="pill" title="Game time format">${escapeHtml(timeClass)}</span>
        <span class="pill" title="Result">${escapeHtml(result)}</span>
        <span class="pill" title="Date">${escapeHtml(date)}</span>
      </div>
      <div class="button-row">
        <button class="ghost-button" data-action="select-game" data-index="${index}" type="button">Use PGN</button>
        <button class="primary-button" data-action="analyze-game" data-index="${index}" type="button" ${state.working ? "disabled" : ""}>Analyze</button>
        ${game.url ? `<a class="ghost-button" href="${escapeAttr(game.url)}" target="_blank" rel="noreferrer">Open</a>` : ""}
      </div>
    </article>
  `;
}

function renderAnalysis() {
  if (!state.analysis) {
    return `
      <section class="main-grid">
        <article class="panel">
          <h2>No analysis yet</h2>
          <p class="section-note">Import a Chess.com game or paste PGN first. The analyzer runs locally and saves results in this browser.</p>
          <button class="primary-button" data-tab="import" type="button">Go to Import</button>
        </article>
      </section>
    `;
  }
  const item = state.analysis.items[Math.min(state.selectedMove, state.analysis.items.length - 1)] || null;
  const score = item ? item.move.score : 0;
  const brilliantCount = state.analysis.counts["brilliant"] || 0;
  return `
    <section class="workspace main-grid">
      <aside class="panel board-panel">
        <div class="analysis-header">
          <div>
            <h2 class="analysis-title">${escapeHtml(state.analysis.title)}</h2>
            <p class="section-note"><strong>${state.analysis.totalPlies}</strong> plies at depth <strong>${state.analysis.depth}</strong> • Average loss: <strong>${state.analysis.averageLoss} cp</strong></p>
            ${brilliantCount > 0 ? `<p class="section-note highlight-note">✨ Found <strong>${brilliantCount}</strong> brilliant move${brilliantCount !== 1 ? "s" : ""}!</p>` : ""}
          </div>
          <div class="summary-strip">
            ${summaryPills(state.analysis.counts)}
          </div>
          <div class="eval-bar" aria-label="Position Evaluation">
            <div class="eval-fill" style="width:${scorePercent(score)}%"></div>
            <div class="eval-label">${cp(score)}</div>
          </div>
          <div class="button-row">
            <button class="icon-button" title="Flip board (F)" data-action="flip-board" type="button">F</button>
            <button class="ghost-button" data-action="save-analysis" type="button">Save</button>
            <button class="ghost-button" data-action="export-json" type="button">Export JSON</button>
          </div>
          ${item ? renderReviewControls(item) : ""}
          <div class="keyboard-hint">
            <span class="hint-small">Use ← → or P/N keys to navigate moves • Home/End for first/last move</span>
          </div>
        </div>
        ${renderBoard(item ? item.before : parseFen(START_FEN), item)}
      </aside>
      <section class="side-stack">
        ${item ? renderMoveDetail(item) : ""}
        <article class="panel">
          <h2 class="move-list-header">Move Analysis <span class="move-count">${state.selectedMove + 1}/${state.analysis.items.length}</span></h2>
          <div class="move-list">
            ${state.analysis.items.map(renderMoveCard).join("")}
          </div>
        </article>
      </section>
    </section>
  `;
}

function renderReviewControls(item) {
  const canPrev = item.index > 0;
  const canNext = item.index < state.analysis.items.length - 1;
  return `
    <div class="review-controls" aria-label="Analysis navigation">
      <button class="review-icon" data-action="first-move" type="button" ${!canPrev ? "disabled" : ""} title="First move">|&lt;</button>
      <button class="review-icon" data-action="prev-move" type="button" ${!canPrev ? "disabled" : ""} title="Previous move">‹</button>
      <div class="review-status">
        <strong>${item.moveNumber}${item.color === "b" ? "..." : "."} ${escapeHtml(item.playedSan)}</strong>
        <span>${escapeHtml(item.classification)} - better: ${escapeHtml(item.best.san)}</span>
      </div>
      <button class="review-icon" data-action="next-move" type="button" ${!canNext ? "disabled" : ""} title="Next move">›</button>
      <button class="review-icon" data-action="last-move" type="button" ${!canNext ? "disabled" : ""} title="Last move">&gt;|</button>
      <button class="review-jump" data-action="next-critical" type="button" title="Jump to next inaccuracy, mistake, or blunder">Next critical</button>
    </div>
  `;
}

function summaryPills(counts) {
  const order = ["best", "excellent", "good", "inaccuracy", "mistake", "blunder"];
  return order
    .filter((key) => counts[key])
    .map((key) => `<span class="pill ${pillTone(key)}">${key}: ${counts[key]}</span>`)
    .join("");
}

function pillTone(key) {
  if (["best", "excellent", "brilliant"].includes(key)) return "good";
  if (["inaccuracy", "mistake"].includes(key)) return "warn";
  if (key === "blunder") return "bad";
  return "";
}

function renderBoard(pos, item) {
  const squares = [];
  const played = item ? [item.move.move.from, item.move.move.to] : [];
  const best = item ? [item.best.move.from, item.best.move.to] : [];
  for (let display = 0; display < 64; display += 1) {
    const index = state.boardFlipped ? mirror(display) : display;
    const r = rowOf(index);
    const c = colOf(index);
    const piece = pos.board[index] || "";
    const classes = ["square", (r + c) % 2 === 0 ? "light" : "dark"];
    if (played.includes(index)) classes.push(index === played[0] ? "played-from" : "played-to");
    if (best.includes(index)) classes.push(index === best[0] ? "best-from" : "best-to");
    squares.push(`
      <div class="${classes.join(" ")}" data-square="${sqName(index)}">
        ${PIECE_UNICODE[piece] || ""}
        ${c === (state.boardFlipped ? 7 : 0) ? `<span class="coord rank">${8 - r}</span>` : ""}
        ${r === (state.boardFlipped ? 0 : 7) ? `<span class="coord file">${FILES[c]}</span>` : ""}
      </div>
    `);
  }
  return `
    <div class="board-wrap">
      <div class="board">${squares.join("")}</div>
      ${item ? renderArrows(item) : ""}
    </div>
  `;
}

function squareCenter(index) {
  const display = state.boardFlipped ? mirror(index) : index;
  return {
    x: (colOf(display) + 0.5) * 12.5,
    y: (rowOf(display) + 0.5) * 12.5
  };
}

function curvedArrowPath(from, to, bend = 8) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.max(1, Math.hypot(dx, dy));
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const ox = (-dy / length) * bend;
  const oy = (dx / length) * bend;
  return {
    d: `M ${from.x} ${from.y} Q ${mx + ox} ${my + oy} ${to.x} ${to.y}`,
    labelX: mx + ox * 0.72,
    labelY: my + oy * 0.72
  };
}

function renderArrows(item) {
  const playedA = squareCenter(item.move.move.from);
  const playedB = squareCenter(item.move.move.to);
  const bestA = squareCenter(item.best.move.from);
  const bestB = squareCenter(item.best.move.to);
  const sameMove = item.move.move.from === item.best.move.from && item.move.move.to === item.best.move.to;
  const playedPath = curvedArrowPath(playedA, playedB, sameMove ? -7 : -8);
  const bestPath = curvedArrowPath(bestA, bestB, sameMove ? 7 : 8);
  return `
    <svg class="arrows" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <filter id="arrow-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0.5" dy="1" stdDeviation="0.8" flood-color="rgba(0,0,0,.35)"></feDropShadow>
        </filter>
        <marker id="arrow-played" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="rgba(214,128,14,.88)"></path>
        </marker>
        <marker id="arrow-best" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="rgba(25,112,69,.95)"></path>
        </marker>
      </defs>
      ${sameMove ? "" : `<path class="arrow-played" d="${playedPath.d}" marker-end="url(#arrow-played)"></path>`}
      <path class="arrow-best" d="${bestPath.d}" marker-end="url(#arrow-best)"></path>
      ${sameMove ? `<text class="arrow-label best-label" x="${bestPath.labelX}" y="${bestPath.labelY}">best</text>` : `
        <text class="arrow-label played-label" x="${playedPath.labelX}" y="${playedPath.labelY}">played</text>
        <text class="arrow-label best-label" x="${bestPath.labelX}" y="${bestPath.labelY}">better</text>
      `}
    </svg>
  `;
}

function renderMoveDetail(item) {
  const canGoPrev = item.index > 0;
  const canGoNext = item.index < state.analysis.items.length - 1;
  const isBrilliant = item.classification === "brilliant";
  return `
    <article class="panel move-detail-panel">
      <div class="move-header">
        <h2 class="move-title">
          <span class="move-number">${item.moveNumber}${item.color === "b" ? "..." : "."}</span>
          <span class="move-notation">${escapeHtml(item.playedSan)}</span>
          ${isBrilliant ? '<span class="brilliant-badge" title="Brilliant move">✨</span>' : ''}
          <span class="classification ${item.classification}" title="${item.classification}">${item.classification}</span>
        </h2>
        <div class="move-progress">
          <span class="progress-text">${item.index + 1} / ${state.analysis.items.length}</span>
          <div class="progress-bar-slim">
            <div class="progress-fill-slim" style="width: ${((item.index + 1) / state.analysis.items.length) * 100}%"></div>
          </div>
        </div>
      </div>
      <div class="detail-grid">
        <div class="detail-box">
          <p>${escapeHtml(item.explanation)}</p>
        </div>
        <div class="summary-strip">
          <span class="pill">Played: ${escapeHtml(item.playedSan)} (${cp(item.move.score)})</span>
          <span class="pill good">Better: ${escapeHtml(item.best.san)} (${cp(item.best.score)})</span>
          <span class="pill ${pillTone(item.classification)}">Loss: ${Math.round(item.loss)} cp</span>
        </div>
        <table class="candidate-table">
          <thead><tr><th>Candidate</th><th>Evaluation</th><th>Idea</th></tr></thead>
          <tbody>
            ${item.candidates.slice(0, 5).map((candidate, index) => `
              <tr>
                <td>${index + 1}. ${escapeHtml(candidate.san)}</td>
                <td>${cp(candidate.score)}</td>
                <td>${escapeHtml(candidateIdea(item.before, candidate.move))}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
        <div class="move-navigation">
          <button class="nav-button prev-button" data-action="prev-move" type="button" ${!canGoPrev ? "disabled" : ""} title="Previous move (←)">
            <span class="nav-arrow">←</span> Previous
          </button>
          <button class="nav-button next-button" data-action="next-move" type="button" ${!canGoNext ? "disabled" : ""} title="Next move (→)">
            Next <span class="nav-arrow">→</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

function candidateIdea(pos, move) {
  if (move.castle) return "Improves king safety and connects the rooks.";
  if (move.promotion) return `Promotes a pawn to a ${PIECE_NAMES[move.promotion]}.`;
  if (move.capture) return `Captures a ${PIECE_NAMES[move.capture.toUpperCase()] || "piece"} while changing the material balance.`;
  if (move.piece.toUpperCase() === "N" || move.piece.toUpperCase() === "B") return "Develops a minor piece toward useful central squares.";
  if (move.piece.toUpperCase() === "P") return "Changes the pawn structure and controls new squares.";
  if (inCheck(makeMove(pos, move), opponent(pos.turn))) return "Creates immediate pressure on the king.";
  return "Improves coordination and keeps practical options open.";
}

function renderMoveCard(item) {
  const isBrilliant = item.classification === "brilliant";
  return `
    <button class="move-card ${state.selectedMove === item.index ? "active" : ""} ${isBrilliant ? "brilliant" : ""}" data-action="select-move" data-index="${item.index}" type="button" title="Move ${item.index + 1}: ${item.playedSan} → ${item.best.san}">
      <div class="move-card-content">
        <strong>${item.moveNumber}${item.color === "b" ? "..." : "."} ${escapeHtml(item.playedSan)} ${isBrilliant ? '<span class="brilliant-tiny">✨</span>' : ''} → ${escapeHtml(item.best.san)}</strong>
        <div class="move-meta">
          <span class="pill ${pillTone(item.classification)}">${item.classification}</span>
          <span class="pill">loss ${Math.round(item.loss)} cp</span>
          <span class="pill">eval ${cp(item.move.score)}</span>
        </div>
      </div>
    </button>
  `;
}

function renderSaved() {
  return `
    <section class="main-grid">
      <article class="panel">
        <h2>Saved analyses</h2>
        <p class="section-note">Saved locally in this browser. No paid database, no tracking, no account needed.</p>
        <div class="saved-list">
          ${state.saved.length ? state.saved.map((analysis, index) => `
            <article class="game-card">
              <strong>${escapeHtml(analysis.title)}</strong>
              <div class="game-meta">
                <span class="pill">${analysis.totalPlies} plies</span>
                <span class="pill">depth ${analysis.depth}</span>
                <span class="pill">${new Date(analysis.createdAt).toLocaleString()}</span>
              </div>
              <div class="button-row">
                <button class="primary-button" data-action="open-saved" data-index="${index}" type="button">Open</button>
                <button class="ghost-button" data-action="delete-saved" data-index="${index}" type="button">Delete</button>
              </div>
            </article>
          `).join("") : `<p class="small-note">Nothing saved yet.</p>`}
        </div>
      </article>
    </section>
  `;
}

function renderAbout() {
  return `
    <section class="main-grid">
      <article class="panel">
        <h2>About Chess8an</h2>
        <p class="section-note">Chess8an is a fully static, free-hostable chess analyzer created for Mohamed Aziz Romdhane. It can be published on GitHub Pages and added to an iPhone home screen as a lightweight app.</p>
        <h3>Free architecture</h3>
        <p class="section-note">Hosting is GitHub Pages. Game import uses Chess.com's free public API with JSONP. Saved analyses live in browser local storage, so there is no paid server database and no private user data leaves the device.</p>
        <h3>Chess.com login note</h3>
        <p class="section-note">Chess.com's official username/password login is OAuth-gated. Their current documentation says developers must apply for OAuth access for authenticated user login. This app therefore connects to public Chess.com profiles without collecting passwords.</p>
        <h3>Copyright</h3>
        <p class="section-note">(c) ${new Date().getFullYear()} Mohamed Aziz Romdhane. All rights reserved unless you choose another license. Chess.com is a trademark of Chess.com, LLC; this project is independent and does not copy Chess.com piece designs, sounds, move glyphs, or private features.</p>
      </article>
    </section>
  `;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

async function runAnalysis(pgn) {
  state.working = true;
  state.tab = "import";
  render();
  try {
    state.analysis = await analyzePgn(pgn, state.depth, state.maxPlies);
    state.selectedMove = 0;
    state.tab = "analysis";
    toast("Analysis complete.");
  } catch (error) {
    toast(error.message || "Could not analyze that game.");
  } finally {
    state.working = false;
    state.progress = { done: 0, total: 0, text: "" };
    render();
  }
}

function download(filename, text) {
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function scrollActiveMove() {
  setTimeout(() => {
    const moveCard = document.querySelector(".move-card.active");
    if (moveCard) moveCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 0);
}

function selectMoveIndex(index) {
  if (!state.analysis) return;
  state.selectedMove = Math.max(0, Math.min(state.analysis.items.length - 1, index));
  render();
  scrollActiveMove();
}

function findCriticalMove(start, direction) {
  if (!state.analysis) return state.selectedMove;
  const critical = new Set(["inaccuracy", "mistake", "blunder"]);
  for (let i = start; i >= 0 && i < state.analysis.items.length; i += direction) {
    if (critical.has(state.analysis.items[i].classification)) return i;
  }
  return state.selectedMove;
}

app.addEventListener("input", (event) => {
  if (event.target.id === "username") state.username = event.target.value.trim();
  if (event.target.id === "pgn") state.pgn = event.target.value;
  if (event.target.id === "maxPlies") state.maxPlies = Math.max(4, Math.min(180, Number(event.target.value || 80)));
});

app.addEventListener("change", (event) => {
  if (event.target.id === "depth") state.depth = Number(event.target.value);
});

// Keyboard navigation for move analysis
document.addEventListener("keydown", (event) => {
  if (state.tab !== "analysis" || !state.analysis) return;
  
  if (event.key === "ArrowRight" || event.key === "n") {
    event.preventDefault();
    selectMoveIndex(state.selectedMove + 1);
  } else if (event.key === "ArrowLeft" || event.key === "p") {
    event.preventDefault();
    selectMoveIndex(state.selectedMove - 1);
  } else if (event.key === "Home") {
    event.preventDefault();
    selectMoveIndex(0);
  } else if (event.key === "End") {
    event.preventDefault();
    selectMoveIndex(state.analysis.items.length - 1);
  } else if (event.key === "f" || event.key === "F") {
    event.preventDefault();
    state.boardFlipped = !state.boardFlipped;
    render();
  }
});

app.addEventListener("click", async (event) => {
  const target = event.target.closest("button");
  if (!target) return;
  const tab = target.dataset.tab;
  const action = target.dataset.action;
  if (tab) {
    state.tab = tab;
    render();
    return;
  }
  if (!action) return;

  if (action === "load-profile") {
    if (!state.username) {
      toast("Enter a Chess.com username first.");
      return;
    }
    state.working = true;
    render();
    try {
      const username = encodeURIComponent(state.username.toLowerCase());
      const [profile, archives] = await Promise.all([
        jsonp(`https://api.chess.com/pub/player/${username}`),
        jsonp(`https://api.chess.com/pub/player/${username}/games/archives`)
      ]);
      state.profile = profile;
      state.archives = archives.archives || [];
      toast(`Connected to ${profile.username || state.username}.`);
    } catch (error) {
      toast(error.message || "Could not connect to Chess.com public data.");
    } finally {
      state.working = false;
      render();
    }
  }

  if (action === "load-archive") {
    const select = document.getElementById("archive-url");
    const url = select?.value;
    if (!url) return;
    state.working = true;
    render();
    try {
      const archive = await jsonp(url);
      state.games = (archive.games || []).slice().reverse().map((game) => ({
        ...game,
        chess8anInsight: { state: "scanning", label: "Scanning", count: 0 }
      }));
      toast(`Loaded ${state.games.length} games.`);
      enrichGameInsights(state.games);
    } catch (error) {
      toast(error.message || "Could not load that archive.");
    } finally {
      state.working = false;
      render();
    }
  }

  if (action === "select-game") {
    const game = state.games[Number(target.dataset.index)];
    if (game?.pgn) {
      state.pgn = game.pgn;
      toast("Game PGN copied into the PGN box.");
      render();
    }
  }

  if (action === "analyze-game") {
    const game = state.games[Number(target.dataset.index)];
    if (game?.pgn) await runAnalysis(game.pgn);
  }

  if (action === "analyze-pgn") {
    await runAnalysis(state.pgn);
  }

  if (action === "select-move") {
    selectMoveIndex(Number(target.dataset.index));
  }

  if (action === "next-move") {
    selectMoveIndex(state.selectedMove + 1);
  }

  if (action === "prev-move") {
    selectMoveIndex(state.selectedMove - 1);
  }

  if (action === "first-move") {
    selectMoveIndex(0);
  }

  if (action === "last-move") {
    selectMoveIndex(state.analysis ? state.analysis.items.length - 1 : 0);
  }

  if (action === "next-critical") {
    selectMoveIndex(findCriticalMove(state.selectedMove + 1, 1));
  }

  if (action === "flip-board") {
    state.boardFlipped = !state.boardFlipped;
    render();
  }

  if (action === "save-analysis") {
    saveCurrentAnalysis();
  }

  if (action === "export-json" && state.analysis) {
    download("chess8an-analysis.json", JSON.stringify(state.analysis, null, 2));
  }

  if (action === "open-saved") {
    state.analysis = state.saved[Number(target.dataset.index)];
    state.selectedMove = 0;
    state.tab = "analysis";
    render();
  }

  if (action === "delete-saved") {
    state.saved.splice(Number(target.dataset.index), 1);
    saveSaved();
    render();
  }
});

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

render();
