import React from 'react';

// css
import './PageNotFound.css';

// react router
import { Link, useHistory  } from 'react-router-dom';

const PageNotFound = () => {

    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    return (
        <section className="not_found">

            <div className="not_found__card">
                <h1 className="not_found__title">Pagina niet gevonden.</h1>
                <p className="not_found__subtitle">
                    Helaas kunnen we de pagina die u zoekt niet vinden. 
                    Dit kan komen doordat de pagina niet meer bestaat, 
                    of doordat een typefout is gemaakt bij het invoeren van het adres.
                </p>

                <div className="not_found__btn">
                    <button className="not_found__btn--back" onClick={goBack}>Terug</button>
                    <Link className="not_found__btn--home" to="/zoeken">Startpagina</Link>
                </div>
            </div>

        </section>
    )
}

export default PageNotFound;