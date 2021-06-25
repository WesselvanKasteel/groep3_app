import React, { useState, useEffect } from 'react';

// scss
import './Record.css';

// recordWebcam
import { useRecordWebcam } from 'react-record-webcam'

// react-router
import { useParams } from 'react-router-dom';

// timer
import Timer from 'react-compound-timer'

// axios
import axios from 'axios';

// icons
import CamOff from '../../assets/svg/videocam_off.svg';
import CamOn from '../../assets/svg/videocam_on.svg';
import StopRecord from '../../assets/svg/videocam_stop_recording.svg';
import StartRecord from '../../assets/svg/videocam_start_recording.svg';

const Record = () => {

    const [recording, setRecording] = useState(false);
    const [webcam, setWebcam] = useState(false);

    const [activeComponent, setActiveComponent] = useState(0);
    const [components, setComponents] = useState([
        {name: "introductie", description: "Vertel hier wat over jezelf. Wat is je naam? Hoe oud ben je? Waar heb je gestudeerd en hoe was die ervaring?", video: null},
        {name: "motivatie", description: "Wij horen graag waarom je hebt besloten te solliciteren voor deze vacature. Wat sprak je aan.", video: null, blob: null},
        {name: "skills", description: "Vertel hier wat over jou vaardigheden. Welke programmeertalen beheers je? Welke eigenschappen bezit je? Wat voor een karakter heb je? Etc..", video: null, blob: null},
    ]);

    const [topicCount, setTopicCount] = useState(0);

    const recordWebcam = useRecordWebcam();
    const IDENTIFIER = useParams().handle;

    useEffect(() => {
    }, []);

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

            let newComponents = components.map((item, i) => {
                if (activeComponent === i) {
                    setTopicCount(topicCount + 1);
                    return { ...item, video: blobURL, blob: blob };
                } else {
                    return item;
                }
            });

            setComponents(newComponents);

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

    const changeActiveComponent = (index) => {
        setActiveComponent(index);
    };

    const asyncForEach = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
    }

    const handelSubmit = () => {

        asyncForEach(components, async (component, index) => {

            const config = {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}` },
                params: { code: IDENTIFIER, filename: 'video_' + index }
            };

            const data = new FormData();
            data.append('file', component.blob);

            await axios.post('http://127.0.0.1:8000/api/vacancy/store', data, config)
            .then((response) => {

                // naar profiel pagina
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

        })
    }

    const componentList = components.map((component, index) =>
        <li className={`components__list__item ${index !== activeComponent ? "" : "components__list__item--active"}`} key={component.name} onClick={() => changeActiveComponent(index)}>

            <h1 className={component.video != null ? 'components__list__item__titel--recorded' : 'components__list__item__titel'}>{component.name.charAt(0).toUpperCase() + component.name.slice(1)}</h1>
            
            {component.video === null &&
                <p className="components__list__item__subtitle">klik hier om de het onderwerp: '{component.name}' op te nemen</p>
            }

            {component.video != null &&
                <video className="components__list__item__video" src={component.video} controls></video>
            }
        </li>
    );

    let componentsSubmit = <p className="components__next__description">Nog niet alle onderwerpen zijn opgenomen. Pas wanneer alle onderwerpen een opname bevatten kan u naar de volgende stap.</p>

    if (topicCount === components.length ) {
        componentsSubmit = <button className="components__next__btn" onClick={handelSubmit}>Volgende stap</button>
    }

    return (
        <section className="record">

            <div className="webcam">

                <video className="webcam__preview" ref={recordWebcam.webcamRef} autoPlay muted />

                <div className="webcam__buttons">
                    {recording &&
                        <button className="webcam__btn webcam__btn--stop" onClick={stopRecording}>
                            <img className="webcam__btn__img--stop" src={StopRecord} alt="stop recording icon" />
                        </button>
                    }
                    {!recording && webcam &&
                        <button className="webcam__btn webcam__btn--start" onClick={startRecording}>
                            <img className="webcam__btn__img--start" src={StartRecord} alt="start recording icon" />
                        </button>
                    }

                    {webcam && !recording &&
                        <button className="webcam__btn webcam__btn--close" onClick={closeWebcam}>
                            <img className="webcam__btn__img--close" src={CamOff} alt="close webcam icon" />
                        </button>
                    }

                    {!webcam &&  
                        <button className="webcam__btn webcam__btn--open" onClick={openWebcam}>
                            <img className="webcam__btn__img--open" src={CamOn} alt="open webcam icon" />
                        </button>
                    }
                    {recording &&
                        <Timer checkpoints={[{ time: 180000, callback: () =>  stopRecording()},]}>
                            <p className="webcam__buttons__timer"><Timer.Minutes /> min : <Timer.Seconds /> sec</p>
                        </Timer>
                    }
                    {recording &&
                        <p className="webcam__buttons__timer--max">max: 3 min</p>
                    }
                </div>

            </div>

            <div className="description">

                <h1 className="description__title">
                    {components[activeComponent].name.charAt(0).toUpperCase() + components[activeComponent].name.slice(1)}
                </h1>

                <p className="description__description">
                    {components[activeComponent].description.charAt(0).toUpperCase() + components[activeComponent].description.slice(1)}
                </p>

            </div>

            <div className="components">
                <ul className="components__list">

                    { componentList }

                    <li className="components__list__item__next">
                        { componentsSubmit }
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Record;
