import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '../../assets/types/sliceTypes'

export interface AppSliceType {
    currentUser: UserType | null,
    loading:boolean,
    theme:boolean
}

const initialState: AppSliceType = {
    currentUser:null,
    loading:false,
    theme:true
}

export const appSlice = createSlice({
    name:'app',
    initialState,
    reducers: {
        setLoading: (state:AppSliceType,action:PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        toggleTheme: (state:AppSliceType) => {
            state.theme = !state.theme
        },
    }
})

export const { setLoading,toggleTheme } = appSlice.actions
export default appSlice.reducer