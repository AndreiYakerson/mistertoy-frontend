import { utilService } from "../services/util.service.js";

export function AboutPage() {
    return (
        <section className="about">
            <h1>About:</h1>
            <p>{utilService.makeLorem()}</p>
        </section>
    )
}