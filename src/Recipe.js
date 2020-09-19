import React from 'react';

const Recipe = ({ title, image, recipeUrl }) => {
    return (
        <div className="">
            <h4 className="font-grandstander font-bold">{title}</h4>
            <a href={recipeUrl} target="_blank" rel="noopener noreferrer">
                <img className="marginb-15" src={image} alt="recipe" />
            </a>
        </div>
    );
};

export default Recipe;