module.exports.show = async (req, res) => {
    try {
        res.render('products/products.handlebars' , {
            title: "Browse" ,
        })
    } catch (error) {
        console.log("Error");
    }
}