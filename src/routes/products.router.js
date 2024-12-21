import express from 'express'
import crypto from 'crypto'

const router = express.Router()

const products = []

router.get('/', (req,res)=>{
   
    res.status(200).send(products)
   
})


//: hadce referencia a un parametro
router.get('/:pid', (req,res)=>{
    const productId = req.params.pid
    const producto = products.find(prod => prod.id === productId)

    if(producto){
        res.status(200).send(producto)
    }else{
        res.status(404).send("No existe el producto")
    }

})


router.post('/', (req,res)=>{
    let {title, description, code, price, status, stock, category, thumbnails} = req.body
    const newProduct = {
        id: crypto.randomBytes(10).toString('hex'),
        title: title,
        description: description,
        code: code,
        price: price,
        status:  (status === undefined || status === null) ? true : status,
        stock: stock,
        category: category,
        thumbnails: thumbnails || ""

    }
    products.push(newProduct)
   res.status(201).send(`producto creado con el id: ${newProduct.id}`)
})



router.put('/:pid', (req,res)=>{
    const productId = req.params.pid
    let {nombre, marca, precio, stock} = req.body

    const indice = products.findIndex(prod => prod.id === productId)

    if(indice != -1){
        products[indice].nombre = nombre
        products[indice].marca = marca
        products[indice].precio = precio
        products[indice].stock = stock
        res.status(200).send("producto actualizado")
    }else{
        res.status(404).send("No existe el producto")
    }

})


router.delete('/:pid', (req,res)=>{
    const productId = req.params.pid
    const indice = products.findIndex(prod => prod.id === productId)

    if(indice != -1){
        products.splice(indice, 1)//elimino un producto ddadoo
        res.status(200).send("producto eliminado")
    }else{
        res.status(404).send("No existe el producto")
    }

})




export default router
