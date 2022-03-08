import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import DeleteButton from '../assets/delete.svg'
import { projectFirestore } from '../firebase/config'

// styles
import './RecipeList.css'

export default function RecipeList({ recipes }) {
    const { color, mode } = useTheme()

    if (recipes.length === 0) {
        return <div className='error'>No recipes to load...</div>
    }

    const handleClick = (id) => {
        projectFirestore.collection('recipes').doc(id).delete()
    }

    return (
        <div className='recipe-list'>
            {recipes.map(recipe => (
                <div key={recipe.id} className={`card ${mode}`}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.cookingTime} to make.</p>
                    <div>{recipe.method.substring(0, 100)}...</div>
                    <Link to={`/recipes/${recipe.id}`} style={{ background: color }}>Cook This</Link>
                    <img className='delete' alt='Delete recipe button' src={DeleteButton} onClick={() => handleClick(recipe.id)}/>
                </div>
            )) }
        </div>
    )
}
