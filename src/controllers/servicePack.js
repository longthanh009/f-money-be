import servicePack from "../models/servicePack"

// list 
export const listService = async(req,res) => {
    try {
        const data =  await servicePack.find().exec();
        res.json(data)
    } catch (error) {
        res.json({
            error : "Không thêm được"
        })
    }
}
// creat
export const createService = async(req,res) => {
    try {
        const data = await new servicePack(req.body).save()
        res.json(data)
    } catch (error) {
        res.json({
            error : "Không thêm được"
        })
    }
}
// delete
export const deleteService = async(req,res) => {
    try {
        const data = await servicePack.deleteOne({_id : req.params.id}).exec()
        res.json(data);
    } catch (error) {
        res.status("400").json({
            error : "Lỗi không xoá được"
        })
    }
}

// update 
export const updateService = async(req,res) => {
    try {
        const data = await servicePack.findOneAndUpdate({_id:req.params.id},req.body,{new:true}).exec()
        res.json(data);
    } catch (error) {
        res.status("400").json({
            error : "Lỗi không update được"
        })
    }
    
}