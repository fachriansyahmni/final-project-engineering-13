// import create from "zustand";

// import { persist } from "zustand/middleware"

// const dataStore = create(persist((set) => ({
//     token : null,

//     setToken : (token) => set((state) => ({
//         token: token
//     }))
// }),{name:"jwt"}))

// export default dataStore

import axios from "axios";
import create from "zustand";

import { persist } from "zustand/middleware"

const dataStore = create(persist((set) => ({
    token : null,

    setToken : (token) => set((state) => ({
        token: token
    }))
}),{name:"jwt"}))

const dataUser = create((set) => ({
    username: 'name',
    name: 'name',
    email: 'example@gmail.com',
    photo: 'default',
    getUserData: async (token) => {
        try {
        // const response = await axios.get('/api/v1/profile', {
        //     headers: {
        //         'Authorization': token
        //     }
        // })
        // console.log(response, 'profile dari datastore')
        // } catch (e) {
        //     console.log(e.response)
        // }
        const response = await axios.get('/api/v1/event')
        console.log(response, 'profile dari datastore')
        } catch (e) {
            console.log(e.response)
        }
    }
}))

export { dataStore, dataUser}