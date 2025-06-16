import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch all user(admin only)

export const fetchUsers = createAsyncThunk("ADMIN/FETCHuSERS", async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`
            }
        }
    )
    return response.data
})
// Add  user(admin only)

export const addUser = createAsyncThunk("ADMIN/addUser", async (userData, { rejectWithValue }) => {

    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, userData,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`
                }
            }
        )
        return response.data
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data)

    }
})

// update user(admin only)

export const updateUser = createAsyncThunk("ADMIN/updateUser", async ({ id, name, email, role }) => {

    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`, { name, email, role },
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`,
                        "Content-Type": "application/json", // 👈 essentiel !

            },

        }
    )
    return response.data.user
})

// Delete a user(admin only)

export const deleteUser = createAsyncThunk("ADMIN/deleteUser", async (id) => {

    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`, { name, email, role },
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`
            },

        }
    )
    return id

})

const adminSlice = createSlice({
    name : "admin",
    initialState : {
        users : [],
        loading : false,
        error:null,
    },
    reducers :{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        .addCase(updateUser.pending, (state) => {
            state.loading = true
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false
            const updatedUser = action.payload
            const index = state.users.findIndex((user) => user._id === updatedUser._id )
            if (index != -1){
                state.users[index] = updatedUser
            }
        })
        .addCase(deleteUser.fulfilled, (state, action)=>{
            state.users =  state.users.filter((user) => user._id !== action.payload)
        })  
        .addCase(addUser.pending, (state)=>{
            state.loading = true;
            state.error =null;

        })        
        .addCase(addUser.fulfilled, (state, action)=>{
            state.loading = false;
            state.users.push(action.payload.user)
        })        
        .addCase(addUser.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload.message
        })        
    }
})
export default adminSlice.reducer