import { useEffect, useState } from "react";
import { ToyList } from "../cmps/ToyList.jsx";
import { toyService } from "../services/toy.service-local.js";
import { Loading } from "../cmps/Loading.jsx";
import { ToyFilter } from "../cmps/ToyFilter.jsx";
import { useSearchParams } from "react-router-dom";

export function ToyIndex() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [toys, setToys] = useState(null);
    const [filterBy, setFilterBy] = useState(searchParams ? Object.fromEntries(searchParams) : toyService.getDefaultFilter());
    // console.log(filterBy);
    


    useEffect(() => {
        setSearchParams(filterBy);
        loadToys(filterBy);
    }, [filterBy]);


    function loadToys(filterBy) {
        return toyService.query(filterBy)
            .then(toys => {
                // console.log('Toys loaded:', toys);
                setToys(toys);
            })
            .catch(err => {
                console.error('Error loading toys:', err);
            });
    }

    function onAddToy() {
        const toy = toyService.getRandomToy();

        toyService.save(toy)
            .then(savedToy => {
                setToys(prevToys => [...prevToys, savedToy]);
                console.log('Saved toy:', savedToy);
            })
            .catch(err => {
                console.error('Can not saving toy:', err);
            });
    }

    function onRemoveToy(toyId) {
        return toyService.remove(toyId)
            .then(() => setToys(prevToys => prevToys.filter(toy => toy._id !== toyId)))
            .catch(err => {
                console.error('Can not removing toy:', err);
            });
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    if (!toys) return <Loading />


    return (

        <div className="toy-index">
            <header>
                <button onClick={onAddToy}>Add toy</button>
                <ToyFilter
                    filterBy={filterBy}
                    onSetFilter={onSetFilter}
                />
            </header>

            <section>
                <h1>Toy list:</h1>
                {toys.length === 0 && <h2>No toys available.</h2>}
                <ToyList onRemoveToy={onRemoveToy} toys={toys} />
            </section>


        </div>

    )

}