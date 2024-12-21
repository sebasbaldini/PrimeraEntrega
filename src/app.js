import express from 'express'
import crypto from 'crypto'
import productRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const PORT = 8080
const app = express() //cuando llame a pp, estoy ejecunado express



app.use(express.json()) // enviar y recibir JSON en las peticiones
app.use(express.urlencoded({extended:true})) //permite realizar peticiones mas complejas



app.use('/api/products', productRouter)
app.use('/api/carts', cartsRouter)


app.listen(PORT, () =>{
    console.log("server on port :", PORT)
})