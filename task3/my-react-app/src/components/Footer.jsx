import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© 2025 ourwebsite.com</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px 0',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
};

export default Footer;
