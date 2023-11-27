const { describe, expect, test } = require('@jest/globals');

const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key) => {
      delete store[key];
    },
    // Required to set this as a local storage mock, but not required by ApiService, so set to undefined
    length: undefined,
    key: undefined
  };
})();

global.localStorage = localStorageMock;

// Import ApiService after mocking local storage as it is dependant on local storage
const ApiService = require("./ApiService");

const mockStoredProducts = [
  {
    sku: "sku01",
    name: "Mock Product 1",
    price: 30.2,
    description: "Mock description for product 1",
  },
  {
    sku: "sku02",
    name: "Mock Product 2",
    price: 140,
    description: "Mock description for product 2",
  },
];

// Set items in local storage for the ApiService to return. Obviously this would be done through a
// api if we had a real one.
localStorageMock.setItem(ApiService.LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(mockStoredProducts));

// Test that ApiService getProducts will return the correct stored products (currently stored in the
// local storage mock)
describe("ApiService - getProducts", () => {
  // Test all the product functions/edpoints
  test("should return the stored products", async () => {
    const result = await ApiService.ApiService.getProducts();
    expect(result).toEqual(mockStoredProducts);
  });

  test("should return the correct product by sku", async () => {
    const result = await ApiService.ApiService.getProductBySku(mockStoredProducts[1].sku);
    expect(result).toEqual(mockStoredProducts[1]);
  });

  test("should update the correct product by sku", async () => {
    const updatedProduct = {
      ...mockStoredProducts[0],
       name: "A new product name",
       sku: "a-new-sku"
    };

    const updateResult = await ApiService.ApiService.updateProduct(mockStoredProducts[0].sku, updatedProduct);
    const getResult = await ApiService.ApiService.getProductBySku(updatedProduct.sku);

    expect(updateResult).toEqual(updatedProduct);
    expect(getResult).toEqual(updatedProduct);
  });
});

// Unit Test notes:
// I have gone with auth0 so that I can demonstrate authentication properly, this means there is no authentication api I can directly test.
// These are the steps I would take to write tests for a real api to ensure authentication is working as intended:
// - For each endpoint, test that an unauthenticated user cannot access the endpoint and receives a 403 response
// - Hit the login endpoint, ensuring users can only login with the correct combination of username/email and password, and that they get assigned the correct roles.
// - Hit the logout endpoint, ensure that the user no longer has access to the APIs
// - Authenticate as a customer
//    - Hit the customer endpoints, ensure that the correct data is received and updated when fetching products and placing orders
//    - Attempt to hit the admin endpoints, ensure that the customer receives a 403 and cannot access the data
// - Authenticate as an admin
//    - Hit the customer endpoints and ensure the correct behaviour (would depend on specifications, in this case admins cannot access the customer pages like the cart)
//    - Hit the admin endpoints, ensure that the correct data is received and updated for each endpoint
