import { createContext, use, useReducer, Reducer, Dispatch } from 'react';
import type { ReactNode } from 'react';
import { Action, Store } from './Store';

interface Props {
	reducer: Reducer<Store, Action>;
	initialState: Store;
	children: ReactNode;
}

// @ts-expect-error Store type is missing definition
export const StoreContext = createContext([{}, () => {}] as [Store, Dispatch<Action>]);
export const StoreProvider = ({ reducer, initialState, children }: Props) => (
	<StoreContext value={useReducer(reducer, initialState)}>{children}</StoreContext>
);
export const useStore = () => use(StoreContext);
