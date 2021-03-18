import React from "react"

// Creating a functional component called Footer
const Footer = () => {
    // Getting a date value by calling the Date class. This then gets passed into a getFullYear method which is then stored in the year variable.
    const date = new Date();
    const year = date.getFullYear();
    
    return (
    <div>
        <footer>
            {/* Creating a dynamically changing year allows our Copyright year to always be corrrect */}
            <h6>Copyright Alan Kow {year}. Hyperion Dev Bootcamp.</h6>
        </footer>
    </div>
    )
}

// exporting Footer component
export default Footer