<?php
/**
 * Created by PhpStorm.
 * User: Vu Hai
 * Date: 3/7/2017
 * Time: 3:10 PM
 */

namespace App;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class QuestionType extends Model
{
    use SoftDeletes;
    protected $table = 'question_type';

    /**
     * Relation with question
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function question(){
        return $this->hasMany(Question::class,'question_type_id', 'id');
    }
}