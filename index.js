const express = require("express");
const app = express();
const port = process.env.PORT || 3002;
const logger = require("morgan");

app.use(logger("dev"));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.redirect("/home");
});

app.get("/home", (req, res) => {
    res.render("pokemon.ejs")
});

app.get("/about", (req, res) => {
    res.status(301).redirect("https://www.google.com")
});

const baseurl = "https://pokeapi.co/api/v2/type"

app.get("/attacks", (req, res) => {
    const route = req.query.atype
    let endpoint = `${baseurl}/${route}`
    console.log(route)
    if(route == undefined){
        res.render("errora.ejs")
    }

    else{
    fetch(endpoint)
    .then(response => {
        if(response.ok){
            return response.json()
        }
        throw Error("it broke")
    })
    .then(data => {
        res.render('attack.ejs', {results: data.damage_relations, choice: route})
    })
    .catch(error =>{
        console.log("error: ", error);
        res.render('pokemon.ejs')
    })
}

});

app.get("/defends", (req, res) => {
    const route = req.query.type
    // multiple selections results in an array. ex:[ 'fighting', 'flying' ]
    // url output: http://localhost:3002/defends?type=fighting&type=flying
    
    if(route == undefined){
        res.render("errord.ejs")
    }

    if(route[0].length == 1){
    let endpoint = `${baseurl}/${route}`
    fetch(endpoint)
    .then(response => {
        if(response.ok){
            return response.json()
        }
        throw Error("it broke")
    })
    .then(data => {
        res.render('defend.ejs', {results: data.damage_relations, choice: route})
    })
    .catch(error =>{
        console.log("error: ", error);
        res.status(403).send({message: "Error gathering data"})
    })
    }
    
    else{
        let endpoint1 = `${baseurl}/${route[0]}`
        let endpoint2 = `${baseurl}/${route[1]}`
        Promise.all([fetch(endpoint1).then(response => {
            if(response.ok){
                return response.json()
            }
            throw Error("it broke")
        }), 
        fetch(endpoint2).then(response => {
            if(response.ok){
                return response.json()
            }
            throw Error("it broke")
        })])
        .then(data => {
            // console.log(data[0].damage_relations)
            res.render('defend2.ejs', {results1: data[0].damage_relations, choice1: route[0], results2: data[1].damage_relations, choice2: route[1]})
        })
        .catch(error =>{
            console.log("error: ", error);
            res.status(403).send({message: "Error gathering data"})
        })
    }

});


app.listen(port, () => {
    console.log(`This app is listening on port ${port}`);
});
