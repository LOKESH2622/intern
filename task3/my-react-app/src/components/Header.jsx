import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.intro}>
        <h1 style={styles.title}>Welcome to Our Website</h1>
        <p style={styles.subtitle}>This is a small introduction about our website.</p>
      </div>
      <div style={styles.contentSection}>
        <div style={styles.imageContainer}>
          <img
            src="https://i.ibb.co/ss5ShfS/Whats-App-Image-2024-11-29-at-21-11-49-22ea0ec1.jpg"
            alt="Placeholder"
            style={styles.image}
          />
        </div>
        <div style={styles.aboutUs}>
          <h2 style={styles.aboutTitle}>About Us</h2>
          <p style={styles.aboutText}>
            As a computer science student, I'm ready to launch my career, leveraging my skills in algorithms, data structures, and software development. I seek to solve real-world issues and contribute positively to a team, embracing continuous learning and collaboration in an innovative, teamwork-oriented environment.
          </p>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    padding: '40px 20px',
    backgroundColor: '#000', 
    textAlign: 'center',
    color: '#fff', 
  },
  intro: {
    marginBottom: '40px',
  },
  title: {
    fontSize: '2.5rem',
    color: '#ECF0F1', 
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#BDC3C7', 
  },
  contentSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  imageContainer: {
    flex: '1',
    textAlign: 'center',
  },
  image: {
    maxWidth: '100%',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  },
  aboutUs: {
    flex: '1',
    textAlign: 'left',
    padding: '30px',
  },
  aboutTitle: {
    fontSize: '1.8rem',
    color: '#ECF0F1', 
  },
  aboutText: {
    fontSize: '1rem',
    color: '#BDC3C7', 
    lineHeight: '1.6',
  },
};

export default Header;
