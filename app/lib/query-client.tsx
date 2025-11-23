import {
  QueryClient,
  QueryClientProvider as QueryClientProviderBase,
} from "@tanstack/react-query";


// React Query client
export const client = new QueryClient();

// React Query context provider that wraps our app
export function QueryClientProvider(props: { children: React.ReactNode }) {
  return (
    <QueryClientProviderBase client={client}>
      {props.children}
    </QueryClientProviderBase>
  );
}