const express=require('express')
const mongoose=require('mongoose')
const product=require('./Models/ProductModel')
const app=express()

app.use(express.json())

//routes

app.get('/',(req,res)=>{
    res.send('HELLO NODE API')
})
app.get('/blog',(req,res)=>{
    res.send('HELLO Blog My Name Is Rushali')
})

app.get('/products', async(req,res)=>{
    try {
        const products=await product.find({});
        res.status(200).json(products);
        
    } catch (error) {
        res.status(500).json({message:error.message})

    }
        
    })

    app.get('/products/:id',async(req,res)=>{
        try {
           const {id}=req.params;
            const Products =await product.findById(id);
            res.status(200).json(Products);
            
        } catch (error) {
            res.status(500).json({message:error.message})
            
        }
    })


 app.post('/Products',async(req, res)=>{
   
    try {
        const Product=await product.create(req.body)
        res.status(200).json(Product);

    }
        
     catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
        
    }
 })

 //update a product

 app.put('/products/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const  UpdateProduct=await product.findByIdAndUpdate(id,req.body);
        //we cannot find any product  in database
        if(!product ){
            return res.status(404).json({message:`cannot find any product with Id ${id}`})
        }
        const updateproduct=await product.findById(id);
        res.status(200).json(  UpdateProduct);
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
 })

 //delete a product

 app.delete('/products/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const Deleteproduct=await product.findByIdAndDelete(id);
        if(!product ){
            return res.status(404).json({message:`cannot find any product with ID ${id}`})
        }
        res.status(200).json(Deleteproduct);
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
 })

mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://rushalir58:Rushali45@cluster0.kasx8lq.mongodb.net/node-api?')
.then(()=>{
    console.log('connected to MongoDB');
    app.listen(3000,()=>{
        console.log('Node API app is running on port 3000');
    });
    }).catch((error)=>{
    console.log(error);
    })