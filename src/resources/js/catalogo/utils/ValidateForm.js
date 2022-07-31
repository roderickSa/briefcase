export const ValidateForm = (sku, sku_valid, nombre, precio, stock, costo, estado, categoria, almacen, unidad_medida, afectacion_sunat, imagen, is_edit) => {
    if (isNaN(sku) || sku.trim().length != 5) {
        return {
            response: false,
            message: 'Digite un sku numerico valido de 5 digitos'
        }
    }
    if(!sku_valid){
        return {
            response: false,
            message: 'Sku ya existe, porfavor elija otro'
        }
    }
    if (nombre.trim() == '') {
        return {
            response: false,
            message: 'Escriba un nombre para en producto'
        }
    }
    if (isNaN(precio) || parseFloat(precio) <= 0) {
        return {
            response: false,
            message: 'Escriba un precio valido para el producto'
        }
    }
    if (isNaN(costo) || parseFloat(costo) <= 0) {
        return {
            response: false,
            message: 'Escriba un costo valido para el producto'
        }
    }
    if (isNaN(stock)) {
        return {
            response: false,
            message: 'Escriba un stock valido para el producto'
        }
    }
    if (estado === '' || categoria === '' || almacen === '' || unidad_medida === '' || afectacion_sunat === '') {
        return {
            response: false,
            message: 'Debe seleccionar todos los combos'
        }
    }
    if(!is_edit){
        if (imagen == '') {
            return {
                response: false,
                message: 'Seleccione una imagen'
            }
        }
    }
    return {
        response: true,
        message: ''
    }
}