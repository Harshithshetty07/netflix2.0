import React from 'react';
import { IoIosArrowDropdown } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { API_END_POINT } from '../utils/constant';
import axios from 'axios';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setToggle } from '../redux/movieSlice';

const Header = () => {
    const user = useSelector((store) => store.app.user);
    const toggle = useSelector((store) => store.movie.toggle);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${API_END_POINT}/logout`);
            if (res.data.success) {
                toast.success(res.data.message);
            }
            dispatch(setUser(null));
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const toggleHandler = () => {
        dispatch(setToggle());
    };

    return (
        <div className="absolute z-10 flex w-full items-center justify-between px-4 lg:px-2 bg-gradient-to-b from-black">
            <img
                className="w-24 sm:w-32 md:w-40 lg:w-56"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"
                alt="netflix-logo"
            />
            {user && (
                <div className="flex items-center">
                    <IoIosArrowDropdown size="24px" color="white" />
                    <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white ml-2 sm:ml-4">
                        {user.fullName}
                    </h1>
                    <div className="ml-2 sm:ml-4 flex">
                        <button
                            onClick={logoutHandler}
                            className="bg-red-800 text-white px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm md:text-base"
                        >
                            Logout
                        </button>
                        <button
                            onClick={toggleHandler}
                            className="bg-red-800 text-white px-2 sm:px-4 py-1 sm:py-2 ml-1 sm:ml-2 text-xs sm:text-sm md:text-base"
                        >
                            {toggle ? 'Home' : 'Search Movie'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
