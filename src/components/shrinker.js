/******************************************************************************
 *                Simplifies console.log and gives it debug power
 ******************************************************************************/
//        [p]rint[t]his: first variable is for description of second variable object returned: third value is any value when entered will debug the object
//        Use example --> pt("Object of characters",objCharcters,'yes') or pt("regular console log with no object") or pt("console log seperated by : with object to follow",obj)
function pt(description,objectDescribed,debug){
    if(debug){
        return debug?debugHelper(objectDescribed,description):null;
    }
    objectDescribed?console.log(`${description}: ${objectDescribed}`):console.log(`${description}`)

}

/******************************************************************************
 *          Helps determine object type and value of all in one test
 ******************************************************************************/
//       First value is the object to test and the second value is optional name of test
function debugHelper(objectToCheck, nameOfDebug) {
    //     If Debug has been given a name - first print that to console
    if(nameOfDebug){
        pt('\nDebug Name:', nameOfDebug)
    }
    //     If Debug object is not 'null' or Debug object is not 'undefined' -> print the object type to console, if it's an array or not, it's value and its length.
    //     If Debug object is 'null' or 'undefined' print that fact to console.
    if(objectToCheck != null || objectToCheck != undefined) {
        pt('\nType', typeof (objectToCheck));
        if (Array.isArray(objectToCheck)) {
            pt('isArray?:', Array.isArray(objectToCheck));
            pt('Value', objectToCheck);
            pt("Length", objectToCheck.length);
        } else pt('isArray?:', 'false');
        if (objectToCheck === null) {
            pt("This is equal to null")
        } else if (objectToCheck === undefined) {
            pt("This is undefined.")
        }
    }
        //    If Debug object is not a 'string','number', not 'null' and not 'undefined' try mapping over it, print each item of new array to console.
        //    If mapping not possible print 'Mapping over object failed' into the console
    if (typeof(objectToCheck) !== 'string' && typeof(objectToCheck) !== 'number' && objectToCheck != null && objectToCheck != undefined) {
        try {
            pt('\nAttempting to map over object::')
            objectToCheck.map(item => {
                pt(item)
            })
            pt("::Map over Object completed\n")
        } catch (e) {
            pt("Mapping over object failed.\n")
        }
        //    Try to get key|value pairs of object, if possible print those to console
        try {
            pt("\nAttempting to get key|value pairs::")
            for (const property in objectToCheck) {
                try {
                    for (const pp in objectToCheck[property]) {
                        pt(pp, objectToCheck[property][pp])
                    }
                } catch (e) {
                    pt(property, objectToCheck[property])
                }
                pt('')
            }
            pt("::Attempt complete\n")
        } catch (e) {
            pt("Getting key|value pairs failed\n")
        }
    }
}



/******************************************************************************
 *          Code below is not complete - do not run these functions
 ******************************************************************************/
/******************************************************************************
 *                      Grab all variables in a file
 ******************************************************************************/


// -----------------------------------------------------------------possible solution to variable grabs--------------------------------------
function grabVariables(objects) {
    pt("inside Grab Variables Function")
    pt("objects looking for name", objects, 'yes')
    pt("objects type in grabVariables is", typeof(objects))
    pt("objects is array in grabVariables?", Array.isArray(objects))
    objects.map(item => {
        pt("item value inside map of grabVariables function", item)
        pt(item.name, item.value)

    })
    !Array.isArray(objects) ?

        pt("Please enter a list as the argument") :

        objects == null || objects == undefined ?

            pt("argument list is undefined or null") :

            objects.map(item => {
                pt("item value inside map of grabVariables function", item)
                pt(item.name, item.value)

            })


}


// -----------------------------------------------------not working yet - dont use -----------------------------------------------

//       Goal of this function is to give you all values of variables in current file
const fs = require('fs');
//       __filename, process.cwd()
//       THIS FUNCTION IS MIDDLEWARE VERSION ONLY
function getAllValuesMiddlware(fileName) {

    return (req, res, next) => {
        fs.readFile(fileName, 'utf8', function(err, data) {
            if (err) throw (err);
            let newData = [];
            data.split('\n').forEach(item => {
                newData.push(item.match(/(?<=const).[^=]*/))
            })
            let finalData = [];
            newData.map(item => {
                //      pt('item is ', item, 'yes')
                if(item){
                    finalData.push(item)
                }
            })

            pt("data is", finalData);
        });

        next()

    }
}

//      SAME FUNCTION AS ABOVE BUT NOT MIDDLEWARE
function getAllValues(fileName) {
    let returnResult = [{}]
    let finalData = [];
    let newData = [];
    fs.readFile(fileName, 'utf8', function(err, data) {
        if (err) throw (err);

        data.split('\n').forEach(item => {
            newData.push(item.match(/(?<=const).[^=]*/))
        })

        newData.map(item => {
            // pt('item is ', item, 'yes')
            if(item){
                finalData.push(item)
            }
        })

        pt("data is", finalData);


        //       pt('lastly',returnResult,'yes')
    });
    finalData.map(item => {
        returnResult = [...returnResult, {
            name: item,
            value: eval(item)
        }]
    });

    return finalData

}

// -----------------------------------------------------not working yet - dont use -----------------------------------------------

module.exports = {
    pt,
    debugHelper,
    getAllValues,
    getAllValuesMiddlware,
    grabVariables,

}