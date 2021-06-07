import React, { useState } from 'react';

import axios from 'axios';

const RecordIntro = () => {
    const [intro, setIntro] = useState('');

    const introChangedHandler = (event) => {
        setIntro(event.target.files[0]);
    }

    const uploadIntro = async (event) => {
        event.preventDefault();

        const videoData = new FormData();
        videoData.append('intro', intro);

        const res = await axios.post('http://127.0.0.1:8000/api/videos/upload', videoData);
        console.log(res.data);
    }

    return(
        <section>
            <h2>Intro Video</h2>
            <form method="POST" onSubmit={uploadIntro}>
                <div>
                    <label htmlFor="intro">Intro:</label>
                    <input 
                        type="file"
                        name="intro"
                        id="intro"
                        onChange={introChangedHandler}
                    />
                </div>
                <button>Upload</button>
            </form>
        </section>
    );
};

export default RecordIntro;
