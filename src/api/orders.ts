// These would all be calling a "real api" if a real one was being created, use ProductService for now instead.
// If it was a real api I would also implement better error handling of course, but the fake api is basically a
// glorified function call, so it feels pretty pointless to do so
import { ApiService } from "../services/ApiService";
import { SubmitOrderFormData } from "./models/submitOrderFormData";

export const useOrdersApi = () => {
    const submitOrder = async (order: SubmitOrderFormData) => {
        return await ApiService.submitOrder(order);
    }

    return {
        submitOrder
    };
};