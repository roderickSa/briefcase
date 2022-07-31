<?php

namespace App\Http\Controllers\catalogo;

use App\Http\Controllers\Controller;
use App\Models\Catalogo;
use App\Models\Categoria;
use App\Models\Estado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Intervention\Image\ImageManagerStatic as Image;

class CatalogoController extends Controller
{


    public function index()
    {
        return view('catalogo.index');
    }

    public function resources_catalogo()
    {
        $categorias = Categoria::all();
        $estados = Estado::where('tipo', '=', 1)->get();
        $almacenes = Estado::where('tipo', '=', 2)->get();
        $unidades_medidas = Estado::where('tipo', '=', 3)->get();
        $afectaciones_sunat = Estado::where('tipo', '=', 4)->get();
        return response()->json([
            'categorias' => $categorias,
            'estados' => $estados,
            'almacenes' => $almacenes,
            'unidades_medidas' => $unidades_medidas,
            'afectaciones_sunat' => $afectaciones_sunat,
        ], 200);
    }

    public function listar_productos()
    {
        return response()->json(Catalogo::listado_productos(), 200);
    }
    public function verificar_sku(Request $request)
    {
        $is_edit = $request->is_edit;
        $id = $request->id;
        $sku = $request->sku;
        if(!$is_edit){
            $find_save = Catalogo::where('sku', '=', $sku)->get()->first();
            if (empty($find_save->id)) {
                return response()->json(true, 200);
            }
            return response()->json(false, 200);
        }
        $find_edit = Catalogo::where([['sku', '=', $sku],['id', '!=', $id]])->get()->first();
        if (empty($find_edit->id)) {
            return response()->json(true, 200);
        }
        return response()->json(false, 200);
    }
    public function nuevo_producto(Request $request)
    {
        $entry = $request->except('imagen');
        $imagen = $request->file('imagen');
        #validamos sku existente
        $find = Catalogo::where('sku', '=', $entry['sku'])->get()->first();
        if (!empty($find->id)) {
            return response()->json([
                'response' => false,
                'message' => 'Sku ya existe, por favo elija otro'
            ], 200);
        }
        $extension_imagen = $imagen->getClientOriginalExtension();
        if (!in_array($extension_imagen, ['png', 'jpg', 'jpeg'])) {
            return response()->json([
                'response' => false,
                'message' => 'Formato de imagen invalido, use: png, jpg, jpeg'
            ], 200);
        }
        $image_resize = Image::make($imagen->getRealPath());
        $image_resize->resize(400, 270, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });
        $image_resize->orientate();
        $name_image = $entry['sku'] . '_' . time() . '.' . $extension_imagen;
        $image_resize->save(public_path('images/products/' . $name_image));
        #registramos el producto
        $new_product = new Catalogo();
        $new_product->sku = $entry['sku'];
        $new_product->nombre = $entry['nombre'];
        $new_product->descripcion = $entry['descripcion'];
        $new_product->stock = $entry['stock'];
        $new_product->id_estado = $entry['estado'];
        $new_product->precio = $entry['precio'];
        $new_product->costo = $entry['costo'];
        $new_product->id_categoria = $entry['categoria'];
        $new_product->id_almacen = $entry['almacen'];
        $new_product->imagen = $name_image;
        $new_product->id_unidad_medida = $entry['unidad_medida'];
        $new_product->id_afectacion_sunat = $entry['afectacion_sunat'];
        $new_product->id_usuario_creacion = Auth::id();
        $new_product->save();
        return response()->json([
            'response' => true,
            'new_id' => $new_product->id,
            'message' => 'Producto registrado exitosamente'
        ], 200);
    }
    public function editar_producto(Request $request)
    {
        $entry = $request->all();
        if (empty($entry['id'])) {
            return response()->json([
                'response' => false,
                'message' => 'No se encontro el producto a actualizar'
            ], 200);
        }
        #validamos sku existente y es distinto al sku que ya se poseee
        $find = Catalogo::where([['sku', '=', $entry['sku']], ['id', '!=', $entry['id']]])->get()->first();
        if (!empty($find->id)) {
            return response()->json([
                'response' => false,
                'message' => 'Sku ya existe, por favo elija otro'
            ], 200);
        }
        #actualzamos el producto
        Catalogo::where('id', '=', $entry['id'])->update([
            'sku' => $entry['sku'],
            'nombre' => $entry['nombre'],
            'descripcion' => $entry['descripcion'],
            'stock' => $entry['stock'],
            'id_estado' => $entry['estado'],
            'precio' => $entry['precio'],
            'costo' => $entry['costo'],
            'id_categoria' => $entry['categoria'],
            'id_almacen' => $entry['almacen'],
            'id_unidad_medida' => $entry['unidad_medida'],
            'id_afectacion_sunat' => $entry['afectacion_sunat'],
        ]);
        return response()->json([
            'response' => true,
            'message' => 'Producto editado exitosamente'
        ], 200);
    }
    public function editar_imagen_producto(Request $request)
    {
        $entry = $request->except('imagen');
        $imagen = $request->file('imagen');
        $extension_imagen = $imagen->getClientOriginalExtension();
        if (!in_array($extension_imagen, ['png', 'jpg', 'jpeg'])) {
            return response()->json([
                'response' => false,
                'message' => 'Formato de imagen invalido, use: png, jpg, jpeg'
            ], 200);
        }
        $image_resize = Image::make($imagen->getRealPath());
        $image_resize->resize(400, 270, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });
        $image_resize->orientate();
        $name_image = $entry['sku'] . '_' . time() . '.' . $extension_imagen;
        $image_resize->save(public_path('images/products/' . $name_image));
        #removemos imagen anterior
        // if(file_exists($entry['url_imagen'])){
        //     unlink($entry['url_imagen']);
        // }
        $find_image = Catalogo::where('id', '=', $entry['id'])->get()->first();
        if(File::exists(public_path('images/products/' . $find_image->imagen))){
            File::delete(public_path('images/products/' . $find_image->imagen));
        }
        #actualzamos el producto
        Catalogo::where('id', '=', $entry['id'])->update([
            'imagen' => $name_image,
        ]);
        return response()->json([
            'response' => true,
            'message' => 'Imagen editada exitosamente'
        ], 200);
    }
    public function detalle_producto(Request $request)
    {
        $product = Catalogo::where('id','=',$request->product_id)->get()->first();
        return response()->json($product, 200);
    }
}
