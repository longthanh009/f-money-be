import User from "../models/users";


export const updateUser = async(req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, { $set: req.body }, { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
}
export const deleteUser = async(req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    } catch (err) {
        next(err);
    }
}
export const getUser = async(req, res, next) => {
    try {
        const user = await User.findById(id).exec();
        if (!user) {
            res.status(400).json({
                message: "Không tìm thấy user"
            })
        }
        req.profile = user;
        req.profile.password = undefined;
        next();
    } catch (error) {
        console.log(error);
    }
}
export const getUsers = async(req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}

export const searchUsers = async(req, resp) => {
    let data = await User.find({
        "$or": [
            { username: { $regex: req.params.key } },
            { Address: { $regex: req.params.key } },
            { CCCD: { $regex: req.params.key } },
            { SDT: { $regex: req.params.key } },
        ]
    })
    resp.send(data);

}