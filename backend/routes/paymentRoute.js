const express = require("express") ;
const router = express.Router();
const {processPayment, sendStripeApiKey} = require("../controllers/paymentControllers");
const {isAuthenticatedUser} = require("../middlewares/auth");


router.route("/payment/process").post( processPayment);
router.route("/stripeapikey").get( sendStripeApiKey);

module.exports = router;
