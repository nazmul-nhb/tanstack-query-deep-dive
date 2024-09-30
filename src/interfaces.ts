export interface IProduct {
	_id: string;
	title: string;
	productImage: string;
	price: number;
	productId: string;
	createdAt: Date;
	__v: number;
}

export interface IPQueryResponse {
	success: boolean;
	totalProducts: number;
	products: IProduct[];
}
