import Product from "../models/Products.js";
import User from "../models/User.js";

export const createProduct = async (req,res) => {
    try {
       const { name, description, category, price } = req.body;

       if (!name || !description || !category || !price) {
           return res.status(400).json({
               message: 'Please enter all required fields',
           })
       }

       const product = await Product.create({
           name,
           description,
           category,
           price,
           author: req.user._id,
       })

        await User.findByIdAndUpdate(req.user._id, {
            $push: { products: product._id }
        });

        return res.status(201).json({
            success: true,
            message: 'Successfully created products',
            product
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err.message,
        })
    }
}

export const getAllProducts = async (req,res) => {
    try {
        const products = await Product.find().populate('author', 'username email');

        return res.status(200).json({
            success: true,
            count: products.length,
            products,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err.message,
        })
    }
}

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('author', 'username email');

        if(!product) {
            return res.status(404).json({
                message: 'Product not Found',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Successfully found product',
            product,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err.message,
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not Found',
            })
        }

        product = await Product.findByIdAndUpdate( req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        return res.status(200).json({
            success: true,
            message: 'Successfully updated product',
            product,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err.message,
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).json({
                success: false,
                message: 'Product not Found',
            })
        }

        await Product.deleteOne({ _id: req.params.id });

        await User.findByIdAndUpdate(product.author, {
            $pull: { products: product._id }
        });

        return res.status(200).json({
            success: true,
            message: 'Successfully deleted product',
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err.message,
        })
    }
}