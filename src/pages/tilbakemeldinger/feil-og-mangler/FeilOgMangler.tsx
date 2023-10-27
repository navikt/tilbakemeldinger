import React, { useState } from 'react';
import InputMelding from 'components/input-fields/InputMelding';
import { postFeilOgMangler } from 'clients/apiClient';
import { ErrorResponse } from 'types/errors';
import Header from 'components/header/Header';
import { paths, vars } from 'Config';
import { FormattedMessage, useIntl } from 'react-intl';
import Takk from 'components/takk/Takk';
import FeilgOgManglerOnskerAaKontaktes from './FeilOgManglerOnskerAaKontaktes';
import { triggerHotjar } from '../../../utils/hotjar';
import { MetaTags } from '../../../components/metatags/MetaTags';
import {
    Alert,
    Box,
    Button,
    GuidePanel,
    Radio,
    RadioGroup,
} from '@navikt/ds-react';
import { PersonvernInfo } from 'components/personvernInfo/PersonvernInfo';
import {
    Controller,
    FieldValues,
    FormProvider,
    useForm,
} from 'react-hook-form';
import { resolveErrorCode } from '../../../utils/errorCodes';

type FEILTYPE = 'TEKNISK_FEIL' | 'FEIL_INFO' | 'UNIVERSELL_UTFORMING';

export interface FeilOgManglerFields {
    onskerKontakt: boolean;
    epost: string;
    feiltype: FEILTYPE;
    melding: string;
}

export type OutboundFeilOgMangler = {
    onskerKontakt: boolean;
    epost?: string;
    feiltype: FEILTYPE;
    melding: string;
};

const FOM = () => {
    const methods = useForm<FeilOgManglerFields>({
        reValidateMode: 'onChange',
    });

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, isValid, isSubmitted },
    } = methods;

    const [loading, settLoading] = useState(false);
    const [success, settSuccess] = useState(false);
    const [error, settError] = useState<ErrorResponse>();
    const { formatMessage } = useIntl();

    const send = (values: FieldValues) => {
        const { onskerKontakt, feiltype, melding, epost } = values;

        const outbound = {
            feiltype,
            onskerKontakt,
            ...(onskerKontakt && {
                epost,
            }),
            melding,
        };

        settLoading(true);
        postFeilOgMangler(outbound)
            .then(() => {
                settSuccess(true);
                triggerHotjar('feilogmangler');
            })
            .catch((error: ErrorResponse) => {
                settError(error);
            })
            .then(() => {
                settLoading(false);
            });
    };

    return (
        <div className="pagecontent">
            <MetaTags
                titleId={'tilbakemeldinger.feilogmangler.tittel'}
                descriptionId={'seo.feilogmangler.description'}
                path={paths.tilbakemeldinger.feilogmangler}
            />
            <Header
                title={formatMessage({
                    id: 'tilbakemeldinger.feilogmangler.form.tittel',
                })}
            />
            <GuidePanel poster>
                <FormattedMessage
                    id={'tilbakemeldinger.feilogmangler.form.veileder'}
                />
            </GuidePanel>
            <Box background="surface-default" padding={{ xs: '4', md: '8' }}>
                {success ? (
                    <Takk />
                ) : (
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(send)}>
                            <div className={'skjema__content'}>
                                <PersonvernInfo />
                                <Controller
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <RadioGroup
                                            {...field}
                                            legend={formatMessage({
                                                id: 'felter.typefeil.tittel',
                                            })}
                                            error={error?.message}
                                            value={field.value ?? null}
                                        >
                                            <Radio value={'TEKNISK_FEIL'}>
                                                {formatMessage({
                                                    id: 'felter.typefeil.tekniskfeil',
                                                })}
                                            </Radio>
                                            <Radio value={'FEIL_INFO'}>
                                                {formatMessage({
                                                    id: 'felter.typefeil.feilinformasjon',
                                                })}
                                            </Radio>
                                            <Radio
                                                value={'UNIVERSELL_UTFORMING'}
                                            >
                                                {formatMessage({
                                                    id: 'felter.typefeil.uu',
                                                })}
                                            </Radio>
                                        </RadioGroup>
                                    )}
                                    control={control}
                                    name={'feiltype'}
                                    rules={{
                                        required: formatMessage({
                                            id: 'validering.feiltype.pakrevd',
                                        }),
                                    }}
                                />

                                <InputMelding
                                    {...register('melding', {
                                        required: formatMessage({
                                            id: 'validering.melding.pakrevd',
                                        }),
                                        maxLength: {
                                            value: vars.maksLengdeMelding,
                                            message: formatMessage({
                                                id: 'validering.melding.tegn',
                                            }),
                                        },
                                    })}
                                    label={formatMessage({
                                        id: 'felter.melding.tittel',
                                    })}
                                    value={watch().melding}
                                    error={errors?.melding?.message}
                                />
                                <FeilgOgManglerOnskerAaKontaktes />
                                {error && (
                                    <Alert
                                        variant={'error'}
                                        className={'felter__melding-advarsel'}
                                    >
                                        <FormattedMessage
                                            id={resolveErrorCode(
                                                error.errorCode
                                            )}
                                        />
                                    </Alert>
                                )}
                                <Button
                                    type={'submit'}
                                    variant={'primary'}
                                    disabled={
                                        loading || (isSubmitted && !isValid)
                                    }
                                    loading={loading}
                                >
                                    <FormattedMessage id={'felter.send'} />
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                )}
            </Box>
        </div>
    );
};
export default FOM;
