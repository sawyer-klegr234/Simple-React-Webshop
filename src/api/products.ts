// These would all be calling a "real api" if a real one was being created, use ProductService for now instead.
// If it was a real api I would also implement better error handling of course, but the fake api is basically a
// glorified function call, so it feels pretty pointless to do so
import { ProductService } from "../services/ProductService";

export const useProductsApi = () => {
    const getProducts = async () => {
        return await ProductService.getProducts();
    }

    return {
        getProducts
    };
};