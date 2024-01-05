import React, { useState } from 'react';
import { useStore } from 'providers/Provider';
import { postServiceKlage } from 'clients/apiClient';
import { ErrorResponse } from 'types/errors';
import {
    KLAGE_TYPE,
    ON_BEHALF_OF,
    OutboundServiceKlageBase,
    OutboundServiceKlageExtend,
} from 'types/serviceklage';
import Header from 'components/header/Header';
import { vars } from 'src/Config';
import { paths } from 'common/paths';
import { FormattedMessage, useIntl } from 'react-intl';
import ServiceKlagePrivatperson from './ServiceKlagePrivatperson';
import ServiceKlageForAnnenPerson from './ServiceKlageAnnenPerson';
import ServiceKlageForBedrift from './ServiceKlageBedrift';
import ServiceKlageGjelderSosialhjelp from './ServiceKlageGjelderSosialhjelp';
import Takk from 'components/takk/Takk';
import { triggerHotjar } from 'utils/hotjar';
import ServiceKlageOnskerAaKontaktes from './ServiceKlageOnskerAaKontaktes';
import ServiceKlageTypeUtdypning from './ServiceKlageTypeUtdypning';
import { MetaTags } from 'components/metatags/MetaTags';
import LoginModal from './login-modal/LoginModal';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    GuidePanel,
    Radio,
    RadioGroup,
    Textarea,
} from '@navikt/ds-react';
import {
    Controller,
    FieldValues,
    FormProvider,
    useForm,
} from 'react-hook-form';
import { PersonvernInfo } from 'components/personvernInfo/PersonvernInfo';
import { resolveErrorCode } from 'utils/errorCodes';
import appStyle from 'src/App.module.scss';

export interface ServiceklageFormFields {
    klagetekst: string;
    oenskerAaKontaktes?: boolean;
    gjelderSosialhjelp?: 'JA' | 'NEI' | 'VET_IKKE';
    klagetypeUtdypning?: string;
    klagetyper: KLAGE_TYPE[];
    paaVegneAv: 'PRIVATPERSON' | 'ANNEN_PERSON' | 'BEDRIFT';
    innmelderNavn: string;
    innmelderTlfnr: string;
    innmelderFnr: string;
    innmelderRolle: string;
    innmelderHarFullmakt: boolean | undefined;
    paaVegneAvNavn: string;
    paaVegneAvFodselsnr: string;
    enhetsnummerPaaklaget?: {
        label: string;
        value: string;
    };
    orgNavn: string;
    orgNummer: string;
}

export type OutboundServiceKlage = OutboundServiceKlageBase &
    OutboundServiceKlageExtend;

const ServiceKlage = () => {
    const methods = useForm<ServiceklageFormFields>({
        reValidateMode: 'onChange',
        shouldUnregister: true,
    });

    const {
        register,
        unregister,
        handleSubmit,
        watch,
        setValue,
        trigger,
        control,
        formState: { errors, isValid, isSubmitted },
    } = methods;

    const [{ auth, fodselsnr }] = useStore();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<ErrorResponse>();
    const [loginClosed, setLoginClosed] = useState(false);

    const { formatMessage } = useIntl();

    const innmelderNavn = auth.authenticated && auth.name;
    const innmelderFnr = auth.authenticated && fodselsnr;

    const closeModal = () => setLoginClosed(true);

    const send = (values: FieldValues) => {
        const outboundBase: OutboundServiceKlageBase = {
            klagetekst: values.klagetekst,
            klagetyper: values.klagetyper,
            ...(values.klagetyper.includes('ANNET') && {
                klagetypeUtdypning: values.klagetypeUtdypning,
            }),
            oenskerAaKontaktes: values.oenskerAaKontaktes,
            ...(values.klagetyper.includes('LOKALT_NAV_KONTOR') && {
                gjelderSosialhjelp: values.gjelderSosialhjelp,
            }),
        };

        const outboundExtend: {
            [key in ON_BEHALF_OF]: OutboundServiceKlageExtend;
        } = {
            PRIVATPERSON: {
                paaVegneAv: 'PRIVATPERSON',
                innmelder: {
                    navn: values.innmelderNavn,
                    ...(values.oenskerAaKontaktes && {
                        telefonnummer: values.innmelderTlfnr,
                    }),
                    personnummer: values.innmelderFnr,
                },
            },
            ANNEN_PERSON: {
                paaVegneAv: 'ANNEN_PERSON',
                innmelder: {
                    navn: values.innmelderNavn,
                    ...(values.oenskerAaKontaktes && {
                        telefonnummer: values.innmelderTlfnr,
                    }),
                    harFullmakt: values.innmelderHarFullmakt,
                    rolle: values.innmelderRolle,
                },
                paaVegneAvPerson: {
                    navn: values.paaVegneAvNavn,
                    personnummer: values.paaVegneAvFodselsnr,
                },
            },
            BEDRIFT: {
                paaVegneAv: 'BEDRIFT',
                ...(values.enhetsnummerPaaklaget && {
                    enhetsnummerPaaklaget: values.enhetsnummerPaaklaget.value,
                }),
                innmelder: {
                    ...(values.oenskerAaKontaktes && {
                        navn: values.innmelderNavn,
                        telefonnummer: values.innmelderTlfnr,
                    }),
                    ...(values.innmelderRolle && {
                        rolle: values.innmelderRolle,
                    }),
                },
                paaVegneAvBedrift: {
                    navn: values.orgNavn,
                    organisasjonsnummer: values.orgNummer,
                },
            },
        };

        const outbound = {
            ...outboundBase,
            ...outboundExtend[values.paaVegneAv as ON_BEHALF_OF],
        };

        setLoading(true);
        postServiceKlage(outbound)
            .then(() => {
                setSuccess(true);
                triggerHotjar('serviceklage');
            })
            .catch((error: ErrorResponse) => {
                setError(error);
            })
            .then(() => {
                setLoading(false);
            });
    };

    return (
        <div className={appStyle.pageContent}>
            <MetaTags
                titleId={'tilbakemeldinger.serviceklage.sidetittel'}
                descriptionId={'seo.klagepaservice.description'}
                path={paths.tilbakemeldinger.serviceklage.form}
            />
            <Header
                title={formatMessage({
                    id: 'tilbakemeldinger.serviceklage.sidetittel',
                })}
            />
            <LoginModal
                open={auth.loaded && !auth.authenticated && !loginClosed}
                closeFunc={closeModal}
            />
            <GuidePanel poster>
                <FormattedMessage id="tilbakemeldinger.serviceklage.form.veileder" />
            </GuidePanel>
            <Box background="surface-default" padding={{ xs: '4', md: '8' }}>
                {success ? (
                    <Takk />
                ) : (
                    <FormProvider {...methods}>
                        <form
                            className={appStyle.skjema}
                            onSubmit={handleSubmit(send)}
                        >
                            <PersonvernInfo />
                            <Controller
                                render={({ field, fieldState: { error } }) => (
                                    <CheckboxGroup
                                        {...field}
                                        legend={formatMessage({
                                            id: 'felter.klagetyper',
                                        })}
                                        error={error?.message}
                                        onChange={async (
                                            values: KLAGE_TYPE[]
                                        ) => {
                                            setValue('klagetyper', values);
                                            isSubmitted && (await trigger());
                                        }}
                                        value={field.value ?? []}
                                        description={
                                            <FormattedMessage
                                                id={'felter.klagetyper.info'}
                                            />
                                        }
                                    >
                                        <Checkbox value={'TELEFON'}>
                                            {formatMessage({
                                                id: 'felter.klagetyper.telefon',
                                            })}
                                        </Checkbox>
                                        <Checkbox value={'LOKALT_NAV_KONTOR'}>
                                            {formatMessage({
                                                id: 'felter.klagetyper.navkontor',
                                            })}
                                        </Checkbox>
                                        <Checkbox
                                            value={'NAV_DIGITALE_TJENESTER'}
                                        >
                                            {formatMessage({
                                                id: 'felter.klagetyper.digitaletjenester',
                                            })}
                                        </Checkbox>
                                        <Checkbox value={'BREV'}>
                                            {formatMessage({
                                                id: 'felter.klagetyper.brev',
                                            })}
                                        </Checkbox>
                                        <Checkbox value={'ANNET'}>
                                            {formatMessage({
                                                id: 'felter.klagetyper.annet',
                                            })}
                                        </Checkbox>
                                        {watch().klagetyper?.includes(
                                            'ANNET'
                                        ) && <ServiceKlageTypeUtdypning />}
                                    </CheckboxGroup>
                                )}
                                control={control}
                                name={'klagetyper'}
                                rules={{
                                    required: formatMessage({
                                        id: 'validering.klagetyper.pakrevd',
                                    }),
                                }}
                            />

                            {watch().klagetyper?.includes(
                                'LOKALT_NAV_KONTOR'
                            ) && <ServiceKlageGjelderSosialhjelp />}

                            <Controller
                                render={({ field, fieldState: { error } }) => (
                                    <RadioGroup
                                        {...field}
                                        legend={formatMessage({
                                            id: 'felter.hvemfra',
                                        })}
                                        error={error?.message}
                                        value={field.value ?? null}
                                        onChange={(value) => {
                                            // Unregister innmelderRolle så verdi og validering resettes mellom Bedrift/AnnenPerson
                                            unregister('innmelderRolle');
                                            field.onChange(value);
                                        }}
                                    >
                                        <Radio value={'PRIVATPERSON'}>
                                            {formatMessage({
                                                id: 'felter.hvemfra.megselv',
                                            })}
                                        </Radio>
                                        <Radio value={'ANNEN_PERSON'}>
                                            {formatMessage({
                                                id: 'felter.hvemfra.enannen',
                                            })}
                                        </Radio>
                                        <Radio value={'BEDRIFT'}>
                                            {formatMessage({
                                                id: 'felter.hvemfra.virksomhet',
                                            })}
                                        </Radio>
                                    </RadioGroup>
                                )}
                                control={control}
                                name={'paaVegneAv'}
                                rules={{
                                    required: formatMessage({
                                        id: 'validering.hvemfra.pakrevd',
                                    }),
                                }}
                            />

                            {watch().paaVegneAv === 'PRIVATPERSON' && (
                                <ServiceKlagePrivatperson
                                    innmelderNavn={innmelderNavn}
                                    innmelderFnr={innmelderFnr}
                                />
                            )}
                            {watch().paaVegneAv === 'ANNEN_PERSON' && (
                                <ServiceKlageForAnnenPerson
                                    innmelderNavn={innmelderNavn}
                                />
                            )}
                            {watch().paaVegneAv === 'BEDRIFT' && (
                                <ServiceKlageForBedrift />
                            )}

                            <Textarea
                                {...register('klagetekst', {
                                    required: formatMessage({
                                        id: 'validering.melding.pakrevd',
                                    }),
                                    maxLength: {
                                        value: vars.maksLengdeMelding,
                                        message: formatMessage({
                                            id: 'validering.melding.tegn',
                                        }),
                                    },
                                })}
                                label={formatMessage({
                                    id: 'felter.melding.tittel',
                                })}
                                value={watch().klagetekst}
                                error={errors?.klagetekst?.message}
                                maxLength={vars.maksLengdeMelding}
                                autoComplete="off"
                            />
                            {(watch().paaVegneAv !== 'ANNEN_PERSON' ||
                                watch().innmelderHarFullmakt !== false) && (
                                <ServiceKlageOnskerAaKontaktes
                                    innmelderNavn={innmelderNavn}
                                />
                            )}
                            {error && (
                                <Alert variant={'error'}>
                                    <FormattedMessage
                                        id={resolveErrorCode(error.errorCode)}
                                    />
                                </Alert>
                            )}
                            <Button
                                type={'submit'}
                                variant={'primary'}
                                disabled={loading || (isSubmitted && !isValid)}
                                loading={loading}
                            >
                                <FormattedMessage id={'felter.send'} />
                            </Button>
                        </form>
                    </FormProvider>
                )}
            </Box>
        </div>
    );
};

export default ServiceKlage;
