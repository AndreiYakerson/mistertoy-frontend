
export function ToyPreview({ toy }) {
    return (
        <article className="toy-preview" key={toy._id}>
            <h2>{toy.name}</h2>
            <h3>Price: ${toy.price}</h3>
            <img src={toy.imgUrl} alt="" />
            {toy.inStock ? <p className="in-stock" style={{color: 'blue'}}>In Stock</p> : <p className="out-of-stock" style={{color: 'red'}}>Out of Stock</p>}
        </article>
    )
}