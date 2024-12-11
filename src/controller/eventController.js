import { response } from "express";
import { createConnectionObject } from "../config/dBConfig.js";

const connection = createConnectionObject();

export function saveEvent(request, response){
    try {
        const saveEvent = request.body;
        const insertQry = `INSERT INTO events VALUES (${saveEvent.id}, '${saveEvent.event_name}', '${saveEvent.event_date}', '${saveEvent.location}', '${saveEvent.price}', ${saveEvent.total_tickets}, ${saveEvent.booked_tickets || 0} )`
        connection.query(insertQry, (error)=>{
            if (error) {
                console.log("hi")
                response.status(500).send({message:"Something went wrong"});
            } else {
                console.log("hello");       
                response.status(201).send({message:"Events created successfully"});
            }
        })
    } catch (error) {
        // console.log('bye'); 
        response.status(500).send({message:"Something went wrong"});
    }
}

export function getAllEvents(request, response){
    try {
        const fetchQry = `SELECT * FROM events ORDER BY id`;
        connection.query(fetchQry, (error,result) =>{
            if(error){
                response.status(500).send({message:"Something went wrong"})
            }else{
                response.status(200).send(result);
            }
        })
    } catch (error) {
        response.status(500).send({message:"Something went wrong"});
    }
}

export function updateEvent(request,response){
    try {
        const e_id = request.body.id;
        console.log(e_id);
        
        const updateQry = `UPDATE events SET booked_tickets = booked_tickets+1 WHERE id=${e_id}`
        connection.query(updateQry, (error) =>{
            if(error){
                // console.log(error);
                response.status(500).send({message:"Something went wrong"})
            }else{
                // console.log(error);
                response.status(200).send({message:"Evetns details updated successfully"})
            }
        })
    } catch (error) {
        response.status(500).send({message:"Error in updating events"});
    }
}

export function deleteEvent(request,response){
    try {
        const e_id = request.body.id;
        const deleteQry = `DELETE  FROM events WHERE id = ${e_id}`;
        connection.query(deleteQry, (error) =>{
            if(error){
                response.status(500).send({message:"somthing went wrong"});
            }else{
                response.status(201).send({message: "Event deleted successfully"})
            }
        })
    } catch (error) {
        // console.log(error);
        response.status(500).send({message:"Something went wrong"});
    }
}

export function getEventByName(request,response){
    const {name}=request.params
    console.log(name);
    
    try {
        const fetchQry = `SELECT * FROM events WHERE event_name = '${name}'`;
        connection.query(fetchQry, (error,result) =>{
            if(error){
                response.status(500).send({message:"Something went wrong"})
            }else{
                response.status(200).send(result);
            }
        })
    } catch (error) {
        response.status(500).send({message:"Something went wrong"});
    }
}

export function deleteSeat(request,response){
    try {
        const e_id = request.body.id;        
        const updateQry = `UPDATE events SET booked_tickets = booked_tickets-1 WHERE id=${e_id}`
        connection.query(updateQry, (error) =>{
            if(error){
               
                response.status(500).send({message:"Something went wrong"})
            }else{
               
                response.status(200).send({message:"Evetns details updated successfully"})
            }
        })
    } catch (error) {
        response.status(500).send({message:"Error in updating events"});
    }

}