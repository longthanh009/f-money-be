import User from "../models/users";
import Role from "../models/role";

export const createRole = async (req,res) => {
    try {
        const role = await new Role(req.body).save()
        res.json(role)
    } catch (error) {
        res.json({
            error : "Không thêm được"
        })
    }
};
export const listRole = async (req,res) => {
    try {
        const role =  await Role.find().exec();
        res.json(role)
    } catch (error) {
        res.json({
            error : "Không thêm được"
        })
    }
};
export const proRole = async ( req,res) =>{
    try {
        const role = await Role.findOne({_id : req.params.id});
        const user = await User.find({role: role}).select(-role).exec();
        res.json({
            role,user
        })
    } catch (error){
        res.json({
            err : "Lỗi không tìm được"
        })
    }
};
export const deleteRole = async (req, res) => {
    try {
        await Role.deleteOne({
            _id : req.params.id
        }).exec();
        console.log("Xoá thành công")
    } catch (error) {
        res.status("400").json({
            error : "Lỗi không xoá được"
        })
    }
};