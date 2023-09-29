import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "./code_init";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';


const Login = () => {

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [showPass, setShowPass] = useState(true);
    const [userName, setUserName] = useState('')
    const emailRef = useRef(null);

    const handleLoginSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value

        setSuccess('');
        setError('');
        setUserName('');

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user.emailVerified) {
                    setSuccess(`Logged in successfully > ${user?.email}`)
                } else {
                    setSuccess(`Logged in successfully > ${user?.email} but email not verified`)
                }
                setUserName(user?.displayName);
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    const handleForgetPass = () => {

        setSuccess('');
        setError('');

        const email = emailRef.current.value;
        if (!email) {
            setError('Please enter your account email address so that we can send password reset link')
            return
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setError('Please write a valid email address');
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setSuccess(`Please check your email ${email} inbox, we send a password reset link`)
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
            });

    }


    return (
        <>
            <div>
                {
                    userName && <h1 className="text-center text-sky-500 text-3xl mb-10">welcome back  {userName}</h1>
                }
                <div>
                    {error && <p className="text-center text-red-500 mb-11 text-2xl"> {error}</p>}
                    {success && <p className="text-center text-green-500 mb-11 text-2xl"> {success}</p>}
                </div>
            </div>
            <section className="">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleLoginSubmit}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        ref={emailRef}
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPass ? "password" : "text"}
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                        />
                                        <p className="absolute top-3 right-3">
                                            {showPass ? <AiOutlineEyeInvisible onClick={() => setShowPass(false)} className="text-gray-400 text-xl cursor-pointer" /> : <AiOutlineEye onClick={() => setShowPass(true)} className="text-gray-400 text-xl cursor-pointer" />}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label
                                                htmlFor="remember"
                                                className="text-gray-500 dark:text-gray-300"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <a
                                        onClick={handleForgetPass}
                                        className="text-sm font-medium text-primary-600 hover:underline text-white cursor-pointer"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?{" "}
                                    <Link to={'/register'} className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Sign up </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Login;