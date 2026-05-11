export const ejercicios = [
  {
    id: 1,
    title: 'Área Básica',
    question: 'Calcula el área de un círculo que tiene un radio de 5 cm.',
    steps: [
      'Identificamos el radio (r): 5 cm',
      'Fórmula del área: A = π · r²',
      'Reemplazamos: A = 3.1416 · (5)²',
      'Calculamos el cuadrado: 5² = 25',
      'Multiplicamos: 3.1416 · 25 = 78.54'
    ],
    answer: '78.54 cm²'
  },
  {
    id: 2,
    title: 'Perímetro Básico',
    question: 'Calcula el perímetro de un círculo con diámetro de 10 m.',
    steps: [
      'Identificamos el diámetro (d): 10 m',
      'Fórmula del perímetro: P = π · d',
      'Reemplazamos: P = 3.1416 · 10',
      'Multiplicamos multiplicando por 10 (corremos la coma): 31.416'
    ],
    answer: '31.416 m'
  },
  {
    id: 3,
    title: 'Perímetro a partir del radio',
    question: 'Encuentra el perímetro de una circunferencia de radio 7 cm.',
    steps: [
      'Radio (r) = 7 cm',
      'Fórmula: P = 2 · π · r',
      'Reemplazamos: P = 2 · 3.1416 · 7',
      'Multiplicamos los números enteros primero: 2 · 7 = 14',
      'Multiplicamos por pi: 14 · 3.1416 = 43.98'
    ],
    answer: '43.98 cm'
  },
  {
    id: 4,
    title: 'Descubrir el radio',
    question: 'Si el área de un círculo es 50.2656 cm², ¿cuál es su radio?',
    steps: [
      'Área (A) = 50.2656',
      'Fórmula: A = π · r²',
      'Despejamos r² = A / π',
      'Dividimos: 50.2656 / 3.1416 = 16',
      'El radio es la raíz cuadrada de 16, entonces r = 4.'
    ],
    answer: '4 cm'
  },
  {
    id: 5,
    title: 'La mesa redonda',
    question: 'Para forrar una mesa circular se usaron 3.14 m² de tela (sin sobrantes). ¿Cuánto mide el diámetro de la mesa?',
    steps: [
      'El área forrada A = 3.14 m²',
      'Despejamos el radio al cuadrado: r² = A / π',
      'r² = 3.14 / 3.1416 ≈ 1 m²',
      'El radio es raíz de 1 = 1 m',
      'El diámetro es el doble del radio: d = 2 · 1 = 2 m.'
    ],
    answer: '2 metros'
  },
  {
    id: 6,
    title: 'Rueda de bicicleta',
    question: 'Una rueda mide 60 cm de diámetro. ¿Cuántos metros avanza la bicicleta por cada vuelta completa?',
    steps: [
      'La distancia que avanza en una vuelta es el perímetro.',
      'Diámetro d = 60 cm',
      'P = π · d = 3.1416 · 60',
      'P = 188.496 cm',
      'Convertimos a metros dividiendo por 100: 1.88496 m.'
    ],
    answer: '1.88 metros'
  },
  {
    id: 7,
    title: 'Pizza familiar vs 2 medianas',
    question: '¿Qué tiene más área: Una pizza familiar de 40 cm de diámetro, o dos pizzas medianas de 25 cm de diámetro cada una?',
    steps: [
      'Familiar: diámetro 40 cm -> radio 20 cm.',
      'Área familiar = π · 20² = π · 400 = 1256.6 cm².',
      'Mediana: diámetro 25 cm -> radio 12.5 cm.',
      'Área de UNA mediana = π · 12.5² = π · 156.25 = 490.87 cm².',
      'Área de DOS medianas = 490.87 · 2 = 981.74 cm².',
      '1256 > 981. Por lo tanto, la pizza de 40cm tiene más área.'
    ],
    answer: 'La pizza familiar de 40cm'
  },
  {
    id: 8,
    title: 'Piscina circular',
    question: 'Una piscina tiene 8 metros de diámetro. Se quiere pintar un borde antideslizante a su alrededor. ¿Cuántos metros lineales de pintura se necesitan?',
    steps: [
      'Los metros lineales alrededor de la piscina son el perímetro.',
      'Diámetro d = 8 m.',
      'P = π · d = 3.1416 · 8',
      'P = 25.1328 m.'
    ],
    answer: '25.13 metros lineales'
  },
  {
    id: 9,
    title: 'El parque del perro',
    question: 'Un perrito está atado a una estaca en el centro de un jardín con una cuerda de 3 metros. ¿Cuál es el área máxima en la que puede correr?',
    steps: [
      'La cuerda actúa como el radio (r = 3 m).',
      'El área que describe al dar la vuelta es A = π · r².',
      'r² = 3² = 9.',
      'A = 3.1416 · 9 = 28.2744 m².'
    ],
    answer: '28.27 m²'
  },
  {
    id: 10,
    title: 'Césped en la glorieta',
    question: 'Un parque circular tiene un perímetro de 62.832 m. ¿Qué área de césped se necesita para sembrarlo completo?',
    steps: [
      'Nos dan P = 62.832 m.',
      'Sabemos que P = 2 · π · r, por lo tanto r = P / (2·π).',
      'r = 62.832 / 6.2832 = 10 m.',
      'Ahora calculamos el área: A = π · r².',
      'A = 3.1416 · 10² = 3.1416 · 100 = 314.16 m².'
    ],
    answer: '314.16 m²'
  },
  {
    id: 11,
    title: 'La carrera de campo',
    question: 'Una pista de carrera es circular con un radio de 50 metros. Si un corredor da 5 vueltas, ¿qué distancia recorrió?',
    steps: [
      'Una vuelta = Perímetro.',
      'Radio r = 50 m. P = 2 · π · r.',
      'P = 2 · 3.1416 · 50 = 314.16 m (1 vuelta).',
      'Distancia total = 5 vueltas · 314.16 m.',
      'Distancia = 1570.8 m.'
    ],
    answer: '1570.8 metros'
  },
  {
    id: 12,
    title: 'El reloj',
    question: 'La aguja minutera de un gran reloj de torre mide 2 metros. ¿Qué distancia recorre la punta de la aguja en una hora?',
    steps: [
      'En 1 hora, la aguja minutera da una vuelta completa (el perímetro).',
      'El largo de la aguja es el radio: r = 2 m.',
      'P = 2 · π · r.',
      'P = 2 · 3.1416 · 2 = 12.5664 m.'
    ],
    answer: '12.56 metros'
  },
  {
    id: 13,
    title: 'Área del espejo',
    question: 'Se quiere fabricar un espejo circular que abarque exactamente 0.5 m² de pared. ¿De qué radio aproximado debe ser el cristal?',
    steps: [
      'Área A = 0.5 m².',
      'A = π · r² -> r² = 0.5 / 3.1416 ≈ 0.159.',
      'Sacamos la raíz cuadrada de 0.159 ≈ 0.398 m.',
      'Pasado a cm, serían 39.8 cm o prácticamente 40 cm.'
    ],
    answer: '39.9 cm'
  },
  {
    id: 14,
    title: 'El CD de música retro',
    question: 'Un CD tiene un diámetro exterior de 12 cm y un hueco interno de 1.5 cm de diámetro. ¿Cuál es el área de la superficie plateada?',
    steps: [
      'Calculamos el Área del círculo grande (R = 6 cm): A_max = 3.1416 · 6² = 113.1 cm².',
      'Calculamos el Área del círculo pequeño interno (r = 0.75 cm): A_min = 3.1416 · 0.75² = 1.767 cm².',
      'Restamos el área del hueco: 113.1 - 1.767 = 111.33 cm².'
    ],
    answer: '111.33 cm²'
  },
  {
    id: 15,
    title: 'Cerco eléctrico',
    question: 'Un agricultor quiere instalar un cerco eléctrico de 3 hilos alrededor de un corral de ganado circular de 15 m de radio. ¿Cuántos metros de alambre comprará?',
    steps: [
      'Radio r = 15 m. Primero sacamos el perímetro de 1 vuelta.',
      'P = 2 · π · 15 = 30 · 3.1416 = 94.248 m.',
      'Como necesita 3 hilos, multiplicamos por 3.',
      '94.248 · 3 = 282.744 m.'
    ],
    answer: '282.74 metros'
  },
  {
    id: 16,
    title: 'Luz del faro',
    question: 'Un faro tiene un alcance de 12 km en todas direcciones. ¿En qué área de mar los barcos pueden ver la luz del faro?',
    steps: [
      'El alcance funciona como el radio de influencia (r = 12 km).',
      'Área = π · r².',
      'A = 3.1416 · 12² = 3.1416 · 144.',
      'A = 452.39 km².'
    ],
    answer: '452.39 km²'
  },
  {
    id: 17,
    title: 'Sombra en el patio',
    question: 'Una sombrilla de playa abierta forma un círculo perfecto de 2.4 m de diámetro. ¿Qué sombra proyectará en el suelo justo al mediodía?',
    steps: [
      'Justo al mediodía, la sombra es exactamente el área de la sombrilla.',
      'Diámetro = 2.4 m, por lo tanto Radio r = 1.2 m.',
      'Área = 3.1416 · (1.2)².',
      '1.2² = 1.44.',
      'Área = 3.1416 · 1.44 = 4.52 m².'
    ],
    answer: '4.52 m²'
  },
  {
    id: 18,
    title: 'Pizzas iguales',
    question: 'Si tienes media porción (semicírculo) de una pizza de 20 cm de diámetro. ¿Cuál es su área?',
    steps: [
      'Es un semicírculo, su área es la mitad del círculo completo.',
      'Diámetro d = 20, radio r = 10 cm.',
      'Área completa = 3.1416 · 10² = 314.16 cm².',
      'Área del semicírculo = 314.16 / 2 = 157.08 cm².'
    ],
    answer: '157.08 cm²'
  },
  {
    id: 19,
    title: 'La ventana de la iglesia',
    question: 'Un vitral circular tiene un área de 7.065 m². ¿Cuánto debe medir la cinta de hierro que lo enmarca (perímetro)?',
    steps: [
      'Primero descubrimos el radio: A = π · r²',
      '7.065 = 3.1416 · r²  =>  r² ≈ 2.25  =>  r = 1.5 m.',
      'Ahora calculamos el perímetro: P = 2 · π · r',
      'P = 2 · 3.1416 · 1.5 = 9.4248 m.'
    ],
    answer: '9.42 metros de cinta'
  },
  {
    id: 20,
    title: 'Arco de entrada',
    question: 'El ojo humano tiene una pupila circular que de noche, dilatada al máximo, tiene unos 8 mm de diámetro. ¿Cuál es el área por donde entra la luz?',
    steps: [
      'Diámetro d = 8 mm, entonces el Radio r = 4 mm.',
      'Fórmula: A = π · r².',
      'A = 3.1416 · 4² = 3.1416 · 16.',
      'A = 50.2656 mm².'
    ],
    answer: '50.26 mm²'
  }
];
