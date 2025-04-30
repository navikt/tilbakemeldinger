export const paths = {
    kontaktOss: {
        forside: '/person/kontakt-oss',
    },
    tilbakemeldinger: {
        forside: '/tilbakemeldinger',
        serviceklage: {
            form: '/tilbakemeldinger/serviceklage',
        },
        feilogmangler: '/tilbakemeldinger/feil-og-mangler',
        rostilnav: '/tilbakemeldinger/ros-til-nav',
    },
};

export const sanitizePath = (path: string) => {
    // Remove leading and trailing slashes
    if (!path) return '';

    if (path.length > 1000 || path.split('/').length > 50) return '';

    const sanitizedPath = path.replace(/^\/{1,}/, '').replace(/\/{1,}$/, '');
    // Remove any double slashes
    return sanitizedPath.replace(/\/{2,}/g, '/');
};
