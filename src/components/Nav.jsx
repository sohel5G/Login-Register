import { Link } from "react-router-dom";


const Nav = () => {

    return (
        <>
            <div className='flex justify-center bg-gray-800 my-16 py-6'>
                <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
                    <li> <Link className='hover:bg-white' to={'/'}> Home </Link> </li>
                    <li> <Link className='hover:bg-white' to={'/about'}> About </Link> </li>
                    <li> <Link className='hover:bg-white' to={'/login'}> LogIn </Link> </li>
                    <li> <Link className='hover:bg-white' to={'/register'}> Register </Link> </li>
                    <li> <Link className='hover:bg-white' to={'/contact'}> Contact </Link> </li>
                </ul>

            </div>
        </>
    );
};

export default Nav;