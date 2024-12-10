function Footer(): JSX.Element {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        © {new Date().getFullYear()} Todo App. Tous droits réservés.
      </p>
      <p style={styles.text}>Conçu avec ❤️ par moguy</p>
    </footer>
  );
}

// Styles inline
const styles = {
  footer: {
    textAlign: 'center' as const,
    padding: '1rem',
    backgroundColor: '#f4f4f4',
    borderTop: '1px solid #ddd',
    marginTop: '2rem',
  },
  text: {
    margin: 0,
    fontSize: '0.9rem',
    color: '#666',
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none',
  },
};

export default Footer;
