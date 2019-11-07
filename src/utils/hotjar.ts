export const triggerHotjar = (id: string) => {
  // @ts-ignore
  if (window.hj) {
    // @ts-ignore
    window.hj("trigger", id);
  }
};
