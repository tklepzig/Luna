import React from "react";

class PresentationControl extends React.Component {

    render() {
        return <div className="flex layout-v layout-margin">
            <button className="flex-15" data-key="P">Previous</button>
            <button className="flex" data-key="N">Next</button>
        </div>;
    }

    componentDidMount() {
    }
}

export default PresentationControl;
