import SupportCs from "../models/supportCs"
import nodemailer from "nodemailer";
import User from "../models/users";

var transporter = nodemailer.createTransport({ // config mail server
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'longktph14503@fpt.edu.vn',
        pass: 'long30092002'
    },
    tls: {
        rejectUnauthorized: false
    }
});
var content = '';
content += `
    <div style="padding: 10px; background-color: #003375">
        <div style="padding: 10px; background-color: white;">
            <h4 style="color: #0085ff">Cảm ơn bạn đã đồng hành cùng chúng tôi.</h4>
            <span style="color: black">Xin nghi nhận ý kiến của bạn. Chúng tôi sẽ liên hệ và hỗ trợ bạn sớm nhất có thể.</span>
            <br>
            <span style="color: Trân trọng !</span>
        </div>
    </div>
`;
export const createSp = async (req, res) => {
    const { ho_ten, dien_thoai, email, ghi_chu } = req.body
    if (!req.body) {
        return res.status(400).json({ "error": "Dữ liệu không đúng" });
    }
    if (!ho_ten || !dien_thoai || !email || !ghi_chu) {
        return res.status(400).json({ "error": "Dữ liệu không đúng" });
    }
    var mainOptions = {
        from: 'longktph14503@fpt.edu.vn',
        to: email,
        subject: 'Xác nhận đơn yêu cầu hỗ trợ khách hàng',
        text: '',//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
        html: content //Nội dung html mình đã tạo trên kia :))
    }
    try {
        const data = await SupportCs({ ho_ten, dien_thoai, email, ghi_chu }).save();
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({ "error": "Lỗi không thêm được dữ liệu" });
    }
}
export const getSupportCs = async (req, res) => {
    const { id } = req.query;
    if (id) {
        const userExits = User.findOne({ "_id": id })
        if (!userExits) {
            return res.status(200).json({ "error": "Dữ liệu không đúng" });
        } else {
            if (userExits.role === 2) {
                try {
                    const data = await SupportCs.find({}).exec();
                    return res.status(200).json(data);
                } catch (error) {
                    return res.status(400).json({ "error": "Lỗi không thêm được dữ liệu" });
                }
            } else{
                return res.status(403).json({ "error": "Bạn không có quyền truy cập" });
            }
        }
    } else {
        return res.status(400).json({ "error": "Dữ liệu không đúng" });
    }
}