import { ITranslation } from '../locale';

const nn: ITranslation = {
    //
    // Feilside
    //
    'feil.404': 'Feilkode 404 - Vi fann ikkje sida',
    'feil.lenke': 'Til kontakt oss framside',

    //
    // Varsler
    //
    'varsel.teknisk.feil':
        'Det er akkurat no tekniske problem med baksystema våre. Det kan føre til at noko informasjon manglar frå sidene.',

    //
    // Breadcrumbs
    //
    'breadcrumb.base': 'Kontakt oss',
    'breadcrumb.tilbakemeldinger': 'Tilbakemelding',
    'breadcrumb.serviceklage': 'Klage på service',
    'breadcrumb.feil-og-mangler': 'Feil og manglar',
    'breadcrumb.ros-til-nav': 'Ros',

    //
    // Klage og tilbakemelding
    // Feil og manglar
    //
    'tilbakemeldinger.tilbakemeldinger.sidetittel': 'Klage og tilbakemelding',
    'tilbakemeldinger.klageanke.tittel': 'Klage eller anke på vedtak',
    'tilbakemeldinger.klageanke.beskrivelse': `Dersom du har fått eit vedtak frå Nav og du er usamd i vedtaket, har du rett til å klage eller anke. Les meir om <KlagerettigheterLenke>klagerettane dine</KlagerettigheterLenke>.`,

    'tilbakemeldinger.serviceklage.tittel': 'Klage på service',
    'tilbakemeldinger.serviceklage.beskrivelse':
        'Har du blitt møtt på ein dårleg måte? Eller hatt ei anna negativ oppleving i møte med Nav?',
    'tilbakemeldinger.serviceklage.login.overskrift': 'Ønsker du å logge inn?',
    'tilbakemeldinger.serviceklage.login.beskrivelse':
        'Vi anbefaler at du loggar inn, så treng du ikkje å fylle inn all informasjonen om deg sjølv.<br></br>' +
        'Du må oppgje kven du er anten du loggar inn eller ikkje.',
    'tilbakemeldinger.serviceklage.login.knapp': 'Logg inn',
    'tilbakemeldinger.serviceklage.login.knapp.fortsettuten':
        'Fortsett utan å logge inn',
    'tilbakemeldinger.serviceklage.form.veileder':
        'Her kan du klage på servicen du har fått. Du vil få svar innan 3 veker.',
    'tilbakemeldinger.serviceklage.sidetittel': 'Klage på service',
    'tilbakemeldinger.serviceklage.form.overskrift':
        'Send inn klage på service',
    'tilbakemeldinger.serviceklage.form.onskersvar':
        'Ønsker du eit svar fra oss på serviceklagen?',
    'tilbakemeldinger.serviceklage.form.onskersvar.ja':
        'Ja, eg ønsker eit svar',
    'tilbakemeldinger.serviceklage.form.onskersvar.nei':
        'Nei, eg ville berre seie frå',

    'tilbakemeldinger.feil-og-mangler.sidetittel': 'Feil og manglar på nav.no',
    'tilbakemeldinger.feilogmangler.beskrivelse':
        'Har du oppdaga ein feil på nav.no? Kanskje ein teknisk feil, feil informasjon eller for låg grad av universell' +
        ' utforming? Då vil vi gjerne høyre frå deg.',
    'tilbakemeldinger.feilogmangler.form.tittel': 'Feil og manglar',
    'tilbakemeldinger.feilogmangler.form.veileder':
        'Her kan du melde frå om tekniske feil og manglar. Du kan ikkje sende inn generelle spørsmål eller førespurnadar om saka di.',
    'tilbakemeldinger.feilogmangler.form.overskrift':
        'Send inn feil og manglar på nav.no',
    'tilbakemeldinger.feilogmangler.svartid':
        'Du vil få eit svar på e-post i løpet av to arbeidsdagar',

    'tilbakemeldinger.ros-til-nav.sidetittel': 'Ros til Nav',
    'tilbakemeldinger.ros.beskrivelse':
        'Har du ei god oppleving? Vil du rose ein medarbeidar, eller er det noko anna positivt du vil dele med Nav?',
    'tilbakemeldinger.ros.form.tittel': 'Ros til Nav',
    'tilbakemeldinger.ros.form.overskrift': 'Send inn ros til Nav',
    'tilbakemeldinger.ros.form.veileder':
        'Takk for at du vil dele opplevinga med oss! Vi sørger for at rosen kjem fram til rett person.',

    'validering.navn.pakrevd': 'Namn er nødvendig',
    'validering.epost.pakrevd': 'E-post er nødvendig',
    'validering.epost.gyldig':
        'Må vere ei gjeldande e-postadresse, til dømes navnetditt@eksempel.no',
    'validering.tlf.pakrevd': 'Telefonnummer er nødvendig',
    'validering.tlf.ugyldig': 'Ugyldig telefonnummer',
    'validering.klagetype.utdypning.pakrevd':
        'Du må forklare kvifor du klagar ',
    'validering.feiltype.pakrevd':
        'Du må velje kva for ein type feil eller mangel du fann',
    'validering.melding.pakrevd': 'Melding er nødvendig',
    'validering.melding.tegn': 'Du har tasta inn for mange teikn',
    'validering.hvemroses.pakrevd': 'Du må velje kven du skal gje ros til',
    'validering.navkontor.pakrevd': 'Du må velje Nav-eining',
    'validering.klagetyper.pakrevd': 'Du må velje kategori',
    'validering.klagetyper.velg': 'Du må velje minst ein kategori',
    'validering.hvemfra.pakrevd':
        'Du må velje kven tilbakemeldinga er på vegne av',
    'validering.onskerkontakt.pakrevd':
        'Du må velje om du ønsker at vi tar kontakt',
    'validering.fodselsnr.pakrevd': 'Fødselsnummer er nødvendig',
    'validering.fodselsnr.siffer': 'Fødselsnummer kan berre vere siffer',
    'validering.fodselsnr.korrektsiffer': 'Fødselsnummer må vere 11 siffer',
    'validering.fodselsnr.ugyldig': 'Ugyldig fødselsnummer',
    'validering.fullmakt.pakrevd': 'Fullmakt er nødvendig',
    'validering.rolle.pakrevd': 'Rolle er nødvendig',
    'validering.orgnavn.pakrevd': 'Organisasjonsnamn er nødvendig',
    'validering.orgnr.pakrevd': 'Organisasjonsnummer er nødvendig',
    'validering.orgnr.siffer': 'Organisasjonsnummer kan berre vere siffer',
    'validering.orgnr.korrektsiffer': 'Organisasjonsnummer må ha 9 siffer',
    'validering.postadr.pakrevd': 'Postadresse er nødvendig',
    'validering.gjeldersosialhjelp.pakrevd':
        'Du må velje om tilbakemeldinga gjeld økonomisk sosialhjelp / sosiale tenester',
    'feilmelding.generell':
        'Oi! Det skjedde ein teknisk feil ved sending av skjemaet, prøv igjen seinare.',
    'feilmelding.orgnr': 'Kunne ikkje finne organisasjonsnummer.',
    'felter.navn.tittel': 'Namn',
    'felter.navn.tittel.valgfritt': 'Namn (valfritt)',
    'felter.epost.tittel': 'E-post',
    'felter.tlf.tittel': 'Telefon',
    'felter.typefeil.tittel': 'Kva slags feil eller mangel fann du?',
    'felter.typefeil.tekniskfeil': 'Teknisk feil',
    'felter.typefeil.feilinformasjon': 'Feil informasjon',
    'felter.typefeil.uu':
        'Feil på sida ved bruk av skjermlesar eller anna hjelpemiddel',
    'felter.melding.tittel': 'Tilbakemeldinga di',
    'felter.melding.beskrivelse': `Ikkje send sensitive personopplysningar om deg sjølv eller andre. Les meir om personopplysningar hos <DatatilsynetLenke>Datatilsynet</DatatilsynetLenke>.`,
    'felter.send': 'Send tilbakemelding',
    'felter.tilbake': 'Tilbake',
    'felter.hvemroses.tittel': 'Kven vil du gje ros til?',
    'felter.hvemroses.navkontaktsenter': 'Nav kontaktsenter',
    'felter.hvemroses.digitaletjenester': 'Nav sine digitale tenester',
    'felter.hvemroses.navkontor': 'Nav-kontor',
    'felter.hvemroses.navkontor.velg': 'Vel Nav-eining',
    'felter.klagerpa.navkontor.velg': 'Kva for ei eining i Nav gjeld klagen?',
    'felter.hvemroses.navkontor.skrivinn': 'Søk eller vel med piltast',
    'felter.combobox.knapp.beskrivelse': 'Opne lista',
    'felter.klagetyper': 'Kva gjeld tilbakemeldinga?',
    'felter.klagetyper.info':
        'Vel det alternativet som passar best. Du kan velje fleire kategoriar.',
    'felter.klagetyper.telefon': 'Telefon',
    'felter.klagetyper.navkontor': 'Lokalt Nav-kontor',
    'felter.klagetyper.digitaletjenester': 'Nav sine digitale tenester',
    'felter.klagetyper.brev': 'Brev',
    'felter.klagetyper.annet': 'Anna',
    'felter.hvemfra': 'Kven skriv du på vegne av?',
    'felter.hvemfra.megselv': 'Meg sjølv som privatperson',
    'felter.hvemfra.enannen': 'På vegne av ein annan privatperson',
    'felter.hvemfra.virksomhet': 'Arbeidsgjevar eller samarbeidspartnar',
    'felter.onskerkontakt': 'Ønsker du at vi kontaktar deg?',
    'felter.onskerkontakt.ja': 'Ja, eg ønsker å bli kontakta',
    'felter.onskerkontakt.nei': 'Nei, eg ville berre seie frå',
    'felter.fodselsnr': 'Fødselsnummer',
    'felter.dittnavn': 'Namnet ditt',
    'felter.dinrolle.annenperson': ' Rolla di (nær pårørande, behandlar e.l.)',
    'felter.dinrolle.bedrift': ' Rolla di (valfri)',
    'felter.navntilklager': 'På vegne av (namn)',
    'felter.fodselsnrtilklager': 'På vegne av (fødselsnummer)',
    'felter.fullmakt': 'Har du fullmakt?',
    'felter.fullmakt.ja': 'Ja, eg har fullmakt',
    'felter.fullmakt.nei': 'Nei, eg har ikkje fullmakt',
    'felter.fullmakt.advarsel': `Vi kan ikkje kontakte deg viss vi ikkje har fullmakt frå personen det gjeld. <FullmaktskjemaLenke>Gå til fullmaktskjema</FullmaktskjemaLenke>.`,
    'felter.orgnavn': 'Organisasjonsnamn',
    'felter.orgnr': 'Organisasjonsnummer (til di lokale eining)',
    'felter.postadr': 'Postadressa til bedrifta',
    'felter.tlf.bedrift': 'Telefonnummeret til bedrifta',
    'felter.gjeldersosialhjelp':
        'Gjeld det økonomisk sosialhjelp / sosiale tenester?',
    'felter.gjeldersosialhjelp.ja': 'Ja',
    'felter.gjeldersosialhjelp.nei': 'Nei',
    'felter.gjeldersosialhjelp.vetikke': 'Veit ikkje',

    'seo.tilbakemeldinger.description':
        'Her kan du gje tilbakemelding til Nav om service, klage eller anke på vedtak og melde frå om feil og manglar på' +
        ' nav.no. Du kan òg gje oss ros om tenestene og medarbeidarane våre.',
    'seo.ros-til-nav.description':
        'Har du ei god oppleving? Vil du rose ein medarbeidar, eller er det noko anna positivt du vil dele med Nav?',
    'seo.feil-og-mangler.description': 'Meld frå om feil og manglar på nav.no',
    'seo.serviceklage.description':
        'Send klage på service i Nav. Kva gjeld tilbakemeldinga og kven skriv du på vegne av?',

    'takk.melding': 'Meldinga di er sendt',
    'takk.knapp': 'Gå til nav.no',
};
export default nn;
