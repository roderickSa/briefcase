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

// Route::get('/', function () {
//     return json_encode(['message' => 'hello roderick']);
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
