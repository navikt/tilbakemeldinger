/* This is the main function used for sanitizing. It takes any input, checks the type
 * and sanitizes it accordingly.
 */
export const sanitize = (item: any): any => {
    if (Array.isArray(item)) {
        return item.map((item) => sanitize(item));
    } else if (typeof item === 'object' && item !== null) {
        const sanitizedObj: any = {};
        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                sanitizedObj[key] = sanitize(item[key]);
            }
        }
        return sanitizedObj;
    } else if (typeof item === 'string') {
        return sanitizeString(item);
    }
    return item;
};

/* This function is used to sanitize strings specifically by escaping HTML tags
 * and removing special characters that could lead to XSS attacks.
 */
export const sanitizeString = (input: string | null | undefined): string => {
    if (typeof input !== 'string') return '';

    let clean = input;

    // Escape special characters such as quotes, semicolons, and double dashes
    clean = clean
        .replace(/;/g, '\\;')
        .replace(/--/g, '\\--')
        .replace(/[ \t\f\v]+/g, ' ')
        .trim();

    // Remove all HTML tags, including nested or malformed ones
    clean = escapeHtml(clean);
    clean = sanitizeHumanReadable(clean);

    return clean;
};

/* Remove non-printable characters and non-characters such as control characters */
export const sanitizeHumanReadable = (input: string): string => {
    return input
        .split('')
        .filter((char) => {
            const code = char.charCodeAt(0);

            const isSafeLineBreak = code === 10 || code === 13; // \n or \r

            const isControl =
                (code < 32 && !isSafeLineBreak) ||
                code === 127 ||
                (code >= 128 && code <= 159);

            const isNoncharacter =
                code === 0xfffe ||
                code === 0xffff ||
                (code >= 0xfdd0 && code <= 0xfdef);

            return !isControl && !isNoncharacter && code <= 65533;
        })
        .join('');
};

export const escapeHtml = (input: string): string => {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};
