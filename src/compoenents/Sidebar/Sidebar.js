import React, { useState, useEffect } from 'react';
import Boat from '../../assets/images/boat.png'
import Logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';
function Sidebar() {
    const storedNavItem = localStorage.getItem('activeNavItem');
    const [activeNavItem, setActiveNavItem] = useState(storedNavItem || 'Home');

    const handleNavItemClick = (itemName) => {
        setActiveNavItem(itemName);
        localStorage.setItem('activeNavItem', itemName);

    };

    const HandleDisply=() => {
        dispatch(setDisplayOff(true));
    }

    useEffect(() => {
    }, [activeNavItem]);

    return (

        <>
            <nav className="navbar navbar-expand-md">

                <a className="navbar-brand" href="#">
                    <img className="logo" src={Logo} alt="" />
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#mynavbar" onClick={HandleDisply}>
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse" id="mynavbar">
                    <ul className="nav-list-bar">
                        <li className={`nav-item ${activeNavItem === 'Home' ? 'active' : ''}`}>
                            <Link className="nav-link nav-link-home" to="/dashboard" onClick={() => handleNavItemClick('Home')}>
                                Home
                            </Link>
                        </li>

                        <li className={`nav-item ${activeNavItem === 'Career Report' ? 'active' : ''}`}>
                            <Link className="nav-link nav-link-career" to="#" onClick={() => handleNavItemClick('Career Report')}>
                                Career Report
                            </Link>
                        </li>
                        <li className={`nav-item ${activeNavItem === 'Activity Center' ? 'active' : ''}`}>
                            <Link className="nav-link nav-link-activity" to="/activity" onClick={() => handleNavItemClick('Activity Center')}>
                                Career Reels
                            </Link>
                        </li>
                        <li className={`nav-item ${activeNavItem === 'Activity Center' ? 'active' : ''}`}>
                            <Link className="nav-link nav-link-activity" to="/activity" onClick={() => handleNavItemClick('Activity Center')}>
                                Activity Center
                            </Link>
                        </li>

                        <li className={`nav-item ${activeNavItem === 'Career Library' ? 'active' : ''}`}>
                            <Link className="nav-link nav-link-library" to="#" onClick={() => handleNavItemClick('Career Library')}>
                                Career Library
                            </Link>
                        </li>
                        <li className={`nav-item ${activeNavItem === 'SpaceBucks' ? 'active' : ''}`}>
                            <Link className="nav-link nav-link-spacebucks" to="#" onClick={() => handleNavItemClick('SpaceBucks')}>
                                SpaceBucks
                            </Link>
                        </li>
                    </ul>
                </div>

            </nav>

            <div id="demo" className="carousel slide left-nav-carousel" data-bs-ride="carousel">
          <div className="carousel-indicators">
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="0"
                        className="active"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                </div>

                <div className="carousel-inner">

                    <div className="carousel-item active">
                        <img src={Boat} alt="Boat Img" />
                        <div className="need-help">
                            <h2>Need help?</h2>
                            <p>Write to us and we’ll get back to you soon!</p>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img src={Boat} alt="Boat Img" />
                        <div className="need-help">
                            <h2>Need help?</h2>
                            <p>Write to us and we’ll get back to you soon!</p>
                        </div>
                    </div>

                </div>

            </div>


        </>


    )
}

export default Sidebar
