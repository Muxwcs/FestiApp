"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh
        gcTime: 10 * 60 * 1000,   // 10 minutes - cache garbage collection
        retry: (failureCount, error: Error) => {
          // Don't retry on 401/403 errors
          // Check if error message contains status codes (since fetch errors include status in message)
          const errorMessage = error.message.toLowerCase()
          if (errorMessage.includes('401') || errorMessage.includes('403')) {
            return false
          }
          return failureCount < 2 // Retry max 2 times
        },
        refetchOnWindowFocus: false, // Don't refetch when window gets focus
        refetchOnReconnect: false,   // Don't refetch on reconnect
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Dev tools - only in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  )
}