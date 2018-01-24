<?php
/**
 * Created by PhpStorm.
 * User: Vu Hai
 * Date: 3/6/2017
 * Time: 1:33 PM
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class QuizAttempt extends Model
{
    protected $table = "quiz_attempt";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'quiz_type_id', 'users_id'
    ];
}