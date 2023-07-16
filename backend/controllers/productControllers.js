const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");


// Admin part
exports.createProduct = catchAsyncError(async (req, res, next) => {
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;
    const temp = req.body;
    const product = await Product.create(temp);
    res.status(201).json({
        success: true,
        product
    })
});


exports.getAllProducts = catchAsyncError(async (req, res, next) => {

    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products,
        productsCount,
    })
});


exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 500));
    }
    else {
        let images = [];

        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        if (images !== undefined) {
            // Deleting Images From Cloudinary
            for (let i = 0; i < product.images.length; i++) {
                await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            }

            const imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "products",
                });

                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }

            req.body.images = imagesLinks;
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({
            success: true,
            product
        })
    }
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: 'product deleted successfully'

    })
});


// get the details of single product
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    // taking id from url parameters
    const id = req.params.id;

    const product = await Product.findById(id);

    // product not found
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    // product found
    res.status(200).json({
        success: true,
        product
    })
});


// create Product review
exports.createProductReview = catchAsyncError(
    async (req, res) => {
        const { rating, comment, productId } = req.body;
        const user = req.user;
        const review = {
            user: user._id,
            name: user.name,
            rating: Number(rating),
            comment,
        }
        // finding the product with given ProductId
        const product = await Product.findById(productId);

        // user already review the product
        const isReviewed = product.reviews.find(
            review => review.user.toString() === user._id.toString()
        )

        if (isReviewed) {
            // updating the review
            let previousRating = 0;
            product.reviews.forEach(review => {
                if (review.user.toString() === user._id.toString()) {
                    previousRating = review.rating;
                    review.rating = rating;
                    review.comment = comment;
                }
            })

            product.ratings = ((product.ratings * product.reviews.length) - previousRating + rating) / (product.reviews.length);

        }
        else {
            // add review to the product
            product.ratings = ((product.ratings * product.reviews.length) + rating) / (product.reviews.length + 1);
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
        }

        await product.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
        });
    }
)


// get all reviews of a product
exports.getProductReviews = catchAsyncError(
    async (req, res, next) => {
        const productId = req.query.id;

        // finding the product with given id
        const product = await Product.findById(productId);

        // product not found
        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404));
        }

        res.status(200).json({
            success: true,
            reviews: product.reviews,
        })
    }
)


// Delete review of a product
exports.deleteReview = catchAsyncError(
    async (req, res, next) => {
        const productId = req.query.productId;

        // finding the product with given id
        const product = await Product.findById(productId);

        // product not found
        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404));
        }

        // add all rating of each review except given review
        let avg = 0;
        product.reviews.forEach(review => {
            if (review._id.toString() !== req.query.id.toString()) {
                avg += Number(review.rating);
            }
        })

        const ratings = product.reviews.length === 1 ? 0 : avg / (product.reviews.length - 1);

        const numOfReviews = product.reviews.length - 1;

        await Product.findByIdAndUpdate(productId, {
            $pull: { reviews: { _id: req.query.id } },
            ratings,
            numOfReviews,
        }, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
        })
    }
)

exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

// Get Product Details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});