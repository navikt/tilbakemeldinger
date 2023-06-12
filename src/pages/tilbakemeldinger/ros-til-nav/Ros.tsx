import React, { useState } from 'react';
import VeilederIcon from 'assets/icons/Veileder.svg';
import InputMelding from 'components/input-fields/InputMelding';
import { postRosTilNav } from 'clients/apiClient';
import { ErrorResponse } from 'types/errors';
import Header from 'components/header/Header';
import { paths, vars } from 'Config';
import Box from 'components/box/Box';
import { FormattedMessage, useIntl } from 'react-intl';
import Takk from 'components/takk/Takk';
import { triggerHotjar } from 'utils/hotjar';
import SelectEnhet from 'components/input-fields/SelectEnhet';
import { MetaTags } from '../../../components/metatags/MetaTags';
import { Alert, Button, GuidePanel, Radio, RadioGroup } from '@navikt/ds-react';
import { PersonvernInfo } from 'components/personvernInfo/PersonvernInfo';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { resolveErrorCode } from '../../../utils/errorCodes';

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

    const [loading, settLoading] = useState(false);
    const [success, settSuccess] = useState(false);
    const [error, settError] = useState<ErrorResponse>();
    const {formatMessage} = useIntl();

    const send = (values: FieldValues) => {
        const { melding, hvemRoses, navKontor } = values;

        const outbound = {
            melding,
            hvemRoses,
            ...(hvemRoses === 'NAV_KONTOR' && {
                navKontor: navKontor ? navKontor.label : undefined,
            }),
        } as OutboundRosTilNav;

        settLoading(true);
        postRosTilNav(outbound)
            .then(() => {
                settSuccess(true);
                triggerHotjar('rosnav');
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
                titleId={'tilbakemeldinger.ros.tittel'}
                descriptionId={'seo.rostilnav.description'}
                path={paths.tilbakemeldinger.rostilnav}
            />
            <Header
                title={formatMessage({
                    id: 'tilbakemeldinger.ros.form.tittel',
                })}
            />
            <div className={'tb__veileder'}>
                <GuidePanel
                    illustration={<img src={VeilederIcon} alt="" />}
                    poster={true}
                >
                    <div className={'tb__veileder-container'}>
                        <FormattedMessage
                            id={'tilbakemeldinger.ros.form.veileder'}
                        />
                    </div>
                </GuidePanel>
            </div>
            <Box>
                {success ? (
                    <Takk />
                ) : (
                    <form onSubmit={handleSubmit(send)}>
                        <div className={'skjema__content'}>
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
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
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

                            {error && (
                                <Alert
                                    variant={'error'}
                                    className={'felter__melding-advarsel'}
                                >
                                    <FormattedMessage
                                        id={resolveErrorCode(error.errorCode)}
                                    />
                                </Alert>
                            )}
                            <div className="tb__knapper">
                                <div className="tb__knapp">
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
                            </div>
                        </div>
                    </form>
                )}
            </Box>
        </div>
    );
};
export default Ros;
