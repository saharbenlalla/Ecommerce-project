const Category = require('../models/category');

exports.createCategory = (req, res)=>{
    const category = new Category(req.body);
    category.save((err, category)=>{
        if(err){
            return res.status(400).json({
                error: 'Bad Request !'
            })
        }
        res.json({
            category: category
        })
    })
}

exports.categoryId = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(404).json({
                error: 'Category not Found !'
            })
        }
        req.category = category;
        next();
    })
}

exports.showCategory = (req, res) => {
    let category = req.category;
    res.json({ category });
}

exports.updateCategory = (req, res, id) => {
    let category = req.category;
    category.name = req.body.name;
    category.save((err, category)=>{
        if(err){
            return res.status(400).json({
                error: 'Bad Request !'
            })
        }
        res.send({
            category,
            message: 'Category Updated ...'
        })
    })
}

exports.deleteCategory = (req, res) => {
    let category = req.category;
    category.name = req.body.name;
    category.remove((err, category)=>{
        if(err){
            return res.status(404).json({
                error: 'Category Not Found !'
            })
        }
        res.status(204).send({
            // category,
            // message: 'category deleted'
        })
    })
}

exports.allCategories = (req, res)=>{
    Category.find().exec((err, categories)=>{
        if(err){
            return res.status(500).json({
                error: err
            })
        }
        res.json({categories});
    })
}