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
    const sanitizedPath = path.replace(/^\/+|\/+$/g, '');
    // Remove any double slashes
    return sanitizedPath.replace(/\/{2,}/g, '/');
};
