const w = window as any;

export const triggerHotjar = (id: string) => {
  if (w.hj) {
    w.hj("trigger", id);
  }
};
