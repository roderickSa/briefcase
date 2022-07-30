<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Picking extends Model
{
    use HasFactory;
    public static function listado_ordenes()
    {
        $sql = "
            SELECT
            o.id AS id_orden,
            o.total,
            o.estado,
            o.created_at,
            u.nombres AS usuario
            FROM ordenes o
            INNER JOIN usuarios u ON u.id = o.id_usuario
            ORDER BY o.id DESC
        ";
        return DB::select($sql);
    }
    public static function detalle_orden($id_orden)
    {
        $sql = "
            SELECT
            o.id AS id_orden,
            p.id AS id_producto,
            p.sku,
            p.nombre AS producto,
            do.cantidad,
            do.ncantidad,
            do.subtotal,
            do.total,
            do.estado,
            p.imagen,
            p.id_categoria,
            c.nombre AS categoria,
            u.nombres AS usuario,
            do.updated_at
            FROM ordenes o
            INNER JOIN ordenes_detalle DO ON do.id_orden = o.id
            INNER JOIN productos p ON p.id = do.id_producto
            INNER JOIN categorias c ON c.id = p.id_categoria
            LEFT JOIN usuarios u ON u.id = do.id_usuario
            WHERE
            o.id = '$id_orden'
            ORDER BY p.id_categoria DESC
        ";
        return DB::select($sql);
    }
}
