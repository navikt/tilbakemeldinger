import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import SelectEnhet from 'components/input-fields/SelectEnhet';
import { Controller, useFormContext } from 'react-hook-form';
import { ServiceklageFormFields } from './ServiceKlage';
import { TextField } from '@navikt/ds-react';
import { isLength, isNumeric } from 'utils/validators';
import appStyle from 'src/App.module.scss';

const ServiceKlageForBedrift = () => {
    const {
        register,
        control,
        trigger,
        formState: { isSubmitted, errors },
    } = useFormContext<ServiceklageFormFields>();

    const { formatMessage } = useIntl();

    // Trigger validering etter mount dersom form er submitted
    useEffect(() => {
        isSubmitted && trigger();
    }, [isSubmitted, trigger]);

    return (
        <>
            <TextField
                {...register('innmelderRolle')}
                className={appStyle.inputMedium}
                label={formatMessage({ id: 'felter.dinrolle.bedrift' })}
                error={errors?.innmelderRolle?.message}
                autoComplete="off"
            />
            <TextField
                {...register('orgNavn', {
                    required: formatMessage({
                        id: 'validering.orgnavn.pakrevd',
                    }),
                })}
                className={appStyle.inputMedium}
                label={formatMessage({ id: 'felter.orgnavn' })}
                error={errors?.orgNavn?.message}
                autoComplete="off"
            />
            <TextField
                {...register('orgNummer', {
                    required: formatMessage({ id: 'validering.orgnr.pakrevd' }),
                    validate: {
                        isNumeric: (v) =>
                            isNumeric(v) ||
                            formatMessage({ id: 'validering.orgnr.siffer' }),
                        isLength9: (v) =>
                            isLength(v, 9) ||
                            formatMessage({
                                id: 'validering.orgnr.korrektsiffer',
                            }),
                    },
                })}
                className={appStyle.inputMedium}
                label={formatMessage({ id: 'felter.orgnr' })}
                error={errors?.orgNummer?.message}
                autoComplete="off"
            />
            <Controller
                render={({ field, fieldState: { error } }) => (
                    <SelectEnhet
                        {...field}
                        label={'felter.klagerpa.navkontor.velg'}
                        error={error?.message}
                        submitted={isSubmitted}
                        triggerValidation={trigger}
                    />
                )}
                control={control}
                name={'enhetsnummerPaaklaget'}
                rules={{
                    required: formatMessage({
                        id: 'validering.navkontor.pakrevd',
                    }),
                }}
            />
        </>
    );
};
export default ServiceKlageForBedrift;
