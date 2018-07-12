let defaultB = {
    height: '100vh',
    background: 'rgb(31, 37, 43)'    
};
let dynamic = {
    height: '100vh',
    background: 'rgb(77, 211, 10)'
};
let blurred = {
    position: 'relative',
    // width: '99vw',
    height: '100vh',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    filter: 'blur(20px)',
    zIndex: -10
};

export { defaultB, dynamic, blurred }