import { useEffect, useState } from "react";
import { ToyList } from "../cmps/ToyList.jsx";
import { toyService } from "../services/toy.service-local.js";
import { Loading } from "../cmps/Loading.jsx";
import { ToyFilter } from "../cmps/ToyFilter.jsx";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { loadToys, removeToy } from "../store/actions/toy.actions.js";

export function ToyIndex() {
    const toys = useSelector(state => state.toyModule.toys);
    
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterBy, setFilterBy] = useState(searchParams ? Object.fromEntries(searchParams) : toyService.getDefaultFilter());

    useEffect(() => {
        setSearchParams(filterBy);
        // loadToys(filterBy);
        loadToys(filterBy)
    }, [filterBy]);


    function onRemoveToy(toyId) {
        removeToy(toyId)
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    if (!toys) return <Loading />


    return (

        <div className="toy-index">
            <header>
                <ToyFilter
                    filterBy={filterBy}
                    onSetFilter={onSetFilter}
                />
            </header>

            <section>
                <button><Link to={'/toy/edit'}>Add toy</Link></button>
                <h1>Toy list:</h1>
                {toys.length === 0 && <h2>No toys available.</h2>}
                <ToyList onRemoveToy={onRemoveToy} toys={toys} />
            </section>


        </div>

    )

}