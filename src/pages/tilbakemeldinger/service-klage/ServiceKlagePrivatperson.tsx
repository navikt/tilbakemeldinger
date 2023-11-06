import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useFormContext } from 'react-hook-form';
import { ServiceklageFormFields } from './ServiceKlage';
import { TextField } from '@navikt/ds-react';
import { isLength, isNumeric, isValidFnr } from '../../../utils/validators';
import appStyle from 'App.module.scss';

interface Props {
    innmelderNavn: string | false;
    innmelderFnr: string | false;
}

const ServiceKlagePrivatperson = (props: Props) => {
    const {
        register,
        trigger,
        formState: { errors, isSubmitted },
    } = useFormContext<ServiceklageFormFields>();

    const { formatMessage } = useIntl();

    const { innmelderNavn, innmelderFnr } = props;

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
                label={formatMessage({ id: 'felter.navn.tittel' })}
                error={errors?.innmelderNavn?.message}
                className={appStyle.inputMedium}
                disabled={!!innmelderNavn}
                autoComplete={'name'}
            />
            <TextField
                {...register('innmelderFnr', {
                    value: innmelderFnr || undefined,
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
                label={formatMessage({ id: 'felter.fodselsnr' })}
                error={errors?.innmelderFnr?.message}
                className={appStyle.inputSmall}
                disabled={!!innmelderFnr}
                autoComplete="off"
            />
        </>
    );
};
export default ServiceKlagePrivatperson;
