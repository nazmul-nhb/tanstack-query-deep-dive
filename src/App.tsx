import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { IPQueryResponse } from "./interfaces";
import Product from "./components/Product";
import CreateProduct from "./components/CreateProduct";

const App = () => {
	const { data: productsData = {}, isLoading } = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const { data } = await axios.get<IPQueryResponse>(
				"https://rtk-product-management-server.vercel.app/products"
			);
			return data;
		},
	});

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center animate-bounce">
				Loading...
			</div>
		);
	}

	const { products, totalProducts } = productsData as IPQueryResponse;

	return (
		<>
			<CreateProduct />
			<main className="min-h-screen grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 my-8 px-8 mx-auto">
				{products?.map((product) => (
					<div key={product?._id}>
						<Product product={product} />
					</div>
				))}
			</main>

			<div className="fixed top-4 left-1 text-red-800 font-bold border border-red-700 p-1 rounded-full">
				{totalProducts}
			</div>
		</>
	);
};

export default App;
