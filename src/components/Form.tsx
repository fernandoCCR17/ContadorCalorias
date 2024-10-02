
import { useState, ChangeEvent, FormEvent } from "react"
import { categories } from "../data/categories"
import { Activity } from '../types/index';

export default function Form() {
    const [activity, setActivity] = useState<Activity>({
        category: 1,
        name: "",
        calories: 0
    })

    function handleChange(e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>){
        setActivity({
            ...activity,
            [e.target.id]: e.target.id === "name" ? e.target.value : +e.target.value
        })
    }

    function isValidActivity() {
        const {name, calories} = activity;

        return name.trim() !== '' && calories > 0;
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();

        console.log("Submit")
    }

  return (
    <form
        className="space-y-5 bg-white shadow p-10 rounded-lg"
        onSubmit={handleSubmit}
    >
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categoría: </label>
            <select 
                className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                id="category"
                value={activity.category}
                onChange={handleChange}
            >
                {categories.map(category => (
                    <option
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
                
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad: </label>
            <input 
                type="text" 
                id="name"
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Ej. Comida, Juego de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                value={activity.name}
                onChange={handleChange}
            />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calorías: </label>
            <input 
                type="number" 
                id="calories"
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Calorías. ej. 300 o 500"
                value={activity.calories}
                onChange={handleChange}
            />
        </div>

        <input 
            type="submit" 
            className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10 disabled:pointer-events-none"
            value={`Guardar ${activity.category === 1 ? 'Comida' : 'Ejercicio'}`}
            disabled={!isValidActivity()}
        />
    </form>
  )
}
