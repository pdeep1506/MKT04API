import express from "express";

import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../Controller/product.js';
import jwt from 'jsonwebtoken';



const JWT_SECRET_KEY = 'your_jwt_secret_key';


const authenticateJWT = (req, res, next) => {
  
  const token = req.headers['authorization']?.split(' ')[1] || req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: 'Access Denied. No token provided.' });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    
    
    req.user = user;
    next(); 
  });
};


const router = express.Router();
router.get("/", authenticateJWT,getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router