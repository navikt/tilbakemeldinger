import { useCallback, useEffect, useMemo, type ReactNode, type Ref } from 'react';
import { useStore } from '#client/providers/Provider.tsx';
import { useIntl } from 'react-intl';
import { captureException } from '#client/utils/apm.ts';
import { fetchEnheter } from '#client/clients/apiClient.ts';
import { errorContext } from '#client/types/errors.ts';
import { Button, ErrorMessage, InlineMessage, Loader, UNSAFE_Combobox as Combobox } from '@navikt/ds-react';
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

// Offices outside those kinds that can get feedback too, with the name to show
const ekstraEnheter: Record<string, string> = {
	'4100': 'Nav kontaktsenter', // "Nav Styringsenhet kontaktsenter" i norg2
};

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

	const options = useMemo(
		() =>
			enheter.status === 'RESULT'
				? enheter.data
						.filter((e) => (e.enhetNr !== '0000' && relevanteEnheter.has(e.type)) || ekstraEnheter[e.enhetNr])
						.map((e) => ({ value: e.enhetNr, label: ekstraEnheter[e.enhetNr] ?? e.navn }))
						.sort((a, b) => a.label.localeCompare(b.label, 'nb'))
				: [],
		[enheter]
	);

	let content: ReactNode;
	if (enheter.status === 'RESULT') {
		content = (
			<Combobox
				ref={ref}
				label={intl.formatMessage({ id: label })}
				description={intl.formatMessage({ id: 'felter.hvemroses.navkontor.skrivinn' })}
				options={options}
				selectedOptions={value ? [value] : []}
				onToggleSelected={(option, isSelected) =>
					onChange(isSelected ? options.find((o) => o.value === option) : undefined)
				}
				error={submitted ? error : undefined}
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
			{/* The combobox shows the error itself. Without one (loading, or the list failed), it goes here */}
			{submitted && error && enheter.status !== 'RESULT' && (
				<ErrorMessage className={`${cssPrefix}__feilmelding`}>{error}</ErrorMessage>
			)}
		</div>
	);
};

export default SelectEnhet;
