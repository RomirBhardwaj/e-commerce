const sellerModel = require("../models/seller.model");
const userModel = require("../models/user.model");
const apiError = require("../utils/api.error");


const verifySellerReq = async (req, res, next) => {
    try {
        const { sellerId } = req.params;
        const { action, reason } = req.body;

        // Find seller
        const seller = await sellerModel.findById(sellerId);

        if (!seller) {
            throw new apiError(
                "Seller application not found.",
                404
            );
        }

        // Seller must be pending
        if (seller.status !== "pending") {
            throw new apiError(
                `Seller application is already ${seller.status}.`,
                400
            );
        }

        // APPROVE
        if (action === "approve") {

            const user = await userModel.findById(seller.userId);

            if (!user) {
                throw new apiError(
                    "Seller's user account was not found.",
                    404
                );
            }

            seller.status = "active";
            seller.approvedBy = req.user.id;
            seller.approvedAt = new Date();

            user.role = "seller";

            await seller.save();
            await user.save();

            return res.status(200).json({
                success: true,
                message: "Seller approved successfully.",
                seller: {
                    id: seller._id,
                    businessName: seller.businessName,
                    status: seller.status,
                    approvedBy: seller.approvedBy,
                    approvedAt: seller.approvedAt
                }
            });
        }

        // REJECT
        if (action === "reject") {

            if (!reason) {
                throw new apiError(
                    "Rejection reason is required.",
                    400
                );
            }

            seller.status = "rejected";
            seller.rejectionReason = reason.trim();

            await seller.save();

            return res.status(200).json({
                success: true,
                message: "Seller application rejected successfully.",
                seller: {
                    id: seller._id,
                    businessName: seller.businessName,
                    status: seller.status,
                    rejectionReason: seller.rejectionReason
                }
            });
        }

    } catch (err) {
        next(err);
    }
};


module.exports = {
    verifySellerReq
};