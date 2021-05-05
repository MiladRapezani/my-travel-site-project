exports.handler = async function(event, context, callback) {
    const headers = {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Headers" : "Content-Type"
    }
    
    if (event.httpMethod !== "POST") {
        return callback(null, {
        statusCode: 200,
        headers,
        body: "This was not a POST request"
        })
    }

    let body;
    const secretContent = `
    <h3>به ناحیه مخفی سایت، خوش آمدید</h3>
    <p>اینجا می تونیم بهتون بگیم که امروز آسمون <strong>آبی</strong> هستش. پس برید بیرون و ی چرخی بزنید : )</p>
    `

    if(event.body) { body = JSON.parse(event.body) }
    else { body = {} }

    if(body.password === 'javascript') {
        callback(null, {
            statusCode: 200,
            body: secretContent
        })
    } else {
        callback(null, {
            statusCode: 401
        })
    }
}

// exports.handler = function(event, context, callback) {
//     const headers = {
//         "Access-Control-Allow-Origin" : "*",
//         "Access-Control-Allow-Headers" : "Content-Type"
//     }
    
//     if (event.httpMethod !== "POST") {
//         return callback(null, {
//         statusCode: 200,
//         headers,
//         body: "This was not a POST request"
//         })
//     }
    
//     let body;
//     const secretContent = `
//     <h3>به ناحیه مخفی سایت، خوش آمدید</h3>
//     <p>اینجا می تونیم بهتون بگیم که امروز آسمون <strong>آبی</strong> هستش. پس برید بیرون و ی چرخی بزنید : )</p>
//     `

//     if(event.body) { body = JSON.parse(event.body) }
//     else { body = {} }

//     if(body.password === 'javascript') {
//         callback(null, {
//             statusCode: 200,
//             body: secretContent
//         })
//     } else {
//         callback(null, {
//             statusCode: 401
//         })
//     }
// }