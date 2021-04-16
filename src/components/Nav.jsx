import React from 'react';
import { useHistory, NavLink } from "react-router-dom";
import Logo from "../assets/spot.svg";

const Nav = () => {
    const history = useHistory();
    return (
        <nav className="nav__container">
            {/*<Link to="/" className="nav__container__logo">*/}
                <img src={Logo} alt="Spot"
                     onClick={() => history.push("/")}
                />
            {/*</Link>*/}
            <ul className="navList">
                <li className="navList_li active">
                    <NavLink to="/" className="navList_a">
                        Главная
                    </NavLink>
                </li>
                <li className="navList_li active">
                    <NavLink to="/" className="navList_a">
                        Главная
                    </NavLink>
                </li>
                <li className="navList_li active">
                    <NavLink to="/" className="navList_a">
                        Главная
                    </NavLink>
                </li>
                <li className="navList_li active">
                    <NavLink to="/" className="navList_a">
                        Главная
                    </NavLink>
                </li>
                <li className="navList_li active">
                    <NavLink to="/" className="navList_a">
                        Главная
                    </NavLink>
                </li>
                <li className="navList_li active">
                    <NavLink to="/" className="navList_a">
                        Главная
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
export default Nav;