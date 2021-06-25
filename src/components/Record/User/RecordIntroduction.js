import React, { useState } from 'react';

// css
import './RecordIntroduction.css';

// recordWebcam
import { useRecordWebcam } from 'react-record-webcam'

// timer
import Timer from 'react-compound-timer'

// axios
import axios from 'axios';

// icons
import CamOff from '../../../assets/svg/videocam_off.svg';
import CamOn from '../../../assets/svg/videocam_on.svg';
import StopRecord from '../../../assets/svg/videocam_stop_recording.svg';
import StartRecord from '../../../assets/svg/videocam_start_recording.svg';

const RecordIntroduction = (props) => {

    const [recording, setRecording] = useState(false);
    const [webcam, setWebcam] = useState(false);

    const [video, setVideo] = useState(null);
    const [preview, setPreview] = useState(null);

    const recordWebcam = useRecordWebcam();

    const startRecording = () => {
        setRecording(true);
        recordWebcam.start();
    };

    const stopRecording = async () => {
        setRecording(false);
        recordWebcam.stop()
        .then(async () => {
            const blob = await recordWebcam.getRecording();
            const blobURL = URL.createObjectURL(blob);

            setVideo(blob);
            setPreview(blobURL);

            recordWebcam.retake();
        });
    };

    const openWebcam = () => {
        recordWebcam.open();
        setWebcam(true);
    };

    const closeWebcam = () => {
        recordWebcam.close();
        setWebcam(false);
    };

    const handleSumbit = async () => {
        const config = {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}` },
        };

        const data = new FormData();
        data.append('file', video);

        await axios.post('http://127.0.0.1:8000/api/user/edit/video', data, config)
        .then(() => {
            props.history.push('/profiel');
        })
        .catch((error) => {
            alert(error);
        });
    }

    return (
        <section className="record_introduction">
            <div className="record_introduction__webcam">

                <h1 className="record_introduction__title">Kennismakingsvideo opnemen</h1>

                <video className="record_introduction__webcam__preview" ref={recordWebcam.webcamRef} autoPlay muted />

                <div className="record_introduction__webcam__buttons">
                    {recording &&
                        <button className="record_introduction__webcam__btn record_introduction__webcam__btn--stop" onClick={stopRecording}>
                            <img className="record_introduction__webcam__btn__img--stop" src={StopRecord} alt="stop recording icon" />
                        </button>
                    }
                    {!recording && webcam &&
                        <button className="record_introduction__webcam__btn record_introduction__webcam__btn--start" onClick={startRecording}>
                            <img className="record_introduction__webcam__btn__img--start" src={StartRecord} alt="start recording icon" />
                        </button>
                    }

                    {webcam && !recording &&
                        <button className="record_introduction__webcam__btn record_introduction__webcam__btn--close" onClick={closeWebcam}>
                            <img className="record_introduction__webcam__btn__img--close" src={CamOff} alt="close webcam icon" />
                        </button>
                    }

                    {!webcam &&  
                        <button className="record_introduction__webcam__btn record_introduction__webcam__btn--open" onClick={openWebcam}>
                            <img className="record_introduction__webcam__btn__img--open" src={CamOn} alt="open webcam icon" />
                        </button>
                    }
                    {recording &&
                        <Timer checkpoints={[{ time: 180000, callback: () =>  stopRecording()},]}>
                            <p className="record_introduction__webcam__buttons__timer"><Timer.Minutes /> min : <Timer.Seconds /> sec</p>
                        </Timer>
                    }
                    {recording &&
                        <p className="record_introduction__webcam__buttons__timer--max">max: 3 min</p>
                    }
                </div>
            </div>

            <div className="record_introduction__description">
                <p className="record_introduction__description__text">Neem je kennismakingsvideo op door eerst toestemming te geven tot je camera en daarna via de opname knop de opname starten.</p>
            </div>

            <div className="record_introduction__preview">
                {preview != null &&
                    <h2 className="record_introduction__preview__title">Opname</h2>
                }
                {preview != null &&
                    <video className="record_introduction__preview__src" src={preview} controls></video>
                }
                {preview != null &&
                    <button className="record_introduction__preview__btn" onClick={handleSumbit}>Opslaan</button>
                }
            </div>
        </section>
    )
}

export default RecordIntroduction;