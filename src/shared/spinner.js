import React from 'react';
import '../css/spinner.css';

class Spinner extends React.Component{
    render(){
        console.log("spinner")
        return(
            <div class="sk-chase">
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
            </div>
        )
    }
}

export default Spinner;