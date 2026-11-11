import { useCallback, useEffect, type ReactNode, type Ref } from 'react';
import { useStore } from '#client/providers/Provider.tsx';
import { FormattedMessage, useIntl } from 'react-intl';
import { captureException } from '@nais/apm';
import { fetchEnheter } from '#client/clients/apiClient.ts';
import { errorContext } from '#client/types/errors.ts';
import Combobox from './EnhetCombobox';
import { Button, ErrorMessage, InlineMessage, Loader } from '@navikt/ds-react';
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

// The kinds of office that can get feedback
const relevanteEnheter = new Set([
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
]);

const SelectEnhet = (props: Props) => {
	const { submitted, error, label, onChange, value, triggerValidation, ref } = props;

	// Trigger validering etter mount dersom form er submitted
	useEffect(() => {
		if (submitted) {
			triggerValidation();
		}
	}, [triggerValidation, submitted]);

	const [{ enheter }, dispatch] = useStore();
	const intl = useIntl();

	const load = useCallback(() => {
		fetchEnheter()
			.then((data) => dispatch({ type: 'SETT_ENHETER', payload: { status: 'RESULT', data } }))
			.catch((e: unknown) => {
				dispatch({ type: 'SETT_ENHETER', payload: { status: 'ERROR' } });
				captureException(e, {
					fingerprint: 'select-enhet.fetch-enheter',
					context: {
						component: 'SelectEnhet',
						action: 'fetchEnheter',
						...errorContext(e),
					},
				});
			});
	}, [dispatch]);

	useEffect(load, [load]);

	const retry = () => {
		dispatch({ type: 'SETT_ENHETER', payload: { status: 'LOADING' } });
		load();
	};

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

	let content: ReactNode;
	if (enheter.status === 'RESULT') {
		content = (
			<Combobox
				ref={ref}
				harFeil={!!(submitted && error)}
				label={comboBoxLabel()}
				onChange={onChange}
				value={value}
				data={enheter.data
					.filter((e) => (e.enhetNr !== '0000' && relevanteEnheter.has(e.type)) || ekstraEnheter[e.enhetNr])
					.map((e) => ({
						value: e.enhetNr,
						label: ekstraEnheter[e.enhetNr] ?? e.navn,
					}))
					.sort((a, b) => a.label.localeCompare(b.label, 'nb'))}
			/>
		);
	} else if (enheter.status === 'ERROR') {
		content = (
			<div className={`${cssPrefix}__lastefeil`}>
				<InlineMessage status="error">{intl.formatMessage({ id: 'felter.navkontor.lastefeil' })}</InlineMessage>
				<Button type="button" variant="secondary" size="small" onClick={retry}>
					{intl.formatMessage({ id: 'felter.navkontor.provigjen' })}
				</Button>
			</div>
		);
	} else {
		content = (
			<div className={`${cssPrefix}__spinner`}>
				<Loader size={'small'} />
			</div>
		);
	}

	return (
		<div className={`${cssPrefix}__navkontor`}>
			{content}
			{submitted && error && (
				<ErrorMessage className={`${cssPrefix}__feilmelding`}>{intl.formatMessage({ id: error })}</ErrorMessage>
			)}
		</div>
	);
};

export default SelectEnhet;
