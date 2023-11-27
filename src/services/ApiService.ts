import { Product } from "../api/models/product";
import { Order } from "../api/models/order";

const LOCAL_STORAGE_ORDERS_KEY = "orders";
const LOCAL_STORAGE_PRODUCTS_KEY = "products";

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


// If there are no stored products, save the "default" products
const storedProducts = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
const existingProducts = storedProducts ? JSON.parse(storedProducts) : [];
if (existingProducts.length === 0) {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
}

const getRandomTimeoutDuration = () => {
    return Math.floor(Math.random() * 2500) + 500;
}

export class ApiService {
    static getStoredOrders = () => {
        const storedOrders = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
        return storedOrders ? JSON.parse(storedOrders) : [];
    }

    static async submitOrder(order: Order): Promise<string> {
        // Save order to local storage as we are not using a database
        let orders = this.getStoredOrders();
        orders.push(order);
        localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Order submitted!");
            }, getRandomTimeoutDuration());
        });
    }

    static async getOrders(): Promise<Order[]> {
        let orders = this.getStoredOrders();

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(orders);
            }, getRandomTimeoutDuration());
        });
    }

    static getStoredProducts = () => {
        const storedProducts = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
        return storedProducts ? JSON.parse(storedProducts) : [];
    }

    static async getProducts(): Promise<Product[]> {
        const parsedProducts = this.getStoredProducts();

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(parsedProducts);
            }, getRandomTimeoutDuration());
        });
    }

    static async getProductBySku(sku: string): Promise<Product> {
        // Save order to local storage as we are not using a database
        const parsedProducts = this.getStoredProducts();
        const product = parsedProducts.find(p => p.sku === sku);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(product);
            }, getRandomTimeoutDuration());
        });
    }
    
    static async updateProduct(sku: string, product: Product): Promise<Product> {
        // Save order to local storage as we are not using a database
        const parsedProducts = this.getStoredProducts();

        const indexOfItemToUpdate = parsedProducts.findIndex(p => p.sku === sku);
        if (indexOfItemToUpdate !== -1) {
            parsedProducts[indexOfItemToUpdate] = product;
        }

        localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(parsedProducts));

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(product);
            }, getRandomTimeoutDuration());
        });
    }
}