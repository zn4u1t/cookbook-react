import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'

// components
import RecipeList from '../../components/RecipeList'

// styles
import './Search.css'

export default function Search() {
    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const query = queryParams.get("q");
   
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);
   
    useEffect(() => {
      setIsPending(true);
   
      const unsub = projectFirestore.collection("recipes").onSnapshot(
        (snapshot) => {
          if (snapshot.empty) {
            setError("No recipes to load");
            setIsPending(false);
          } else {
            let results = [];
            snapshot.docs.forEach((doc) => {
              results.push({ ...doc.data(), id: doc.id });
            });
            setData(() => {
              let filteredRecipes = results.filter((recipe) =>
                recipe.title.toLowerCase().includes(query.toLowerCase())
              );
              return filteredRecipes;
            });
            setIsPending(false);
          }
        },
        (err) => {
          setError(err.message);
          setIsPending(false);
        }
      );
   
      return () => unsub();
    }, [query]);
   
    return (
      <div>
        <h2 className='page-title'>Recipes including "{query}"</h2>
        {error && <p className='error'>{error}</p>}
        {isPending && <p className='loading'>Loading...</p>}
        {data && <RecipeList recipes={data} />}
      </div>
    );
  }
