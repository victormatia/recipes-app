import React from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import iconsProfileRed from '../images/iconsProfileRed.png';
import '../css/Header.css';
import ButtonSearch from './ButtonSearch';

function Header() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const pathName = pathname.replace('/', '').replace('-', ' ').split(' ');
  const title = pathName.map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(' ');

  return (
    <section className="header">
      <input
        className="profile__icon"
        type="image"
        data-testid="profile-top-btn"
        src={ iconsProfileRed }
        alt="profile"
        onClick={ () => history.push('/profile') }
      />
      <motion.h1
        className="title"
        data-testid="page-title"
        initial={ { opacity: 0 } }
        animate={ { opacity: 1 } }
        exit={ { opacity: 0 } }
      >
        { title }
      </motion.h1>
      <ButtonSearch />
    </section>
  );
}

export default Header;
