import React, { useEffect } from 'react'

// scss
import './SearchVacancyAttributes.css';

const SearchVacancyAttributes = ({ attributes, updateFilter }) => {

    useEffect(() => [
        // console.log(attributes)
    ], [attributes]);

    const list = attributes.map((attribute) => 
        <li className="attributes__list__item" key={attribute.item} onClick={() => updateFilter(attribute)}>
            <h2 className="attributes__list__item__title">{attribute.item}</h2>
            <span className="attributes__list__item__delete">-</span>
        </li>
    );

    return (
        <section className="attributes">
            {attributes.length !== 0 &&
                <ul className="attributes__list">
                    { list }
                </ul>
            }
        </section>
    )
}

export default SearchVacancyAttributes;
