@extends('site.template.main')

@section('content')

@include('site.includes.lista_usuarios')

@include('site.includes.modal')

@include('site.includes.pagamento')
@include('site.includes.recibo')
@include('site.includes.escolher_cartao')
@include('site.includes.cadastro_cartao')
 
@endsection
