import React from "react"

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    
    return (
    <div>
        <footer>
            <h6>Copyright Alan Kow {year}. Hyperion Dev Bootcamp.</h6>
        </footer>
    </div>
    )
}

export default Footer