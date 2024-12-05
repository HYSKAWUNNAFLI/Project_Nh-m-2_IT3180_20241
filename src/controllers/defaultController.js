module.exports.show = async (req, res) => {
    try {
        res.render('home/index' , {
            title: "Browse" ,
        })
    } catch (error) {
        console.log("Error");
    }
}

module.exports.show_about = async (req, res) => {
    try {
        res.render('home/about' , {
            title: "Browse" ,
        })
    } catch (error) {
        console.log("Error");
    }
}