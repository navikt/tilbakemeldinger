export type FEIL_OG_MANGLER_TYPE =
    | 'TEKNISK_FEIL'
    | 'FEIL_INFO'
    | 'UNIVERSELL_UTFORMING';

export type FeilOgMangler = {
    onskerKontakt: boolean;
    epost?: string;
    feiltype: FEIL_OG_MANGLER_TYPE;
    melding: string;
};
