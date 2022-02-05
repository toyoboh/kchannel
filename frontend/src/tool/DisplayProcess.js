import React from "react";

class DisplayProcess
{
    //Replace Line Feed(Newline) with "<br />"
    replaceLineFeed(str) {
        return str.split(/\n/g).map(function(value, index) {
            return (
                <React.Fragment key={ index}>
                    { value }<br />
                </React.Fragment>
            )
        })
    }
}

export default new DisplayProcess();
