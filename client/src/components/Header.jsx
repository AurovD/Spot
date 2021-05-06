import React from 'react';
import {Link} from 'react-router-dom';

const Header = ({profile}) => {
    console.log(profile)
    return (
        <header>
            <input type="text"/>
            <div className="header__profile">
                {profile && <Link className="profile__button profile__button__create" to="/create">Создать</Link>}
                {
                    profile ?
                        <Link to="/profile" className="profile__name">
                            {profile.name}
                        </Link> :
                        <Link className="profile__button profile__button__create" to="/auth">Войти</Link>
                }
            </div>
        </header>
    );
}
export default Header;