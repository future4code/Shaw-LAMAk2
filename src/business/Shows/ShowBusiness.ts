import { ShowDatabase } from "../../data/ShowDatabase";
import { BandDatabase } from "../../data/BandDatabase";
import { Show, ShowInputDTO } from "../../model/show";
import IdGenerator from "../../services/IdGenerator";
//import IdGeneratorMock from "../../../tests/mocks/IdGeneratorMock";
//import ValidateShowDayMock from "../../../tests/mocks/ValidateShowDayMock";
//import ValidateShowStartTimeMock from "../../../tests/mocks/ValidateShowStartTimeMock";

export class ShowBusiness {
    constructor(
        private showDatabase:ShowDatabase
    ){}

    insertBandShow = async (input:ShowInputDTO):Promise<void> => {
        const {
            week_day,
            start_time,
            end_time,
            band_id
        } = input

        //validate input
        if (!week_day || !start_time || !end_time || !band_id) {
            throw new Error('Ausência de parâmetros. Preencha os devidos campos.')
        }

        if(start_time > 23 || end_time > 23 || start_time < 8 ){
            throw new Error('Adicione valores válidos.')
        }

        if(week_day !== "Sexta-feira" && week_day !== "Sábado" && week_day !== "Domingo"){
            throw new Error('Adicione dias válidos.')
        }

        //generate id
        const id = IdGenerator.generateId()

        //verify availability by daya and start time
        const verifyDay = await this.showDatabase.validateShowAvailabilityByDay(week_day)
        const verifyStartTime = await this.showDatabase.validateShowAvailabilityByTime(start_time)

        if(!verifyDay && !verifyStartTime) {
            throw new Error('Esta data já foi preenchida')
        }
        
        //input model bank
        const newShowInserted:Show = {
            id: id,
            week_day: week_day,
            start_time: start_time,
            end_time: end_time,
            band_id: band_id
        }

        //input to bank
        await this.showDatabase.insertBandShow(newShowInserted)

    }
    
    insertBandShowTest = async (input:ShowInputDTO):Promise<void> => {
        const {
            week_day,
            start_time,
            end_time,
            band_id
        } = input

        //validate input
        if (!week_day || !start_time || !end_time || !band_id) {
            throw new Error('Ausência de parâmetros. Preencha os devidos campos.')
        }

        if(start_time > 23 || end_time > 23 || start_time < 8 ){
            throw new Error('Adicione valores válidos.')
        }

        if(!['Sexta-Feira','Sábado', 'Domingo'].includes(week_day)){
            throw new Error('Adicione dias válidos.')
        }

        //generate id
       // const id = IdGeneratorMock.generate()

        //verify availability by daya and start time
        //const verifyDay = ValidateShowDayMock.validateShowDay(week_day)
        //const verifyStartTime = ValidateShowStartTimeMock.validateShowStartTime(start_time)

       // if(!verifyDay && !verifyStartTime) {
         //   throw new Error('Esta data já foi preenchida')
        //}
        
        //input model bank
        const newShowInserted:Show = {
            id: id,
            week_day: week_day,
            start_time: start_time,
            end_time: end_time,
            band_id: band_id
        }

        //input to bank
        await this.showDatabase.insertBandShow(newShowInserted)

    }

    findShowByWeekDay = async (week_day:string) => {

        //validate input
        if (!week_day) {
            throw new Error('Ausência de parâmetro.')
        }

        //get bank info
        const showsByWeekDay = await this.showDatabase.findByWeekDay(week_day)

        if(!showsByWeekDay){
            throw new Error('Não existem shows nestes dias!')
        }

        return showsByWeekDay
    }
}