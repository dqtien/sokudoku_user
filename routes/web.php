<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



//route for authentication
\Illuminate\Support\Facades\Auth::routes();

//change method of default request logout
Route::get('logout', 'Auth\LoginController@logout')->name('out');

//route require authentication
Route::group(['middleware' => ['auth', 'status']], function(){
        //quiz
        Route::get('get-question/{question_type?}', 'QuizController@get_question')->name('quiz.get_question');
        Route::get('get-questions-brain-spark', 'QuizController@get_questions_brain_spark')->name('quiz.get_questions_brain_spark');
        Route::get('get-questions-eye-exercise', 'QuizController@get_questions_eye_exercise')->name('quiz.get_questions_eye_exercise');
        Route::get('do-quiz/{quiz_type?}', 'QuizController@do_quiz')->name('quiz.do');
        Route::get('quiz/{type?}', 'QuizController@index')->name('quiz.index');
        
        //home
        Route::get('/', 'HomeController@index')->name('home');
});