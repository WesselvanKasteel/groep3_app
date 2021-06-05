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
        {name: 'introductie', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec sagittis eros. Curabitur porttitor blandit sem, nec pharetra tortor scelerisque eget. Mauris dictum urna eget augue gravida gravida. Nullam ornare enim ut quam venenatis euismod. Aliquam nec quam elit. Donec condimentum facilisis dolor, a euismod erat lacinia sit amet. Maecenas tempus elementum sem ut accumsan. Integer non arcu ut ligula posuere tempor mollis ut velit. Cras sodales, ligula egestas consectetur scelerisque, enim lacus congue lacus, vitae finibus neque massa id sem. Vestibulum venenatis condimentum libero, eget placerat est blandit sit amet. ", video: null},
        {name: 'motivatie', description: "In sem urna, vehicula eu neque condimentum, posuere condimentum ligula. Integer aliquam odio augue, quis viverra eros viverra accumsan. Etiam facilisis mi sed arcu ultricies tristique. Quisque vitae ligula risus. Ut at urna iaculis, aliquet purus in, elementum est. Etiam elementum pharetra odio nec pharetra. Sed magna libero, consequat non blandit mollis, ullamcorper vestibulum lorem. Maecenas ut sem nec purus viverra tempus quis vel justo. Curabitur sit amet finibus elit. Cras volutpat nunc lectus, sed blandit orci venenatis in. Duis magna est, rutrum tristique nisl eu, bibendum faucibus est. Duis vitae orci sit amet sapien vulputate mattis. Donec ut interdum nisi. Praesent vestibulum congue augue, vel consequat metus. Vestibulum quis maximus lorem. Etiam at blandit sapien.", video: null},
        {name: 'skills', description: "Cras fringilla nibh vitae sodales tincidunt. Integer bibendum, tellus a dapibus auctor, ipsum tellus accumsan nulla, eget imperdiet est sem vel ipsum. Aenean at finibus mauris. Nam vel massa est. Donec ut eros non augue fermentum iaculis vitae eget est. Duis accumsan sem est, non congue felis dapibus sed. Curabitur at tincidunt sem. Cras malesuada magna sed nulla malesuada consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.", video: null},
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
        <article className={`card ${index !== activeComponent ? "" : "active"}`} key={component.name} onClick={() => changeActiveComponent(index)}>

            {component.video != null &&
                <h1 className="card__title">{component.name.charAt(0).toUpperCase() + component.name.slice(1)}</h1>
            }
            {component.video === null &&
                <h2 className="card__instruction">{component.name.charAt(0).toUpperCase() + component.name.slice(1)}</h2>
            }
            {component.video != null &&
                <video className="card__video" src={component.video} controls></video>
            }
        </article>
    ); 

  return (
    <section>

        <video ref={recordWebcam.webcamRef} autoPlay muted />

        {recording && 
            <button className="btn stop" onClick={stopRecording}>Stop Recording</button>
        }
        {!recording && webcam &&
            <button className="btn start" onClick={startRecording}>Start Recording</button>
        }

        {webcam ? (
            <button className="btn close" onClick={closeWebcam}>Close Webcam</button> 
        ) : (
            <button className="btn open" onClick={openWebcam}>Open Webcam</button>
        )}

        <div className="description">
            <h1 className="description__title">
                {components[activeComponent].name.charAt(0).toUpperCase() + components[activeComponent].name.slice(1)}
            </h1>
            <p className="description__description">
                {components[activeComponent].description.charAt(0).toUpperCase() + components[activeComponent].description.slice(1)}
            </p>
        </div>

        <div className="componentContainer">
            { componentList }

            <article className="nextCard">
                <button className="btn-next">Volgende stap</button>
            </article>
        </div>
 
    </section>
  )
}

export default Record;