export const sanitizeString = (input: string | null | undefined): string => {
    if (!input || typeof input !== 'string') return '';

    let clean = input;

    // Strip control characters and leftover junk
    clean = clean.replace(/[\x00-\x1F\x7F]+/g, '');

    // Only remove SQL-relevant special characters
    clean = clean.replace(/['"`;]|--|\/\*.*?\*\//g, '');

    // Collapse extra whitespace
    clean = clean.replace(/\s+/g, ' ').trim();

    // Remove all HTML tags, including nested or malformed ones
    clean = escapeHtml(clean);

    return clean;
};

export const escapeHtml = (input: string): string => {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};
