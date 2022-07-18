import { BaseDatabase } from "./BaseDatabase";
import { Show } from "../model/show";
import { BandRepository } from "../business/Bands/BandRepository";
import { ShowRepository } from "../business/Shows/ShowRepository";
import { join } from "path";

export class ShowDatabase extends BaseDatabase implements ShowRepository {
    protected tableShowFest = 'festShows'
    protected tableBandFest = 'festBandas'

    insertBandShow = async (show:Show) =>  {
        try {
            await BaseDatabase.connection(this.tableShowFest)
            .insert(show)
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    validateShowAvailabilityByTime = async (start_time:number) => {
        try {

            const infoByStartTime = await BaseDatabase.connection(this.tableShowFest)
            .select('*')
            .where({start_time})

            if(infoByStartTime[0] === undefined) {
                return true   
            } else if (infoByStartTime[0].start_time === start_time){
                return false
            }

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }   
    
    validateShowAvailabilityByDay = async (week_day:string) => {
        try {

            const infoByWeekDay = await BaseDatabase.connection(this.tableShowFest)
            .select('*')
            .where({week_day})

            if(infoByWeekDay[0] === undefined) {
                return true   
            } else if (infoByWeekDay[0].week_day === week_day){
                return false
            }

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    findByWeekDay = async (week_day:string) => {
        try {

            const joinTable = await BaseDatabase.connection(this.tableShowFest)
            .join(this.tableBandFest, `${this.tableBandFest}.id`, `${this.tableShowFest}.band_id` )
            .select('band_id', 'week_day', 'start_time', 'name', 'music_genre')
            .where({week_day})
            .orderBy('start_time')

            const filterBands = joinTable.map((show) => {
               return {
                   'Banda': show.name,
                   'Gênero': show.music_genre
               }
            })

            return filterBands
        }catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}