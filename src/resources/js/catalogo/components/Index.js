import React from 'react';
import ReactDOM from 'react-dom';

import Header from "./Header"
import Body from "./Body"
import WindowModal from "./WindowModal"
import CatalogoState from "./../context/CatalogoState";

const Index = () => {
    return <CatalogoState>
        <Header />
        <Body/>
        <WindowModal />
    </CatalogoState>
};

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}