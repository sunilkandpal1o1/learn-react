import React from "react";

const Die = (props) => {
    // console.log(props)
    const styles = props.isHeld ? {
        backgroundColor: "#87e287",
    } : { }
    return (
        <div 
            className="die"
            style={styles}
            onClick={props.holdDie}
        >
            <h2>{props.value}</h2>
        </div>
    )
}

export default Die;