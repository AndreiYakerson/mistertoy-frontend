
import { toyService } from '../../services/toy.service-local.js';

import { store } from '../store'

import {
    ADD_TOY,
    REMOVE_TOY,
    SET_TOYS,
    UPDATE_TOY,
} from '../reducers/toy.reducer'
import { Await } from 'react-router-dom';

export async function loadToys(filterBy) {
    try {
        const toys = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.error('Error loading toys:', err);
    }
}


export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
    } catch (err) {
        console.error('toy action -> Cannot remove toy', err)
    }
}

export async function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY

    try {
        const toyToSave = await toyService.save(toy)
        store.dispatch({ type, toy: toyToSave })
        return toyToSave
    } catch (err) {
        console.log('toy action -> Cannot save toy', err)
        throw err
    }
}

export async function loadToyLabels() {

    try {
        const labels = await toyService.getToyLabels()
        store.dispatch({ type: SET_TOY_LABELS, labels })
    } catch (err) {
        console.log('toy action -> Cannot get labels', err)
        throw err
    }

}

export function setFilter(filterBy = toyService.getDefaultFilter()) {
    store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}

export function setSort(sortBy = toyService.getDefaultSort()) {
    store.dispatch({ type: SET_SORT_BY, sortBy: sortBy })
}
