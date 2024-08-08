export async function hasUnchecked(description: string): Promise<boolean> {
  return description.includes('[ ]')
}
