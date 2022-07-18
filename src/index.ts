import app from "./app";
import { bandRouter } from "./controller/routes/bandRouter";
import { ShowBusiness } from "./business/Shows/ShowBusiness";
import { ShowController } from "./controller/ShowController";
import { ShowDatabase } from "./data/ShowDatabase";

const showController = new ShowController(
    new ShowBusiness(
        new ShowDatabase()
    )
)


app.use("/band", bandRouter);
app.use("/band", bandRouter);

app.get('/show/lineup', showController.findShowByWeekDay)
app.post('/show/register', showController.insertBandShow)