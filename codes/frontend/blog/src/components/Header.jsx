import React, { useState, useEffect } from 'react';
import styles from './header.module.css';

function Header() {
    const [isTop, setIsTop] = useState(true);

    const handleScroll = () => {
        const position = window.scrollY;
        setIsTop(position <= 0); // 0px 미만일 때만 true로 설정
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`${styles.header} ${isTop ? '' : styles.headerScrolled}`}>
            <img src="/Netflix_Logo_PMS.png" alt="Netflix Logo" id={styles.logo} />
            <div>
                <input type="text" />
                <button>
                    <img src="/Magnifying_glass.svg" alt="Search" />
                </button>
                <img src="https://picsum.photos/200/300" alt="Profile" id={styles.profile}/>
            </div>
        </header>
    );
}

export default Header;
