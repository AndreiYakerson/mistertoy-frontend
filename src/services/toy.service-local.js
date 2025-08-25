
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}



function query(filterBy = {}) {

    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.txt) filterBy.txt = ''
            if (!filterBy.sortBy) filterBy.sortBy = ''
            if (!filterBy.maxPrice === '0') filterBy.maxPrice = ''

            const regExp = new RegExp(filterBy.txt, 'i')

            toys = toys.filter(toy => regExp.test(toy.name))

            if (filterBy.maxPrice) toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
            if (filterBy.sortBy === 'All') return toys
            return toys = toys.filter(toy => {
                if (filterBy.sortBy === 'In stock') return toy.inStock
                if (filterBy.sortBy === 'Out of stock') return !toy.inStock
                return true
            })

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
        toy.createdAt = Date.now()
        toy.imgUrl = `./img/toy${utilService.getRandomIntInclusive(1, 10)}.png`,
        toy.description = utilService.makeLorem(utilService.getRandomIntInclusive(10, 30))
        toy.labels = utilService.getRandomLabels(3)
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        inStock: false,
    }
}

function getRandomToy() {
    return {
        name: utilService.getRandomLabels(1),
        description: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
        imgUrl: `./img/toy${utilService.getRandomIntInclusive(1, 10)}.png`,
        price: utilService.getRandomIntInclusive(10, 100),
        labels: utilService.getRandomLabels(3),
        createdAt: Date.now(),
    }

}


function getDefaultFilter() {
    return { txt: '', maxPrice: '', sortBy: '' }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


