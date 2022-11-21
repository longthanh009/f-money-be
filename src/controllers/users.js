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
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}
export const deleteUsers = async(req, res, next) => {
    try {
        const user = await User.deleteMany(req.body);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}
export const getUser = async(req, res, next) => {
    try {
        const user = await User.findById({ _id: req.params.id }).exec();
        if (!user) {
            res.status(200).json({
                error: "Không tìm thấy user"
            })
        }
        res.json(user);
        // không hiển thị mật khẩu!
        // req.profile = user;
        // req.profile.password = undefined;
        next();
    } catch (error) {
        console.log(error);
    }
}
export const getUsers = async(req, res, next) => {
    let { page, limit, sort, asc } = req.query;
    if (!page) page = 1;
    if (!limit) limit = 10;

    const skip = (page - 1) * 10;
    const users = await User.find()
        .sort({
            [sort]: asc
        })
        .skip(skip)
        .limit(limit);
    res.send({ page: page, limit: limit, users: users });
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

export const deleteManyUser = async(req, res) => {
    try {
        const response = await User.deleteMany({_id:  req.query.id})
        res.status(200).json({
            data: response,
            status: 'OK'
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
            status: 'err'
        })
    }
}