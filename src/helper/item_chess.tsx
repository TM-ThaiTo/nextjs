import { Color, PieceSymbol } from "chess.js";
import { iconChess } from '@/constants/icon_game';

const pieceMap: { [key: string]: string } = {
    p: "pawn",
    n: "knight",
    b: "bishop",
    r: "rook",
    q: "queen",
    k: "king"
};

const getPieceImage = (square: { type: PieceSymbol; color: Color } | null) => {
    if (!square) return null;

    // Convert single-letter piece to full name
    const pieceName = pieceMap[square.type];

    // Construct the key dynamically (e.g., "pawnW", "queenB", etc.)
    const pieceKey = `${pieceName}${square.color === "w" ? "W" : "B"}` as keyof typeof iconChess;

    return iconChess[pieceKey];
};

export { getPieceImage };
