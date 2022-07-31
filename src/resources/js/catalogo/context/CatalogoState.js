import { OPEN_MODAL, CLOSE_MODAL, CHANGE_PRODUCT, RESET_PRODUCT, GET_RESOURCES, RECEIVED_RESOURCES, FAIL_RESOURCES, GET_PRODUCTS, RECEIVED_PRODUCTS, FAIL_PRODUCTS, GET_VALIDATE_SKU, RECEIVED_VALIDATE_SKU, FAIL_VALIDATE_SKU, CHANGE_URL_IMAGE, CHANGE_IMAGE, FAIL_NUEVO_PRODUCTO, RECEIVED_NUEVO_PRODUCTO, GET_NUEVO_PRODUCTO, GET_DETAIL_PRODUCT, RECEIVED_DETAIL_PRODUCT, FAIL_DETAIL_PRODUCT, GET_EDIT_PRODUCT, RECEIVED_EDIT_PRODUCT, FAIL_EDIT_PRODUCT, GET_EDIT_IMAGE_PRODUCT, RECEIVED_EDIT_IMAGE_PRODUCT, FAIL_EDIT_IMAGE_PRODUCT } from "./types"

import CatalogoContext from "./CatalogoContext"
import CatalogoReducer from "./CatalogoReducer"
import { useReducer } from "react"
import axios from "axios"

const CatalogoState = (props) => {
    const initialState = {
        openmodal: false,
        is_edit: false,
        loading: false,
        sku_valid: false,
        loading_valid_sku: false,
        loading_save_edit_product: false,
        message_save_edit_product: '',
        color_valid_sku: '',
        categorias: [],
        estados: [],
        afectaciones_sunat: [],
        almacenes: [],
        unidades_medidas: [],
        products: [],
        product: {
            id: '',
            sku: '',
            nombre: '',
            descripcion: '',
            stock: '0',
            precio: '0.00',
            costo: '0.00',
            url_imagen: '/images/products/sin_imagen.jpg',
            imagen: '',
            categoria: '',
            estado: '',
            afectacion_sunat: '',
            almacen: '',
            unidad_medida: '',
        },
    }

    const [state, dispatch] = useReducer(CatalogoReducer, initialState)

    const getProductos = async () => {
        dispatch({ type: GET_PRODUCTS, payload: [] })
        try {
            const res = await axios.post(`/catalogo/listar-catalogo`, {})
            const data = res.data
            dispatch({ type: RECEIVED_PRODUCTS, payload: data })
        } catch (error) {
            console.error(error)
            dispatch({ type: FAIL_PRODUCTS, payload: [] })
        }
    }

    const getDetailProduct = async (product_id) => {
        dispatch({ type: GET_DETAIL_PRODUCT, payload: [] })
        try {
            const res = await axios.post(`/catalogo/listar-detalle-catalogo`, {
                product_id
            })
            const data = res.data
            dispatch({ type: RECEIVED_DETAIL_PRODUCT, payload: data })
        } catch (error) {
            console.error(error)
            dispatch({ type: FAIL_DETAIL_PRODUCT, payload: [] })
        }
    }

    const getResources = async () => {
        dispatch({ type: GET_RESOURCES, payload: [] })
        try {
            const res = await axios.post(`/catalogo/resources-catalogo`, {})
            const data = res.data
            dispatch({ type: RECEIVED_RESOURCES, payload: data })
        } catch (error) {
            console.error(error)
            dispatch({ type: FAIL_RESOURCES, payload: [] })
        }
    }

    const validateSku = async (id, sku, is_edit) => {
        dispatch({ type: GET_VALIDATE_SKU, payload: [] })
        try {
            const res = await axios.post(`/catalogo/verificar-sku-catalogo`, {
                id, sku, is_edit
            })
            const data = res.data
            dispatch({ type: RECEIVED_VALIDATE_SKU, payload: data })
        } catch (error) {
            console.error(error)
            dispatch({ type: FAIL_VALIDATE_SKU, payload: [] })
        }
    }

    const crearProducto = async (producto) => {
        dispatch({ type: GET_NUEVO_PRODUCTO, payload: [] })
        try {
            const formData = new FormData()
            for (let key in producto) {
                formData.append(key, producto[key])
            }
            const res = await axios.post(`/catalogo/crear-producto-catalogo`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            },
            )
            const data = res.data
            dispatch({ type: RECEIVED_NUEVO_PRODUCTO, payload: data })
            return data.response
        } catch (error) {
            console.error(error)
            const post_error = {
                response: false,
                message: 'No se pudo crear el producto'
            }
            dispatch({ type: FAIL_NUEVO_PRODUCTO, payload: post_error })
            return post_error.response
        }
    }

    const editarProducto = async (producto) => {
        dispatch({ type: GET_EDIT_PRODUCT, payload: [] })
        try {
            const res = await axios.post(`/catalogo/editar-producto-catalogo`, producto, {
                headers: { "Content-Type": "application/json" },
            },
            )
            const data = res.data
            dispatch({ type: RECEIVED_EDIT_PRODUCT, payload: data })
            return data.response
        } catch (error) {
            console.error(error)
            const post_error = {
                response: false,
                message: 'No se pudo editar el producto'
            }
            dispatch({ type: FAIL_EDIT_PRODUCT, payload: post_error })
            return post_error.response
        }
    }

    const editarImagenProducto = async (producto) => {
        dispatch({ type: GET_EDIT_IMAGE_PRODUCT, payload: [] })
        try {
            const formData = new FormData()
            formData.append('id', producto['id'])
            formData.append('sku', producto['sku'])
            formData.append('url_imagen', producto['url_imagen'])
            formData.append('imagen', producto['imagen'])
            const res = await axios.post(`/catalogo/editar-imagen-producto-catalogo`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            },
            )
            const data = res.data
            dispatch({ type: RECEIVED_EDIT_IMAGE_PRODUCT, payload: data })
            return data.response
        } catch (error) {
            console.error(error)
            const post_error = {
                response: false,
                message: 'No se pudo editar la imagen del producto'
            }
            dispatch({ type: FAIL_EDIT_IMAGE_PRODUCT, payload: post_error })
            return post_error.response
        }
    }

    const stateOpenModal = (is_edit) => dispatch({
        type: OPEN_MODAL, payload: {
            openmodal: true,
            is_edit,
        }
    })

    const stateCloseModal = () => dispatch({ type: CLOSE_MODAL, payload: false })

    const handlerChangeProduct = (event) => dispatch({ type: CHANGE_PRODUCT, payload: event })

    const handlerChangeUlrImage = url_imagen => dispatch({ type: CHANGE_URL_IMAGE, payload: url_imagen })

    const handlerChangeImage = imagen => dispatch({ type: CHANGE_IMAGE, payload: imagen })

    const handlerResetProduct = () => dispatch({ type: RESET_PRODUCT, payload: '' })

    return (
        <CatalogoContext.Provider
            value={{
                openmodal: state.openmodal,
                is_edit: state.is_edit,
                sku_valid: state.sku_valid,
                loading_valid_sku: state.loading_valid_sku,
                color_valid_sku: state.color_valid_sku,
                products: state.products,
                categorias: state.categorias,
                estados: state.estados,
                afectaciones_sunat: state.afectaciones_sunat,
                almacenes: state.almacenes,
                unidades_medidas: state.unidades_medidas,
                product: state.product,
                loading: state.loading,
                loading_save_edit_product: state.loading_save_edit_product,
                message_save_edit_product: state.message_save_edit_product,
                stateOpenModal,
                stateCloseModal,
                getResources,
                getProductos,
                getDetailProduct,
                validateSku,
                handlerChangeProduct,
                handlerResetProduct,
                handlerChangeUlrImage,
                handlerChangeImage,
                crearProducto,
                editarProducto,
                editarImagenProducto,
            }}
        >
            {props.children}
        </CatalogoContext.Provider>
    )
}

export default CatalogoState