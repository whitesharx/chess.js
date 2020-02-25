/*-----------------------------------------------------------------------------
 * Copyright (c) 2020, Jeff Hlywa (jhlywa@gmail.com)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES LOSS OF USE, DATA, OR PROFITS OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 *---------------------------------------------------------------------------*/

export type Color = 'w' | 'b'
export type PieceSymbol = 'p' | 'n' | 'b' | 'r' | 'q' | 'k'

type Piece = {
  color: Color
  type: PieceSymbol
}

type Board = (Piece | null)[]

type EpSquare = number | null

export const BLACK: Color = 'b'
export const WHITE: Color = 'w'

export const PAWN: PieceSymbol = 'p'
export const KNIGHT: PieceSymbol = 'n'
export const BISHOP: PieceSymbol = 'b'
export const ROOK: PieceSymbol = 'r'
export const QUEEN: PieceSymbol = 'q'
export const KING: PieceSymbol = 'k'

const RANK_1 = 7
const RANK_2 = 6
const RANK_3 = 5
const RANK_4 = 4
const RANK_5 = 3
const RANK_6 = 2
const RANK_7 = 1
const RANK_8 = 0

const RANKS = [RANK_8, RANK_7, RANK_6, RANK_5, RANK_4, RANK_3, RANK_2, RANK_1]

const FILE_A = 0
const FILE_B = 1
const FILE_C = 2
const FILE_D = 3
const FILE_E = 4
const FILE_F = 5
const FILE_G = 6
const FILE_H = 7

const NO_SQUARE = -1

const SLIDES = {
  PAWN: false,
  KNIGHT: false,
  KING: false,
  BISHOP: true,
  ROOK: true,
  QUEEN: true,
}

const SHIFTS = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 }

const FLAGS = {
  NORMAL: 'n',
  CAPTURE: 'c',
  BIG_PAWN: 'b',
  EP_CAPTURE: 'e',
  PROMOTION: 'p',
  KSIDE_CASTLE: 'k',
  QSIDE_CASTLE: 'q',
}

const BITS = {
  NONE: 0,
  CAPTURE: 1,
  BIG_PAWN: 2,
  EP_CAPTURE: 4,
  PROMOTION: 8,
  KSIDE_CASTLE: 16,
  QSIDE_CASTLE: 32,
}

// prettier-ignore
const SQUARES: Record<string, number> = {
  a8:   0, b8:   1, c8:   2, d8:   3, e8:   4, f8:   5, g8:   6, h8:   7,
  a7:  16, b7:  17, c7:  18, d7:  19, e7:  20, f7:  21, g7:  22, h7:  23,
  a6:  32, b6:  33, c6:  34, d6:  35, e6:  36, f6:  37, g6:  38, h6:  39,
  a5:  48, b5:  49, c5:  50, d5:  51, e5:  52, f5:  53, g5:  54, h5:  55,
  a4:  64, b4:  65, c4:  66, d4:  67, e4:  68, f4:  69, g4:  70, h4:  71,
  a3:  80, b3:  81, c3:  82, d3:  83, e3:  84, f3:  85, g3:  86, h3:  87,
  a2:  96, b2:  97, c2:  98, d2:  99, e2: 100, f2: 101, g2: 102, h2: 103,
  a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
}

const ROOKS = {
  w: [
    { square: SQUARES.a1, flag: BITS.QSIDE_CASTLE },
    { square: SQUARES.h1, flag: BITS.KSIDE_CASTLE },
  ],
  b: [
    { square: SQUARES.a8, flag: BITS.QSIDE_CASTLE },
    { square: SQUARES.h8, flag: BITS.KSIDE_CASTLE },
  ],
}

const SYMBOLS = 'pnbrqkPNBRQK'

const POSSIBLE_RESULTS = ['1-0', '0-1', '1/2-1/2', '*']

const DIRECTIONS = {
  p: [16, 17, 15], // move forward, left, right
  n: [-18, -33, -31, -14, 18, 33, 31, 14],
  b: [-17, -15, 17, 15],
  r: [-16, 1, 16, -1],
  q: [-17, -16, -15, 1, 17, 16, 15, -1],
  k: [-17, -16, -15, 1, 17, 16, 15, -1],
}

// prettier-ignore
const ATTACKS = [
  20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20, 0,
   0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
   0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
   0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
   0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
  24,24,24,24,24,24,56,  0, 56,24,24,24,24,24,24, 0,
   0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
   0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
   0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
   0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
  20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20
]

// prettier-ignore
const RAYS = [
   17,  0,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,  0, 15, 0,
    0, 17,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0, 15,  0, 0,
    0,  0, 17,  0,  0,  0,  0, 16,  0,  0,  0,  0, 15,  0,  0, 0,
    0,  0,  0, 17,  0,  0,  0, 16,  0,  0,  0, 15,  0,  0,  0, 0,
    0,  0,  0,  0, 17,  0,  0, 16,  0,  0, 15,  0,  0,  0,  0, 0,
    0,  0,  0,  0,  0, 17,  0, 16,  0, 15,  0,  0,  0,  0,  0, 0,
    0,  0,  0,  0,  0,  0, 17, 16, 15,  0,  0,  0,  0,  0,  0, 0,
    1,  1,  1,  1,  1,  1,  1,  0, -1, -1,  -1,-1, -1, -1, -1, 0,
    0,  0,  0,  0,  0,  0,-15,-16,-17,  0,  0,  0,  0,  0,  0, 0,
    0,  0,  0,  0,  0,-15,  0,-16,  0,-17,  0,  0,  0,  0,  0, 0,
    0,  0,  0,  0,-15,  0,  0,-16,  0,  0,-17,  0,  0,  0,  0, 0,
    0,  0,  0,-15,  0,  0,  0,-16,  0,  0,  0,-17,  0,  0,  0, 0,
    0,  0,-15,  0,  0,  0,  0,-16,  0,  0,  0,  0,-17,  0,  0, 0,
    0,-15,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,-17,  0, 0,
  -15,  0,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,  0,-17
]

/**
 * Extracts the zero-based rank of an 0x88 square.
 */
function rank(square: number): number {
  return square >> 4
}

/**
 * Extracts the zero-based file of an 0x88 square.
 */
function file(square: number): number {
  return square & 0xf
}

function isDigit(c: string): boolean {
  return '0123456789'.indexOf(c) !== -1
}

/**
 * Converts a 0x88 square to algebraic notation.
 */
function algebraic(square: number): string {
  const f = file(square)
  const r = rank(square)
  return 'abcdefgh'.substring(f, f + 1) + '87654321'.substring(r, r + 1)
}

/**
 * Returns the opposite color.
 */
function swap(color: Color): Color {
  return color === WHITE ? BLACK : WHITE
}

/**
 * Returns the ASCII symbol for each piece.  White pieces are in uppercase,
 * black in lowercase.
 */
function symbol({ type, color }: Piece): string {
  return color === WHITE ? type.toUpperCase() : type.toLowerCase()
}

function isValidSquare(square: string): boolean {
  return SQUARES[square.toLowerCase()] === undefined ? false : true
}

export const STARTING_POSITION =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

interface Move0x88 {
  from: number
  to: number
  piece: PieceSymbol
  color: Color
  captured?: PieceSymbol
  promotion?: PieceSymbol
  flags: number
}

interface AlgebraicMove {
  from: string
  to: string
}

export type Move = string | AlgebraicMove

export interface MoveGenOptions {
  legal?: boolean
  square?: string
  verbose?: boolean
}

interface History {
  move: Move0x88
  kings: Record<Color, number>
  turn: Color
  castling: Record<Color, number>
  epSquare: number | null
  halfMoves: number
  moveNumber: number
}

export class Chess {
  protected _board: Board = []
  protected _kings: Record<Color, number> = { w: NO_SQUARE, b: NO_SQUARE }
  protected _turn: Color = WHITE
  protected _castling: Record<Color, number> = { w: 0, b: 0 }
  protected _epSquare: number | null = null
  protected _halfMoves = 0
  protected _moveNumber = 0
  protected _history: History[] = []

  constructor(fen?: string) {
    this.load(fen || STARTING_POSITION)
  }

  /**
   * Clears the board and resets the turn, castling flags, en-passant square,
   * and move numbers.
   */
  clear(): void {
    this._board = Array(128).fill(null)
    this._kings = { w: NO_SQUARE, b: NO_SQUARE }
    this._turn = WHITE
    this._castling = { w: 0, b: 0 }
    this._epSquare = null
    this._halfMoves = 0
    this._moveNumber = 1
    // update_setup(generate_fen())
  }

  /**
   * Places a piece on a square.
   *
   * @returns A copy of the piece if it was placed successfully, otherwise
   * returns false. Note, this function will fail when attempting to place a
   * king if there is already a king of the same color on the board.
   */
  put(piece: Piece, square: string): Piece | false {
    const { type, color } = piece

    /* check for valid piece object */
    if (!(type || color)) {
      return false
    }

    /* check for piece */
    if (SYMBOLS.indexOf(type.toLowerCase()) === -1) {
      return false
    }

    /* check for valid square */
    const sq = SQUARES[square.toLowerCase()]
    if (sq === undefined) {
      return false
    }

    /* don't let the user place more than one king */
    if (
      type === KING &&
      this._kings[color] !== NO_SQUARE &&
      this._kings[color] !== sq
    ) {
      return false
    }

    this._board[sq] = { type, color }
    if (type === KING) {
      this._kings[color] = sq
    }

    // this._updatePgnHeaders()

    return { type, color }
  }

  /**
   * Removes a piece from the board.
   *
   * @param square The square to clear from the board.
   *
   * @returns A copy of the piece that was removed is success, otherwise
   * returns false.
   */
  remove(square: string): Piece | false {
    const sq = SQUARES[square.toLowerCase()]

    // check for valid square
    if (sq !== undefined) {
      const piece = this._board[sq]

      // check if piece is on square
      if (piece) {
        const { type, color } = piece

        // reset the king squares
        if (type === KING) {
          this._kings[color] = NO_SQUARE
        }

        this._board[sq] = null
        return piece
      }
    }

    return false
  }

  /**
   * Returns a copy of the piece on the given square.
   */
  get(square: string): Piece | false {
    return this._board[SQUARES[square.toLowerCase()]] || false
  }

  /**
   * Returns a copy of the piece on the given square.
   */
  load(fen: string): boolean {
    const tokens = fen.split(/\s+/)
    const position = tokens[0]
    let square = 0

    //if (!validate_fen(fen).valid) {
    //  return false
    //}

    this.clear()

    for (let i = 0; i < position.length; i++) {
      const piece = position.charAt(i)

      if (piece === '/') {
        square += 8
      } else if (isDigit(piece)) {
        square += parseInt(piece, 10)
      } else {
        const color = piece < 'a' ? WHITE : BLACK
        this.put(
          { type: piece.toLowerCase() as PieceSymbol, color },
          algebraic(square),
        )
        square++
      }
    }

    this._turn = tokens[1] === BLACK ? BLACK : WHITE

    if (tokens[2].indexOf('K') > -1) {
      this._castling.w |= BITS.KSIDE_CASTLE
    }
    if (tokens[2].indexOf('Q') > -1) {
      this._castling.w |= BITS.QSIDE_CASTLE
    }
    if (tokens[2].indexOf('k') > -1) {
      this._castling.b |= BITS.KSIDE_CASTLE
    }
    if (tokens[2].indexOf('q') > -1) {
      this._castling.b |= BITS.QSIDE_CASTLE
    }

    this._epSquare = tokens[3] === '-' ? null : SQUARES[tokens[3]]
    this._halfMoves = parseInt(tokens[4], 10)
    this._moveNumber = parseInt(tokens[5], 10)

    // update_setup(generate_fen())

    return true
  }

  /**
   * Returns a string containing an ASCII diagram of the current position.
   *
   * @param eol The string to use as the end-of-line character.  Defaults to `\n`.
   */
  ascii(eol = '\n'): string {
    const pieces = RANKS.map(rank => {
      const rankPieces = this._board
        .slice(rank * 16, rank * 16 + 8)
        .map(piece => {
          if (piece) {
            return ` ${symbol(piece)} `
          } else {
            return ' . '
          }
        })
        .join('')

      return '87654321'[rank] + ' |' + rankPieces + '|'
    })

    return [
      '  +------------------------+',
      pieces.join(eol),
      '  +------------------------+',
      '    a  b  c  d  e  f  g  h',
    ].join(eol)
  }

  /**
   * Returns a representation of the chessboard in Forsyth–Edwards Notation (FEN).
   */
  fen(): string {
    const fen = RANKS.map(rank => {
      const pieces = this._board.slice(rank * 16, rank * 16 + 8)

      return pieces.reduce(
        ({ fen, empty }, piece, index) => {
          if (!piece) {
            return file(index) === FILE_H
              ? { fen: fen + (empty + 1), empty: 0 }
              : { fen, empty: empty + 1 }
          } else {
            if (empty) {
              return { fen: fen + empty + symbol(piece), empty: 0 }
            } else {
              return { fen: fen + symbol(piece), empty: 0 }
            }
          }
        },
        { fen: '', empty: 0 } as { fen: string; empty: number },
      ).fen
    }).join('/')

    const castling = [
      this._castling.w & BITS.KSIDE_CASTLE ? 'K' : '',
      this._castling.w & BITS.QSIDE_CASTLE ? 'Q' : '',
      this._castling.b & BITS.KSIDE_CASTLE ? 'k' : '',
      this._castling.b & BITS.QSIDE_CASTLE ? 'q' : '',
    ].join('')

    return [
      fen,
      this._turn,
      castling,
      this._epSquare ? algebraic(this._epSquare) : '-', // eqSquare is always null or truthy
      this._halfMoves,
      this._moveNumber,
    ].join(' ')
  }

  protected _push(move: Move0x88): void {
    this._history.push({
      move,
      kings: { ...this._kings },
      turn: this._turn,
      castling: { ...this._castling },
      epSquare: this._epSquare,
      halfMoves: this._halfMoves,
      moveNumber: this._moveNumber,
    })
  }

  protected _makeMove(move: Move0x88): void {
    const us = this._turn
    const them = swap(us)

    this._push(move)

    this._board[move.to] = this._board[move.from]
    this._board[move.from] = null

    // if en passant capture, remove the captured pawn
    if (move.flags & BITS.EP_CAPTURE) {
      if (us === BLACK) {
        this._board[move.to - 16] = null
      } else {
        this._board[move.to + 16] = null
      }
    }

    // if pawn promotion, replace with new piece
    if (move.promotion) {
      this._board[move.to] = { type: move.promotion, color: us }
    }

    // if the king moves
    if (move.piece === KING) {
      this._kings[us] = move.to

      // if we castled, move the rook next to the king
      if (move.flags & BITS.KSIDE_CASTLE) {
        const castlingTo = move.to - 1
        const castlingFrom = move.to + 1
        this._board[castlingTo] = this._board[castlingFrom]
        this._board[castlingFrom] = null
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        const castlingTo = move.to + 1
        const castlingFrom = move.to - 2
        this._board[castlingTo] = this._board[castlingFrom]
        this._board[castlingFrom] = null
      }

      // turn off castling rights
      this._castling[us] = 0
    }

    // if we still have castling rights and moved a rook
    if (this._castling[us]) {
      ROOKS[us].some(({ square, flag }) => {
        if (move.from === square && this._castling[us] & flag) {
          this._castling[us] ^= flag
          return true
        }
        return false
      })
    }

    // turn off opponent castling if we capture their rook
    if (this._castling[them]) {
      ROOKS[them].some(({ square, flag }) => {
        if (move.to === square && this._castling[them] & flag) {
          this._castling[them] ^= flag
          return true
        }
        return false
      })
    }

    // if big pawn move, update the en passant square
    if (move.flags & BITS.BIG_PAWN) {
      const epOffset = this._turn === BLACK ? -16 : 16
      this._epSquare = move.to + epOffset
    } else {
      this._epSquare = null
    }

    // reset the 50 move counter if a pawn is moved or a piece is captured
    if (move.piece === PAWN) {
      this._halfMoves = 0
    } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
      this._halfMoves = 0
    } else {
      this._halfMoves++
    }

    if (this._turn === BLACK) {
      this._moveNumber++
    }
    this._turn = them
  }

  protected _undoMove(): Move0x88 | null {
    const state = this._history.pop()
    if (!state) {
      return null
    }

    const move = state.move
    this._kings = state.kings
    this._turn = state.turn
    this._castling = state.castling
    this._epSquare = state.epSquare
    this._halfMoves = state.halfMoves
    this._moveNumber = state.moveNumber

    const us = this._turn
    const them = swap(us)

    this._board[move.from] = { color: us, type: move.piece } // undo any promotions
    this._board[move.to] = null

    if (move.captured) {
      this._board[move.to] = { type: move.captured, color: them }
    } else if (move.flags & BITS.EP_CAPTURE) {
      const epOffset = us === BLACK ? -16 : 16
      this._board[move.to + epOffset] = { type: PAWN, color: them }
    }

    // undoing a castling move
    if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
      const { castlingTo, castlingFrom } =
        move.flags & BITS.KSIDE_CASTLE
          ? { castlingTo: move.to + 1, castlingFrom: move.to - 1 }
          : { castlingTo: move.to - 2, castlingFrom: move.to + 1 }

      this._board[castlingTo] = this._board[castlingFrom]
      this._board[castlingFrom] = null
    }

    return move
  }

  protected _toSan(move: Move0x88): string {
    const { from, to, piece, promotion, flags } = move
    const output = []

    if (flags & BITS.KSIDE_CASTLE) {
      output.push('O-O')
    } else if (flags & BITS.QSIDE_CASTLE) {
      output.push('O-O-O')
    } else {
      if (piece !== PAWN) {
        const disambiguator = this._getDisambiguator(move)
        output.push(piece.toUpperCase())
        output.push(disambiguator)
      }

      if (flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
        if (piece === PAWN) {
          output.push(algebraic(from)[0]) // [0] to grab the file
        }
        output.push('x')
      }

      output.push(algebraic(to))

      if (promotion) {
        output.push(`=${promotion.toUpperCase()}`)
      }
    }

    this._makeMove(move)
    if (this.inCheck()) {
      output.push(this.inCheckmate() ? '#' : '+')
    }
    this._undoMove()

    return output.join('')
  }

  protected _attacks(color: Color, square: number): boolean {
    return this._board.some((piece, index) => {
      // empty square or wrong color
      if (!piece || piece.color !== color) {
        return false
      }

      const { type } = piece

      const attackIndex = index - square + 119

      if (ATTACKS[attackIndex] & (1 << SHIFTS[type])) {
        if (type === PAWN) {
          if (index - square > 0) {
            if (piece.color === WHITE) return true
          } else {
            if (piece.color === BLACK) return true
          }
          return false
        }

        // this is a hopping piece
        if (type === KING || type === KNIGHT) {
          return true
        }

        const offset = RAYS[attackIndex]

        let nextSquare = index + offset
        while (nextSquare !== square) {
          if (this._board[nextSquare]) {
            return false
          }
          nextSquare += offset
        }
        return true
      }

      return false
    })
  }

  protected _isKingAttacked(color: Color): boolean {
    return this._attacks(swap(color), this._kings[color])
  }

  inCheck(): boolean {
    return this._isKingAttacked(this._turn)
  }

  inCheckmate(): boolean {
    return this.inCheck() && this._moves({ legal: true }).length === 0
  }

  inStalemate(): boolean {
    return !this.inCheck() && this._moves({ legal: true }).length === 0
  }

  //insufficientMaterial() {
  //  this._board.reduce(
  //    (
  //      { pieces, num }: { pieces: Record<PieceSymbol, number>; num: number },
  //      { type, color }: Piece,
  //      index: number
  //    ) => {
  //      return {
  //        pieces: { ...pieces, [type]: (pieces[type] || 0) + 1 },
  //        num: num + 1
  //      }
  //    },
  //    {
  //      pieces: { PAWN: 0, ROOK: 0, KNIGHT: 0, BISHOP: 0, QUEEN: 0, KING: 0 },
  //      num: 0
  //    }
  //  )
  //}

  protected _addMove(
    moves: Move0x88[],
    from: number,
    to: number,
    flags: number = BITS.NONE,
  ): void {
    const { type, color } = this._board[from] as Piece

    const captured = this._board[to]?.type

    const move = {
      to,
      from,
      color,
      piece: type,
      flags,
      captured,
    }

    if (type === PAWN && (rank(to) === RANK_8 || rank(to) === RANK_1)) {
      const promotions = [KNIGHT, BISHOP, ROOK, QUEEN]
      promotions.forEach(promotion =>
        moves.push({ ...move, flags: flags | BITS.PROMOTION, promotion }),
      )
    } else {
      moves.push(move)
    }
  }

  protected _squareMoves(moves: Move0x88[] = [], square: number): Move0x88[] {
    const us = this._turn
    const them = swap(us)

    // this square is not on the board
    if (square & 0x88) {
      return moves
    }

    const piece = this._board[square]

    if (!piece || piece.color === them) {
      return moves
    }

    const { type, color } = piece

    if (type === PAWN) {
      // the pawn offsets need to be negated for white moves
      const direction = color === WHITE ? -1 : 1
      let nextSquare = square + DIRECTIONS[type][0] * direction

      if (!this._board[nextSquare]) {
        // single square move
        this._addMove(moves, square, nextSquare)

        // double square move
        nextSquare += DIRECTIONS[type][0] * direction
        if (
          ((rank(square) === RANK_7 && color === BLACK) ||
            (rank(square) === RANK_2 && color === WHITE)) &&
          !this._board[nextSquare]
        ) {
          this._addMove(moves, square, nextSquare, BITS.BIG_PAWN)
        }
      }

      // pawn captures
      for (let j = 1; j < 3; j++) {
        const nextSquare = square + DIRECTIONS[type][j] * direction

        // did we run off the board?
        if (nextSquare & 0x88) {
          continue
        }

        if (
          this._board[nextSquare] &&
          (this._board[nextSquare] as Piece).color === them
        ) {
          this._addMove(moves, square, nextSquare, BITS.CAPTURE)
        } else if (nextSquare === this._epSquare) {
          this._addMove(moves, square, nextSquare, BITS.EP_CAPTURE)
        }
      }

      return moves
    } else {
      if (square === this._kings[us]) {
        // king-side castling
        if (this._castling[us] & BITS.KSIDE_CASTLE) {
          const castlingFrom = this._kings[us]
          const castlingTo = castlingFrom + 2

          if (
            !(this._board[castlingFrom + 1] || this._board[castlingTo]) &&
            !this._attacks(them, this._kings[us]) &&
            !this._attacks(them, castlingFrom + 1) &&
            !this._attacks(them, castlingTo)
          ) {
            this._addMove(moves, this._kings[us], castlingTo, BITS.KSIDE_CASTLE)
          }
        }

        // queen-side castling
        if (this._castling[us] & BITS.QSIDE_CASTLE) {
          const castlingFrom = this._kings[us]
          const castlingTo = castlingFrom - 2

          if (
            !(
              this._board[castlingFrom - 1] ||
              this._board[castlingFrom - 2] ||
              this._board[castlingFrom - 3]
            ) &&
            !this._attacks(them, this._kings[us]) &&
            !this._attacks(them, castlingFrom - 1) &&
            !this._attacks(them, castlingTo)
          ) {
            this._addMove(moves, this._kings[us], castlingTo, BITS.QSIDE_CASTLE)
          }
        }
      }

      return DIRECTIONS[type].reduce((acc, offset) => {
        let nextSquare = square

        // keep moving in the current direction until we capture a piece or
        // run off the board
        while (true) {
          nextSquare += offset

          // did we run off the board?
          if (nextSquare & 0x88) {
            break
          }

          // we hit a piece
          if (this._board[nextSquare]) {
            const { color: capturedColor } = this._board[nextSquare] as Piece
            if (capturedColor === them) {
              this._addMove(acc, square, nextSquare, BITS.CAPTURE)
            }
            break
          } else {
            this._addMove(acc, square, nextSquare, BITS.NONE)
          }

          // can this piece only move one square at a time
          if (type === KNIGHT || type === KING) {
            break
          }
        }
        return acc
      }, moves)
    }
  }

  protected _moves({
    legal = false,
    square = undefined,
  }: {
    legal?: boolean
    square?: number
  } = {}): Move0x88[] {
    const moves =
      square !== undefined
        ? this._squareMoves(undefined, square)
        : this._board.reduce((moves, piece, square) => {
            return this._squareMoves(moves, square)
          }, [] as Move0x88[])

    if (legal) {
      const us = this._turn

      return moves.filter(move => {
        this._makeMove(move)
        const inCheck = this._isKingAttacked(us)
        this._undoMove()
        return !inCheck
      })
    } else {
      return moves
    }
  }

  moves({
    legal = true,
    square = undefined,
    verbose = false,
  }: MoveGenOptions = {}): Move[] {
    const moves = square
      ? isValidSquare(square)
        ? this._moves({ legal, square: SQUARES[square.toLowerCase()] })
        : []
      : this._moves({ legal })

    if (verbose) {
      return moves.map(({ from, to }) => ({
        from: algebraic(from),
        to: algebraic(to),
      }))
    } else {
      return moves.map(move => this._toSan(move))
    }
  }

  // NOTE: not marked protected because this function is used in the test suite
  _perft(depth: number): number {
    const moves = this._moves({ legal: false })
    const color = this._turn

    return moves.reduce((acc, move) => {
      let nodes = 0
      this._makeMove(move)

      if (!this._isKingAttacked(color)) {
        if (depth - 1 > 0) {
          nodes = this._perft(depth - 1)
        } else {
          nodes = 1
        }
      }
      this._undoMove()
      return nodes + acc
    }, 0)
  }

  /* this function is used to uniquely identify ambiguous moves */
  protected _getDisambiguator(
    { from, to, piece }: Move0x88,
    sloppy = false,
  ): string {
    const moves = this._moves({ legal: !sloppy })

    const [ambiguities, sameRank, sameFile] = moves.reduce(
      ([ambiguities, sameRank, sameFile], move) => {
        const { from: ambigFrom, to: ambigTo, piece: ambigPiece } = move

        // if a move of the same piece type ends on the same to square, we'll
        // need to add a disambiguator to the algebraic notation
        if (piece === ambigPiece && from !== ambigFrom && to === ambigTo) {
          ambiguities++

          if (rank(from) === rank(ambigFrom)) {
            sameRank++
          }

          if (file(from) === file(ambigFrom)) {
            sameFile++
          }
        }

        return [ambiguities, sameRank, sameFile]
      },
      [0, 0, 0],
    )

    if (ambiguities > 0) {
      // if there exists a similar moving pieces on the same rank AND file as
      // the move in question, use the square as the disambiguator for example:
      // 7k/2N1N3/8/8/8/2N1N3/8/7K w - - 0 1

      if (sameRank > 0 && sameFile > 0) {
        return algebraic(from)
      } else if (sameFile > 0) {
        // if the moving piece rests on the same file, use the rank symbol as
        // the disambiguator
        return algebraic(from).charAt(1)
      } else {
        // else use the file symbol
        return algebraic(from).charAt(0)
      }
    }

    return ''
  }
}
