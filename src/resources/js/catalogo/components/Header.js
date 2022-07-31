import { useContext, useEffect } from "react";
import CatalogoContext from "../context/CatalogoContext";
import { headerStyle } from "../utils/StyleHeader";

const Header = () => {
    const { stateOpenModal, getResources, getProductos, handlerResetProduct } = useContext(CatalogoContext)

    useEffect(() => {
        getResources()
        getProductos()
        console.log('useEffect desde el header')
    }, []);

    const handleEventModal = () => {
        handlerResetProduct()
        stateOpenModal(false)
    }

    return <div className="header" style={headerStyle} >
        <button className="" onClick={getProductos} >Refresh</button>
        <button className="" onClick={handleEventModal} >Nuevo</button>
    </div>
};

export default Header;