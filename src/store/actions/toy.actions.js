
import { toyService } from '../../services/toy.service-local.js';

import { store } from '../store'

import {
    ADD_TOY,
    REMOVE_TOY,
    SET_TOYS,
    UPDATE_TOY,
} from '../reducers/toy.reducer'

export function loadToys(filterBy) {

    return toyService.query(filterBy)
        .then(toys => {
            console.log(toys);
            store.dispatch({ type: SET_TOYS, toys })

        })
        .catch(err => {
            console.error('Error loading toys:', err);
        });
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })

}

export function removeToyOptimistic(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    return toyService.remove(toyId).catch(err => {
        store.dispatch({ type: TOY_UNDO })
        console.log('toy action -> Cannot remove toy', err)
        throw err
    })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(toyToSave => {
            store.dispatch({ type, toy: toyToSave })
            return toyToSave
        })
        .catch(err => {
            console.log('toy action -> Cannot save toy', err)
            throw err
        })
}

export function loadToyLabels() {
    return toyService.getToyLabels()
        .then(labels => {
            store.dispatch({ type: SET_TOY_LABELS, labels })
        })
        .catch(err => {
            console.log('toy action -> Cannot get labels', err)
            throw err
        })
}


export function setFilter(filterBy = toyService.getDefaultFilter()) {
    store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}

export function setSort(sortBy = toyService.getDefaultSort()) {
    store.dispatch({ type: SET_SORT_BY, sortBy: sortBy })
}
