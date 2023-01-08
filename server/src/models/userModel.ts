const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    pic: {
        type: String,
        required: true,
        default: "https://cdn.vox-cdn.com/thumbor/f_H8VvB1IxOFujxrywFGQ_6otaw=/0x0:735x500/2000x1333/filters:focal(368x250:369x251)/cdn.vox-cdn.com/uploads/chorus_asset/file/19933026/image.png",
    },
},
    { timeStamps: true });

export {};
module.exports = mongoose.model("User", userModel);