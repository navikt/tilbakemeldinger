declare global {
  interface Window {
    hj: any;
  }
}
export const triggerHotjar = (id: string) => {
  if (window.hj) {
    window.hj("trigger", id);
  }
};
