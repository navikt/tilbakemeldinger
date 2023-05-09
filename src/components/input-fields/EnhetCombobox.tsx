import React, { ForwardedRef, useState } from 'react';
import { useCombobox } from 'downshift';
import { useIntl } from 'react-intl';
import { Expand } from '@navikt/ds-icons';

const cssPrefix = 'enhetCombo';

interface Option {
    value: string;
    label: string;
}

interface Props {
    data: Option[];
    harFeil: boolean;
    label: React.ReactElement;
    onChange: (value?: Option) => void;
    value?: Option;
}

const Combobox = (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const { data, harFeil, label, onChange } = props;
    const [inputItems, setInputItems] = useState(data);
    const intl = useIntl();

    const {
        isOpen,
        getToggleButtonProps,
        getLabelProps,
        getMenuProps,
        getInputProps,
        highlightedIndex,
        getItemProps,
    } = useCombobox({
        items: inputItems,
        itemToString: (item) => (item ? item.label : ''),
        onInputValueChange: ({ inputValue }) => {
            if (inputValue && inputValue !== '') {
                setInputItems(
                    data.filter((item) =>
                        item.label
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())
                    )
                );
            } else {
                setInputItems(data);
                onChange && onChange(undefined);
            }
        },
        onSelectedItemChange: (value) => {
            value.selectedItem && onChange(value.selectedItem);
        },
        stateReducer: (state, actionAndChanges) => {
            const { type, changes } = actionAndChanges;
            switch (type) {
                // set currently selected item if new item not selected on input blur
                case useCombobox.stateChangeTypes.InputBlur:
                    return {
                        ...changes,
                        inputValue: changes.selectedItem
                            ? changes.selectedItem.label
                            : state.selectedItem?.label || '',
                    };
                default:
                    return changes;
            }
        },
    });

    return (
        <>
            <label {...getLabelProps()}>{label}</label>
            <div className={`${cssPrefix}__inputWrapper`}>
                <input
                    ref={ref}
                    {...getInputProps()}
                    className={`${cssPrefix}__input navds-select__input${
                        harFeil ? ` ${cssPrefix}__hasError` : ''
                    }`}
                />
                <button
                    type="button"
                    {...getToggleButtonProps({ tabIndex: 0 })}
                    className={`${cssPrefix}__button knapp knapp--kompakt`}
                    aria-label={intl.formatMessage({
                        id: 'felter.combobox.knapp.beskrivelse',
                    })}
                >
                    <Expand aria-hidden={true} />
                </button>
            </div>
            <ul
                {...getMenuProps()}
                className={`${cssPrefix}__menu ${
                    isOpen ? `${cssPrefix}__menu__open` : ''
                }`}
            >
                {isOpen &&
                    inputItems.map((item, index) => (
                        <li
                            className={`menuItem ${
                                highlightedIndex === index
                                    ? 'menuItem__highlighted'
                                    : ''
                            }`}
                            key={`${item.value}${index}`}
                            {...getItemProps({ item, index })}
                        >
                            {item.label}
                        </li>
                    ))}
            </ul>
        </>
    );
};

export default React.forwardRef(Combobox);
