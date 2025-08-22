
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter
}



function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.txt) filterBy.txt = ''
            if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            if (!filterBy.minSpeed) filterBy.minSpeed = -Infinity
            const regExp = new RegExp(filterBy.txt, 'i')
            return toys.filter(toy =>
                regExp.test(toy.name) &&
                toy.price <= filterBy.maxPrice
            )
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
    }
}

function getRandomToy() {
    return {
        name: utilService.getRandomLabels(2),
        description: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
        imgUrl: `./img/toy${utilService.getRandomIntInclusive(1, 10)}.png`,
        price: utilService.getRandomIntInclusive(10, 100),
        labels: utilService.getRandomLabels(3),
        createdAt: Date.now(),
        inStock: Math.random() > .5 ? true : false,
    }

}






function getDefaultFilter() {
    return { txt: '', maxPrice: '', minSpeed: '' }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


