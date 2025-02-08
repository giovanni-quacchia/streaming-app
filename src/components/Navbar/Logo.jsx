import { Link } from 'react-router-dom'

export default function Logo() {
    return(
        <Link to={"/"} className="d-flex align-items-center fs-3 fw-semibold text-white text-decoration-none">
            Free<span className="" style={{"color": "#00ACC1"}}>Stream</span>
        </Link>
    )
}