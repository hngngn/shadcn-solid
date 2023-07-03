import { describe, expect, it } from 'vitest'
import { isServer, renderToString } from 'solid-js/web'
import { Hello, createHello } from '../src'

describe('environment', () => {
  it('runs on server', () => {
    expect(typeof window).toBe('undefined')
    expect(isServer).toBe(true)
  })
})

describe('createHello', () => {
  it('Returns a Hello World signal', () => {
    const [hello] = createHello()
    expect(hello()).toBe('Hello World!')
  })

  it('Changes the hello target', () => {
    const [hello, setHello] = createHello()
    setHello('Solid')
    expect(hello()).toBe('Hello Solid!')
  })
})

describe('Hello', () => {
  it('renders a hello component', () => {
    const string = renderToString(() => <Hello />)
    expect(string).toBe('<div>Hello World!</div>')
  })
})
