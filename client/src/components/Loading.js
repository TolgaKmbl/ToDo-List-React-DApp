import React from 'react'
import "../App.css"
import "bootstrap/dist/css/bootstrap.min.css"

function Loading() {
    return (  
        <>   
            <h3 id="loading_title" className="text-primary">Loading... Please Wait Patiently!</h3>   
            <div className="spinner-border text-primary" role="status" id="loading">
                <span className="sr-only">Loading...</span>            
            </div>
        </>
    )
}

export default Loading
