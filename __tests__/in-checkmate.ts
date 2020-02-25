import { Chess } from '../src/chess'

test.each([
  ['8/5r2/4K1q1/4p3/3k4/8/8/8 w - - 0 7', true],
  ['4r2r/p6p/1pnN2p1/kQp5/3pPq2/3P4/PPP3PP/R5K1 b - - 0 2', true],
  ['r3k2r/ppp2p1p/2n1p1p1/8/2B2P1q/2NPb1n1/PP4PP/R2Q3K w kq - 0 8', true],
  ['8/6R1/pp1r3p/6p1/P3R1Pk/1P4P1/7K/8 b - - 0 4', true],
])('Checkmate %s', (fen, result) => {
  const chess = new Chess(fen)
  expect(chess.inCheckmate()).toBe(result)
})
