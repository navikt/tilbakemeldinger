import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import ServiceKlageTelefon from './ServiceKlageTelefon';
import { useFormContext } from 'react-hook-form';
import { ServiceklageFormFields } from './ServiceKlage';
import { TextField } from '@navikt/ds-react';
import appStyle from 'App.module.scss';

interface Props {
    innmelderNavn: string | false;
}

const ServiceKlageKontaktBedrift = (props: Props) => {
    const {
        register,
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
            <ServiceKlageTelefon />
        </>
    );
};
export default ServiceKlageKontaktBedrift;
