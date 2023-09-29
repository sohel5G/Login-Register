import { Link } from "react-router-dom";


const About = () => {
    return (
        <div>
            <h1 className="text-7xl text-center">About page coming soon</h1>
            <h1 className="text-4xl text-center mt-20 text-yellow-500">
                <Link to={'/register'}>Click on Register & Login to check this job</Link>
            </h1>
        </div>
    );
};

export default About;