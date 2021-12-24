export const truncate = (input: string, size: number) =>
  input.length > size ? `${input.substring(0, size)}...` : input

export const isValidDomainName = (url: string) =>
  url &&
  /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(url)

export const getHostName = (url: string) => {
  if (!url) {
    return null
  }

  const matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i)
  // extract hostname (will be null if no match is found)

  return (matches && matches[1]) || url
}
