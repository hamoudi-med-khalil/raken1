import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`
const USER_TOKEN = `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`


// Fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk("AdminOrder/fetchAllOrders", async (_, {rejectWithValue} ) => {
    try {
        const response = await axios.get(`${API_URL}/api/admin/orders`,
            {
                headers: {
                    Authorization: USER_TOKEN
                }
            }
        )
        return response.data
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data)   
    }
})

// update order delivery status (admin only)
export const updateOrderStatus = createAsyncThunk("AdminOrder/updateOrderStatus", async (id, status , {rejectWithValue} ) => {
    try {
        const response = await axios.put(`${API_URL}/api/admin/orders/${id}`, {status},
            {
                headers: {
                    Authorization: USER_TOKEN
                }
            }
        )
        return response.data
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data)   
    }
})

// Delete order (admin only)
export const deleteOrder = createAsyncThunk("AdminOrder/deleteOrder", async (id , {rejectWithValue} ) => {
    try {
        const response = await axios.put(`${API_URL}/api/admin/orders/${id}`,
            {
                headers: {
                    Authorization: USER_TOKEN
                }
            }
        )
       return id
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data)   
    }
})

const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState:{
        orders : [],
        totalOrders : 0,
        totalSales : 0,
        loading : false,
        error : null
    },
    reducers:{},
    extraReducers : (builder) => {
        builder
        .addCase(fetchAllOrders.pending, (state) =>{
            state.loading = true;
            state.error = null
        })
        .addCase(fetchAllOrders.fulfilled, (state, action) =>{
            state.loading = true;
            state.orders = action.payload;
            state.totalOrders = action.payload.length;

            const totalSales = action.payload.reduce((acc, order) =>{
                return acc + order.totalPrice
            },0)
            state.totalSales = totalSales
        })
        .addCase(fetchAllOrders.rejected, (state, action) =>{
            state.loading = true;
            state.error = action.error.message
        })
        .addCase(updateOrderStatus.fulfilled, (state, action) => {
            const updatedOrder = action.payload
            const index = state.orders.findIndex((order) => order._id === updatedOrder._id)
            if(index !== -1){
                state.orders[index] = updatedOrder;
            }
        })
        .addCase(deleteOrder.fulfilled, (state, action) => {
            state.orders = state.orders.filter((order)=>{
                order._id != action.payload
            })
        })
    }
})

export default adminOrderSlice.reducer
