import CatalogoContext from "../context/CatalogoContext"

import Box from "@mui/material/Box";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import { useContext } from "react";
import { styleHeadTable, styleLoading } from "../utils/StyleBody";

const Body = () => {

    const { products, loading, getDetailProduct } = useContext(CatalogoContext)

    return <div className='body'>
        <h1>Estamos en el catalogo</h1>
        <Box className="content-products" >
            <Paper sx={{ width: '100%', overflow: 'hidden' }} >
                <TableContainer sx={{ maxHeight: 'calc(100vh - 79px)' }}>
                    <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={styleHeadTable} >Sku</TableCell>
                                <TableCell sx={styleHeadTable} align="center">Nombre</TableCell>
                                <TableCell sx={styleHeadTable} align="center">Categoria</TableCell>
                                <TableCell sx={styleHeadTable} align="center">A.Sunat</TableCell>
                                <TableCell sx={styleHeadTable} align="center">Precio</TableCell>
                                <TableCell sx={styleHeadTable} align="center">Costo</TableCell>
                                <TableCell sx={styleHeadTable} align="center">Stock</TableCell>
                                <TableCell sx={styleHeadTable} align="center">Estado</TableCell>
                                <TableCell sx={styleHeadTable} align="center">Accion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody
                            sx={{
                                '.MuiTableRow-root:nth-of-type(2n-1)': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                },
                            }}
                        >
                            {products.map((row) => (
                                <TableRow
                                    hover
                                    key={row.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '.MuiTableCell-root': {
                                            borderRight: '0.1rem solid #ddd!important',
                                        },
                                    }}
                                >
                                    <TableCell sx={{ width: '5%' }} align="center">{row.sku}</TableCell>
                                    <TableCell sx={{ width: '30%' }} align="left">{row.nombre}</TableCell>
                                    <TableCell sx={{ width: '10%' }} align="left">{row.categoria}</TableCell>
                                    <TableCell sx={{ width: '10%' }} align="right">{row.afectacion_sunat}</TableCell>
                                    <TableCell sx={{ width: '10%' }} align="right">{row.precio}</TableCell>
                                    <TableCell sx={{ width: '10%' }} align="right">{row.costo}</TableCell>
                                    <TableCell sx={{ width: '10%' }} align="right">{row.stock}</TableCell>
                                    <TableCell sx={{ width: '10%' }} align="center">{row.estado}</TableCell>
                                    <TableCell sx={{ width: '5%' }} align="center"><a src="#" onClick={() => getDetailProduct(row.id)} >editar</a></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
        {
            loading ?
                <Box style={styleLoading} >
                    <img src="/images/loading.gif" />
                </Box> : null
        }
    </div>
};

export default Body;