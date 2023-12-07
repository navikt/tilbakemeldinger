import React, { ForwardedRef, useEffect } from 'react';
import { useStore } from 'providers/Provider';
import { FormattedMessage, useIntl } from 'react-intl';
import { fetchEnheter } from 'clients/apiClient';
import { Enhet } from 'types/enheter';
import { HTTPError } from 'types/errors';
import Combobox from './EnhetCombobox';
import { ErrorMessage, Loader } from '@navikt/ds-react';
import classNames from "classnames";

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
}

const SelectEnhet = (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const { submitted, error, label, onChange, value, triggerValidation } =
        props;

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
        'KO',
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
            });
    }, []);

    const comboBoxLabel = () => (
        <div className={classNames(`${cssPrefix}__label`, "navds-label")}>
            <FormattedMessage id={label} />
            <span className={`${cssPrefix}__hjelpetekst`}>
                {`- ${intl.formatMessage({
                    id: 'felter.hvemroses.navkontor.skrivinn',
                })}`}
            </span>
        </div>
    );

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
                        .filter(
                            (e) =>
                                e.enhetNr !== '0000' &&
                                relevanteEnheter.includes(e.type)
                        )
                        .sort((a, b) => (a.navn < b.navn ? -1 : 1))
                        .map((enhet) => ({
                            value: enhet.enhetNr,
                            label: `${enhet.navn} - ${enhet.enhetNr}`,
                        }))}
                />
            ) : (
                <div className={`${cssPrefix}__spinner`}>
                    <Loader size={'small'} />
                </div>
            )}
            {submitted && error && (
                <ErrorMessage className={`${cssPrefix}__feilmelding`}>
                    {intl.formatMessage({ id: error })}
                </ErrorMessage>
            )}
        </div>
    );
};

export default React.forwardRef(SelectEnhet);
