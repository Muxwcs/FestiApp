// export const logger = {
//   info: (message: string, data?: unknown) => {
//     console.log(`[INFO] ${message}`, data || "")
//   },
//   error: (message: string, error?: unknown) => {
//     console.error(`[ERROR] ${message}`, error || "")
//   },
//   warn: (message: string, data?: unknown) => {
//     console.warn(`[WARN] ${message}`, data || "")
//   },
// }

const timestamp = () => new Date().toISOString()

export const logger = {
  info: (message: string, data?: unknown) => {
    console.log(`[INFO] ${timestamp()} ${message}`, data ?? "")
  },
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${timestamp()} ${message}`, error ?? "")
  },
  warn: (message: string, data?: unknown) => {
    console.warn(`[WARN] ${timestamp()} ${message}`, data ?? "")
  },
}
