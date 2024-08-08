const OPENING_TAG = '<!-- required-checkboxes-start -->'
const CLOSING_TAG = '<!-- required-checkboxes-end -->'

export async function hasUnchecked(description: string): Promise<boolean> {
  const regex = new RegExp(`${OPENING_TAG}((\\s|\\S)*?)${CLOSING_TAG}`, 'gs')

  const matches: string[] = []
  let match

  while ((match = regex.exec(description)) !== null) {
    matches.push(`${match[1]}`)
  }

  if (matches.length) {
    return (await Promise.all(matches.map((el) => hasUnchecked(el)))).some((result) => result)
  }

  return description.includes('[ ]')
}
