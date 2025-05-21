export type RosTilNav = {
    melding: string;
} & (
    | { hvemRoses: 'NAV_KONTAKTSENTER' }
    | { hvemRoses: 'NAV_DIGITALE_TJENESTER' }
    | { hvemRoses: 'NAV_KONTOR'; navKontor: string }
);
