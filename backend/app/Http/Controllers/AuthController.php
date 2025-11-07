<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    // This function handles user login - when someone tries to sign into their account
    public function login(LoginRequest $request){

        // Validate the incoming data (email and password) using rules from LoginRequest
        // This checks if the data is in the correct format
        $data = $request->validated();

        // Try to log the user in with the provided email and password
        // Auth::attempt() checks if these credentials match any user in the database
        if(!Auth::attempt($data)){
            // If login fails (wrong email or password), return an error message
            return response([
                'message' => 'email or password are wrong'
            ], 422);
        }

        // If login is successful, get the currently logged-in user's information
        $user = Auth::user();

        // Create a new access token for this user session
        // This token acts like a temporary pass for this login session
        $token = $user->createToken('main')->plainTextToken;

        // Return the user info and token as JSON response
        // The frontend will use this token for future requests
        return response()->json([
            'user' => $user,   // Send the user details
            'token' => $token  // Send the new access token
        ]);
    }

    // This function handles user registration - like when someone signs up for a new account
    public function register(RegisterRequest $request){

        // Validate the incoming data (name, email, password) using rules from RegisterRequest
        // This checks if the data is proper and safe to use
        $data = $request->validated();

        // Create a new user in the database with the validated data
        $user = User::create([
            'name' => $data['name'],          // Store the user's name
            'email' => $data['email'],        // Store the user's email
            'password' => bcrypt($data['password']), // Encrypt the password for security
        ]);

        // Create an access token for the new user
        // This token acts like a digital key that allows the user to access protected areas
        $token = $user->createToken('main')->plainTextToken;

        // Return the user info and token as JSON response
        // This is what gets sent back to the frontend (like your React app)
        return response()->json([
            'user' => $user,   // Send the user details
            'token' => $token  // Send the access token
        ]);
    }

    // This function handles user logout - when someone wants to sign out of their account
    public function logout(Request $request){

        // Get the currently logged-in user from the request
        // The user is identified by the token they sent with the request
        $user = $request->user();

        // Delete the current access token that was used for this request
        // This makes the token invalid, so it can't be used again
        $user->currentAccessToken()->delete();

        // Return an empty response with status code 200 (success)
        // This tells the frontend that logout was successful
        return response('', 204);
    }
}
