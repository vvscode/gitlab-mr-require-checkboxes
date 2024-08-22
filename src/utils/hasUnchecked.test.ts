import { hasUnchecked } from './hasUnchecked'

function shouldFail(text: string) {
  it(`should fail for "${text}"`, async () => {
    expect(await hasUnchecked(text)).toBe(true)
  })
}

function shouldPass(text: string) {
  it(`should pass for "${text}"`, async () => {
    expect(await hasUnchecked(text)).toBe(false)
  })
}

describe('hasUnchecked', () => {
  shouldFail(`
    - [ ] some unticked  
  `)
  shouldPass(`
    - [x] some ticked  
  `)
  shouldFail(`
    - [ ] some unticked  
    - [x] some ticked  
  `)
  shouldPass(`
    <!-- required-checkboxes-start -->
    - [x] some ticked
    <!-- required-checkboxes-end -->
    - [ ] some unticked  
  `)
  shouldPass(`
  `)
})
