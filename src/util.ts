export const now = () => Math.round(Date.now() / 1000)

export const getMeta = ({tags}) => {
  const meta = {}

  for (const [k, v] of tags) {
    meta[k] = v
  }

  return meta
}
