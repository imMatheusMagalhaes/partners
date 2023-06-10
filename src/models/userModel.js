const { Schema, model } = require('mongoose');

const userModel = Schema(
    {
        name: String,
        cpf: String,
        email: String,
        phone: Number,
        birth: Date,
        address: {
            street: { type: String },
            number: { type: String },
            uf: { type: String },
            city: { type: String }
        },
        account: String,
        permissions: [String],
        active: Boolean
    },
    {
        timestamps: true,

    }
);

module.exports = model('users', userModel);