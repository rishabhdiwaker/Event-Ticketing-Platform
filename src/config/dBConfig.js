import {createConnection} from 'mysql';

export function createConnectionObject(){
    return createConnection({
        host: "localhost",
        user: "root",
        password: "cdac",
        database: "etp"
    })
}

export function establishConnection(){
    const createConnection = createConnectionObject();
    createConnection.connect((error) =>{
        if(error){
            console.log(error);
        }else{
            console.log("Connected to the etp database")
        }
    })
}