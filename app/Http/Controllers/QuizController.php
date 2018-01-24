<?php
/**
 * Created by PhpStorm.
 * User: Vu Hai
 * Date: 3/6/2017
 * Time: 1:36 PM
 */

namespace App\Http\Controllers;


use App\Business\QuizBusiness;
//use Illuminate\Support\Facades\Auth;

class QuizController extends Controller
{
    private $quizBusiness;

    public function __construct(QuizBusiness $quizBusiness){
        $this->quizBusiness = $quizBusiness;
    }

    /**
     * Quiz index
     * @param $type string
     * @return bool
     */
    protected function index($type = null){
          switch ($type){
              case "brain":
                  return view('quiz.brain', compact('type'));
              case "eye":
                  return view('quiz.eye', compact('type'));
              case "speed":
                  return view('quiz.speed', compact('type'));
              case "measurement":
                  return view('quiz.measurement', compact('type'));
              default:
                  abort(500);
                  return false;
          }
    }

    /**
     * Do quiz
     * @param null $quiz_type
     * @return bool
     */
    protected function do_quiz($quiz_type = null){
        //save quiz attempt
        $type = $this->quizBusiness->get_quiz_type_by_name($quiz_type);
        $data = array();
        $data['quiz_type_id'] = $type->id;
        $data['users_id'] = \Auth::user()->id;
        $attempt = $this->quizBusiness->attempt_quiz($data);

        //return view
        if ($attempt){
            switch ($quiz_type) {
                case "brain":
                    return view('quiz.brain-do-quiz', compact('quiz_type'));
                case "eye":
                    return view('quiz.eye-do-quiz', compact('quiz_type'));
                case "speed":
                    return view('quiz.speed-do-quiz', compact('quiz_type'));
                default:
                    abort(500);
                    return false;
            }
        }else{
            abort(500);
            return false;
        }

    }
    
    protected function get_question($question_type = null){
        $questions = $this->quizBusiness->get_question($question_type);
        
        return json_encode($questions);
    }
    
    protected function get_questions_brain_spark(){
        $questions = $this->quizBusiness->get_questions_brain_spark();
        
        return json_encode($questions);
    }
    
    protected function get_questions_eye_exercise(){
        $questions = $this->quizBusiness->get_questions_eye_exercise();
        
        return json_encode($questions);
    }

}