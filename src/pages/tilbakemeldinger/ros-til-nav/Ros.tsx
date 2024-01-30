import React, { useState } from 'react';
import { postRosTilNav } from 'clients/apiClient';
import { ErrorResponse } from 'types/errors';
import Header from 'components/header/Header';
import { vars } from 'src/Config';
import { paths } from 'common/paths';
import { FormattedMessage, useIntl } from 'react-intl';
import Takk from 'components/takk/Takk';
import { triggerHotjar } from 'utils/hotjar';
import SelectEnhet from 'components/input-fields/SelectEnhet';
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
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { resolveErrorCode } from 'utils/errorCodes';
import appStyle from 'src/App.module.scss';

type HVEM_ROSES = 'NAV_KONTAKTSENTER' | 'NAV_DIGITALE_TJENESTER' | 'NAV_KONTOR';

interface FormFields {
    melding: string;
    hvemRoses: HVEM_ROSES;
    navKontor?: {
        label: string;
        value: string;
    };
}

export type OutboundRosTilNav = {
    melding: string;
} & (
    | { hvemRoses: 'NAV_KONTAKTSENTER' }
    | { hvemRoses: 'NAV_DIGITALE_TJENESTER' }
    | { hvemRoses: 'NAV_KONTOR'; navKontor: string }
);

const Ros = () => {
    const {
        register,
        control,
        handleSubmit,
        watch,
        trigger,
        formState: { errors, isValid, isSubmitted },
    } = useForm<FormFields>({
        reValidateMode: 'onChange',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<ErrorResponse>();
    const { formatMessage } = useIntl();

    const send = (values: FieldValues) => {
        const { melding, hvemRoses, navKontor } = values;

        const outbound = {
            melding,
            hvemRoses,
            ...(hvemRoses === 'NAV_KONTOR' && {
                navKontor: navKontor ? navKontor.label : undefined,
            }),
        } as OutboundRosTilNav;

        setLoading(true);
        postRosTilNav(outbound)
            .then(() => {
                setSuccess(true);
                triggerHotjar('rosnav');
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
                titleId={'tilbakemeldinger.ros-til-nav.sidetittel'}
                descriptionId={'seo.ros-til-nav.description'}
                path={paths.tilbakemeldinger.rostilnav}
            />
            <Header
                title={formatMessage({
                    id: 'tilbakemeldinger.ros.form.tittel',
                })}
            />
            <GuidePanel poster>
                <FormattedMessage id={'tilbakemeldinger.ros.form.veileder'} />
            </GuidePanel>
            <Box background="surface-default" padding={{ xs: '4', md: '8' }}>
                {success ? (
                    <Takk />
                ) : (
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
                                        id: 'felter.hvemroses.tittel',
                                    })}
                                    error={error?.message}
                                    value={field.value ?? null}
                                >
                                    <Radio value={'NAV_KONTAKTSENTER'}>
                                        {formatMessage({
                                            id: 'felter.hvemroses.navkontaktsenter',
                                        })}
                                    </Radio>
                                    <Radio value={'NAV_DIGITALE_TJENESTER'}>
                                        {formatMessage({
                                            id: 'felter.hvemroses.digitaletjenester',
                                        })}
                                    </Radio>
                                    <Radio value={'NAV_KONTOR'}>
                                        {formatMessage({
                                            id: 'felter.hvemroses.navkontor',
                                        })}
                                    </Radio>
                                </RadioGroup>
                            )}
                            control={control}
                            name={'hvemRoses'}
                            rules={{
                                required: formatMessage({
                                    id: 'validering.hvemroses.pakrevd',
                                }),
                            }}
                        />

                        {watch().hvemRoses === 'NAV_KONTOR' && (
                            <Controller
                                render={({ field, fieldState: { error } }) => (
                                    <SelectEnhet
                                        {...field}
                                        label={
                                            'felter.hvemroses.navkontor.velg'
                                        }
                                        error={error?.message}
                                        submitted={isSubmitted}
                                        triggerValidation={trigger}
                                    />
                                )}
                                control={control}
                                name={'navKontor'}
                                rules={{
                                    required: formatMessage({
                                        id: 'validering.navkontor.pakrevd',
                                    }),
                                }}
                            />
                        )}

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
                )}
            </Box>
        </div>
    );
};
export default Ros;
