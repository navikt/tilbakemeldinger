import React from 'react';
import { useIntl } from 'react-intl';
import FeilOgManglerEpost from './FeilOgManglerEpost';
import { Radio, RadioGroup } from '@navikt/ds-react';
import { Controller, useFormContext } from 'react-hook-form';
import { FeilOgManglerFields } from './FeilOgMangler';
import { isBoolean } from '../../../utils/validators';

const FeilgOgManglerOnskerAaKontaktes = () => {
    const { watch, control } = useFormContext<FeilOgManglerFields>();

    const { formatMessage } = useIntl();

    return (
        <>
            <Controller
                render={({ field, fieldState: { error } }) => (
                    <RadioGroup
                        {...field}
                        legend={formatMessage({
                            id: 'felter.onskerkontakt',
                        })}
                        error={error?.message}
                        value={field.value ?? null}
                    >
                        <Radio value={true}>
                            {formatMessage({
                                id: 'felter.onskerkontakt.ja',
                            })}
                        </Radio>
                        <Radio value={false}>
                            {formatMessage({
                                id: 'felter.onskerkontakt.nei',
                            })}
                        </Radio>
                    </RadioGroup>
                )}
                control={control}
                name={'onskerKontakt'}
                rules={{
                    validate: {
                        isRequired: (v) =>
                            isBoolean(v) ||
                            formatMessage({
                                id: 'validering.onskerkontakt.pakrevd',
                            }),
                    },
                }}
            />
            {watch().onskerKontakt && <FeilOgManglerEpost />}
        </>
    );
};
export default FeilgOgManglerOnskerAaKontaktes;
