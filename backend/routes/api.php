<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClassroomUploadController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\GradesController;
use App\Http\Controllers\OTPController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ValidIDsController;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\ValidIDs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('classroom-upload', ClassroomUploadController::class);
Route::apiResource('students', StudentController::class);
Route::apiResource('teachers', TeacherController::class);
Route::apiResource('sections', SectionController::class);
Route::apiResource('subjects', SubjectController::class);
Route::apiResource('courses', CourseController::class);
Route::apiResource('grades', GradesController::class);
Route::apiResource('valid-ids', ValidIDsController::class);

Route::post('/grades/student', [GradesController::class, 'getStudentGrades']);

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::post('/send-otp', [OTPController::class, 'sendOtpSignup']);
Route::post('/verify-otp', [OTPController::class, 'verifyOTP']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $req) {
        $user = $req->user();
        $user_creds = $user->user_type === 'S'
            ? Student::where('id', $user->id)->first()
            : ($user->user_type === 'T'
                ? Teacher::where('id', $user->id)->first()
                : null);

        if (!$user_creds) return response()->json(['error' => 'Unauthorized'], 400);

        return [
            'user' => $user,
            'user_creds' => $user_creds
        ];
    });

    Route::get('/all-valid-ids', function (Request $req) {
        $user = $req->user();
        $user_creds = $user->user_type === 'S'
            ? Student::where('id', $user->id)->first()
            : ($user->user_type === 'T'
                ? Teacher::where('id', $user->id)->first()
                : null);

        if (!$user_creds || !$user_creds->isAdmin) return response()->json(['error' => 'Unauthorized'], 400);

        return [
            'valid_ids' => ValidIDs::all()
        ];
    });

    // routes for updating profile pictures
    Route::post('/students/{student}/update-profile-picture', [StudentController::class, 'updateProfilePicture']);
    Route::post('/teachers/{teacher}/update-profile-picture', [TeacherController::class, 'updateProfilePicture']);

    // routes for adding and removing students in a section
    Route::post('/sections/{section}/add-student', [SectionController::class, 'addStudent']);
    Route::delete('/sections/{section}/remove-student', [SectionController::class, 'removeStudent']);



    Route::post('logout', [AuthController::class, 'logout']);
});
