<?php
/**
 * Created by PhpStorm.
 * User: Vu Hai
 * Date: 3/6/2017
 * Time: 1:34 PM
 */

namespace App;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Question extends Model
{
    use SoftDeletes;
    protected $table = "questions";

    /**
     * Relation with Question Answer Model
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function answer(){
        return $this->hasMany(QuestionAnswer::class);
    }

    /**
     * Relation with Question type
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function type(){
        return $this->belongsTo(QuizType::class, 'question_type_id');
    }
}