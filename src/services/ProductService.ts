import { Product } from "../api/models/product";
import { FormData } from "../api/models/formData";

const LOCAL_STORAGE_ORDERS_KEY = "orders";

// I am assuming that sku is always unique, otherwise I would add a unique ID as well
const products: Product[] = [
    { 
        sku: "rtx-4090",
        name: "RTX 4090",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in orci in sapien blandit laoreet vitae eget nisi. Aliquam congue eu dui vitae accumsan.",
        price: 3899.99
    },
    { 
        sku: "rtx-4070ti",
        name: "RTX 4070Ti",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in orci in sapien blandit laoreet vitae eget nisi. Aliquam congue eu dui vitae accumsan.",
        price: 1499
    },
    { 
        sku: "rtx-4070",
        name: "RTX 4070",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in orci in sapien blandit laoreet vitae eget nisi. Aliquam congue eu dui vitae accumsan.",
        price: 1048
    },
    { 
        sku: "rtx-4060ti",
        name: "RTX 4060Ti",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in orci in sapien blandit laoreet vitae eget nisi. Aliquam congue eu dui vitae accumsan.",
        price: 719
    },
    { 
        sku: "rtx-4060",
        name: "RTX 4060",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in orci in sapien blandit laoreet vitae eget nisi. Aliquam congue eu dui vitae accumsan.",
        price: 549
    },
    { 
        sku: "rtx-3090",
        name: "RTX 3090",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in orci in sapien blandit laoreet vitae eget nisi. Aliquam congue eu dui vitae accumsan.",
        price: 1145.06
    },
    { 
        sku: "rtx-3070ti",
        name: "RTX 3070Ti",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in orci in sapien blandit laoreet vitae eget nisi. Aliquam congue eu dui vitae accumsan.",
        price: 959
    },
    { 
        sku: "rtx-3070",
        name: "RTX 3070",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in orci in sapien blandit laoreet vitae eget nisi. Aliquam congue eu dui vitae accumsan.",
        price: 700
    },
    { 
        sku: "rtx-3060ti",
        name: "RTX 3060Ti",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in orci in sapien blandit laoreet vitae eget nisi. Aliquam congue eu dui vitae accumsan.",
        price: 649.99
    },
    { 
        sku: "rtx-3060",
        name: "RTX 3060",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in orci in sapien blandit laoreet vitae eget nisi. Aliquam congue eu dui vitae accumsan.",
        price: 560
    },
    
];

const getRandomTimeoutDuration = () => {
    return Math.floor(Math.random() * 2500) + 500;
}

export class ProductService {
    static async getProducts(): Promise<Product[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(products);
            }, getRandomTimeoutDuration());
        });
    }

    static async submitOrder(order: FormData): Promise<string> {
        // Save order to local storage as we are not using a database
        const storedOrders = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);

        let orders = storedOrders ? JSON.parse(storedOrders) : [];
        orders.push(order);
        localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Order submitted!");
            }, getRandomTimeoutDuration());
        });
    }
}