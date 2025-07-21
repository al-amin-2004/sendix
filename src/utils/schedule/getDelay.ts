export const getDelay = (targetTime: Date | string | undefined): number => {
  if (!targetTime) return 0; 
  const now = new Date();
  const delay = new Date(targetTime).getTime() - now.getTime();
  return delay > 0 ? delay : 0;
};
