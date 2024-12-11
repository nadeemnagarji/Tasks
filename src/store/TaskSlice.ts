import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskState{
    Title: string,
    Priority: "High"| "Medium" | "Low",
    Status:"Completed" | "Not Completed",
    dueDate:string |null 
}

const initialState:TaskState[]=[]
export const TaskSlice = createSlice({
    name:"task",
initialState,
reducers:{
    addTasks:(state,action:PayloadAction<TaskState>)=>{
        state.push(action.payload)
    },
    switchStatus:(state,action)=>{
        state.map((task)=> task.Status=action.payload)
    }
}
})


export const {addTasks,switchStatus}  = TaskSlice.actions
export default TaskSlice.reducer