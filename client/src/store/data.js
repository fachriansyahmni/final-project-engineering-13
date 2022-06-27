import axios from "axios";
import create from "zustand";

import { persist } from "zustand/middleware"

const dataStore = create(persist((set) => ({
    token: null,

    setToken: (token) => set((state) => ({
        token: `Bearer ${token}`
    }))
}), { name: "jwt" }))

const dataUser = create((set) => ({
    getUserData: async (token) => {
        try {
            const response = await axios.get('/api/v1/profile', {
                headers: {
                    'Authorization': `${token}`
                }
            })
            return response
        }
        catch (e) {
            console.log(e)
        }
    }
}))

export { dataStore, dataUser }