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

export const sanitizePath = (path: string): string => {
    if (!path) return '';

    if (path.length > 1000 || path.split('/').length > 50) return '';

    let sanitizedPath = path.replace(/\/{2,}/g, '/').replace(/\/+$/, '');

    return `/${sanitizedPath.replace(/^\/+/, '')}`;
};
