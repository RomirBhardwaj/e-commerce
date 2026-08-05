const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    // Authentication Owner
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Business Details
    businessName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      default: "",
      maxlength: 500,
    },
    businessType: {
      type: String,
      enum: [
        "individual",
        "manufacturer",
        "dropshipper",
        "brand"
      ]
    },
    logo: {
      public_id: String,
      url: String
    },

    // Contact Information
    supportPhone: {
      type: String,
      required: true,
    },

    supportEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },

    website: {
      type: String,
      default: "",
    },

    // Pickup Address
    pickupAddress: {
      addressLine1: {
        type: String 
      },

      addressLine2: {
        type: String,
        default: "",
      },

      city: {
        type: String
      },

      state: {
        type: String
      },

      pincode: {
        type: String
      },

      country: {
        type: String
      },
    },


    // Seller Statistics
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalRatings: {
      type: Number,
      default: 0,
    },

    totalSales: {
      type: Number,
      default: 0,
    },

    // Seller Status
    status: {
      type: String,
      enum: ["pending", "active", "suspended", "blocked"],
      default: "pending",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin
    },

    approvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Seller", sellerSchema);