import React from "react";
import { IPDeleteResponse, IProduct } from "../interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { serverApi } from "../App";

interface IProductProps {
	product: IProduct;
}

const Product: React.FC<IProductProps> = ({ product }) => {
	const queryClient = useQueryClient();

	const { _id, title, productImage, productId, price } = product;

	const deleteProduct = useMutation({
		mutationFn: async (id: string) => {
			try {
				await toast.promise(
					axios.delete<IPDeleteResponse>(`${serverApi}/${id}`),
					{
						loading: "Deleting Product...",
						success: (result) => result.data?.message,
						error: (error) =>
							error.message || "Error Deleting Product!",
					}
				);
			} catch (err) {
				if (err instanceof Error) {
					toast.error(err.message || "Unknown Error!");
				}
				toast.error("Unknown Error!");
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["productsData"] });
		},
	});

	return (
		<section className="flex flex-col items-center justify-center gap-1 border px-3 py-2">
			<div title={title} className="space-y-2">
				<figure className="relative border p-1 aspect-square">
					<img src={productImage} alt={title} />
					<figcaption
						className="line-clamp-1 overflow-ellipsis"
						title={title}
					>
						{title}
					</figcaption>
					<span className="text-xs">{productId}</span>
					<span className="absolute top-1 right-1 text-transparent font-bold text-xl bg-clip-text bg-gradient-to-r from-red-600 to-lime-900 backdrop-filter">
						{price}
					</span>
				</figure>
			</div>
			<div className="w-full flex items-center flex-wrap justify-center gap-3 mt-2">
				<button
					className="border border-red-800 text-red-800 hover:bg-red-800 hover:text-white transition-all duration-500 font-semibold px-3 py-1"
					onClick={() => deleteProduct.mutateAsync(_id)}
				>
					Delete
				</button>
			</div>
		</section>
	);
};

export default Product;
