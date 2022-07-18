import { Request, Response } from "express";
import { ShowBusiness } from "../business/Shows/ShowBusiness";
import { ShowInputDTO } from "../model/show";

export class ShowController {
    constructor(
        private showBussines:ShowBusiness
    ){}

    insertBandShow = async (req:Request, res:Response) => {
        const {
            week_day,
            start_time,
            end_time,
            band_id
        } = req.body

        //input model 
        const input:ShowInputDTO = {
            week_day,
            start_time,
            end_time,
            band_id
        }

        try {

            //adding input req 
            await this.showBussines.insertBandShow(input)

            res.status(201).send('Show foi adicionado ao cronograma!')
        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send('Erro ao realizar cadastro.')
        }

    }

    findShowByWeekDay = async (req:Request, res:Response) => {
        const {week_day} = req.body
        try {
            const bandShows = await this.showBussines.findShowByWeekDay(week_day)

            res.status(201).send({bandShows})
        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send('Erro ao realizar cadastro.')
        }
    }

    
}