import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import ServiceKlageTelefon from './ServiceKlageTelefon';
import ServiceKlageKontaktBedrift from './ServiceKlageKontaktBedrift';
import { Radio, RadioGroup } from '@navikt/ds-react';
import { Controller, useFormContext } from 'react-hook-form';
import { ServiceklageFormFields } from './ServiceKlage';
import { isBoolean } from 'utils/validators';

interface Props {
    innmelderNavn: string | false;
}

const ServiceKlageOnskerAaKontaktes = (props: Props) => {
    const {
        watch,
        control,
        trigger,
        formState: { isSubmitted },
    } = useFormContext<ServiceklageFormFields>();

    const { formatMessage } = useIntl();

    const { innmelderNavn } = props;

    // Trigger validering etter mount dersom form er submitted
    useEffect(() => {
        isSubmitted && trigger();
    }, [isSubmitted, trigger]);

    return (
        <>
            <Controller
                render={({ field, fieldState: { error } }) => (
                    <RadioGroup
                        {...field}
                        legend={formatMessage({
                            id: 'tilbakemeldinger.serviceklage.form.onskersvar',
                        })}
                        error={error?.message}
                        value={field.value ?? null}
                    >
                        <Radio value={true}>
                            {formatMessage({
                                id: 'tilbakemeldinger.serviceklage.form.onskersvar.ja',
                            })}
                        </Radio>
                        <Radio value={false}>
                            {formatMessage({
                                id: 'tilbakemeldinger.serviceklage.form.onskersvar.nei',
                            })}
                        </Radio>
                    </RadioGroup>
                )}
                control={control}
                name={'oenskerAaKontaktes'}
                rules={{
                    validate: {
                        isRequired: (v) =>
                            isBoolean(v) ||
                            formatMessage({
                                id: 'validering.onskerkontakt.pakrevd',
                            }),
                        mustBeTrueForBedrift: (v) => {
                            if (
                                watch().paaVegneAv === 'BEDRIFT' &&
                                v !== true
                            ) {
                                return formatMessage({
                                    id: 'validering.onskerkontakt.bedrift.pakrevd',
                                });
                            }
                            return true;
                        },
                    },
                }}
            />

            {watch().oenskerAaKontaktes && (
                <>
                    {watch().paaVegneAv === 'BEDRIFT' ? (
                        <ServiceKlageKontaktBedrift
                            innmelderNavn={innmelderNavn}
                        />
                    ) : (
                        <ServiceKlageTelefon />
                    )}
                </>
            )}
        </>
    );
};
export default ServiceKlageOnskerAaKontaktes;
