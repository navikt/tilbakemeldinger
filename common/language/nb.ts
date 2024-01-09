import { ITranslation } from '../locale';

const nb: ITranslation = {
    //
    // Feilside
    //
    'feil.404': 'Feilkode 404 - Siden ble ikke funnet',
    'feil.lenke': 'Til kontakt oss forside',

    //
    // Varsler
    //
    'varsel.teknisk.feil':
        'Det er for øyeblikket tekniske problemer med baksystemene våre. Dette kan føre til at noe informasjon mangler fra sidene.',

    //
    // Breadcrumbs
    //
    'breadcrumb.base': 'Kontakt oss',
    'breadcrumb.tilbakemeldinger': 'Tilbakemelding',
    'breadcrumb.serviceklage': 'Klage på service',
    'breadcrumb.feil-og-mangler': 'Feil og mangler',
    'breadcrumb.ros-til-nav': 'Ros',

    //
    // Klage og tilbakemelding
    // Feil og mangler
    //
    'tilbakemeldinger.tilbakemeldinger.sidetittel': 'Klage og tilbakemelding',
    'tilbakemeldinger.klageanke.tittel': 'Klage eller anke på vedtak',
    'tilbakemeldinger.klageanke.beskrivelse': `Hvis du har fått et vedtak fra NAV og du er uenig i vedtaket, har du rett til å klage eller anke. Les mer om dine <KlagerettigheterLenke>klagerettigheter</KlagerettigheterLenke>.`,

    'tilbakemeldinger.serviceklage.tittel': 'Klage på service',
    'tilbakemeldinger.serviceklage.beskrivelse':
        'Har du blitt møtt på en dårlig måte? Eller hatt en annen negativ opplevelse i møte med NAV?',
    'tilbakemeldinger.serviceklage.login.overskrift': 'Ønsker du å logge inn?',
    'tilbakemeldinger.serviceklage.login.beskrivelse':
        'Vi anbefaler at du logger inn, så slipper du å fylle inn all informasjonen om deg selv.<br></br>' +
        'Du må oppgi hvem du er uansett om du logger inn eller ikke.',
    'tilbakemeldinger.serviceklage.login.knapp': 'Logg inn',
    'tilbakemeldinger.serviceklage.login.knapp.fortsettuten':
        'Fortsett uten å logge inn',
    'tilbakemeldinger.serviceklage.form.veileder':
        'Her kan du klage på servicen du har fått. Du vil få svar innen 3 uker.',
    'tilbakemeldinger.serviceklage.sidetittel': 'Klage på service',
    'tilbakemeldinger.serviceklage.form.overskrift':
        'Send inn klage på service',
    'tilbakemeldinger.serviceklage.form.onskersvar':
        'Ønsker du et svar fra oss på serviceklagen?',
    'tilbakemeldinger.serviceklage.form.onskersvar.ja':
        'Ja, jeg ønsker et svar',
    'tilbakemeldinger.serviceklage.form.onskersvar.nei':
        'Nei, jeg ville bare si ifra',

    'tilbakemeldinger.feil-og-mangler.sidetittel': 'Feil og mangler på nav.no',
    'tilbakemeldinger.feilogmangler.beskrivelse':
        'Har du oppdaget en feil på nav.no? Kanskje en teknisk feil, feil informasjon eller for lav grad av universell' +
        ' utforming? Da vil vi gjerne høre fra deg.',
    'tilbakemeldinger.feilogmangler.form.tittel': 'Feil og mangler',
    'tilbakemeldinger.feilogmangler.form.veileder':
        'Her kan du melde ifra om tekniske feil og mangler. Du kan ikke sende inn generelle spørsmål eller henvendelser om saken din.',
    'tilbakemeldinger.feilogmangler.form.overskrift':
        'Send inn feil og mangler på nav.no',
    'tilbakemeldinger.feilogmangler.svartid':
        'Du vil få et svar per e-post i løpet av to virkedager',

    'tilbakemeldinger.ros-til-nav.sidetittel': 'Ros til NAV',
    'tilbakemeldinger.ros.beskrivelse':
        'Har du en god opplevelse? Vil du rose en medarbeider, eller er det noe annet positivt du vil dele med NAV?',
    'tilbakemeldinger.ros.form.tittel': 'Ros til NAV',
    'tilbakemeldinger.ros.form.overskrift': 'Send inn ros til NAV',
    'tilbakemeldinger.ros.form.veileder':
        'Takk for at du vil dele opplevelsen med oss! Vi sørger for at rosen kommer fram til riktig person.',

    'validering.navn.pakrevd': 'Navn er nødvendig',
    'validering.epost.pakrevd': 'E-post er nødvendig',
    'validering.epost.gyldig':
        'Må være en gyldig e-postadresse, f.eks. navnetditt@eksempel.no',
    'validering.tlf.pakrevd': 'Telefonnummer er nødvendig',
    'validering.tlf.ugyldig': 'Ugyldig telefonnummer',
    'validering.klagetype.utdypning.pakrevd': 'Du må utdype hva klagen gjelder',
    'validering.feiltype.pakrevd':
        'Du må velge hvilken type feil eller mangel du fant',
    'validering.melding.pakrevd': 'Melding er nødvendig',
    'validering.melding.tegn': 'Du har tastet inn for mange tegn',
    'validering.hvemroses.pakrevd': 'Du må velge hvem du skal gi ros til',
    'validering.navkontor.pakrevd': 'Du må velge NAV-enhet',
    'validering.klagetyper.pakrevd': 'Du må velge kategori',
    'validering.klagetyper.velg': 'Du må velge minst en kategori',
    'validering.hvemfra.pakrevd':
        'Du må velge hvem tilbakemeldingen er på vegne av',
    'validering.onskerkontakt.pakrevd':
        'Du må velge om du ønsker at vi tar kontakt',
    'validering.fodselsnr.pakrevd': 'Fødselsnummer er nødvendig',
    'validering.fodselsnr.siffer': 'Fødselsnummer kan kun bestå av siffer',
    'validering.fodselsnr.korrektsiffer': 'Fødselsnummer må være 11 siffer',
    'validering.fodselsnr.ugyldig': 'Ugyldig fødselsnummer',
    'validering.fullmakt.pakrevd': 'Fullmakt er nødvendig',
    'validering.rolle.pakrevd': 'Rolle er nødvendig',
    'validering.orgnavn.pakrevd': 'Organisasjonsnavn er nødvendig',
    'validering.orgnr.pakrevd': 'Organisasjonsnummer er nødvendig',
    'validering.orgnr.siffer': 'Organisasjonsnummer kan kun bestå av siffer',
    'validering.orgnr.korrektsiffer': 'Organisasjonsnummer må ha 9 siffer',
    'validering.postadr.pakrevd': 'Postadresse er nødvendig',
    'validering.gjeldersosialhjelp.pakrevd':
        'Du må velge om tilbakemeldingen gjelder økonomisk sosialhjelp / sosiale tjenester',
    'feilmelding.generell':
        'Oi! Det skjedde en teknisk feil ved innsending av skjemaet, prøv igjen senere.',
    'feilmelding.orgnr': 'Kunne ikke finne organisasjonsnummer.',
    'felter.navn.tittel': 'Navn',
    'felter.navn.tittel.valgfritt': 'Navn (valgfritt)',
    'felter.epost.tittel': 'E-post',
    'felter.tlf.tittel': 'Telefon',
    'felter.typefeil.tittel': 'Hva slags feil eller mangel fant du?',
    'felter.typefeil.tekniskfeil': 'Teknisk feil',
    'felter.typefeil.feilinformasjon': 'Feil informasjon',
    'felter.typefeil.uu':
        'Feil på siden ved bruk av skjermleser eller annet hjelpemiddel',
    'felter.melding.tittel': 'Din tilbakemelding',
    'felter.melding.beskrivelse': `Ikke send sensitive personopplysninger om deg selv eller andre. Les mer om personopplysninger hos <DatatilsynetLenke>Datatilsynet</DatatilsynetLenke>.`,
    'felter.send': 'Send tilbakemelding',
    'felter.tilbake': 'Tilbake',
    'felter.hvemroses.tittel': 'Hvem vil du gi ros til?',
    'felter.hvemroses.navkontaktsenter': 'NAV Kontaktsenter',
    'felter.hvemroses.digitaletjenester': 'NAVs digitale tjenester',
    'felter.hvemroses.navkontor': 'NAV-kontor',
    'felter.hvemroses.navkontor.velg': 'Velg NAV-enhet',
    'felter.klagerpa.navkontor.velg': 'Hvilken enhet i NAV gjelder klagen?',
    'felter.hvemroses.navkontor.skrivinn': 'Søk eller velg med piltast',
    'felter.combobox.knapp.beskrivelse': 'Åpne lista',
    'felter.klagetyper': 'Hva gjelder tilbakemeldingen?',
    'felter.klagetyper.info':
        'Velg det alternativet som passer best. Du har mulighet til å velge flere kategorier.',
    'felter.klagetyper.telefon': 'Telefon',
    'felter.klagetyper.navkontor': 'Lokalt NAV-kontor',
    'felter.klagetyper.digitaletjenester': 'NAVs digitale tjenester',
    'felter.klagetyper.brev': 'Brev',
    'felter.klagetyper.annet': 'Annet',
    'felter.hvemfra': 'Hvem skriver du på vegne av?',
    'felter.hvemfra.megselv': 'Meg selv som privatperson',
    'felter.hvemfra.enannen': 'På vegne av en annen privatperson',
    'felter.hvemfra.virksomhet': 'Arbeidsgiver eller samarbeidspartner',
    'felter.onskerkontakt': 'Ønsker du at vi kontakter deg?',
    'felter.onskerkontakt.ja': 'Ja, jeg ønsker å kontaktes',
    'felter.onskerkontakt.nei': 'Nei, jeg ville bare si ifra',
    'felter.fodselsnr': 'Fødselsnummer',
    'felter.dittnavn': 'Ditt navn',
    'felter.dinrolle.annenperson': 'Din rolle (nær pårørende, behandler e.l.)',
    'felter.dinrolle.bedrift': 'Din rolle (valgfri)',
    'felter.navntilklager': 'På vegne av (navn)',
    'felter.fodselsnrtilklager': 'På vegne av (fødselsnummer)',
    'felter.fullmakt': 'Har du fullmakt?',
    'felter.fullmakt.ja': 'Ja, jeg har fullmakt',
    'felter.fullmakt.nei': 'Nei, jeg har ikke fullmakt',
    'felter.fullmakt.advarsel': `Vi kan ikke kontakte deg med mindre vi har mottatt en fullmakt fra personen det gjelder. <FullmaktskjemaLenke>Gå til fullmaktskjema</FullmaktskjemaLenke>.`,
    'felter.orgnavn': 'Organisasjonsnavn',
    'felter.orgnr': 'Organisasjonsnummer (til din lokale enhet)',
    'felter.postadr': 'Bedriftens postadresse',
    'felter.tlf.bedrift': 'Bedriftens telefonnummer',
    'felter.gjeldersosialhjelp':
        'Gjelder det økonomisk sosialhjelp / sosiale tjenester?',
    'felter.gjeldersosialhjelp.ja': 'Ja',
    'felter.gjeldersosialhjelp.nei': 'Nei',
    'felter.gjeldersosialhjelp.vetikke': 'Vet ikke',

    'seo.tilbakemeldinger.description':
        'Her kan du gi tilbakemelding til NAV, klage eller anke på vedtak, service og melde fra om feil og mangler på' +
        ' nav.no. Du kan også gi oss ros om våre tjenester og medarbeidere.',
    'seo.ros-til-nav.description':
        'Har du en god opplevelse? Vil du rose en medarbeider, eller er det noe annet positivt du vil dele med NAV?',
    'seo.feil-og-mangler.description': 'Meld fra om feil og mangler på nav.no',
    'seo.serviceklage.description':
        'Send klage på service hos NAV. Hva gjelder tilbakemeldingen og hvem skriver du på vegne av?',

    'takk.melding': 'Meldingen din er sendt',
    'takk.knapp': 'Gå til nav.no',
};

export default nb;
