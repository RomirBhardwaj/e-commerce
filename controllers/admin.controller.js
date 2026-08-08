const userModel=require("../models/user.model")
const invitationModel=require("../models/invitation.model")
const bcrypt=require("bcrypt")
const apiError=require("../utils/api.error")
const generateInvitationToken=require("../utils/generateInvitationToken")
const mailSender=require("../utils/send.mail.js")
const { invitationEmail } = require("../utils/emailTemplates.js")
    
const createAdmin=async(req,res,next)=>{
    const admin_data=req.body
    try{
        const exists= await userModel.findOne({email:admin_data.email})
        if(!exists){
            admin_data.password=await bcrypt.hash(admin_data.password,10)
            const admin=await userModel.create({name:admin_data.name,email:admin_data.email,password:admin_data.password,phone:admin_data.phone,role:"admin",isVerified:true})
            res.status(200).json({message:"Admin created successfully",admin:{id:admin._id,name:admin.name,email:admin.email,phone:admin.phone}})
        }else{
            throw new apiError("Admin already exists, please login/sign-in.",400)
        }
    }catch(err){
        next(err)
    }
}


const inviteModerator = async (req, res, next) => {
    try {
        const { email } = req.body;

        // validate email
        if (!email) {
    throw new apiError("Email is required.", 400);
}

        const Email = email.trim().toLowerCase();
        
const existingUser = await userModel.findOne({
    email: Email
});

if (
    existingUser &&
    ["moderator", "admin", "super_admin"].includes(existingUser.role)
) {
    throw new apiError(
        `User is already a ${existingUser.role}.`,
        400
    );
}

        // delete previous invitation if exists


        await invitationModel.findOneAndDelete({email: Email,role: "moderator"});
        // create random token
        const token = generateInvitationToken();

        
        // create invitation
        const invitationLink =`http://localhost:${process.env.port}/admin/accept-invitation?token=${token}`;

        // send email
        await invitationModel.create({email: Email,role: "moderator",token,invitedBy: req.user.id,expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)});

        await mailSender(Email,"Moderator Invitation",invitationEmail(invitationLink));
        // return success
        return res.status(200).json({success: true,message: "Invitation sent successfully."});
    } catch(err){
        next(err);
    }

}


const acceptInvitation = async (req, res, next) => {
    try {

        const { token } = req.query;

        if (!token) {
            throw new apiError("Invitation token is required.", 400);
        }

        const invitation = await invitationModel.findOne({ token });

        if (!invitation) {
            throw new apiError("Invalid invitation link.", 404);
        }

        if (invitation.expiresAt <= new Date()) {
            await invitation.deleteOne();

            throw new apiError(
                "Invitation has expired.",
                400
            );
        }

        if (invitation.status !== "pending") {
            throw new apiError(
                "Invitation has already been used.",
                400
            );
        }

        const user = await userModel.findOne({
            email: invitation.email
        });

        if (user) {

            user.role = invitation.role;
            await user.save();

            invitation.status = "accepted";
            await invitation.save();

            await invitation.deleteOne();

            return res.status(200).json({
                success: true,
                message: "Moderator access granted successfully."
            });

        }

        return res.status(200).json({
            success: true,
            newUser: true,
            email: invitation.email,
            token: invitation.token,
            message:"Complete registration to become a moderator."
        });

    } catch (err) {
        next(err);
    }
};

const completeInvitation = async (req, res, next) => {
    try {

        const {name,phone, password, confirmPassword } = req.body;
        const { token } = req.query;

        // Validate input
        if (!token) {
            throw new apiError("Invitation token is required.", 400);
        }
        // Validate input
        if (!name || !password || !confirmPassword || !phone) {
            throw new apiError("All fields are required.", 400);
        }

        if (password !== confirmPassword) {
            throw new apiError("Passwords do not match.", 400);
        }

        // Find invitation
        const invitation = await invitationModel.findOne({ token });

        if (!invitation) {
            throw new apiError("Invalid invitation link.", 404);
        }

        // Check expiry
        if (invitation.expiresAt <= new Date()) {
            await invitation.deleteOne();
            throw new apiError("Invitation link has expired.", 400);
        }

        // Check status
        if (invitation.status !== "pending") {
            throw new apiError("Invitation has already been used.", 400);
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({
            email: invitation.email
        });

        if (existingUser) {
            throw new apiError(
                "User already exists. Please use the invitation acceptance route.",
                400
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create moderator account
        const user = await userModel.create({
            name,
            email: invitation.email,
            password: hashedPassword,
            phone: req.body.phone,
            role: invitation.role,
            isVerified: true
        });

        // Mark invitation accepted
        invitation.status = "accepted";
        invitation.acceptedAt = new Date();
        invitation.acceptedBy = user._id;
        await invitation.save();

        // Delete invitation
        await invitation.deleteOne();

        // Login user
        const jwtToken = jwt.sign(
            {
                Id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.SECRET_KEY,
            { expiresIn: "30d" }
        );

        return res.status(201).json({
            success: true,
            message: "Moderator account created successfully.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token: jwtToken
        });

    } catch (err) {
        next(err);
    }
};

module.exports={createAdmin,inviteModerator,acceptInvitation,completeInvitation}