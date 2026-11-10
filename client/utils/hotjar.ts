declare global {
	interface Window {
		hj?: (command: string, id: string) => void;
	}
}
export const triggerHotjar = (id: string) => {
	if (window.hj) {
		window.hj('trigger', id);
	}
};
