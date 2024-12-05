module.exports.show = async (req, res) => {
    try {
        res.render('cart/cart.handlebars' , {
            title: "Browse" ,
        })
    } catch (error) {
        console.log("Error");
    }
}