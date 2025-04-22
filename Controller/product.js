import products from '../data/products.js'
// import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
export const getAllProducts = (req, res) => {
    const { new: isNew, category } = req.query;

    let result = [...products];

    if (isNew) {
        result.sort((a, b) => b.createdAt - a.createdAt);
    }

    if (category) {
        result = result.filter(p => p.categories.includes(category));
    }

    res.status(200).json({ message: "Products retrieved", data: result });
};

export const getProductById = (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product found", data: product });
};

export const createProduct = (req, res) => {
    const newProduct = {
        // id: uuidv4(),
        ...req.body,
        createdAt: new Date()
    };
    products.push(newProduct);
    res.status(201).json({ message: "Product created", data: newProduct });
};

export const updateProduct = (req, res) => {
   
    const index = products.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
        return res.status(404).json({ message: "Product not found" });
    }
    
    products[index] = { ...products[index], ...req.body };
    
   
    res.status(200).json({ message: "Product updated", data: products[index] });
};


export const deleteProduct = (req, res) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: "Product not found" });
    }
    products.splice(index, 1);
    res.status(200).json({ message: "Product deleted" });
};
