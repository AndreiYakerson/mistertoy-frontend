

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const SET_TOY_LABELS = 'SET_TOY_LABELS'
export const UPDATE_TOY = 'UPDATE_TOY'


const initialState = {
    toys: [],
}

export function toyReducer(state = initialState, action = {}) {
    let toys
    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }

        case REMOVE_TOY:

            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys, lastToys: state.toys }

        case ADD_TOY:
            toys = [action.toy, ...state.toys]
            return { ...state, toys }

        case UPDATE_TOY:
            
            toys = state.toys.map(toy =>
                toy._id === action.toy._id ? action.toy : toy
            )
            return { ...state, toys }

        default:
            return state
    }
}
