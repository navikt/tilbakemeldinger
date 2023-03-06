declare global {
  interface Window {
    // eslint-disable-next-line
    hj: any;
  }
}
export const triggerHotjar = (id: string) => {
  if (window.hj) {
    window.hj("trigger", id);
  }
};
