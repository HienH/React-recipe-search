import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faFrown } from '@fortawesome/free-solid-svg-icons'

const App = () => {


    const [recipes, setRecipe] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState();

    useEffect(() => {
        getRecipes();
    }, [query]);

    const getRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}`);
        const data = await response.json();
        const recipes = data['hits']

        setRecipe(recipes);
    }

    const updateSearch = e => {
        setSearch(e.target.value);
    }

    const getQuery = e => {
        e.preventDefault()
        setQuery(search)
    }

    return (
        <div className="text-center boarder">
            <h1 className="font-grandstander title"> Recipe Search <FontAwesomeIcon icon={faBookOpen} /></h1>
            <p className="font-grandstander font-20">This is a recipe search engine; Type in the ingredient you want to use in the search box and we'll return a list of tasty recipes for you to enjoy.</p>

            <form onSubmit={getQuery}>
                <input className="search-size font-20" type="text" name="search" value={search} onChange={updateSearch} />
                <Button className="m-2 mb-3" type="submit" outline color="success">Seach</Button>
            </form>

            <Container>
                <Row>
                    {recipes.map(recipe => (
                        <Col xs="4" className="padding-10">
                            <Recipe
                                key={recipe.recipe.label}
                                title={recipe.recipe.label}
                                image={recipe.recipe.image}
                                recipeUrl={recipe.recipe.url}
                            />
                        </Col>
                    ))}
                </Row>
                {recipes.length === 0 && query ? <p className="font-bold font-20"> Sorry there are no recipies under the query: {query} </p> : null}
            </Container>
        </div>
    )
}

export default App;
