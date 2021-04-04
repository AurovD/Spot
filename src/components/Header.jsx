import React from 'react';
import {Link} from 'react-router-dom';
import {setForm} from "../redux/actions/users";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
const Header = ({profile}) => {
    console.log(profile)
    const dispatch = useDispatch();
    return (
        <header>
            <input type="text"/>
            <div className="header__profile">
                {profile && <button className="profile__button profile__button__create" onClick={event => {
                    event.preventDefault();
                    dispatch(setForm(true, "create"));
                }}>Создать</button>}
                {
                    profile ?
                        <Link to="/profile">
                            <button className="profile__button">{profile}</button>
                        </Link> :
                        <button className="profile__button profile__button__login" onClick={
                            event => {
                                event.preventDefault();
                                dispatch(setForm(true, "login"));
                            }
                        }>Войти</button>
                }
            </div>
        </header>
    );
}
export default Header;