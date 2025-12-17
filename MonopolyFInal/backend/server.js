const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: "http://localhost:5173", // permite al frontend acceder
  methods: ["GET", "POST"],
}));
app.use(express.json());

// ==== TABLERO ====
const tablero = [
  { id: 1, nombre: "Salida", tipo: "inicio" },
  { id: 2, nombre: "Calle San José", tipo: "propiedad", precio: 100 },
  { id: 3, nombre: "Hacienda", tipo: "hacienda" },
  { id: 4, nombre: "Calle Juan Ramón Jiménez", tipo: "propiedad", precio: 100 },
  { id: 5, nombre: "Impuesto 21%", tipo: "impuesto", cantidad: 150 },
  { id: 6, nombre: "Estación de San Vicente", tipo: "estacion", precio: 200 },
  { id: 7, nombre: "Calle Perú", tipo: "propiedad", precio: 100 },
  { id: 8, nombre: "Lotería", tipo: "loteria" },
  { id: 9, nombre: "Calle Nueva Alicante", tipo: "propiedad", precio: 100 },
  { id: 10, nombre: "Calle Pintor Picasso", tipo: "propiedad", precio: 100 },
  { id: 11, nombre: "Cárcel de Foncale", tipo: "carcel" },
  { id: 12, nombre: "Calle de La Plata", tipo: "propiedad", precio: 100 },
  { id: 13, nombre: "Iberdrola (Eléctrica)", tipo: "compañia", precio: 150 },
  { id: 14, nombre: "Calle del Bronce", tipo: "propiedad", precio: 100 },
  { id: 15, nombre: "Calle de Alicante", tipo: "propiedad", precio: 100 },
  { id: 16, nombre: "Estación Virgen del Remedio", tipo: "estacion", precio: 200 },
  { id: 17, nombre: "Calle de Castelar", tipo: "propiedad", precio: 100 },
  { id: 18, nombre: "Hacienda", tipo: "hacienda" },
  { id: 19, nombre: "Calle Relleu", tipo: "propiedad", precio: 100 },
  { id: 20, nombre: "Calle de los Postigos", tipo: "propiedad", precio: 100 },
  { id: 21, nombre: "Casino", tipo: "casino" },
  { id: 22, nombre: "Calle San Nicolás", tipo: "propiedad", precio: 100 },
  { id: 23, nombre: "Lotería", tipo: "loteria" },
  { id: 24, nombre: "Calle Juan Bautista", tipo: "propiedad", precio: 100 },
  { id: 25, nombre: "Calle El Puerto", tipo: "propiedad", precio: 100 },
  { id: 26, nombre: "Estación Mercado", tipo: "estacion", precio: 200 },
  { id: 27, nombre: "Calle Alfonso el Sabio", tipo: "propiedad", precio: 100 },
  { id: 28, nombre: "Calle Federico Soto", tipo: "propiedad", precio: 100 },
  { id: 29, nombre: "Aquea Service (Agua)", tipo: "compañia", precio: 150 },
  { id: 30, nombre: "Calle Canalejas", tipo: "propiedad", precio: 100 },
  { id: 31, nombre: "Calabozo", tipo: "irCarcel" },
  { id: 32, nombre: "Calle Costa Blanca", tipo: "propiedad", precio: 100 },
  { id: 33, nombre: "Calle Oviedo", tipo: "propiedad", precio: 100 },
  { id: 34, nombre: "Hacienda", tipo: "hacienda" },
  { id: 35, nombre: "Calle José Garberi", tipo: "propiedad", precio: 100 },
  { id: 36, nombre: "Estación de Muchavista", tipo: "estacion", precio: 200 },
  { id: 37, nombre: "Lotería", tipo: "loteria" },
  { id: 38, nombre: "Calle Camino del Faro", tipo: "propiedad", precio: 100 },
  { id: 39, nombre: "Casino", tipo: "casino" },
  { id: 40, nombre: "Calle de la Dorada", tipo: "propiedad", precio: 100 },
];

// ==== JUGADORES ====
let jugadores = [
  { nombre: "Raúl", dinero: 1500, posicion: 0, turnosCarcel: 0 },
  { nombre: "Dayron", dinero: 1500, posicion: 0, turnosCarcel: 0 },
  { nombre: "Anna", dinero: 1500, posicion: 0, turnosCarcel: 0 },
  { nombre: "Marcelo", dinero: 1500, posicion: 0, turnosCarcel: 0 },
];

// ==== FUNCIONES AUXILIARES ====
function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ==== RUTA: TIRAR DADO ====
app.post("/tirar-dado", (req, res) => {
  const { nombre } = req.body;
  const jugador = jugadores.find((j) => j.nombre === nombre);

  if (!jugador) {
    return res.status(400).json({ mensaje: "Jugador no encontrado" });
  }

  if (jugador.turnosCarcel > 0) {
    jugador.turnosCarcel--;
    return res.json({
      mensaje: `${jugador.nombre} está en la cárcel (${jugador.turnosCarcel} turnos restantes)`,
      jugador,
    });
  }

  const dado = numeroAleatorio(1, 6);
  const posicionAnterior = jugador.posicion;
  jugador.posicion = (jugador.posicion + dado) % tablero.length;

  // Bonus al pasar por la salida
  if (jugador.posicion < posicionAnterior) {
    jugador.dinero += 200;
  }

  const casilla = tablero[jugador.posicion];
  let mensaje = `${jugador.nombre} sacó un ${dado} y cayó en ${casilla.nombre}.`;

  switch (casilla.tipo) {
    case "inicio":
      mensaje += " Pasó por la salida y cobró 200 pts.";
      break;
    case "propiedad":
      mensaje += ` Esta calle está libre. Precio: ${casilla.precio} pts.`;
      break;
    case "estacion":
      mensaje += ` Estación disponible por ${casilla.precio} pts.`;
      break;
    case "compañia":
      mensaje += ` Compañía disponible por ${casilla.precio} pts.`;
      break;
    case "impuesto":
      jugador.dinero -= casilla.cantidad;
      mensaje += ` Pagó un impuesto de ${casilla.cantidad} pts.`;
      break;
    case "hacienda":
      const robo = numeroAleatorio(100, 300);
      jugador.dinero -= robo;
      mensaje += ` Hacienda le quitó ${robo} pts.`;
      break;
    case "loteria":
      const premio = numeroAleatorio(100, 200);
      jugador.dinero += premio;
      mensaje += ` Ganó ${premio} pts en la lotería 🎉.`;
      break;
    case "carcel":
      jugador.turnosCarcel = 2;
      mensaje += " Está en la cárcel por 2 turnos.";
      break;
    case "irCarcel":
      jugador.posicion = 10; // índice 10 → id 11 (Cárcel)
      jugador.turnosCarcel = 2;
      mensaje += " Fue enviado directamente a la cárcel 🚔.";
      break;
    case "casino":
      const apuesta = numeroAleatorio(50, 200);
      if (Math.random() < 0.5) {
        jugador.dinero += apuesta;
        mensaje += ` Ganó ${apuesta} pts en el casino 🍀.`;
      } else {
        jugador.dinero -= apuesta;
        mensaje += ` Perdió ${apuesta} pts en el casino 💸.`;
      }
      break;
  }

  if (jugador.dinero < 0) jugador.dinero = 0;

  res.json({
    jugador,
    dado,
    casilla,
    mensaje,
  });
});

// ==== RUTA: LOGIN (simple para desarrollo) ====
app.post("/login", (req, res) => {
  const { username, password } = req.body || {};

  if (!username) {
    return res.status(400).json({ mensaje: "Nombre de usuario requerido" });
  }

  // En un backend real validarías usuario/contraseña.
  // Aquí simulamos éxito siempre para desarrollo local.
  return res.json({ mensaje: `Usuario ${username} autenticado correctamente` });
});

// ==== RUTAS BASE ====
app.get("/", (req, res) => {
  res.send("Servidor del Monopoly funcionando 🔥");
});

app.listen(3001, () => {
  console.log("Servidor escuchando en http://localhost:3001");
});
