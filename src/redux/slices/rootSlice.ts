import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: 'Tony Stark',
        description: "I am Iron Man",
        comics_appeared_in: '847',
        super_power: 'Has money, loves to tinker',
        date_created: '1963',
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
        chooseDescription: (state, action) => { state.description = action.payload},
        chooseComicsAppearedIn: (state, action) => { state.comics_appeared_in = action.payload},
        chooseSuperPower: (state, action) => { state.super_power = action.payload},
        chooseDateCreated: (state, action) => { state.date_created = action.payload},
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseName, chooseDescription, chooseComicsAppearedIn, chooseSuperPower, chooseDateCreated} = rootSlice.actions;