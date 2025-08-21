import { ToyPreview } from "./ToyPreview"

export function ToyList({ toys, onRemoveToy }) {
    console.log(toys);

    return (
        <ul className="toy-list">
            {toys.map(toy => {
                return <li className="toy-card" key={toy._id}>
                    <ToyPreview  toy={toy} />

                    <div className="toy-actions-container">
                        <button className="toy-btn">Details</button>
                        <button className="toy-btn" onClick={() => onRemoveToy(toy._id)}>Remove</button>
                        <button className="toy-btn buy-btn">Buy</button>
                    </div>
                </li>
            })}

        </ul>
    )
}