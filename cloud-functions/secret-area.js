// exports.handler = async function(event, context) {
//     return {
//         statusCode: 200,
//         body: JSON.stringify({message: "Hello World"})
//     };
// }

exports.handler = function(event, context, callback) {
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