import React from 'react';
import { useHistory, NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import {useSelector} from "react-redux";

const Nav = ({id}) => {
    const history = useHistory();
    let user = useSelector(({users}) => users.user);

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
                {user && <li className="navList_li active">
                    <NavLink to={`/profile/${user.id}`} className="navList_a">
                        Профиль
                    </NavLink>
                </li>}
                <li className="navList_li active">
                    <NavLink to="/events" className="navList_a">
                        События
                    </NavLink>
                </li>
                <li className="navList_li active">
                    <NavLink to="/" className="navList_a">
                        Подписки
                    </NavLink>
                </li>
                <li className="navList_li active">
                    <NavLink to="/" className="navList_a">
                        Сообщения
                    </NavLink>
                </li>
                <li className="navList_li active">
                    <NavLink to="/" className="navList_a">
                        Уведомления
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
export default Nav;