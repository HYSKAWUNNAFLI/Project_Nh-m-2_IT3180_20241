module.exports.show = async (req, res) => {
    try {
        res.render('home/index' , {
            title: "Browse" ,
        })
    } catch (error) {
        console.log("Error");
    }
}