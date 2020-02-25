import { Chess } from '../src/chess'

test('inCheck', () => {
  const chess = new Chess()
  expect(chess.inCheck()).toBe(false)
})

test('inCheck', () => {
  const chess = new Chess(
    'rnb1kbnr/pppp1ppp/8/8/4Pp1q/2N5/PPPP2PP/R1BQKBNR w KQkq - 2 4',
  )
  expect(chess.inCheck()).toBe(true)
})
