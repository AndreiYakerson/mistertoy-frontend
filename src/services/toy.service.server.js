
import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3030'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getChartData,
    getLabels,
    labelsQuery

}



async function query(filterBy = {}) {
    const toys = await axios.get(`${BASE_URL}/api/toy`, { params: filterBy })
    return toys.data.toys
}



async function getById(toyId) {
    const toy = await axios.get(`${BASE_URL}/api/toy/${toyId}`)
    return toy.data
}

async function remove(toyId) {
    const toy = await axios.delete(`${BASE_URL}/api/toy/${toyId}`)
    return toy.data
}


async function save(toy) {
    if (toy._id) {
        const toyToSafe = await axios.put(`${BASE_URL}/api/toy/${toy._id}`, toy)
        return toyToSafe.data
    } else {
        toy.createdAt = Date.now()
        toy.imgUrl = `./img/toy${utilService.getRandomIntInclusive(1, 10)}.png`,
        toy.description = utilService.makeLorem(utilService.getRandomIntInclusive(10, 30))
        toy.labels = utilService.getRandomLabels(3)
        
        const toyToSafe = await axios.post(`${BASE_URL}/api/toy`, toy)
        return toyToSafe.data
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        inStock: false,
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', sortBy: '', labels: [] }
}

async function getChartData() {
    const toys = await toyService.query()

    const labels = getLabels(toys)
    const data = _mapBylabelsInStock(toys, labels)
    const backgroundColor = labels.reduce(acc => {
        acc.push(utilService.getRandomRGBAColor(0.2))
        return acc
    }, [])

    const borderColor = labels.reduce(acc => {
        acc.push(utilService.getRandomRGBAColor(1))
        return acc
    }, [])


    const chartData = {
        labels,
        datasets: [
            {
                label: 'Toys in stock',
                data,
                backgroundColor,
                borderColor,
                // borderColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)',
                // ],
                borderWidth: 2,
            },

        ],
    }
    return chartData
}

async function labelsQuery() {
    const toys = await toyService.query()
    return getLabels(toys)
}

function getLabels(toys) {
    const labels = toys.reduce((acc, toy) => {
        toy.labels.forEach(label => {
            if (!acc.includes(label)) acc.push(label);
        });
        return acc;
    }, []);

    return labels;
}

function _mapBylabelsInStock(toys, labels) {
    const labelsCount = labels.map(label => {
        return toys.reduce((acc, toy) => {
            if (toy.labels.includes(label) && toy.inStock) acc++;
            return acc;
        }, 0);
    });

    return labelsCount;
}



