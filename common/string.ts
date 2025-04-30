export function sanitizeString(input: string | null | undefined): string {
    if (!input || typeof input !== 'string') return '';

    let clean = input;

    // Remove HTML tags (e.g., <script>)
    clean = clean.replace(/<[^>]*>?/gm, '');

    // Strip control characters and leftover junk
    clean = clean.replace(/[\x00-\x1F\x7F]+/g, '');

    // Only remove SQL-relevant special characters
    clean = clean.replace(/['"`;]|--|\/\*.*?\*\//g, '');

    // Collapse extra whitespace
    clean = clean.replace(/\s+/g, ' ').trim();

    return clean;
}
