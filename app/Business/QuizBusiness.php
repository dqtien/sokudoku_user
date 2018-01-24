<?php
namespace App\Business;

use App\Question;
use App\QuizAttempt;
use App\QuizType;
use Illuminate\Http\Request;
use App\Http\Requests;
use Response;
use Illuminate\Support\Facades\Input;

class QuizBusiness {

    /**
     * Get quiz type
     * @param $name
     * @return mixed
     */
    public function get_quiz_type_by_name($name){
        return QuizType::where('name', $name)->first();
    }
    
    /**
     * Store quiz attempt
     * @param $data
     * @return static
     */
    public function attempt_quiz($data){
        $quiz_attempt = QuizAttempt::create($data);
        
        return $quiz_attempt;
    }

    /**
     * @param $question_type
     * Get question
     * @return mixed
     */
    public function get_question($question_type){
       
        $question = Question::where('status', \Constant::QUESTION_STATUS_ACTIVE);
        if ($question_type != null){
            $question->where('question_type_id', $question_type);
        }
        return $question->get();
    }

    /**
     * Get questions of Brain Spark
     * @return mixed
     */
    public function get_questions_brain_spark(){
        $question = Question::where('status', \Constant::QUESTION_STATUS_ACTIVE);
        
        // Random
        if (!empty(Input::get('type')) && Input::get('type') == 'random') {
            $type = Input::get('type');
            $level = (!empty(Input::get('level'))) ? (int)Input::get('level') : 1;
            
            $question->where('question_type_id', 1);
            $question->where('level', $level);
        }
        
        // Sentence
        else {
            $type = 'sentence';
            $writing = (!empty(Input::get('writing')) && Input::get('writing') == 'vertical') ? Input::get('writing') : 'horizon';
            $lineType = (!empty(Input::get('lineType')) && Input::get('lineType') == 'single') ? Input::get('lineType') : 'multiple';
            
            $question->where('question_type_id', 2);
            $question->where('writing', $writing);
            $question->where('line_type', $lineType);
        }
        
        return $question->orderByRaw("RAND()")->pluck('content')->take(100)->all();
    }

    /**
     * Get questions of Brain Spark
     * @return mixed
     */
    public function get_questions_eye_exercise(){
        $question = Question::where('status', \Constant::QUESTION_STATUS_ACTIVE);
        
        // Symbol
        if (!empty(Input::get('type')) && Input::get('type') == 'symbol') {
            $type = Input::get('type');
            
            $question->where('question_type_id', 4);
            return $question->orderByRaw("RAND()")->pluck('content')->take(100)->all();
        }
        
        // Sentence
        else {
            $type = 'sentence';
            
            $question->where('question_type_id', 5);
            return $question->orderByRaw("RAND()")->pluck('content')->first();
        }
    }
}