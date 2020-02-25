import { Chess, STARTING_POSITION } from '../src/chess'

// prettier-ignore
test.each([
  [STARTING_POSITION, 2, 400],
  ['r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1', 3, 97862],
  ['8/PPP4k/8/8/8/8/4Kppp/8 w - - 0 1', 4, 89363],
  ['8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1', 4, 43238],
  ['rnbqkbnr/p3pppp/2p5/1pPp4/3P4/8/PP2PPPP/RNBQKBNR w KQkq b6 0 4', 3, 23509],
  ['rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8', 3, 62379],
])('Perft #%#', (fen, depth, nodes) => {
  const chess = new Chess(fen)
  expect(chess._perft(depth)).toBe(nodes)
})
