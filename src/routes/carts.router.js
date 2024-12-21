import express from 'express'
import crypto from 'crypto'
import products from './products.router.js'

const router = express.Router()

const carts = []

router.get('/', (req,res)=>{
     res.status(200).send(carts)
})

//: hadce referencia a un parametro
router.get('/:cid', (req,res)=>{
    const {cid} = req.params
    const cart = carts.find(car => car.id === cid)

    if(cart){
        res.status(200).send(cart)
    }else{
        res.status(404).send("No existe el carrito")
    }

})

router.post('/', (req,res)=>{
    let {producto} = req.body
    const newCart = {
        id: crypto.randomBytes(10).toString('hex'),
        producto: producto || []      

    }
    carts.push(newCart)
   res.status(201).send(`producto creado con el id: ${newCart.id}`)
})


// no funciona este no tuve tiempo para hacer que lo guarde en file sistem

router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params; // Obtener los parámetros 'cid' y 'pid' de la URL

    // Buscar el carrito con el 'cid'
    const carrito = carts.find(cart => cart.id === cid);

    // Si no se encuentra el carrito, devolver un error 404
    if (!carrito) {
        return res.status(404).send('Carrito no encontrado.');
    }else{

    // Asegúrate de que producto sea un arreglo
    if (!Array.isArray(carrito.producto)) {
        return res.status(500).send('El carrito tiene un formato incorrecto.');
    }else{

    // Buscar el producto en la lista de productos importada
    const producto = products.find(prod => prod.id === pid);

    // Si no se encuentra el producto, devolver un error 404
    if (!producto) {
        return res.status(404).send('Producto no encontrado.');
    }else{

    // Verificar si el producto ya existe en el carrito
    const productoExistente = carrito.producto.find(product => product.id === pid);

    if (productoExistente) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        productoExistente.quantity += 1;
        return res.status(200).send(`Producto con id ${pid} actualizado. Nueva cantidad: ${productoExistente.quantity}`);
    } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        carrito.producto.push({
            id: pid,
            quantity: 1
        });
        return res.status(201).send(`Producto con id ${pid} agregado al carrito con cantidad 1.`);
    }
}}}
});


export default router
