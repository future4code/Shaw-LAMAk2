export type Show = {
    id:string,
    week_day:string,
    start_time:number,
    end_time:number,
    band_id:string,
}

export type ShowInputDTO = {
    week_day:string,
    start_time:number,
    end_time:number,
    band_id:string
}