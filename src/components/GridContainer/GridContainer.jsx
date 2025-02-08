import PropTypes from "prop-types"

GridContainer.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
}

export default function GridContainer({children, className}){
    return(
        <div className={`d-flex flex-row flex-wrap ${className}`}>
            {children}
        </div>
    )
}