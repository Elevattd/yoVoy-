import { Response, Request, NextFunction } from "express";
import { createCategory, destroyCategory, findCategory, updateCategory } from "../utils/category"

export const postCategory = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {name} = req.body
        const category = await createCategory(name)

        res.status(201).json(category)
    }catch(error){
        next(error)
    }

} 

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params
        await destroyCategory(id)

        res.status(200).json("Category was deleted successfully")
    }catch(error){
        next(error)
    }

} 

export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params
        const category = await findCategory(id)

        if(!category) next({status:404, message: "Category not found"})
        else res.status(200).json(category)
    }catch(error){
        next(error)
    }

} 

export const putCategory = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params
        
        const category = await updateCategory(id, req.body.updateCategory.name)

        res.status(200).json(category)
    }catch(error){
        next(error)
    }

} 

