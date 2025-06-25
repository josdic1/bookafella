
function Loader() {

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px', /* Give it some vertical space */
      fontSize: '1.2em',
      color: '#9c8787'
    }}>
      Loading data...
      {/* You could add a simple CSS spinner here */}
      <div style={{
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #3498db',
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        animation: 'spin 1s linear infinite',
        marginLeft: '10px'
      }}></div>
    </div>
  );
}

export default Loader;