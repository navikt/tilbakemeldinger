import React, { useState } from 'react';
import { captureException } from '@nais/apm';
import { postRosTilNav } from '#client/clients/apiClient.ts';
import { ErrorResponse } from '#client/types/errors.ts';
import Header from '#client/components/header/Header.tsx';
import { vars } from '#client/Config.ts';
import { paths } from '#shared/paths.ts';
import { FormattedMessage, useIntl } from 'react-intl';
import Takk from '#client/components/takk/Takk.tsx';
import { triggerHotjar } from '#client/utils/hotjar.ts';
import SelectEnhet from '#client/components/input-fields/SelectEnhet.tsx';
import { MetaTags } from '#client/components/metatags/MetaTags.tsx';
import { Alert, Box, Button, GuidePanel, Radio, RadioGroup, Textarea } from '@navikt/ds-react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { RosTilNav } from '#shared/types/RosTilNav.ts';
import { resolveErrorCode } from '#client/utils/errorCodes.ts';
import appStyle from '#client/App.module.scss';

type HVEM_ROSES = 'NAV_KONTAKTSENTER' | 'NAV_DIGITALE_TJENESTER' | 'NAV_KONTOR';

interface FormFields {
	melding: string;
	hvemRoses: HVEM_ROSES;
	navKontor?: {
		label: string;
		value: string;
	};
}

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
		} as RosTilNav;

		setLoading(true);
		postRosTilNav(outbound)
			.then(() => {
				setSuccess(true);
				triggerHotjar('rosnav');
			})
			.catch((error: ErrorResponse) => {
				setError(error);
				captureException(error, {
					fingerprint: 'ros.post-ros-til-nav',
					context: {
						component: 'Ros',
						action: 'postRosTilNav',
						errorCode: error?.errorCode,
					},
				});
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
			<GuidePanel poster className={appStyle.veileder}>
				<FormattedMessage id={'tilbakemeldinger.ros.form.veileder'} />
			</GuidePanel>
			<Box background="default" padding={{ xs: 'space-16', md: 'space-32' }}>
				{success ? (
					<Takk />
				) : (
					<form className={appStyle.skjema} onSubmit={handleSubmit(send)}>
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
										label={'felter.hvemroses.navkontor.velg'}
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

						<div className={appStyle.skjemaInline}>
							<Textarea
								aria-required
								description={<FormattedMessage id={'felter.melding.beskrivelse'} />}
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
						</div>

						{error && (
							<Alert variant={'error'}>
								<FormattedMessage id={resolveErrorCode(error.errorCode)} />
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
