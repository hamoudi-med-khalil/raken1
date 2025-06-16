import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`
const USER_TOKEN = `Bearer ${JSON.parse(localStorage.getItem("userToken")) }`

// async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk("adminProduct/fetchAllProducts", async () => {
    const response = await axios.get(`${API_URL}/api/admin/products`,
        {
            headers: {
                Authorization: USER_TOKEN
            }
        }
    )
    return response.data
})

// Async function to create a new product
export const addProduct = createAsyncThunk("adminProduct/addProduct", async (productData) => {
    const response = await axios.post(`${API_URL}/api/admin/products`,
        productData,
        {
            headers: {
                Authorization: USER_TOKEN
            }
        }
    )
    return response.data
})

// Async function to update a product
export const updateProduct = createAsyncThunk("adminProduct/updateProduct", async ({ id, productData }) => {
    const response = await axios.put(`${API_URL}/api/admin/products/${id}`, productData,
        {
            headers: {
                Authorization: USER_TOKEN
            }
        }
    )
    return response.data
})

// Async function to delete a product
export const deleteProduct = createAsyncThunk("adminProduct/deleteProduct", async (id) => {
    const response = await axios.delete(`${API_URL}/api/products/${id}`,
        {
            headers: {
                Authorization: USER_TOKEN
            }
        }
    )
    return id
})

const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {

                state.loading = false;
                state.products = action.payload
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload)
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const updatedProduct = action.payload
                const index = state.products.findIndex((product) => [
                    product._id === updatedProduct._id
                ])
                if (index !== -1) {
                    state.products[index] = updatedProduct
                }
                state.products[index] = updatedProduct
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter((product) => product._id !== action.payload)
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message
            })
    }

})

export default adminProductSlice.reducer