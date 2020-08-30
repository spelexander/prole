
export const getHostName = (url) => {
    if (!url) {
        return null;
    }

    const matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
    // extract hostname (will be null if no match is found)
    return matches && matches[1];
};