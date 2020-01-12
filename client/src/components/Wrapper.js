import React from "react";

function Wrapper(props) {
    return <div className="wrapper" {...props}>{props.children}</div>;
}

export default Wrapper;