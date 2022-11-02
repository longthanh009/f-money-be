import bankAccount from "../models/bankAccount"

// list 
export const listBank = async(req,res) => {
    try {
        const data = await bankAccount.find({})
        res.json(data);
    } catch (error) {
        res.json(error)
    }
}
// creat
export const createBank = async(req,res) => {
    try {
        const data = await bankAccount(req.body).save();
        res.json(data);
    } catch (error) {
        res.json(error)
    }
}
// delete
export const deleteBank = async(req,res) => {
    try {
        const data = await bankAccount({_id : req.params.id}).exec()
        res.json(data);
    } catch (error) {
        res.json(error)
    }
}

// update 
export const updateBank = async(req,res) => {
    try {
        const data = await bankAccount({_id : req.params.id},req.body).exec()
        res.json(data);
    } catch (error) {
        res.json(error)
    }
}
