import {
  Chess,
  STARTING_POSITION,
  WHITE,
  BLACK,
  KING,
  QUEEN,
} from '../src/chess'

test('load - default position', () => {
  const chess = new Chess()
  expect(chess.fen()).toEqual(STARTING_POSITION)
})
