<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Catalogo extends Model
{
    use HasFactory;

    protected $table = 'productos';
    protected $fillable = [
        'id',
        'sku',
        'nombre',
        'descripcion',
        'stock',
        'id_estado',
        'precio',
        'costo',
        'id_categoria',
        'id_almacen',
        'imagen',
        'id_unidad_medida',
        'id_afectacion_sunat',
        'id_usuario_creacion',
        'created_at',
        'updated_at',
    ];

    public static function listado_productos()
    {
        $sql = "
            SELECT
            p.id,
            p.sku,
            p.nombre,
            p.descripcion,
            p.stock,
            p.precio,
            p.costo,
            p.imagen,
            c.nombre AS categoria,
            e1.nombre AS estado,
            e2.nombre AS almacen,
            e3.nombre AS unidad_medida,
            e4.nombre AS afectacion_sunat
            FROM productos p
            INNER JOIN categorias c ON c.id = p.id_categoria
            INNER JOIN estados e1 ON e1.valor = p.id_estado AND e1.tipo = 1
            INNER JOIN estados e2 ON e2.valor = p.id_almacen AND e2.tipo = 2
            INNER JOIN estados e3 ON e3.valor = p.id_unidad_medida AND e3.tipo = 3
            INNER JOIN estados e4 ON e4.valor = p.id_afectacion_sunat AND e4.tipo = 4
            ORDER BY p.nombre
        ";
        return DB::select($sql);
    }
}
