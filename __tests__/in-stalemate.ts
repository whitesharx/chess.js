import { Chess } from '../src/chess'

test.each([
  ['1R6/8/8/8/8/8/7R/k6K b - - 0 1', true],
  ['8/8/5k2/p4p1p/P4K1P/1r6/8/8 w - - 0 2', true],
])('Stalemate %s', (fen, result) => {
  const chess = new Chess(fen)
  expect(chess.inStalemate()).toBe(result)
})
