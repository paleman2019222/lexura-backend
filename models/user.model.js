const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:{type:String},
    // Campo para almacenar los puntos acumulados por el usuario
    points: { type: Number, default: 0 },

    // Campo para guardar el historial de libros leídos
    readingHistory: [
        {
            bookId: { type: Schema.Types.ObjectId, ref: 'Book' }, // Referencia al modelo del libro
            pagesRead: { type: Number, default: 0 },              // Páginas leídas del libro
            startTime: { type: Date },                            // Fecha de inicio de la lectura
            endTime: { type: Date },                              // Fecha de fin de la lectura
            timePerPage: [{ type: Number }]                       // Tiempo dedicado por página
        }
    ],

    // Campo para almacenar las recompensas canjeadas
    rewardsClaimed: [
        {
            rewardId: { type: Schema.Types.ObjectId, ref: 'Reward' }, // Referencia al modelo de recompensa
            dateClaimed: { type: Date, default: Date.now }            // Fecha en que se canjeó la recompensa
        }
    ],

    // Campo para guardar la fecha de creación del usuario
    createdAt: { type: Date, default: Date.now },

    // Campo para la última vez que el usuario accedió a la plataforma (útil para seguimiento)
    lastLogin: { type: Date }
});

module.exports = mongoose.model('User', userSchema);
