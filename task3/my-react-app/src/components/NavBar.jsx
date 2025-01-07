import React from 'react';

const NavBar = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li style={styles.navItem}><a href="#home" style={styles.navLink}>Home</a></li>
        <li style={styles.navItem}><a href="#projects" style={styles.navLink}>Projects</a></li>
        <li style={styles.navItem}><a href="#contact" style={styles.navLink}>Contact Us</a></li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: 'purple', // Changed color to purple
    padding: '10px 20px',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  navList: {
    display: 'flex',
    justifyContent: 'space-between', // Changed justify-content to space-between
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 15px',
  },
  navLink: {
    color: '#ECF0F1',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'color 0.3s',
  },
};

export default NavBar;
