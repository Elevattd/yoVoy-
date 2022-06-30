import {Router} from "express"
import fs from 'fs'
export const router = Router()

const pathRouter = `${__dirname}`
// Remove extension from routes files
const removeExtension = (fileName:string) : string | undefined => fileName.split('.').shift();

// Remove index file from routes files and dynamically import the current route and it's controller
fs.readdirSync(pathRouter).filter(async file => {
  const fileWWithOutExt : string | undefined = removeExtension(file)
  let skip: boolean;
  fileWWithOutExt ? skip = ['index'].includes(fileWWithOutExt) : skip = false
  if (!skip) {
    import(`./${fileWWithOutExt}`).then(module => router.use(`/${fileWWithOutExt}`, module.router))
    console.log('LOAD ROUTE --->', fileWWithOutExt)}
})


