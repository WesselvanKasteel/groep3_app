import React, { useState, useEffect } from 'react';

// scss
import './Record.scss';

// packages
import { useRecordWebcam } from 'react-record-webcam'

const Record = () => {

    const [recording, setRecording] = useState(false);
    const [webcam, setWebcam] = useState(false);

    const [activeComponent, setActiveComponent] = useState(0);
    const [components, setComponents] = useState([
        {name: "introductie", description: "introductie beschrijving", video: null},
        {name: "motivatie", description: "motivatie beschrijving", video: null},
        {name: "skills", description: "skills beschrijving", video: null},
    ]);

    const recordWebcam = useRecordWebcam();

    useEffect(() => {
        // console.log(recordWebcam);
        // console.log(activeComponent);    

    }, [activeComponent]);

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
        <article className={`components__card ${index !== activeComponent ? "" : "active"}`} key={component.name} onClick={() => changeActiveComponent(index)}>

            {component.video != null &&
                <h1 className="components__card__title">{component.name.charAt(0).toUpperCase() + component.name.slice(1)}</h1>
            }
            {component.video === null &&
                <h2 className="components__card__instruction">{component.description.charAt(0).toUpperCase() + component.description.slice(1)}</h2>
            }
            {component.video != null &&
                <video className="components__card__video" src={component.video} controls></video>
            }
        </article>
    ); 

    return (
        <section className="record">

            <div className="webcam">

                <video className="webcam__preview" ref={recordWebcam.webcamRef} autoPlay muted />

                <div className="webcam__buttons">
                    {recording && 
                        <button className="webcam__btn webcam__btn-stop" onClick={stopRecording}>Stop Recording</button>
                    }
                    {!recording && webcam &&
                        <button className="webcam__btn webcam__btn-start" onClick={startRecording}>Start Recording</button>
                    }

                    {webcam ? (
                        <button className="webcam__btn webcam__btn-close" onClick={closeWebcam}>Close Webcam</button> 
                    ) : (
                        <button className="webcam__btn webcam__btn-open" onClick={openWebcam}>Open Webcam</button>
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

                { componentList }

                <article className="components__next">
                    <button className="components__next__btn">Volgende stap</button>
                </article>

            </div>
    
        </section>
    )
}

export default Record;