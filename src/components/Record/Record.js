import React, { useState, useEffect } from 'react';

// scss
import './Record.css';

// packages
import { useRecordWebcam } from 'react-record-webcam'

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
        {name: "introductie", description: "introductie beschrijving introductie beschrijving introductie beschrijving introductie beschrijving", video: null},
        {name: "motivatie", description: "motivatie beschrijving", video: null},
        {name: "skills", description: "skills beschrijving", video: null},
    ]);

    const recordWebcam = useRecordWebcam();

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
                    return { ...item, video: blobURL };
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

    const componentList = components.map((component, index) =>
        <li className={`components__list__item ${index !== activeComponent ? "" : "components__list__item--active"}`} key={component.name} onClick={() => changeActiveComponent(index)}>

            <h1 className={component.video != null ? 'components__list__item__titel' : 'components__list__item__titel--large'}>{component.name.charAt(0).toUpperCase() + component.name.slice(1)}</h1>
            
            {component.video != null &&
                <video className="components__list__item__video" src={component.video} controls></video>
            }
        </li>
    );

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

                    {webcam ? (
                        <button className="webcam__btn webcam__btn--close" onClick={closeWebcam}>
                            <img className="webcam__btn__img--close" src={CamOff} alt="close webcam icon" />
                        </button>
                    ) : (
                        <button className="webcam__btn webcam__btn--open" onClick={openWebcam}>
                            <img className="webcam__btn__img--open" src={CamOn} alt="open webcam icon" />
                        </button>
                    )}
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

                    <li className="components__list__item components__list__item--next">
                        <button className="components__next__btn">Volgende stap</button>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Record;
