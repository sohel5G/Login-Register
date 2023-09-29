import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "./code_init";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPass, setShowPass] = useState(true);

    const handleRegisterSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        const CfPassword = e.target.CfPassword.value
        const fname = e.target.fname.value
        const terms = e.target.terms.checked

        setError('')
        setSuccess('')

        if (password.length < 6) {
            setError('Password should be at least 6 characters ');
            return
        } else if (!(password === CfPassword)) {
            setError('Confirm field password not match, Please double check');
            return
        } else if (!/[A-Z]/.test(password)) {
            setError('Password must be at last one Uppercase latter')
        } else if (!terms) {
            setError('Please accept the terms and condition to proceed')
            return;
        }


        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                sendEmailVerification(user)
                    .then(() => {
                        setSuccess(`"Success", A verification email has been sent to this email ${user?.email}, please check your email and verify your account.`)
                    })
                
                updateProfile(auth.currentUser, {
                    displayName: fname
                }).then(() => {
                    // Profile updated!
                }).catch((error) => {
                    console.log('profile up ERR: ', error)
                });

            })
            .catch((registerdError) => {
                setError(registerdError.message);
            });
    }

    return (
        <>
            <div>
                {error && <p className="text-center text-red-500 mb-11 text-2xl"> {error}</p>}
                {success && <p className="text-center text-green-500 mb-11 text-2xl"> {success}</p>}
            </div>
            <section>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create and account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleRegisterSubmit}>
                                <div>
                                    <label
                                        htmlFor="fname"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fname"
                                        id="fname"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Full Name"
                                        required
                                    />
                                </div>
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
                                <div>
                                    <label
                                        htmlFor="confirm-password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Confirm password
                                    </label>
                                    <input
                                        type="confirm-password"
                                        name="CfPassword"
                                        id="confirm-password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            name="terms"
                                            aria-describedby="terms"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"

                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="terms"
                                            className="font-light text-gray-500 dark:text-gray-300"
                                        >
                                            I accept the{" "}
                                            <a
                                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                                href="#"
                                            >
                                                Terms and Conditions
                                            </a>
                                        </label>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Create an account
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account?{" "}
                                    <Link to={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Login here </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Register;