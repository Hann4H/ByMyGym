import React from "react"
import { timesDates } from "./BookingHelpers";

export function idk() {


    function fun() { 
        for(var i = 0; i < 7; i++ ) { 
            timesDates.map((item, index) => {
                return ( <div>
                    <h1>{item.day}</h1>
                    <div  className="idk-3" >
                    {item.hours.map((c, i) => (
                        <div key={i}>
                            <p>{c.hour}</p>
                        </div>
                    ))}
                    </div>
                </div>
                )
            })
        }
    }
    

    return (

        <div  className="idk-2">fun()</div>
            



    )

}