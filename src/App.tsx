import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { IPQueryResponse } from "./interfaces";
import Product from "./components/Product";

const App = () => {
	const { data: products = [], isLoading } = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const { data } = await axios.get(
				"https://rtk-product-management-server.vercel.app/products"
			);
			return (data as IPQueryResponse).products;
		},
	});

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center animate-bounce">
				Loading...
			</div>
		);
	}

	return (
		<main className="min-h-screen grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 my-8 px-8 mx-auto">
			{products?.map((product) => (
				<div key={product?._id}>
					<Product product={product} />
				</div>
			))}
		</main>
	);
};

export default App;
