import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../redux/actions/users";
import {NavLink, useHistory, useParams} from "react-router-dom";

const Menu = React.memo(function Menu() {
    const dispatch = useDispatch();
    const menuRef = React.useRef();
    const history = useHistory();
    const [height, setHeight] = React.useState(0);
    let profile = useSelector(({users}) => users.user);
    let { id } = useParams();

    const handleOutsideClick = (e) => {
        const path = e.path || (e.composedPath && e.composedPath());
        if (!path.includes(menuRef.current) && menuRef.current) {
            setHeight(0)
        }
    }

    React.useEffect(() => {
        document.body.addEventListener("click", handleOutsideClick);
    }, []);

    const logOut = React.useCallback(() =>{
        localStorage.removeItem("user");
        dispatch(setUser());
        history.push(`/`);
    }, []);

    return (
        <div className="profile_options">
            {profile && profile.id == id ?
                <button>
                    Сообщения
                </button>
                :
                <button>Подписаться</button>}
            <div className="profile_settings" ref={menuRef} onClick={e => height > 0 ? setHeight(0) : setHeight(100)}>
                <div className="settings_button">
                    <div className="circle_blue"></div>
                    <div className="circle_blue"></div>
                    <div className="circle_blue"></div>
                </div>
            </div>
            <div className="profile_menu"
                 style={{minHeight: `${height}px`}}
            >
                {height > 0  && <ul className="menuList">
                    <li className="menuList_li">
                        {profile && profile.id == id ?
                            <NavLink to="/" className="menuList_a">
                                Настройки
                            </NavLink> :
                            <NavLink to="/" className="menuList_a">
                                Пожаловаться
                            </NavLink>}
                    </li>
                    <li className="menuList_li">
                        {profile && profile.id == id ?
                            <NavLink to="/" className="menuList_a" onClick={event => {
                                logOut();
                            }}>
                                Выход
                            </NavLink> :
                            <NavLink to="/" className="menuList_a">
                                Поделиться
                            </NavLink>}
                    </li>
                </ul>}
            </div>
        </div>
    );
});
export default Menu;