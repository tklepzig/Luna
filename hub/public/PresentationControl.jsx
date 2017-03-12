import React from "react";

class PresentationControl extends React.Component {

    render() {
        return <div id="presentationControl" className="flex layout-v layout-margin">
            <button className="button flex-15" data-key="P">Previous</button>
            <button className="button flex" data-key="N">Next</button>
        </div>;
    }

    componentDidMount() {
    }
}

export default PresentationControl;
