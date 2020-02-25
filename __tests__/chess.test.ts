import {
  Chess,
  PieceSymbol,
  WHITE,
  BLACK,
  PAWN,
  ROOK,
  KING,
} from '../src/chess'

test('can create object', () => {
  const chess = new Chess()
})

test('clear', () => {
  const chess = new Chess()
  chess.clear()
})

test('ascii', () => {
  const chess = new Chess()
  console.log(chess.ascii())
})
