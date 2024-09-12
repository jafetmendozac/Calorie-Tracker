import { useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
  activities: Activity[],
}

export default function CalorieTracker({activities} : CalorieTrackerProps) {

  const caloriasConsumed = useMemo(() => activities.reduce( (acc, {category, calories}) => 
    category === 1 ? acc + calories : acc, 0 ) , [activities])

  const caloriasBurned = useMemo(() => activities.reduce( (acc, {category, calories}) => 
    category === 2 ? acc + calories : acc, 0 ) , [activities])

  const caloriasTotal = useMemo(() => caloriasConsumed - caloriasBurned, [activities])

  console.log("caloriasConsumed", caloriasConsumed);
  

  return (
    <>
      <h2 className="text-center font-black text-white text-4xl">
        Resumen de Calorias
      </h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">        
        <CalorieDisplay 
          calories={caloriasConsumed}
          text="Consumidas"
        />

        <CalorieDisplay 
          calories={caloriasBurned}
          text="Ejercicio"
        />

        <CalorieDisplay 
          calories={caloriasTotal}
          text="Diferencia"
        />
      </div>
    </>
  )
}
