export const swSupport = () => ('serviceWorker' in navigator)
  && process.env.ENABLE_SW;

export default () => ('serviceWorker' in navigator) && ('SyncManager' in window)
  && process.env.ENABLE_SW;
