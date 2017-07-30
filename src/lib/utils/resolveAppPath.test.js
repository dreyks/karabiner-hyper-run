import resolveAppPath from './resolveAppPath'

it('transforms application name to path', () => {
  expect(resolveAppPath('Terminal')).toBe('/Applications/Terminal.app')
})

it('does not alter absolute paths', () => {
  expect(resolveAppPath('/Applications/Terminal.app')).toBe('/Applications/Terminal.app')
})

it('does not alter paths relative to $HOME', () => {
  expect(resolveAppPath('~/.local/bin/whatever')).toBe('~/.local/bin/whatever')
})
