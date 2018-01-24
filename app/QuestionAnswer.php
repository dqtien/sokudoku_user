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

class QuestionAnswer extends Model
{
    use SoftDeletes;
    protected $table = "question_answer";

    /**
     * Relation with Question Model
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function question(){
        return $this->belongsTo(Question::class);
    }
}