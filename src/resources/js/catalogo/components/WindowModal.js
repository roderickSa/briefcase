import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useContext, useRef, useState } from 'react'

import CatalogoContext from "../context/CatalogoContext"
import { styleModal, styleBlocks, styleBlock, styleDivModal, styleDivDoubleModal, styleLabelModal, styleLoadingValidateSku, styleLoadingSaveEditSku, styleLoadingSaveEditSkuMessage, styleMessageResponseSaveEditSku, styleImage, styleContentButtons } from "../utils/StyleModal";

import { ValidateForm } from "../utils/ValidateForm";

const WindowModal = () => {

    const { openmodal, is_edit, stateCloseModal, categorias, estados, afectaciones_sunat, almacenes, unidades_medidas, handlerChangeProduct, handlerChangeUlrImage, handlerChangeImage, product, validateSku, sku_valid, loading_valid_sku, color_valid_sku, crearProducto, editarProducto, editarImagenProducto, loading_save_edit_product, message_save_edit_product, getProductos, handlerResetProduct } = useContext(CatalogoContext)

    const { id, sku, nombre, descripcion, stock, precio, costo, imagen, url_imagen, categoria, estado, afectacion_sunat, almacen, unidad_medida } = product

    const refInputImage = useRef(null)
    const refContentModal = useRef(null)

    const [visiblemessagesaveeditpro, setVisiblemessagesaveeditpro] = useState(false)
    const [saveeditsuccess, setSaveeditsuccess] = useState(false)
    const [scrolltopcontentmodal, setScrolltopcontentmodal] = useState('0px')

    const handleSaveProduct = async () => {
        const { response, message } = ValidateForm(sku, sku_valid, nombre, precio, stock, costo, estado, categoria, almacen, unidad_medida, afectacion_sunat, imagen, is_edit)
        if (!response) {
            return alert(message)
        }
        calculateScrollLoadingModal()
        const resp = await crearProducto(product)
        setVisiblemessagesaveeditpro(true)
        setSaveeditsuccess(resp)
        if (!resp) {
            setTimeout(() => {
                setVisiblemessagesaveeditpro(false)
                setSaveeditsuccess(false)
            }, 2000)
            return
        }
        if (resp) {
            handlerResetProduct()
            getProductos()
            setTimeout(() => {
                setVisiblemessagesaveeditpro(false)
                setSaveeditsuccess(false)
                stateCloseModal()
            }, 2000)
        }
    }

    const handleEditProduct = async () => {
        const { response, message } = ValidateForm(sku, sku_valid, nombre, precio, stock, costo, estado, categoria, almacen, unidad_medida, afectacion_sunat, imagen, is_edit)
        if (!response) {
            return alert(message)
        }
        calculateScrollLoadingModal()
        const resp = await editarProducto(product)
        setVisiblemessagesaveeditpro(true)
        setSaveeditsuccess(resp)
        if (!resp) {
            setTimeout(() => {
                setVisiblemessagesaveeditpro(false)
                setSaveeditsuccess(false)
            }, 2000)
            return
        }
        if (resp) {
            getProductos()
            setTimeout(() => {
                setVisiblemessagesaveeditpro(false)
                setSaveeditsuccess(false)
                stateCloseModal()
                handlerResetProduct()
            }, 2000)
        }
    }

    const handleEditImageProduct = async() => {
        if (!imagen){
            return alert('Seleccione una imagen para actualizarla')
        }
        const resp = await editarImagenProducto(product)
        setVisiblemessagesaveeditpro(true)
        setSaveeditsuccess(resp)
        if (!resp) {
            setTimeout(() => {
                setVisiblemessagesaveeditpro(false)
                setSaveeditsuccess(false)
            }, 2000)
            return
        }
        if (resp) {
            getProductos()
            setTimeout(() => {
                setVisiblemessagesaveeditpro(false)
                setSaveeditsuccess(false)
                stateCloseModal()
                handlerResetProduct()
            }, 2000)
        }
    }

    const handleValidateSku = async (event) => {
        if (event.target.value.trim().length == 5 && !isNaN(event.target.value)) {
            await validateSku(id, sku, is_edit)
            event.target.focus()
        }
    }

    const handleChangeImage = () => refInputImage.current.click()

    const handleChangeInputImage = event => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0]
            const url = URL.createObjectURL(file)
            handlerChangeUlrImage(url)
            handlerChangeImage(file)
        } else {
            alert("Formato de Archivo no valido");
        }
    }

    const calculateScrollLoadingModal = () => setScrolltopcontentmodal(refContentModal.current.scrollTop + 'px')

    return <div className='modal' >
        <Modal
            open={openmodal}
            onClose={stateCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                ref={refContentModal}
                sx={styleModal}
                style={{
                    overflow: loading_save_edit_product ? 'hidden' : 'auto'
                }} >
                {
                    loading_save_edit_product ? <Box sx={styleLoadingSaveEditSku(scrolltopcontentmodal)} ><h3 style={styleLoadingSaveEditSkuMessage} >{is_edit ? 'Editando' :'Registrando'}...</h3></Box> : null
                }
                {
                    visiblemessagesaveeditpro ? <h3 style={styleMessageResponseSaveEditSku(saveeditsuccess)}>{message_save_edit_product}</h3> : null
                }
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {is_edit ? 'Editar Producto' :'Crear Producto'}
                </Typography>
                <Box className='blocks' style={styleBlocks} >
                    <Box className='block' style={styleBlock} >
                        <div style={styleDivModal} >
                            <label style={styleLabelModal} htmlFor="sku" >SKU</label>
                            <Box style={{ position: 'relative' }} >
                                <input type="text" id="sku" name="sku" value={sku} onChange={handlerChangeProduct} onKeyUp={handleValidateSku} style={{ width: '100%', background: color_valid_sku }} placeholder="sku" disabled={loading_valid_sku} />
                                {
                                    loading_valid_sku ? <div style={styleLoadingValidateSku} ><img style={{ maxWidth: '100%' }} src='/images/validate.gif' /></div> : null
                                }
                            </Box>
                        </div>
                        <div style={styleDivModal} >
                            <label style={styleLabelModal} htmlFor="nombre" >Nombre</label>
                            <input type="text" id="nombre" name="nombre" value={nombre} onChange={handlerChangeProduct} style={{ width: '100%' }}
                                placeholder="nombre" />
                        </div>
                        <div style={styleDivModal} >
                            <label style={styleLabelModal} htmlFor="descripcion" >Descripcion</label>
                            <textarea type="text" id="descripcion" name="descripcion" value={descripcion} onChange={handlerChangeProduct} style={{ width: '100%' }} placeholder="descripcion" ></textarea>
                        </div>
                        <div style={styleDivModal} >
                            <div style={styleDivDoubleModal} >
                                <label style={styleLabelModal} htmlFor="precio" >Precio</label>
                                <input type="text" id="precio" name="precio" value={precio} onChange={handlerChangeProduct} style={{ width: '98%' }} placeholder="precio" />
                            </div>
                            <div style={styleDivDoubleModal} >
                                <label style={styleLabelModal} htmlFor="costo" >Costo</label>
                                <input type="text" id="costo" name="costo" value={costo} onChange={handlerChangeProduct} style={{ width: '98%' }} placeholder="costo" />
                            </div>
                        </div>
                    </Box>
                    <Box className='block' style={styleBlock} >
                        <div style={styleDivModal} >
                            <div style={styleDivDoubleModal} >
                                <div style={styleDivModal} >
                                    <label style={styleLabelModal} htmlFor="stock" >Stock</label>
                                    <input type="text" id="stock" name="stock" value={stock} onChange={handlerChangeProduct} style={{ width: '100%' }} placeholder="stock" />
                                </div>
                            </div>
                            <div style={styleDivDoubleModal} >
                                <label style={styleLabelModal} htmlFor="estado" >Estado</label>
                                <select id="estado" name="estado" value={estado} onChange={handlerChangeProduct} style={{ width: '98%' }} >
                                    <option value="" >::Seleccione::</option>
                                    {
                                        estados.map(e => <option key={e.id} value={e.valor}>{e.nombre}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        <div style={styleDivModal} >
                            <div style={styleDivDoubleModal} >
                                <label style={styleLabelModal} htmlFor="categoria" >Categoria</label>
                                <select id="categoria" name="categoria" value={categoria} onChange={handlerChangeProduct} style={{ width: '98%' }} >
                                    <option value="" >::Seleccione::</option>
                                    {
                                        categorias.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)
                                    }
                                </select>
                            </div>
                            <div style={styleDivDoubleModal} >
                                <label style={styleLabelModal} htmlFor="almacen" >Almacen</label>
                                <select id="almacen" name="almacen" value={almacen} onChange={handlerChangeProduct} style={{ width: '98%' }} >
                                    <option value="" >::Seleccione::</option>
                                    {
                                        almacenes.map(e => <option key={e.id} value={e.valor}>{e.nombre}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        <div style={styleDivModal} >
                            <div style={styleDivDoubleModal} >
                                <label style={styleLabelModal} htmlFor="unidad_medida" >Unidad Medida</label>
                                <select id="unidad_medida" name="unidad_medida" value={unidad_medida} onChange={handlerChangeProduct} style={{ width: '98%' }} >
                                    <option value="" >::Seleccione::</option>
                                    {
                                        unidades_medidas.map(e => <option key={e.id} value={e.valor}>{e.nombre}</option>)
                                    }
                                </select>
                            </div>
                            <div style={styleDivDoubleModal} >
                                <label style={styleLabelModal} htmlFor="afectacion_sunat" >Afectacion Sunat</label>
                                <select id="afectacion_sunat" name="afectacion_sunat" value={afectacion_sunat} onChange={handlerChangeProduct} style={{ width: '98%' }} >
                                    <option value="" >::Seleccione::</option>
                                    {
                                        afectaciones_sunat.map(e => <option key={e.id} value={e.valor}>{e.nombre}</option>)
                                    }
                                </select>
                            </div>
                            <div style={styleDivModal} >
                                <label style={styleLabelModal} htmlFor="imagen" >Imagen</label>
                                <input type="file" ref={refInputImage} onChange={handleChangeInputImage} className='dnone' name="imagen" accept=".jpeg,.jpg,.png" />
                                <p style={{marginBottom: '.4rem'}} >
                                    <button onClick={handleChangeImage} >Buscar</button>
                                    {
                                        is_edit ?
                                            <button className='' onClick={handleEditImageProduct} >Editar</button> :null
                                    }
                                </p>
                                <img style={styleImage} src={url_imagen} name="url_imagen" />
                            </div>
                        </div>
                    </Box>
                </Box>
                <Box style={styleContentButtons} >
                    <button className='' onClick={stateCloseModal} >Cerrar</button>
                    {
                        is_edit ?
                            <button className='' onClick={handleEditProduct} >Editar</button> :
                            <button className='' onClick={handleSaveProduct} >Guardar</button>
                    }
                </Box>
            </Box>
        </Modal>
    </div >
};

export default WindowModal;