import { createConnectionObject } from "../config/dBConfig.js";
import bcrypt from 'bcrypt'

const connection = createConnectionObject();

export function registerUser(request, response) {
    try {
        const user = request.body
        console.log(user.email);
        
        const encryptedPassword = bcrypt.hashSync(user.password, 12);
        const existUserQuery = `SELECT * FROM user WHERE email = '${user.email}'`;
        
        connection.query(existUserQuery, (error, res) => {
            if (error) {
                console.log(error);
                return response.status(500).send({ message: "Something went wrong" });
            }

            console.log(res[0].email);
            if (res.length > 0) {
                return response.status(400).json({message: "User already exists"}); 
            }

           
            const insertQry = `INSERT INTO user VALUES('${user.email}', '${encryptedPassword}')`;
            connection.query(insertQry, (error) => {
                if (error) {
                    console.log(error);
                    return response.status(500).send({ message: "Something went wrong" });
                } else {
                    return response.status(201).send({ message: "User successfully registered" });
                }
            });
        });
    } catch (error) {
        console.log("bye", error);
        return response.status(500).send({ message: "Something went wrong" });
    }
}




export function loginUser(request, response) {
    try {
        const user = request.body;
        const findUserQuery = `SELECT * FROM user WHERE email = '${user.email}'`
        

        connection.query(findUserQuery, (error, res) => {
            console.log(res, error)
            if (error) {
                console.log(error);
                return response.status(500).send({ message: "Something went wrong" });
            }

            if (res.length === 0) {
                return response.status(404).send({message: "User not found"});
            }
        
            const storedPassword = res[0].password;
            // console.log(res[0].password);

            if (!bcrypt.compareSync(user.password, storedPassword)) {
                return response.status(401).send({message: "Incorrect password"});
            }

            return response.status(200).send({message: "Login successful",});
        });

    } catch (error) {
        return response.status(500).send({ message: "Something went wrong" });
    }
}

