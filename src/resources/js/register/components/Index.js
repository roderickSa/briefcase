import React from 'react';
import ReactDOM from 'react-dom';

const Index = () => {
    return <>
        <h1>Estamos en el Register</h1>
    </>
};

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}