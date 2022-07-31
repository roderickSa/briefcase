import { OPEN_MODAL, CLOSE_MODAL, CHANGE_PRODUCT, RESET_PRODUCT, GET_RESOURCES, RECEIVED_RESOURCES, FAIL_RESOURCES, GET_PRODUCTS, RECEIVED_PRODUCTS, FAIL_PRODUCTS, GET_VALIDATE_SKU, RECEIVED_VALIDATE_SKU, FAIL_VALIDATE_SKU, CHANGE_URL_IMAGE, CHANGE_IMAGE, RECEIVED_NUEVO_PRODUCTO, FAIL_NUEVO_PRODUCTO, GET_NUEVO_PRODUCTO, GET_DETAIL_PRODUCT, RECEIVED_DETAIL_PRODUCT, FAIL_DETAIL_PRODUCT, GET_EDIT_PRODUCT, RECEIVED_EDIT_PRODUCT, FAIL_EDIT_PRODUCT, GET_EDIT_IMAGE_PRODUCT, RECEIVED_EDIT_IMAGE_PRODUCT, FAIL_EDIT_IMAGE_PRODUCT } from "./types"

export default (state, action) => {
    const { payload, type } = action

    switch (type) {
        case OPEN_MODAL:
            const { openmodal, is_edit } = payload
            return {
                ...state,
                openmodal,
                is_edit
            }
        case CLOSE_MODAL:
            return {
                ...state,
                openmodal: payload,
                sku_valid: false,
                color_valid_sku: '',
                loading_save_edit_product: false,
                message_save_edit_product: '',
            }
        case CHANGE_PRODUCT:
            return {
                ...state,
                product: { ...state.product, [payload.target.name]: payload.target.value }
            }
        case CHANGE_URL_IMAGE:
            return {
                ...state,
                product: { ...state.product, url_imagen: payload }
            }
        case CHANGE_IMAGE:
            return {
                ...state,
                product: { ...state.product, imagen: payload }
            }
        case RESET_PRODUCT:
            return {
                ...state,
                product: {
                    id:'',
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
        case GET_PRODUCTS:
            return {
                ...state,
                products: [],
                loading: true,
            }
        case RECEIVED_PRODUCTS:
            return {
                ...state,
                products: payload,
                loading: false,
            }
        case FAIL_PRODUCTS:
            return {
                ...state,
                products: [],
                loading: false,
            }
        case GET_RESOURCES:
            return {
                ...state,
            }
        case RECEIVED_RESOURCES:
            return {
                ...state,
                categorias: payload.categorias,
                estados: payload.estados,
                afectaciones_sunat: payload.afectaciones_sunat,
                almacenes: payload.almacenes,
                unidades_medidas: payload.unidades_medidas,
            }
        case FAIL_RESOURCES:
            return {
                ...state,
                categorias: [],
                estados: [],
                afectaciones_sunat: [],
                almacenes: [],
                unidades_medidas: [],
            }
        case GET_VALIDATE_SKU:
            return {
                ...state,
                sku_valid: false,
                loading_valid_sku: true,
                color_valid_sku: '',
            }
        case RECEIVED_VALIDATE_SKU:
            return {
                ...state,
                sku_valid: payload,
                loading_valid_sku: false,
                color_valid_sku: payload ? '#fff' : 'var(--rojob)',
            }
        case FAIL_VALIDATE_SKU:
            return {
                ...state,
                sku_valid: false,
                loading_valid_sku: false,
                color_valid_sku: '',
            }
        case GET_NUEVO_PRODUCTO:
            return {
                ...state,
                loading_save_edit_product: true,
                message_save_edit_product: '',
            }
        case RECEIVED_NUEVO_PRODUCTO:
            return {
                ...state,
                loading_save_edit_product: false,
                message_save_edit_product: payload.message,
            }
        case FAIL_NUEVO_PRODUCTO:
            return {
                ...state,
                loading_save_edit_product: false,
                message_save_edit_product: '',
            }
        case GET_EDIT_PRODUCT:
            return {
                ...state,
                loading_save_edit_product: true,
                message_save_edit_product: '',
            }
        case RECEIVED_EDIT_PRODUCT:
            return {
                ...state,
                loading_save_edit_product: false,
                message_save_edit_product: payload.message,
            }
        case FAIL_EDIT_PRODUCT:
            return {
                ...state,
                loading_save_edit_product: false,
                message_save_edit_product: '',
            }
        case GET_EDIT_IMAGE_PRODUCT:
            return {
                ...state,
                loading_save_edit_product: true,
                message_save_edit_product: '',
            }
        case RECEIVED_EDIT_IMAGE_PRODUCT:
            return {
                ...state,
                loading_save_edit_product: false,
                message_save_edit_product: payload.message,
            }
        case FAIL_EDIT_IMAGE_PRODUCT:
            return {
                ...state,
                loading_save_edit_product: false,
                message_save_edit_product: '',
            }
        case GET_DETAIL_PRODUCT:
            return {
                ...state,
                openmodal: false,
                is_edit: false,
                sku_valid: false,
                color_valid_sku: '',
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
        case RECEIVED_DETAIL_PRODUCT:
            const { id, sku, nombre, descripcion, stock, precio, costo, imagen, id_categoria, id_estado, id_afectacion_sunat, id_almacen, id_unidad_medida } = payload
            return {
                ...state,
                openmodal: true,
                is_edit: true,
                sku_valid: true,
                color_valid_sku: '#fff',
                product: {
                    id,
                    sku,
                    nombre,
                    descripcion: descripcion !== null ? descripcion : '',
                    stock,
                    precio,
                    costo,
                    url_imagen: '/images/products/' + imagen,
                    imagen: '',
                    categoria: id_categoria,
                    estado: id_estado,
                    afectacion_sunat: id_afectacion_sunat,
                    almacen: id_almacen,
                    unidad_medida: id_unidad_medida,
                },
            }
        case FAIL_DETAIL_PRODUCT:
            return {
                ...state,
                openmodal: false,
                is_edit: false,
                sku_valid: false,
                color_valid_sku: '',
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
        default:
            return state
    }
}