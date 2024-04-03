import { Document } from "mongoose"


export interface ITodo extends Document {
    name: string
    description: string
    status: boolean
    id: string
}