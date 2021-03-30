import React from 'react';
import { Home } from '../assets'
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Nav = () => {
    return (
        <nav className="nav__container">
            <ul className="navList">
                <li>
                    <Link to="/" className="navList_li active">
                        {/*<img src={Home} alt="home page" />*/}
                        kjhkh;
                    </Link>
                </li>
                <li>
                </li>
            </ul>
        </nav>
    );
}
export default Nav;