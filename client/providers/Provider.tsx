import { createContext, use, useMemo, useReducer, Reducer, Dispatch } from 'react';
import type { ReactNode } from 'react';
import { Action, Store } from './Store';

interface Props {
	reducer: Reducer<Store, Action>;
	initialState: Store;
	children: ReactNode;
}

// @ts-expect-error Store type is missing definition
export const StoreContext = createContext([{}, () => {}] as [Store, Dispatch<Action>]);
export const StoreProvider = ({ reducer, initialState, children }: Props) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const store = useMemo((): [Store, Dispatch<Action>] => [state, dispatch], [state]);

	return <StoreContext value={store}>{children}</StoreContext>;
};
export const useStore = () => use(StoreContext);
