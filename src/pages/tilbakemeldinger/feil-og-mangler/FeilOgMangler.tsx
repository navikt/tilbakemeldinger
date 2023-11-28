import React, { useState } from 'react';
import { postFeilOgMangler } from 'clients/apiClient';
import { ErrorResponse } from 'types/errors';
import Header from 'components/header/Header';
import { paths, vars } from 'src/Config';
import { FormattedMessage, useIntl } from 'react-intl';
import Takk from 'components/takk/Takk';
import FeilgOgManglerOnskerAaKontaktes from './FeilOgManglerOnskerAaKontaktes';
import { triggerHotjar } from 'utils/hotjar';
import { MetaTags } from 'components/metatags/MetaTags';
import {
    Alert,
    Box,
    Button,
    GuidePanel,
    Radio,
    RadioGroup,
    Textarea,
} from '@navikt/ds-react';
import { PersonvernInfo } from 'components/personvernInfo/PersonvernInfo';
import {
    Controller,
    FieldValues,
    FormProvider,
    useForm,
} from 'react-hook-form';
import { resolveErrorCode } from '../../../utils/errorCodes';
import appStyle from 'src/App.module.scss';

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

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<ErrorResponse>();
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

        setLoading(true);
        postFeilOgMangler(outbound)
            .then(() => {
                setSuccess(true);
                triggerHotjar('feilogmangler');
            })
            .catch((error: ErrorResponse) => {
                setError(error);
            })
            .then(() => {
                setLoading(false);
            });
    };

    return (
        <div className={appStyle.pageContent}>
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
                        <form
                            className={appStyle.skjema}
                            onSubmit={handleSubmit(send)}
                        >
                            <PersonvernInfo />
                            <Controller
                                render={({ field, fieldState: { error } }) => (
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
                                        <Radio value={'UNIVERSELL_UTFORMING'}>
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

                            <Textarea
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
                                maxLength={vars.maksLengdeMelding}
                                autoComplete="off"
                            />
                            <FeilgOgManglerOnskerAaKontaktes />
                            {error && (
                                <Alert variant={'error'}>
                                    <FormattedMessage
                                        id={resolveErrorCode(error.errorCode)}
                                    />
                                </Alert>
                            )}
                            <Button
                                type={'submit'}
                                variant={'primary'}
                                disabled={loading || (isSubmitted && !isValid)}
                                loading={loading}
                            >
                                <FormattedMessage id={'felter.send'} />
                            </Button>
                        </form>
                    </FormProvider>
                )}
            </Box>
        </div>
    );
};
export default FOM;
