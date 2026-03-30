import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { ServiceklageFormFields } from './ServiceKlage';
import { TextField } from '@navikt/ds-react';
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
        <TextField
            {...register('klagetypeUtdypning', {
                required: formatMessage({
                    id: 'validering.klagetype.utdypning.pakrevd',
                }),
            })}
            label={formatMessage({
                id: 'felter.klagetyper.annenKategori',
            })}
            className={`${appStyle.inputMedium} ${appStyle.indent}`}
            value={watch().klagetypeUtdypning}
            hideLabel
            error={errors?.klagetypeUtdypning?.message}
            maxLength={vars.maksLengdeMeldingServiceKlage}
            autoComplete="off"
        />
    );
};
export default ServiceKlageTypeUtdypning;
