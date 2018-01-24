<?php
/**
 * Created by PhpStorm.
 * User: Vu Hai
 * Date: 3/6/2017
 * Time: 1:35 PM
 */

namespace App;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class QuizType extends Model
{
    use SoftDeletes;
    protected $table = "quiz_type";
    
}