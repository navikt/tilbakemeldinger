import { ITranslation } from '../breadcrumbs';

const en: ITranslation = {
    //
    // Feilside
    //
    'feil.404': 'Error code 404 - Page not found',
    'feil.lenke': 'To the contact us frontpage',

    //
    // Varsler
    //
    'varsel.teknisk.feil':
        'We are currently experiencing technical difficulties with our back-end systems. This could result in some information missing from these pages.',

    //
    // Breadcrumbs
    //
    'breadcrumb.base': 'Contact us',
    'breadcrumb.tilbakemeldinger': 'Feedback',
    'breadcrumb.serviceklage': 'Complain about service',
    'breadcrumb.feil-og-mangler': 'Errors and omissions',
    'breadcrumb.ros-til-nav': 'Praise',

    //
    // Klage og tilbakemelding
    // Feil og mangler
    //
    'tilbakemeldinger.tilbakemeldinger.sidetittel': 'Complaints and feedback',
    'tilbakemeldinger.klageanke.tittel': 'Complain or appeal a decision',
    'tilbakemeldinger.klageanke.beskrivelse': `If you have received a decision from NAV and you disagree with the decision, you have the right to file a complaint or appeal. Read more about your <KlagerettigheterLenke>right to appeal</KlagerettigheterLenke> a decision. `,

    'tilbakemeldinger.serviceklage.tittel': 'Complaints about service',
    'tilbakemeldinger.serviceklage.beskrivelse':
        'Have you been treated poorly? Or had a bad experience with NAV?',
    'tilbakemeldinger.serviceklage.login.tittel': 'Complaints about service',
    'tilbakemeldinger.serviceklage.login.overskrift': 'Do you want to log in?',
    'tilbakemeldinger.serviceklage.login.beskrivelse':
        "We recommend logging in so you don't have to enter any personal information.<br></br>" +
        'You must state who you are in both cases.',
    'tilbakemeldinger.serviceklage.login.knapp': 'Log in',
    'tilbakemeldinger.serviceklage.login.knapp.fortsettuten':
        'Continue without logging in',
    'tilbakemeldinger.serviceklage.form.veileder':
        'Here you can complain about the service you have received. You will receive an answer within 3 weeks.',
    'tilbakemeldinger.serviceklage.sidetittel': 'Complaints about service',
    'tilbakemeldinger.serviceklage.form.overskrift':
        'Submit a complaint about service',
    'tilbakemeldinger.serviceklage.form.onskersvar':
        'Do you want us to contact you?',
    'tilbakemeldinger.serviceklage.form.onskersvar.ja':
        'Yes, I would like to be contacted',
    'tilbakemeldinger.serviceklage.form.onskersvar.nei':
        'No, I just wanted to inform you',

    'tilbakemeldinger.feil-og-mangler.sidetittel':
        'Errors and wrong or missing information',
    'tilbakemeldinger.feilogmangler.beskrivelse':
        'Have you found an error on nav.no? Is it a technical error, wrong or missing information, or an accessibility ' +
        'issue? We would like to hear from you about these cases.',
    'tilbakemeldinger.feilogmangler.form.tittel': 'Errors and omissions',
    'tilbakemeldinger.feilogmangler.form.veileder':
        'You can report technical errors as well as wrong or missing information. You cannot send a general question or ' +
        'requests regarding your cases with NAV.',
    'tilbakemeldinger.feilogmangler.form.overskrift':
        'Submit errors and omissions on nav.no',
    'tilbakemeldinger.feilogmangler.svartid':
        'You will receive a reply by email within two working days',

    'tilbakemeldinger.ros-til-nav.sidetittel': 'Praise for NAV',
    'tilbakemeldinger.ros.beskrivelse':
        'Have you had a good experience? Would you like to praise a colleague or employee or share other positive feedback with NAV?',
    'tilbakemeldinger.ros.form.tittel': 'Praise for NAV',
    'tilbakemeldinger.ros.form.overskrift': 'Submit praise to NAV',
    'tilbakemeldinger.ros.form.veileder':
        'Thanks for sharing your experience with us! We will make sure the praise reaches the right person.',

    'validering.navn.pakrevd': 'Name is required',
    'validering.epost.pakrevd': 'Email is required',
    'validering.epost.gyldig':
        'Must be a valid email address, e.g. yourname@example.com',
    'validering.tlf.pakrevd': 'Phone number is required',
    'validering.tlf.ugyldig': 'Invalid phone number',
    'validering.klagetype.utdypning.pakrevd':
        'You must provide more information about what the appeal concerns',
    'validering.feiltype.pakrevd':
        'You must select the type of error or omission you discovered',
    'validering.melding.pakrevd': 'Message is required',
    'validering.melding.tegn': 'You have entered too many characters',
    'validering.hvemroses.pakrevd': 'You must select who to praise',
    'validering.navkontor.pakrevd': 'You must select a NAV department',
    'validering.klagetyper.pakrevd': 'You must select a category',
    'validering.klagetyper.velg': 'You must select at least one category',
    'validering.hvemfra.pakrevd':
        'You must select who the feedback is on behalf of',
    'validering.onskerkontakt.pakrevd':
        'You must select whether you want us to contact you',
    'validering.fodselsnr.pakrevd': 'National identity number is required',
    'validering.fodselsnr.siffer':
        'National identity number can only consist of digits',
    'validering.fodselsnr.korrektsiffer':
        'National identity number must be 11 digits',
    'validering.fodselsnr.ugyldig': 'National identity number is not valid',
    'validering.fullmakt.pakrevd': 'Authorisation is required',
    'validering.rolle.pakrevd': 'Role is required',
    'validering.orgnavn.pakrevd': 'Organisation name is required',
    'validering.orgnr.pakrevd': 'Organisation number is required',
    'validering.orgnr.siffer': 'Organisation number can only consist of digits',
    'validering.orgnr.korrektsiffer': 'Organisation number must be 9 digits',
    'validering.postadr.pakrevd': 'Postal address is required',
    'validering.gjeldersosialhjelp.pakrevd':
        'You must select whether the feedback applies to financial social assistance/social services',
    'feilmelding.generell':
        'Oops! A technical error occurred while submitting the form - please try again later.',
    'feilmelding.orgnr': 'Organisation number was not found.',
    'felter.navn.tittel': 'Name',
    'felter.navn.tittel.valgfritt': 'Name (optional)',
    'felter.epost.tittel': 'Email',
    'felter.tlf.tittel': 'Telephone',
    'felter.typefeil.tittel':
        'What kind of error or wrong information did you find?',
    'felter.typefeil.tekniskfeil': 'Technical error',
    'felter.typefeil.feilinformasjon': 'Wrong information',
    'felter.typefeil.uu':
        'Error when using screen readers or other accessibility devices',
    'felter.melding.tittel': 'Your feedback',
    'felter.melding.beskrivelse': `Do not send sensitive personal information about yourself or others. Read more about personal information at <DatatilsynetLenke>Datatilsynet</DatatilsynetLenke>.`,
    'felter.send': 'Send feedback',
    'felter.tilbake': 'Back',
    'felter.hvemroses.tittel': 'Who do you want to praise?',
    'felter.hvemroses.navkontaktsenter': 'NAV Contact centre',
    'felter.hvemroses.digitaletjenester': 'NAVs digital services',
    'felter.hvemroses.navkontor': 'NAV office',
    'felter.hvemroses.navkontor.velg': 'Choose NAV unit',
    'felter.combobox.knapp.beskrivelse': 'Open list',
    'felter.klagerpa.navkontor.velg':
        'Which NAV department does the complaint relate to?',
    'felter.hvemroses.navkontor.skrivinn': 'Search or select using arrow keys',
    'felter.klagetyper': 'What is the feedback about?',
    'felter.klagetyper.info':
        'Select the most appropriate option. You can select multiple categories.',
    'felter.klagetyper.telefon': 'Telephone',
    'felter.klagetyper.navkontor': 'Local NAV office',
    'felter.klagetyper.digitaletjenester': 'NAVs digital services',
    'felter.klagetyper.brev': 'Letter',
    'felter.klagetyper.annet': 'Other',
    'felter.hvemfra': 'Who are you writing on behalf of?',
    'felter.hvemfra.megselv': 'Myself as a private individual',
    'felter.hvemfra.enannen': 'On behalf of another private individual',
    'felter.hvemfra.virksomhet': 'Employer or business partner',
    'felter.onskerkontakt': 'Do you want us to contact you?',
    'felter.onskerkontakt.ja': 'Yes, I would like to be contacted',
    'felter.onskerkontakt.nei': 'No, I just wanted to inform you',
    'felter.fodselsnr': 'National identity number',
    'felter.dittnavn': 'Your name',
    'felter.dinrolle.annenperson': 'Your role (close relative, carer etc.)',
    'felter.dinrolle.bedrift': 'Your role (optional)',
    'felter.navntilklager': 'On behalf of (name)',
    'felter.fodselsnrtilklager': 'On behalf of (national identity number)',
    'felter.fullmakt': 'Do you have an authorisation?',
    'felter.fullmakt.ja': 'Yes, I have an authorisation',
    'felter.fullmakt.nei': "No, I don't have an authorisation",
    'felter.fullmakt.advarsel': `We cannot contact you unless we have received an authorisation from the person in question. <FullmaktskjemaLenke>Go to the authorisation form</FullmaktskjemaLenke>.`,
    'felter.orgnavn': 'Organisation name',
    'felter.orgnr': 'Organisation number (for your local department)',
    'felter.postadr': 'Company postal address',
    'felter.tlf.bedrift': 'Company phone number',
    'felter.gjeldersosialhjelp':
        'Is this regarding financial social assistance/social services?',
    'felter.gjeldersosialhjelp.ja': 'Yes',
    'felter.gjeldersosialhjelp.nei': 'No',
    'felter.gjeldersosialhjelp.vetikke': 'Don’t know',

    'seo.tilbakemeldinger.description':
        'Here you can give feedback to NAV, complain or appeal against decisions or service and report errors and defects on' +
        ' nav.no. You can also send praise about our services and employees.',
    'seo.rostilnav.description':
        'Have you had a good experience? Would you like to praise a colleague or employee or share other positive feedback with NAV?',
    'seo.feilogmangler.description': 'Report errors and omissions at nav.no',
    'seo.klagepaservice.description':
        'Submit a complaint about service from NAV. What does your feedback apply to and who are you writing on behalf of?',

    'takk.melding': 'Your message has been sent',
    'takk.knapp': 'Go to nav.no',
};

export default en;
