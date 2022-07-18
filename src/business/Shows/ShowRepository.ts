import { Show } from "../../model/show"

export interface ShowRepository {
    insertBandShow(show:Show): Promise<void>
}