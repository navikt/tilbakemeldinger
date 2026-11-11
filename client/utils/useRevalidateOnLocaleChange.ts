import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import type { UseFormReturn, FieldValues } from 'react-hook-form';

// react-hook-form keeps the validation messages it produced, so after a language switch the
// errors already showing would stay in the old language. Validating again rebuilds them.
export const useRevalidateOnLocaleChange = <T extends FieldValues>({
	trigger,
	formState: { isSubmitted },
}: UseFormReturn<T>) => {
	const { locale } = useIntl();

	useEffect(() => {
		if (isSubmitted) void trigger();
		// Only a language switch should revalidate
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locale]);
};
