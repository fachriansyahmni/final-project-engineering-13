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
    token: null,

    setToken: (token) => set((state) => ({
        token: token
    }))
}), { name: "jwt" }))

const dataUser = create((set) => ({
    username: 'name',
    name: 'name',
    email: 'example@gmail.com',
    photo: 'default',
    getUserData: async (token) => {
        // try {
        //     const response = await axios.get('/api/v1/profile', {
        //         headers: {
        //             'Authorization': token
        //         }
        //     })
        //     console.log(response, 'profile dari datastore')
        // } catch (e) {
        //     console.log(e.response)
        // }
        //     const response = await axios.get('http://localhost:8090/api/v1/event')
        //     console.log(response, 'profile dari datastore')
        // } catch(e) {
        //     console.log(e.response)
        // }

        //test get event with ip server
        try {
            const response = await fetch('http://localhost:8090/api/v1/event/', { mode: 'cors' });
            const data = await response.json();
            console.log({ data })
        }
        catch (e) {
            console.log(e)
        }

        // get data profile
        try {
            const response = await axios.get('/api/v1/profile', {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2NTU1NTgzMDcsImlkIjoxLCJ1c2VybmFtZSI6InVzZXIifQ.pl4j8nLrIDCGcBjAZ6SuwiQaYtGSIzro0KH891CoRgs'
                }
            })
            console.log(response, 'profile dari datastore')
        }
        catch (e) {
            console.log(e)
        }
    }
}))

export { dataStore, dataUser }