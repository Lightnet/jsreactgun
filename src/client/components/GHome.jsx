import React from "react";

import AliasProfileSearch from './Account/AliasProfileSearch.jsx';

class GHome extends React.Component {
    //constructor(props) {
        //super(props);
    //}
    render() {
        return (
            <div>
            <label>Home</label>
            <AliasProfileSearch></AliasProfileSearch>
            </div>
        );
    }
}
export default GHome;