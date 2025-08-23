import { useEffect, useState, useRef } from "react";
import { utilService } from "../services/util.service";
import { Loading } from "./Loading";

export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({...filterBy});
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300));

    
    useEffect(() => {
        onSetFilter.current(filterByToEdit);
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }
    
    function handleSortBy({ target }) {
        const { value } = target
        setFilterByToEdit(prevFilter => ({ ...prevFilter, sortBy: value }))
    }

    return (

        <section className="toy-filter">
            <h2>Toys filter:</h2>

            <form action="submit">
                <label htmlFor="toy">Toy:</label>
                <input type="text"
                    id="toy"
                    name="txt"
                    placeholder="By text"
                    onChange={handleChange}
                    value={filterByToEdit.txt} />

                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    onChange={handleChange}
                    value={filterByToEdit.maxPrice} />

                <label htmlFor="toy">Toy:</label>

                <select name="sortBy" id="sortBy" defaultValue={filterByToEdit.sortBy} onChange={handleSortBy}>
                    <option value="All">All</option>
                    <option value="In stock">In stock</option>
                    <option value="Out of stock">Out of stock</option>
                </select>
            </form>
        </section>


    )

}