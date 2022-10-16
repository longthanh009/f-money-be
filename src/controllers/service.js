import serviceModel from "../models/service"

// list 
export const listService = async(req,res) => {
    try {
        const data = await serviceModel.find({})
        res.json(data);
    } catch (error) {
        res.json(error)
    }
}
// thêm 
export const createService = async(req,res) => {
    try {
        const data = await serviceModel(req.body).save();
        res.json(data);
    } catch (error) {
        res.json(error)
    }
}
// xóa 
export const deleteService = async(req,res) => {
    try {
        const data = await serviceModel({_id : req.params.id}).exec()
        res.json(data);
    } catch (error) {
        res.json(error)
    }
}

// update 
export const updateService = async(req,res) => {
    try {
        const data = await serviceModel({_id : req.params.id},req.body).exec()
        res.json(data);
    } catch (error) {
        res.json(error)
    }
}


