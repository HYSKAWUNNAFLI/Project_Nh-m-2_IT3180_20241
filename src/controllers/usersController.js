module.exports.show = async (req, res) => {
    try {
        res.render('users/account.handlebars' , {
            title: "Browse" ,
        })
    } catch (error) {
        console.log("Error");
    }
}