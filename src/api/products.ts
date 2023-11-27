// These would all be calling a "real api" if a real one was being created, use ProductService for now instead.
// If it was a real api I would also implement better error handling of course, but the fake api is basically a
// glorified function call, so it feels pretty pointless to do so
import { ApiService } from "../services/ApiService";
import { Product } from "./models/product";

export const useProductsApi = () => {
    const getProducts = async () => {
        return await ApiService.getProducts();
    }

    const getProductBySku = async (sku: string) => {
        return await ApiService.getProductBySku(sku);
    }

    const updateProduct = async (sku: string, product: Product) => {
        return await ApiService.updateProduct(sku, product);
    }

    return {
        getProducts,
        getProductBySku,
        updateProduct
    };
};