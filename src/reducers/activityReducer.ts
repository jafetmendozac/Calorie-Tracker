import { Activity } from "../types"

export type ActivityAction = 
  {type: "save-activity", payload: { newActivity : Activity} } | 
  {type: "set-activeId", payload: { id : Activity['id']} } |
  {type: "delete-activy", payload: { id : Activity['id']} } |
  {type: "restart-activy"}

export type ActivityState = {
  activities: Activity[],
  activeId: Activity['id']
}

const localStorageActivities = () : Activity[] => {
  const getActivities = localStorage.getItem("activities")
  return getActivities ? JSON.parse(getActivities) : []
}

export const initialState : ActivityState = {
  activities: localStorageActivities(),
  activeId: ''
}

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityAction
) => {

  let updateActivities : Activity[] = []
  switch (action.type) {
    case "save-activity":
      if (state.activeId) {
        updateActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity )
      } else {
        updateActivities = [...state.activities, action.payload.newActivity]
      }
      return {
        ...state,
        activities: updateActivities,
        activeId: ''
      }
    case "set-activeId":
      return {
        ...state,
        activeId: action.payload.id
      }
      case "delete-activy":
        return {
          ...state,
          activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
      case "restart-activy":
        return {
          activeId: "",
          activities: []
        }
  }
  
  return state
}

