import { useEffect, type Ref } from 'react';
import { useStore } from '#client/providers/Provider.tsx';
import { FormattedMessage, useIntl } from 'react-intl';
import { captureException } from '@nais/apm';
import { fetchEnheter } from '#client/clients/apiClient.ts';
import { Enhet } from '#client/types/enheter.ts';
import { HTTPError } from '#client/types/errors.ts';
import Combobox from './EnhetCombobox';
import { ErrorMessage, Loader } from '@navikt/ds-react';
import './SelectEnhet.scss';

const cssPrefix = 'selectEnhet';

interface Option {
	value: string;
	label: string;
}

interface Props {
	onChange: (value?: Option) => void;
	triggerValidation: () => void;
	error?: string;
	label: string;
	submitted: boolean;
	value?: Option;
	ref?: Ref<HTMLInputElement>;
}

const SelectEnhet = (props: Props) => {
	const { submitted, error, label, onChange, value, triggerValidation, ref } = props;

	// Trigger validering etter mount dersom form er submitted
	useEffect(() => {
		submitted && triggerValidation();
	}, [triggerValidation, submitted]);

	const [{ enheter }, dispatch] = useStore();
	const intl = useIntl();

	const relevanteEnheter = [
		'ALS',
		'ARK',
		'FPY',
		'FYLKE',
		'HMS',
		'INTRO',
		'KLAGE',
		'KONTROLL',
		'LOKAL',
		'OKONOMI',
		'TILTAK',
		'YTA',
		'OPPFUTLAND',
	];

	useEffect(() => {
		fetchEnheter()
			.then((enheter: Enhet[]) => {
				dispatch({ type: 'SETT_ENHETER_RESULT', payload: enheter });
			})
			.catch((error: HTTPError) => {
				dispatch({ type: 'SETT_ENHETER_ERROR', payload: error });
				captureException(error, {
					fingerprint: 'select-enhet.fetch-enheter',
					context: {
						component: 'SelectEnhet',
						action: 'fetchEnheter',
					},
				});
			});
	}, []);

	const comboBoxLabel = () => (
		<div className={`${cssPrefix}__label aksel-label`}>
			<FormattedMessage id={label} />
			<span className={`${cssPrefix}__hjelpetekst`}>
				{`- ${intl.formatMessage({
					id: 'felter.hvemroses.navkontor.skrivinn',
				})}`}
			</span>
		</div>
	);

	const ekstraEnheter: Record<string, string> = {
		'4100': 'Nav kontaktsenter', // "Nav Styringsenhet kontaktsenter" i norg2
	};

	return (
		<div className={`${cssPrefix}__navkontor`}>
			{enheter.status === 'RESULT' ? (
				<Combobox
					ref={ref}
					harFeil={!!(submitted && error)}
					label={comboBoxLabel()}
					onChange={onChange}
					value={value}
					data={enheter.data
						.filter((e) => (e.enhetNr !== '0000' && relevanteEnheter.includes(e.type)) || ekstraEnheter[e.enhetNr])
						.map((e) => ({
							value: e.enhetNr,
							label: ekstraEnheter[e.enhetNr] ?? e.navn,
						}))
						.sort((a, b) => a.label.localeCompare(b.label, 'nb'))}
				/>
			) : (
				<div className={`${cssPrefix}__spinner`}>
					<Loader size={'small'} />
				</div>
			)}
			{submitted && error && (
				<ErrorMessage className={`${cssPrefix}__feilmelding`}>{intl.formatMessage({ id: error })}</ErrorMessage>
			)}
		</div>
	);
};

export default SelectEnhet;
