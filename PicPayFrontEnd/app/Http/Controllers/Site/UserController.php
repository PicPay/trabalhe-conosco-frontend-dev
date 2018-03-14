<?php

namespace App\Http\Controllers\Site;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Tela principal, lista as pessoas que podem receber pagamentos
     *
     */
    public function lista_usuarios()
    {
		return view('site.pages.home');
    }
}
