<?php
namespace App\Http\Controllers;
/**
 * Created by PhpStorm.
 * User: Vu Hai
 * Date: 2/27/2017
 * Time: 11:13 AM
 */
class HomeController extends Controller{
    
    protected function index(){
        return view('welcome');
    }
}
