import { useSelector } from "react-redux"
import { reviewService } from "../services/review.service"
import { useEffect, useRef } from "react";


export function ToyReview({ reviews, toy, setReviews }) {

    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const lastReviewRef = useRef(null);


    useEffect(() => {
        if (lastReviewRef.current) {
            lastReviewRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [reviews]);

    function onSaveReview(ev) {
        ev.preventDefault()

        const txt = ev.target.elements[0].value
        if (!txt) return

        reviewService.add({ txt, aboutToyId: toy._id, loggedinUser: user })
        setReviews(prevReviews => [...prevReviews, { txt, byUser: user }])
        ev.target.reset()
    }

    return (
        <div className="reviews-container">

            <section className="reviews">
                <ul className="clean-list">
                    {reviews &&
                        reviews.map((review, idx) => (
                            <li key={idx} ref={idx === reviews.length - 1 ? lastReviewRef : null}>
                                <div className="msg-credentials">
                                    <img src={review.byUser.imgUrl} className="small-img" alt="" />
                                    <p>{review.byUser.fullname}</p>
                                </div>
                                    {review.txt}
                            </li>
                        ))}
                </ul>
            </section>

            <form onSubmit={onSaveReview} className="review-form">
                <textarea name="review-input" id="review-input" placeholder="Review..."></textarea>
                <button type="submit" className="btn">Send</button>
            </form>
        </div>
    )


}