import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { ServiceklageFormFields } from './ServiceKlage';
import { TextField } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import appStyle from 'src/App.module.scss';

const ServiceKlageTypeUtdypning = () => {
    const {
        register,
        trigger,
        formState: { errors, isSubmitted },
    } = useFormContext<ServiceklageFormFields>();

    const { formatMessage } = useIntl();

    // Trigger validering etter mount dersom form er submitted
    useEffect(() => {
        isSubmitted && trigger();
    }, [isSubmitted, trigger]);

    return (
        <TextField
            {...register('klagetypeUtdypning', {
                required: formatMessage({
                    id: 'validering.klagetype.utdypning.pakrevd',
                }),
            })}
            className={appStyle.inputMedium}
            label={''}
            error={errors?.klagetypeUtdypning?.message}
            autoComplete="off"
        />
    );
};
export default ServiceKlageTypeUtdypning;
