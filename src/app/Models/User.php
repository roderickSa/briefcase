<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Validator;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'usuarios';

    protected $fillable = [
        'nombres',
        'correo',
        'passwd',
    ];

    protected $hidden = [
        'passwd',
    ];

    public function getAuthPassword()
    {
        return $this->passwd;
    }

    public static function validate_login($credentials){
        Validator::make($credentials, [
            'correo' => 'required|email',
            'passwd' => 'required',
        ], [
            'passwd.required' => 'El campo contraseña es requerido.',
            'correo.required' => 'El campo correo es requerido.',
            'correo.email' => 'El campo correo no cumple con el formato de email.',
        ])->validate();
    }

    public static function validate_signin($credentials)
    {
        Validator::make($credentials, [
            'nombres' => 'required|min:3',
            'correo' => 'required|email|unique:usuarios,correo',
            'passwd' => 'required|min:5|max:20',
        ], [
            'passwd.required' => 'El campo contraseña es requerido.',
            'passwd.max' => 'El campo contraseña deber tener una longitud maxima de :max caracteres.',
            'passwd.min' => 'El campo contraseña deber tener una longitud minima de :min caracteres.',
            'correo.required' => 'El campo correo es requerido.',
            'correo.email' => 'El campo correo no cumple con el formato de email.',
            'correo.unique' => 'El correo ingresado ya existe.',
            'nombres.required' => 'El campo nombres es requerido.',
            'nombres.min' => 'El campo nombres deber tener una longitud minima de :min caracteres.',
        ])->validate();
    }
}
