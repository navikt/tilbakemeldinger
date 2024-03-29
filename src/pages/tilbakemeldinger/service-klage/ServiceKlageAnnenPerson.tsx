import React, { ReactNode, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { urls } from 'src/Config';
import { Alert, Link, Radio, RadioGroup, TextField } from '@navikt/ds-react';
import { Controller, useFormContext } from 'react-hook-form';
import { ServiceklageFormFields } from './ServiceKlage';
import { isBoolean, isLength, isNumeric, isValidFnr } from 'utils/validators';
import appStyle from 'src/App.module.scss';

interface Props {
    innmelderNavn: string | false;
}

const FullmaktskjemaLenke = (children: ReactNode[]) => (
    <Link
        href={urls.tilbakemeldinger.serviceklage.fullmaktskjema}
        rel="noopener noreferrer"
        target="_blank"
    >
        {children}
    </Link>
);

const ServiceKlageForAnnenPerson = (props: Props) => {
    const {
        register,
        watch,
        control,
        trigger,
        formState: { errors, isSubmitted },
    } = useFormContext<ServiceklageFormFields>();

    const { formatMessage } = useIntl();

    const { innmelderNavn } = props;

    // Trigger validering etter mount dersom form er submitted
    useEffect(() => {
        isSubmitted && trigger();
    }, [isSubmitted, trigger]);

    return (
        <>
            <TextField
                {...register('innmelderNavn', {
                    value: innmelderNavn || undefined,
                    required: formatMessage({ id: 'validering.navn.pakrevd' }),
                })}
                label={formatMessage({ id: 'felter.dittnavn' })}
                error={errors?.innmelderNavn?.message}
                className={appStyle.inputMedium}
                disabled={!!innmelderNavn}
                autoComplete={'name'}
            />
            <TextField
                {...register('innmelderRolle', {
                    required: formatMessage({ id: 'validering.rolle.pakrevd' }),
                })}
                className={appStyle.inputMedium}
                label={formatMessage({ id: 'felter.dinrolle.annenperson' })}
                error={errors?.innmelderRolle?.message}
                autoComplete="off"
            />
            <TextField
                {...register('paaVegneAvNavn', {
                    required: formatMessage({ id: 'validering.navn.pakrevd' }),
                })}
                className={appStyle.inputMedium}
                label={formatMessage({ id: 'felter.navntilklager' })}
                error={errors?.paaVegneAvNavn?.message}
                autoComplete="off"
            />
            <TextField
                {...register('paaVegneAvFodselsnr', {
                    required: formatMessage({
                        id: 'validering.fodselsnr.pakrevd',
                    }),
                    validate: {
                        isNumeric: (v) =>
                            isNumeric(v) ||
                            formatMessage({
                                id: 'validering.fodselsnr.siffer',
                            }),
                        isLength11: (v) =>
                            isLength(v, 11) ||
                            formatMessage({
                                id: 'validering.fodselsnr.korrektsiffer',
                            }),
                        isValidFnr: (v) =>
                            isValidFnr(v) ||
                            formatMessage({
                                id: 'validering.fodselsnr.ugyldig',
                            }),
                    },
                })}
                className={appStyle.inputSmall}
                label={formatMessage({ id: 'felter.fodselsnrtilklager' })}
                error={errors?.paaVegneAvFodselsnr?.message}
                autoComplete="off"
            />

            <Controller
                render={({ field, fieldState: { error } }) => (
                    <RadioGroup
                        {...field}
                        legend={formatMessage({
                            id: 'felter.fullmakt',
                        })}
                        error={error?.message}
                        value={field.value ?? null}
                    >
                        <Radio value={true}>
                            {formatMessage({
                                id: 'felter.fullmakt.ja',
                            })}
                        </Radio>
                        <Radio value={false}>
                            {formatMessage({
                                id: 'felter.fullmakt.nei',
                            })}
                        </Radio>{' '}
                        {watch().innmelderHarFullmakt === false && (
                            <Alert variant={'warning'}>
                                <FormattedMessage
                                    id={'felter.fullmakt.advarsel'}
                                    values={{
                                        FullmaktskjemaLenke: (
                                            children: ReactNode[]
                                        ) => FullmaktskjemaLenke(children),
                                    }}
                                />
                            </Alert>
                        )}
                    </RadioGroup>
                )}
                control={control}
                name={'innmelderHarFullmakt'}
                rules={{
                    validate: {
                        isRequired: (v) =>
                            isBoolean(v) ||
                            formatMessage({
                                id: 'validering.fullmakt.pakrevd',
                            }),
                    },
                }}
            />
        </>
    );
};
export default ServiceKlageForAnnenPerson;
