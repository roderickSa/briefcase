<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/info', function () {
//     phpinfo();
//     return;
// });

Route::group(
    ['middleware' => 'chklogged', 'namespace' => '\App\Http\Controllers\auth'],
    function () {
        Route::get('/login', 'AuthController@login')->name('login.signin');
        Route::get('/register', 'AuthController@register')->name('register.signup');
    }
);
Route::post('/login', [\App\Http\Controllers\auth\AuthController::class, 'auth'])->name('login.auth');
Route::post('/register', [\App\Http\Controllers\auth\AuthController::class, 'save'])->name('register.save');

//home
Route::group(['middleware' => 'auth', 'namespace' => '\App\Http\Controllers\home'], function () {
    Route::get('/', 'HomeController@index')->name('home.index');
});

//catalogo
Route::group(['middleware' => 'auth', 'namespace' => '\App\Http\Controllers\catalogo'], function () {
    Route::get('/catalogo', 'CatalogoController@index')->name('catalogo.index');
    Route::post('/catalogo/resources-catalogo', 'CatalogoController@resources_catalogo');
    Route::post('/catalogo/listar-catalogo', 'CatalogoController@listar_productos');
    Route::post('/catalogo/verificar-sku-catalogo', 'CatalogoController@verificar_sku');
    Route::post('/catalogo/crear-producto-catalogo', 'CatalogoController@nuevo_producto');
    Route::post('/catalogo/editar-producto-catalogo', 'CatalogoController@editar_producto');
    Route::post('/catalogo/editar-imagen-producto-catalogo', 'CatalogoController@editar_imagen_producto');
    Route::post('/catalogo/listar-detalle-catalogo', 'CatalogoController@detalle_producto');
});