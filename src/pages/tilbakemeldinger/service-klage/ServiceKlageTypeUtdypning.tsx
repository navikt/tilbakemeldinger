import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { ServiceklageFormFields } from './ServiceKlage';
import { Textarea } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import appStyle from 'src/App.module.scss';
import { vars } from 'src/Config';

const ServiceKlageTypeUtdypning = () => {
    const {
        register,
        trigger,
        watch,
        formState: { errors, isSubmitted },
    } = useFormContext<ServiceklageFormFields>();

    const { formatMessage } = useIntl();

    // Trigger validering etter mount dersom form er submitted
    useEffect(() => {
        isSubmitted && trigger();
    }, [isSubmitted, trigger]);

    return (
        <Textarea
            {...register('klagetypeUtdypning', {
                required: formatMessage({
                    id: 'validering.klagetype.utdypning.pakrevd',
                }),
                maxLength: {
                    value: vars.maksLengdeMeldingServiceKlage,
                    message: formatMessage({
                        id: 'validering.melding.tegn',
                    }),
                },
            })}
            label={formatMessage({
                id: 'felter.melding.tittel',
            })}
            className={appStyle.inputMedium}
            value={watch().klagetypeUtdypning}
            error={errors?.klagetypeUtdypning?.message}
            maxLength={vars.maksLengdeMeldingServiceKlage}
            autoComplete="off"
        />
    );
};
export default ServiceKlageTypeUtdypning;
