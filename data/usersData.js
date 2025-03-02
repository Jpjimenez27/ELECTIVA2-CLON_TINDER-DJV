

export const matches = [
    { like: true, userFrom: 1, userTo: 2 },
    { like: false, userFrom: 3, userTo: 1 },
    { like: true, userFrom: 2, userTo: 4 },
    { like: true, userFrom: 5, userTo: 3 },
    { like: false, userFrom: 4, userTo: 2 },
    { like: true, userFrom: 6, userTo: 5 },
    { like: false, userFrom: 3, userTo: 6 },
    { like: true, userFrom: 7, userTo: 8 },
    { like: false, userFrom: 9, userTo: 7 },
    { like: true, userFrom: 10, userTo: 1 },
    { like: false, userFrom: 1, userTo: 5 },
    { like: true, userFrom: 2, userTo: 6 },
    { like: false, userFrom: 7, userTo: 3 },
    { like: true, userFrom: 4, userTo: 9 },
    { like: false, userFrom: 5, userTo: 10 },
    { like: true, userFrom: 8, userTo: 2 },
    { like: false, userFrom: 6, userTo: 4 },
    { like: true, userFrom: 3, userTo: 7 },
    { like: false, userFrom: 9, userTo: 1 },
    { like: true, userFrom: 10, userTo: 5 },
    { like: false, userFrom: 2, userTo: 8 },
    { like: true, userFrom: 1, userTo: 9 },
    { like: false, userFrom: 3, userTo: 10 },
    { like: true, userFrom: 4, userTo: 7 },
    { like: false, userFrom: 5, userTo: 2 },
    { like: true, userFrom: 6, userTo: 3 },
    { like: false, userFrom: 7, userTo: 9 },
    { like: true, userFrom: 8, userTo: 1 },
    { like: false, userFrom: 10, userTo: 6 },
    { like: true, userFrom: 9, userTo: 4 },
    { like: false, userFrom: 1, userTo: 8 },
    { like: true, userFrom: 2, userTo: 10 },
    { like: false, userFrom: 3, userTo: 5 },
    { like: true, userFrom: 4, userTo: 6 },
    { like: false, userFrom: 5, userTo: 9 },
    { like: true, userFrom: 6, userTo: 8 },
    { like: false, userFrom: 7, userTo: 10 },
    { like: true, userFrom: 8, userTo: 3 },
    { like: false, userFrom: 9, userTo: 2 },
    { like: true, userFrom: 10, userTo: 7 },
    { like: false, userFrom: 1, userTo: 4 },
    { like: true, userFrom: 2, userTo: 9 },
    { like: false, userFrom: 3, userTo: 6 },
    { like: true, userFrom: 4, userTo: 1 },
    { like: false, userFrom: 5, userTo: 7 },
    { like: true, userFrom: 6, userTo: 10 },
    { like: false, userFrom: 7, userTo: 5 },
    { like: true, userFrom: 8, userTo: 4 },
    { like: false, userFrom: 9, userTo: 3 },
    { like: true, userFrom: 10, userTo: 2 }
];

export const users = [
    {
        id: 1,
        nombre: "Diego Madrid",
        edad: 25,
        genero: "Masculino",
        preferencias: ["Tocar guitarra", "Hacer deporte", "Leer libros", "Viajar", "Cocinar"],
        ubicacion: { ciudad: "Medellín", pais: "Colombia", latitud: 6.2442, longitud: -75.5812 },
        fotoPerfil: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        id: 2,
        nombre: "Ana López",
        edad: 22,
        genero: "Femenino",
        preferencias: ["Bailar", "Pintar", "Hacer yoga", "Correr", "Jugar videojuegos"],
        ubicacion: { ciudad: "Bogotá", pais: "Colombia", latitud: 4.711, longitud: -74.0721 },
        fotoPerfil: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
        id: 3,
        nombre: "Juan Pérez",
        edad: 30,
        genero: "Masculino",
        preferencias: ["Escalar", "Ver series", "Escribir", "Fotografía", "Jugar fútbol"],
        ubicacion: { ciudad: "Lima", pais: "Perú", latitud: -12.0464, longitud: -77.0428 },
        fotoPerfil: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
        id: 4,
        nombre: "María Gómez",
        edad: 28,
        genero: "Femenino",
        preferencias: ["Cantar", "Dibujar", "Hacer senderismo", "Cocinar", "Ver películas"],
        ubicacion: { ciudad: "Buenos Aires", pais: "Argentina", latitud: -34.6037, longitud: -58.3816 },
        fotoPerfil: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
        id: 5,
        nombre: "Carlos Rodríguez",
        edad: 35,
        genero: "Masculino",
        preferencias: ["Pescar", "Armar rompecabezas", "Correr", "Tocar piano", "Viajar"],
        ubicacion: { ciudad: "Ciudad de México", pais: "México", latitud: 19.4326, longitud: -99.1332 },
        fotoPerfil: "https://randomuser.me/api/portraits/men/5.jpg"
    },{
        id: 6,
        nombre: "Elena Castillo",
        edad: 24,
        genero: "Femenino",
        preferencias: ["Bailar salsa", "Ver películas", "Cocinar", "Fotografía", "Pintar"],
        ubicacion: { ciudad: "Barcelona", pais: "España", latitud: 41.3851, longitud: 2.1734 },
        fotoPerfil: "https://randomuser.me/api/portraits/women/22.jpg"
    },
    {
        id: 7,
        nombre: "Fernando Herrera",
        edad: 31,
        genero: "Masculino",
        preferencias: ["Jugar fútbol", "Escuchar música", "Hacer ejercicio", "Leer ciencia ficción", "Ver series"],
        ubicacion: { ciudad: "Buenos Aires", pais: "Argentina", latitud: -34.6037, longitud: -58.3816 },
        fotoPerfil: "https://randomuser.me/api/portraits/men/33.jpg"
    },
    {
        id: 8,
        nombre: "Sofia",
        edad: 26,
        genero: "Femenino",
        preferencias: ["Hacer yoga", "Nadar", "Cantar", "Aprender idiomas", "Jugar videojuegos"],
        ubicacion: { ciudad: "Ciudad de México", pais: "México", latitud: 19.4326, longitud: -99.1332 },
        fotoPerfil: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        id: 9,
        nombre: "Miguel Torres",
        edad: 29,
        genero: "Masculino",
        preferencias: ["Tocar piano", "Escribir", "Hacer ciclismo", "Jugar ajedrez", "Armar rompecabezas"],
        ubicacion: { ciudad: "Santiago", pais: "Chile", latitud: -33.4489, longitud: -70.6693 },
        fotoPerfil: "https://randomuser.me/api/portraits/men/55.jpg"
    }
];

export const loggedUser= {
    id: 1,
    nombre: "Diego Madrid",
    edad: 25,
    genero: "Masculino",
    preferencias: ["Tocar guitarra", "Hacer deporte", "Leer libros", "Viajar", "Cocinar"],
    ubicacion: { ciudad: "Medellín", pais: "Colombia", latitud: 6.2442, longitud: -75.5812 },
    fotoPerfil: "https://randomuser.me/api/portraits/men/1.jpg"
};