import bankAccount from "../models/bankAccount"

// list 
export const listBank = async(req,res) => {
    try {
        const data =  await bankAccount.find().exec();
        res.json(data)
    } catch (error) {
        res.json({
            error : "Không thêm được"
        })
    }
}
// creat
export const createBank = async(req,res) => {
    try {
        const data = await new bankAccount(req.body).save()
        res.json(data)
    } catch (error) {
        res.json({
            error : "Không thêm được"
        })
    }
}
// delete
export const deleteBank = async(req,res) => {
    try {
        const data = await bankAccount.deleteOne({_id : req.params.id}).exec()
        res.json(data);
    } catch (error) {
        res.status("400").json({
            error : "Lỗi không xoá được"
        })
    }
}

// update 
export const updateBank = async(req,res) => {
    try {
        const data = await bankAccount.findOneAndUpdate({_id:req.params.id},req.body,{new:true}).exec()
        res.json(data);
    } catch (error) {
        res.status("400").json({
            error : "Lỗi không update được"
        })
    }
    
}