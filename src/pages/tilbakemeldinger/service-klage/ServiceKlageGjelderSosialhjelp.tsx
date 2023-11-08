import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Radio, RadioGroup } from '@navikt/ds-react';
import { Controller, useFormContext } from 'react-hook-form';
import { ServiceklageFormFields } from './ServiceKlage';

const ServiceKlageGjelderSosialhjelp = () => {
    const {
        trigger,
        control,
        formState: { isSubmitted },
    } = useFormContext<ServiceklageFormFields>();

    const { formatMessage } = useIntl();

    // Trigger validering etter mount dersom form er submitted
    useEffect(() => {
        isSubmitted && trigger();
    }, [isSubmitted, trigger]);

    return (
        <Controller
            render={({ field, fieldState: { error } }) => (
                <RadioGroup
                    {...field}
                    legend={formatMessage({
                        id: 'felter.gjeldersosialhjelp',
                    })}
                    error={error?.message}
                    value={field.value ?? null}
                >
                    <Radio value={'JA'}>
                        {formatMessage({
                            id: 'felter.gjeldersosialhjelp.ja',
                        })}
                    </Radio>
                    <Radio value={'NEI'}>
                        {formatMessage({
                            id: 'felter.gjeldersosialhjelp.nei',
                        })}
                    </Radio>
                    <Radio value={'VET_IKKE'}>
                        {formatMessage({
                            id: 'felter.gjeldersosialhjelp.vetikke',
                        })}
                    </Radio>
                </RadioGroup>
            )}
            control={control}
            name={'gjelderSosialhjelp'}
            rules={{
                required: formatMessage({
                    id: 'validering.gjeldersosialhjelp.pakrevd',
                }),
            }}
        />
    );
};
export default ServiceKlageGjelderSosialhjelp;
