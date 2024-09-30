import "./index.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { staleTime: 1000 * 60 * 3 },
	},
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
			<ReactQueryDevtools />
			<Toaster
				toastOptions={{
					loading: {
						iconTheme: {
							primary: "orange",
							secondary: "teal",
						},
					},
					style: {
						textAlign: "center",
					},
				}}
			/>
		</QueryClientProvider>
	</StrictMode>
);
