// const initState = {
//        search: '',
//        status: 'All',
//        priority: []
//     }

// const filtersReducer = (state = initState, action) => {
//     switch(action.type) {
//     case 'filter/searchFilterChange': 
//         return {
//             ...state,
//             search: action.payload
//             }
//     case 'filter/priorityFilterChange' : 
//     return {
//         ...state,
//         priority: action.payload
//     }
//     case 'filter/statusFilterChange' :
//         return {
//         ...state,
//         status: action.payload
//         }
//         default :
//            return state;
//     }
//     }
import { createSlice } from "@reduxjs/toolkit"

export default createSlice({
    name: 'filters',
    initialState: {
        search: '',
        status: 'All',
        priority: [],
    },
    reducers: {
        searchFilterChange: (state, action) => {
            state.search = action.payload;
        },
        priorityFilterChange: (state, action) => {
             state.priority = action.payload;
        },
        statusFilterChange: (state, action) => {
            state.status = action.payload;
        }
    }
})
