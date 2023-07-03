import React, { useState } from 'react';
import styles from './Navbar.module.css';
import logo from '../imgs/Cdac_logo7.jpg';
import { Link } from 'react-router-dom';
// import Sidebar from '../sidebar';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    const path = window.location.pathname;

    return (
        <>
            <div className={styles['navbar']}>
                <div className={styles['logo-container']}>
                    <img className={styles['logo']} src={logo} />
                    <span className={styles['title']}>PRDS</span>
                </div>
                <div className={styles['links']}>
                    
                    <Link
                        to='/' style={{ textDecoration: 'none' }}
                    >
                        {path === '/' ? <span className={styles['active-link-tab']}>Home</span> :
                            <span className={styles['link-tab']}>Home</span>}
                    </Link>
                    <Link
                        to='/about' style={{ textDecoration: 'none' }}
                    >
                        {path === '/about' ? <span className={styles['active-link-tab']}>About</span> :
                            <span className={styles['link-tab']}>About</span>}
                    </Link>
                    <Link
                        to='/login' style={{ textDecoration: 'none' }}
                    >
                        {path === '/login' ? <span className={styles['active-link-tab']}>LOGIN</span> :
                            <span className={styles['link-tab']}>LOGIN </span>}
                    </Link>
                </div>
                {isOpen ? <></>
                    :
                    <div className={styles['hamburger']} onClick={handleClick}>
                        <span></span><span></span><span></span>
                    </div>}
            </div>
            {/* {isOpen ? <Sidebar isOpen={isOpen} handleClick={handleClick} />
                :
                <></>} */}
        </>
    )
}

export default Navbar
