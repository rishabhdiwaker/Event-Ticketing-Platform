import { Router } from "express";
import { saveEvent, getAllEvents, updateEvent, deleteEvent,getEventByName,deleteSeat } from "../controller/eventController.js";

const eventRouter = Router();

eventRouter.post("/save-events", saveEvent);
eventRouter.get("/get-events", getAllEvents);
eventRouter.put("/update-event", updateEvent);
eventRouter.delete("/delete-event", deleteEvent)
eventRouter.get('/get-event/:name',getEventByName)
eventRouter.put('/delete-event-seat',deleteSeat)

export default eventRouter;

