import React from 'react';

import './Home.css';

const Home = () => (
    <div>
        Home Module
        <button
            type="button"
            onClick={() => {
                alert('Clicked');
            }}
        >
            Alert
        </button>
    </div>
);

export default Home;
