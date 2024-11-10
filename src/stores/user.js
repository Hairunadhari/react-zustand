//import create zustand
import { create } from 'zustand'

//import services api
import Api from '../services/api'

export const useStore = create((set) => ({

    //state
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || '',

    //action register
    register: async (credentials) => {
        //fetch API
        await Api.post('/api/register', credentials)
    },

    //action login
    login: async (credentials) => {
        //fetch API
        await Api.post('/api/login', credentials)
        .then((response) => {
            
            //set state user
            set((state) => ({ user: response.data.user }))
            //set state token
            set((state) => ({ token: response.data.token }))

            //set state localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('token', response.data.token)
        })
    },

    //action logout
    logout: () => {
        //set state user
        set((state) => ({ user: {} }))
        //set state token
        set((state) => ({ token: '' }))

        //set state localStorage
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }
}))