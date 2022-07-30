@extends('layouts.app')

@section('title', 'Registrarme')

@section('styles')
<link rel="stylesheet" href="{{ asset('module_register/css/app.css') }}">
@endsection

@section('content')
<div class="center">
    <h1>Registrarme</h1>
    <form action="{{ route('register.save') }}" method="POST">
        @if (Session::get('fail'))
        <div class="alert alert-danger">
            {{Session::get('fail')}}
        </div>
        @endif
        @csrf
        <div class="form-control txt_field">
            <input type="text" name="nombres" class="form-control" value="{{old('nombres')}}" onchange="this.setAttribute('value', this.value);" />
            <span></span>
            <label for="">Nombres</label>
        </div>
        <p class="text-danger">{{implode('',$errors->get('nombres'))}}</p>
        <div class="form-control txt_field">
            <input type="text" name="correo" class="form-control" value="{{old('correo')}}" onchange="this.setAttribute('value', this.value);" />
            <span></span>
            <label for="">Correo</label>
        </div>
        <p class="text-danger">{{implode('',$errors->get('correo'))}}</p>
        <div class="form-control txt_field">
            <input type="password" name="passwd" class="form-control" onchange="this.setAttribute('value', this.value);" />
            <span></span>
            <label for="">Contraseña</label>
        </div>
        <p class="text-danger">{{implode('',$errors->get('passwd'))}}</p>
        <input type="submit" class="btn btn-success btn-lg" value="Registrarme" />
        <div class="signup_link">
            Ya estas registado? <a href="{{route('login.signin')}}">Login</a>
        </div>
    </form>
</div>
@endsection

@section('scripts')
<script src="{{ asset('module_register/js/app.js') }}"></script>
@endsection