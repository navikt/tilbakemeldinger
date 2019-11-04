const { hj } = window as any;

export const triggerHotjar = (id: string) => {
  if (hj) {
    hj("trigger", id);
  }
};
