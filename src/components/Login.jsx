import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            if (isSignup) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                onLogin(userCredential.user);
            } else {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                onLogin(userCredential.user);
            }
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }
    };

    return (
        <div className='bg-gray-800 p-6 rounded-lg max-w-md mx-auto mt-6'>
            <h2 className='text-2xl font-bold mb-4'>{isSignup ? 'Sign Up' : 'Login'}</h2>
            <form onSubmit={handleAuth}>
                <input 
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full p-2 mb-4 bg-gray-900 rounded border border-gray-700'
                />
                <input 
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full p-2 mb-4 bg-gray-900 rounded border border-gray-700'
                />
                <button type='submit' className='btn-primary w-full'>{isSignup ? 'Sign Up' : 'Login'}</button>
            </form>
            <p className='mt-2 text-gray-400'>
                {isSignup ? 'Already have an account? ' : "Don't have an account? "}
                <button onClick={() => setIsSignup(!isSignup)} className='text-blue-400'>{isSignup ? 'Login' : 'Sign Up'}
                    {isSignup ? 'Login' : 'Sign Up'}
                </button>
            </p>
        </div>
    );
}

export default Login;