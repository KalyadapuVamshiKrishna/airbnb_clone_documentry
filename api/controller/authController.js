import User from "../models/User"
import jwt from "jsonwebtoken"
import { jwtSecret } from "../middleware/auth"
import bcrypt from "bcryptjs"

const bcryptSalt  = bcrypt.genSaltSync(10);

export const register = async (req, res)=>{
    try{
        const {name, email, password, role} = req.body;

        const user = await User.create({
            name,
            email, 
            password,
            role
        });

        res.json(user);
    }
    catch (e){
        res.status(422).json(e);
    }
};

export const login = async (req, res) =>{

        const {email, password} = req.body;

        const user = User.findOne({email});

        if (!user) return res.json({error: "User not found"});

        jwt.sign(
            {email: user.email, id: user._id, role: user.role},
            jwtSecret,
            {expiresIn: "7d"},
            (err, token)=>{
                if (err) throw err;

                res.cookie(
                    "token", token, {
                        httpOnly: true,
                        sameSite: "lax"
                    } 
                ).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                });

            }
            


        )
}

export const profile = async (req, res)=>{
    const user = await User.findOne(req.user.id);

    res.json({
        name: user.name,
        email: user.email,
        role: user.role,
        _id: user._id
    })
}

export const logout = async (req, res)=>{
    res.cookie("token", "").json(true);
}

