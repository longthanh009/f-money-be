import servicePack from "../models/servicePack"

// list 
export const listService = async(req,res) => {
    try {
        const data = await servicePack.find({})
        res.json(data);
    } catch (error) {
        res.json(error)
    }
}
// thêm 
export const createService = async(req,res) => {
    try {
        const data = await servicePack(req.body).save();
        res.json(data);
    } catch (error) {
        res.json(error)
    }
}
// xóa 
export const deleteService = async(req,res) => {
    try {
        const data = await servicePack({_id : req.params.id}).exec()
        res.json(data);
    } catch (error) {
        res.json(error)
    }
}

// update 
export const updateService = async(req,res) => {
    try {
        const data = await servicePack({_id : req.params.id},req.body).exec()
        res.json(data);
    } catch (error) {
        res.json(error)
    }
}


