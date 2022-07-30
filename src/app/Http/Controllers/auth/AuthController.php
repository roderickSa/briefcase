<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login()
    {
        return view('login');
    }
    public function auth(Request $request)
    {
        User::validate_login($request->only(['correo', 'passwd']));

        // $user = User::where('correo', '=',$request->correo)->first();
        // if(!$user){
        //     return back()->with('fail', 'Correo o contraseña incorrectas');
        // }
        // if (Auth::attempt($request->only(['correo', 'passwd']))) {
        if (Auth::attempt(['correo' => $request->correo, 'password' => $request->passwd])) {
            return redirect('/');
        }
        return back()->with('fail', 'Correo o contraseña incorrectas');
    }
    public function register()
    {
        return view('register');
    }
    public function save(Request $request)
    {
        User::validate_signin($request->only(['nombres', 'correo', 'passwd']));

        User::create([
            'nombres' => $request->nombres,
            'correo' => $request->correo,
            'passwd' => Hash::make($request->passwd),
        ]);
        return redirect('/');
    }
    public function username()
    {
        return 'correo';
    }
}
