import {
  Chess,
  PieceSymbol,
  WHITE,
  BLACK,
  PAWN,
  ROOK,
  KING,
} from '../src/chess'

test('put', () => {
  const chess = new Chess()
  chess.clear()

  const piece = { type: ROOK, color: BLACK }
  expect(chess.put(piece, 'a1')).toEqual(piece)
  expect(chess.get('a1')).toEqual(piece)
})

test('put - capitalized square', () => {
  const chess = new Chess()
  chess.clear()

  const piece = { type: ROOK, color: BLACK }
  expect(chess.put(piece, 'A1')).toEqual(piece)
  expect(chess.get('a1')).toEqual(piece)
})

test('put - bad piece', () => {
  const chess = new Chess()
  expect(
    chess.put({ type: 'bad-square' as PieceSymbol, color: WHITE }, 'a7'),
  ).toEqual(false)
})

test('put - bad square', () => {
  const chess = new Chess()
  expect(chess.put({ type: PAWN, color: WHITE }, 'a9')).toEqual(false)
})

test('put - disallow two white kings', () => {
  const chess = new Chess()
  chess.clear()
  const piece = { type: KING, color: WHITE }
  expect(chess.put(piece, 'a2')).toEqual(piece)
  expect(chess.put(piece, 'a3')).toEqual(false)
})

test('put - disallow two black kings', () => {
  const chess = new Chess()
  chess.clear()
  const piece = { type: KING, color: BLACK }
  expect(chess.put(piece, 'e8')).toEqual(piece)
  expect(chess.put(piece, 'd8')).toEqual(false)
})

test('put - allow two kings if overwriting the same square', () => {
  const chess = new Chess()
  chess.clear()
  const piece = { type: KING, color: WHITE }
  expect(chess.put(piece, 'a2')).toEqual(piece)
  expect(chess.put(piece, 'a2')).toEqual(piece)
})
