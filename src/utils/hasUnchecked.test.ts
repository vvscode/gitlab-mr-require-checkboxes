import { hasUnchecked } from './hasUnchecked'

function shouldFail(text: string, requireAll?: boolean) {
  it(`should fail for "${text}"`, async () => {
    expect(await hasUnchecked(text, requireAll)).toBe(true)
  })
}

function shouldPass(text: string, requireAll?: boolean) {
  it(`should pass for "${text}"`, async () => {
    expect(await hasUnchecked(text, requireAll)).toBe(false)
  })
}

describe('hasUnchecked', () => {
  shouldFail(
    `
    - [ ] some unticked  
  `,
    true,
  )
  shouldPass(`
    - [ ] some unticked  
  `)
  shouldPass(`
    - [x] some ticked  
  `)
  shouldFail(
    `
    - [ ] some unticked  
    - [x] some ticked  
  `,
    true,
  )
  shouldPass(`
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
