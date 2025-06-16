import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserOrders = createAsyncThunk("orders/fetchUserOrders",
    async (__dirname, { rejectWithValue }) => {

        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
                {
                    headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`,
                    }
                }

            )  
            
            return response.data
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data)
        }
    }
)

// Async thunc fetch orders details by id

export const fetchOrderById = createAsyncThunk("orders/fetchsingleorder", async(orderId ,{rejectWithValue})=>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
           {
             headers : {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`,
            }}
        )
        return response.data
    } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data)        
    }
})

const orderSlice = createSlice({
    name: "order",
    initialState :{
        orders : [],
        totalOrders : 0,
        orderDetails: null,
        loading : false,
        error : null,
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchUserOrders.pending , (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUserOrders.fulfilled , (state, action)=>{
            state.loading = false;
            state.orders = action.payload
        })
        .addCase(fetchUserOrders.rejected , (state, action)=>{
            state.loading = false,
            state.error = action.payload.message
        })
        .addCase(fetchOrderById.pending , (state)=>{
            state.loading = true,
            state.error = null;
        })
        .addCase(fetchOrderById.fulfilled , (state, action)=>{
            state.loading = false,
            state.orderDetails = action.payload
        })
        .addCase(fetchOrderById.rejected , (state, action)=>{
            state.loading = false,
            state.error = action.payload.message
        })

    }
})

export default orderSlice.reducer