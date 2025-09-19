import { useSelector } from "react-redux"

export function UserProfile() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    return (
        <div className="user-page">

        <div className="user-container">
            <img src={user.imgUrl} className="big-img" />
            <h2>{user.fullname}</h2>
        </div>
        </div>
    )
}