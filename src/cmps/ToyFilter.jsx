import { useEffect, useState, useRef } from "react";
import { utilService } from "../services/util.service";
import { Loading } from "./Loading";
import LabelSelect from "./LabelSelect";

export function ToyFilter({ filterBy, onSetFilter, labels }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300));


    useEffect(() => {
        onSetFilter.current(filterByToEdit);

    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, type, name: field } = target
        if (type === 'select-multiple') {
            value = [...target.selectedOptions].map(option => option.value)
        } else {
            value = type === 'number' ? +value : value
        }

        if (value === 0) value = ''
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function handleSortBy({ target }) {
        const { value } = target
        setFilterByToEdit(prevFilter => ({ ...prevFilter, sortBy: value }))
    }


    return (

        <section className="toy-filter">
            <h2>Toys filter:</h2>

            <form className="filter-form" action="submit">
                <label htmlFor="toy">Toy:</label>
                <input type="text"
                    id="toy"
                    name="txt"
                    placeholder="By text"
                    onChange={handleChange}
                    value={filterByToEdit.txt || ''} />

                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    onChange={handleChange}
                    value={filterByToEdit.maxPrice || ''} />

                <label htmlFor="sortBy">Toy:</label>
                <select name="sortBy" id="sortBy" defaultValue={filterByToEdit.sortBy} onChange={handleSortBy}>
                    <option value="All">All</option>
                    <option value="In stock">In stock</option>
                    <option value="Out of stock">Out of stock</option>
                </select>

                {/* {!!labels.length &&
                //TODO How to work with params?
                //TODO How to select multiple options without cmd?

                    <>
                        <label htmlFor="labels-select">Labels:</label>
                        <select
                            multiple
                            className="labels-select"
                            onChange={handleChange}
                            id="labels-select"
                            name="labels"
                        >
                            <option disabled style={{ color: "yellow", backgroundColor: "purple" }}>Labels:</option>
                            {labels.map(label => {
                                return <option key={label} value={label}>{label}</option>
                            })}
                        </select>
                    </>
                } */}

                <LabelSelect labels={labels} setFilterByToEdit={setFilterByToEdit} />

            </form>
        </section>


    )

}