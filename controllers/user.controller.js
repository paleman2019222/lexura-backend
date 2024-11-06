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


async function createUser(req, res) {
    let user = new User();
    const params = req.body;
    let generatedUsername;

    // Validación de intento de asignación de rol
    if (params.role) {
        return res.status(401).send({ message: 'No puedes asignarte un rol' });
    }

    // Verificación de campos requeridos
    if (params.name && params.lastname && params.email && params.password) {
        try {
            // Validación de existencia previa de email
            const emailFind = await User.findOne({ email: params.email });
            if (emailFind) {
                return res.status(400).send({ message: 'El email ingresado ya está en uso' });
            } else {
                // Generación de hash de la contraseña
                const saltRounds = 10;
                const passwordHash = await bcryptjs.hash(params.password, saltRounds);
                
                // Asignación de datos al usuario
                user.name = params.name;
                user.lastname = params.lastname;
                user.email = params.email;
                user.password = passwordHash;
                user.points = 0; // Inicia sin puntos
                user.role = 'ROLE_USER';
                user.readingHistory = []; // Historial de lectura vacío
                user.rewardsClaimed = []; // Recompensas reclamadas vacío
                user.createdAt = new Date(); // Fecha de creación
                user.lastLogin = null; // No ha iniciado sesión aún
                
                // Generación de nombre de usuario
                generatedUsername = `${params.name} ${params.lastname.charAt(0)}.`;
                user.username = generatedUsername;

                // Guardado del usuario en la base de datos
                const userSaved = await user.save();

                if (userSaved) {
                    return res.status(200).send({ message: 'Usuario creado correctamente', user: userSaved });
                } else {
                    return res.status(500).send({ message: 'Usuario no creado' });
                }
            }
        } catch (err) {
            console.error('Error al crear el usuario:', err);
            return res.status(500).send({ message: 'Error al crear el usuario' });
        }
    } else {
        return res.status(400).send({ message: 'Debes llenar todos los campos requeridos' });
    }
}



module.exports ={
createInit,
createUser

}