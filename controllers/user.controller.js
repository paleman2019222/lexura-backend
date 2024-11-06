'use strict'

var User = require('../models/user.model');


const bcryptjs = require('bcryptjs');

async function createInit(req, res) {
    let user = new User();
    user.password = 'RehMQ3Jq';
    user.email = 'admin@lexura.com';

    try {
        const userFind = await User.findOne({ email: user.email });

        if (userFind) {
            console.log('No se puede agregar un nuevo usuario administrador: ya existe');
        } else {
            const saltRounds = 10;
            const passwordHash = await bcryptjs.hash(user.password, saltRounds);

            // Configuración del usuario administrador para Lexura
            user.name = 'Lexura';
            user.lastname = 'Administrator';
            user.email = 'admin@lexura.com';
            user.password = passwordHash;
            user.points = 0; // Inicia sin puntos
            user.role = 'ROLE_ADMIN';
            user.readingHistory = []; // Historial de lectura vacío
            user.rewardsClaimed = []; // Recompensas reclamadas vacío
            user.createdAt = new Date(); // Fecha de creación
            user.lastLogin = null; // No ha iniciado sesión aún

            const userSaved = await user.save();

            if (userSaved) { 
                console.log('Usuario administrador creado');
            } else {
                console.log('Usuario administrador no creado');
            }
        }
    } catch (err) {
        console.log('Error al crear el usuario administrador:', err);
    }
}




module.exports ={
createInit
}