import { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { projectFirestore } from '../../firebase/config'

// styles
import './Create.css'

export default function Create() {
    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [newIngredient, setNewIngredient] = useState('')
    const [ingredients, setIngredients] = useState([])
    const ingredientInput = useRef(null)
    const history = useHistory()
    const {color, mode} = useTheme()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const doc = {title, ingredients, method, cookingTime: cookingTime + ' minutes'}

        try {
            await projectFirestore.collection('recipes').add(doc)
            history.push('/')
        } catch(err) {
            console.log(err)
        }
    }

    const handleAdd = (e) => {
        e.preventDefault()
        const ing = newIngredient.trim()

        if (ing && !ingredients.includes(ing)) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        }
        setNewIngredient('')
        ingredientInput.current.focus()
    }


    return (
        <div className={`create ${mode}`}>
            <h2 className='page-title'>Add a New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span className='form-text'>Recipe Title</span>
                    <input type='text' onChange={(e) => setTitle(e.target.value)} value={title} required></input>
                </label>
                
                <label>
                    <span className='form-text'>Recipe Ingredients:</span>
                    <div className='ingredients'>
                        <input type='text' onChange={(e) => setNewIngredient(e.target.value)} value={newIngredient} ref={ingredientInput}/>
                        <button onClick={handleAdd} className='btn' style={{ background: color }}>Add</button>
                    </div>
                </label>
                <p className='form-text'>Current Ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>

                <label>
                    <span className='form-text'>Recipe method:</span>
                    <textarea onChange={(e) => setMethod(e.target.value)} value={method} required/>
                </label>
                <label>
                    <span className='form-text'>Cooking time (minutes):</span>
                    <input type='number' onChange={(e) => setCookingTime(e.target.value)} value={cookingTime} required />
                </label>

                <button className='btn' style={{ background: color }}>Submit</button>


            </form>
        </div>
    )
}
