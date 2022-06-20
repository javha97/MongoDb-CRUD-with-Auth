export const lol = (err, req, res, next) => {
    console.log("---------------------",req.body);
    const statusCode = res.statusCode ? res.statusCode : 500
    res.satus(statusCode)
    res.json({
        mgs: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })
    // next()
}