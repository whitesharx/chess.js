import { Chess, QUEEN, WHITE } from '../src/chess'

test('remove - returns piece', () => {
  const chess = new Chess()
  expect(chess.remove('d1')).toEqual({ type: QUEEN, color: WHITE })
  expect(chess.get('d1')).toEqual(false)
})

test('remove - capitalized square', () => {
  const chess = new Chess()
  expect(chess.remove('D1')).toEqual({ type: QUEEN, color: WHITE })
  expect(chess.get('d1')).toEqual(false)
})

test('remove - returns false for empty square', () => {
  const chess = new Chess()
  expect(chess.remove('e4')).toEqual(false)
})

test('remove - returns false for invalid square', () => {
  const chess = new Chess()
  expect(chess.remove('bad_square')).toEqual(false)
})
