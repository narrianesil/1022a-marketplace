import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
app.get("/produtos", async(req,res)=>{
    try{
        const conection = await mysql.createConnection({
            host:process.env.dbhost?process.env.dbhost:"localhost",
            user:process.env.dbuser?process.env.dbuser:"root",
            password:process.env.dbpassword?process.env.dbpassword:"",
            database:process.env.dbname?process.env.dbname:"banco1022a",
            port:process.env.dbport?parseInt(process.env.dbport):3306
        })
        const [result, fields] = await conection.query("SELECT * from produtos")
        await conection.end()
        res.send(result)
    }catch(e){
        res.status(500).send("Server ERROR")
    }
})

app.post("/produtos", async(req,res)=>{
    try{
        const conection = await mysql.createConnection({
            host:process.env.dbhost?process.env.dbhost:"localhost",
            user:process.env.dbuser?process.env.dbuser:"root",
            password:process.env.dbpassword?process.env.dbpassword:"",
            database:process.env.dbname?process.env.dbname:"banco1022a",
            port:process.env.dbport?parseInt(process.env.dbport):3306
        })
        const {id,nome,descricao,preco,imagem} = req.body
        const [result, fields] = await conection.query("INSERT INTO produtos VALUES (?,?,?,?,?",[id,nome,descricao,preco,imagem])
        await conection.end()
        res.send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Server ERROR")
    }
})

app.get("/usuarios", async(req,res)=>{
    try{
        const conection = await mysql.createConnection({
            host:process.env.dbhost?process.env.dbhost:"localhost",
            user:process.env.dbuser?process.env.dbuser:"root",
            password:process.env.dbpassword?process.env.dbpassword:"",
            database:process.env.dbname?process.env.dbname:"banco1022a",
            port:process.env.dbport?parseInt(process.env.dbport):3306
        })
        const [result, fields] = await conection.query("SELECT * from usuarios")
        await conection.end()
        res.send(result)
    }catch(e){
        res.status(500).send("Server ERROR")
    }
})
app.listen(8000,()=>{
    console.log("Iniciei o servidor")
})
