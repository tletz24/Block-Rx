const mongoose = require('mongoose');

const DoseSchema = new mongoose.Schema({
    doseOrder: {
        type: Number,
        required: true
    },
    isReoccuring: {
        type: Boolean,
        required: true,
        default: false
    },
    // recommended vaccinations administration 
    // occurs between timing.start and timing.end months 
    timing: {
        start: {
            type: Number,
            required: true

        },
        end: {
            type: Number,
            required: true,
        },
        reoccurs: {
            everyNMonths: {
                type: Number,
                required: isReoccuring,
                default: -1
            }
        }
    },
    notes: mongoose.Types.ObjectId
});

module.exports = mongoose.model('Dose', DoseSchema, 'dose');