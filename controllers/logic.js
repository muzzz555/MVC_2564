var DBAssignment = require("../models/AssignmentDB.json"); //import model
var DBTurnin = require("../models/TurninDB.json");//import model
const fs = require("fs"); // for writing file => save data

const AssignmentDB = DBAssignment;
const TurninDB = DBTurnin;

class logic {

     CreateAssignment(req) {
        var FunctionName = "[CreateAssignment]";
        console.log("InPut" ,req)
        let Assignment = req.Assignment;
        let detailsAssignment = req.detailsAssignment;
        let date = req.date;
        let studentId = req.studentId
        
        let msg; //object for respond
        let data; //data for insert to DBAssignment

        try {
            // check input Assignment
             if (Assignment == null) {
                return "จำเป็นต้องกรอก Assignment"
             }
             // check input studentId
             if (studentId == null) {
                return "จำเป็นต้องกรอก studentId"
             }
            data = {
                //Data to json
                Assignment: Assignment,
                detailsAssignment: detailsAssignment,
                date: date,
                studentId: studentId,
            };
            
            AssignmentDB.push(data);
            //Convert Value to JSON
            let jsonString = JSON.stringify(AssignmentDB, null, 2);

            //Write data to JSON file => Save data
            fs.writeFileSync("./models/AssignmentDB.json", jsonString, (err) => {
                if (err) throw err;
                console.log('JSON File Created!');
            });

            msg = {
                StatusCode: 201,
                Data: Assignment,
              };
            console.log("register success")
            return msg;
        } catch (error) {
            let messageError = {
                statusCode: error.statusCode || 400,
                massage: error.massage || `${FunctionName} failed [Error] ${error}`,
            };

            console.log(messageError);
            return messageError;
        }
    }

    TurninAssignment(req) {
        var FunctionName = "[TurninAssignment]";
        console.log("InPut" ,req)
        let studentId = req.studentId;
        let Assignment = req.Assignment;
        let detailsTurnin = req.detailsTurnin;
        let date = req.date;

        let msg; //object for respond
        let data; //data for insert to DB

        try {

            // check input Assignment
            if (Assignment == null) {
                return "จำเป็นต้องกรอก Assignment"
             }
             // check input studentId
            if (studentId == null) {
                return "จำเป็นต้องกรอก studentId"
             }
             
            //get date
             date = Date()

            data = {
                //Data to json
                Assignment: Assignment,
                detailsTurnin: detailsTurnin,
                date: date,
                studentId: studentId,
            };
            TurninDB.push(data);

            //Convert Value to JSON
            let jsonString = JSON.stringify(TurninDB, null, 2);

            //Write data to JSON file => Save data
            fs.writeFileSync("./models/TurninDB.json", jsonString, (err) => {
                if (err) throw err;
                console.log('JSON File Created!');
            });

            msg = {
                StatusCode: 201,
                Data: TurninDB,
              };
            console.log("Turnin success")
            return msg;
        } catch (error) {
            let messageError = {
                statusCode: error.statusCode || 400,
                massage: error.massage || `${FunctionName} failed [Error] ${error}`,
            };

            console.log(messageError);
            return messageError;
        }
    }

}
module.exports = logic;