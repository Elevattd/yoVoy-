import { sequelize } from "../db";
import { Model } from "sequelize";
import { sendMail } from "../mailer";
const { Request, User } = sequelize.models
import config from "../../config";

enum list{
    POST_organization = "createOrganization",
    POST_location = "createLocation",
    DELETE_event = "destroyEvent",
    PUT_event = "updateEvent"
}

export const createRequest = async (userId: number, description: string, type: string, method: string, body: any) => {
    body.userId = userId
    const request  = await Request.create({userId, description, type, method, body: JSON.stringify(body)})
    
}

const executeRequest = (request: Model<any,any>) => {
    const type = request.getDataValue("type")
    const method = request.getDataValue("method")
    let body = request.getDataValue("body")
    let function_type = list[`${method}_${type}` as keyof typeof list]
    body = JSON.parse(body)
    console.log(__dirname)

    let utils = require(`./${type}.${config.dev ? 'ts' : 'js'}`)
    if(utils.default) utils.default[function_type](body)
    else utils[function_type](body)
}

export const updateRequest = async (id:string | number, status: string) => {
    let request = await Request.findOne({
        where:{
            id
        },
        include:{
            model: User,
            attributes: ["name","email"]
        }
    })
    if(request){

        request.update({status})
        
        const user = request.getDataValue("user")
        const name = user.getDataValue("name")
        const email = user.getDataValue("email")
        let typeText: string;
        if(request.getDataValue("type") === "organization")typeText = "para crear una organización."
        else{
            let body = request.getDataValue("body")
            body = JSON.parse(body)
            if(request.getDataValue("method") === "PUT")typeText = `para actualizar el evento: ${body.name}`
            else {
                typeText = `para eliminar el evento: ${body.name}`
            }
        }
        if(status === "accepted"){
            executeRequest(request)
            await sendMail({
                to: email,
                subject: "Petición Aceptada",
                text: `Hola ${name}! Hemos aceptado tu petición ${typeText}`
            })
        }else{
            await sendMail({
                to: email,
                subject: "Petición Rechazada",
                text: `Hola ${name}! Hemos rechazado tu petición ${typeText}`
            })
        }
    }
}

export const findRequest = async (id: string | number) => {
    let request = await Request.findByPk(id, {
        include: {
            model: User,
            attributes: ["id","name","email"]
        }
    })

    return request
}