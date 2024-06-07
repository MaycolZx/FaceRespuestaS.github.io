// Datos de las gráficas
const dataAzul = [0.1,0.2,0.3,0.4, 0.6, 0.6, 1.0, 0.3, 0.3, 0.2, 0.1, 0.1, 0.1];
const dataRosa = [0, 0.1, 0.2, 0.3, 0.4, 0.6, 1.0, 0.8, 1.0, 0.1, 0.1, 0.1, 0.1];

// Generar labels dinámicos basados en la cantidad de valores
const labels = dataAzul.map((_, index) => `${index + 1}`);

// Función para interpolar el valor
function interpolate(data, t) {
    const n = data.length - 1;
    const index = t * n;
    const i = Math.floor(index);
    const f = index - i;
    if (i >= n) {
        return data[n];
    } else {
        return data[i] * (1 - f) + data[i + 1] * f;
    }
}

// Crear la gráfica azul
const ctxAzul = document.getElementById('graficaAzul').getContext('2d');
const graficaAzul = new Chart(ctxAzul, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Nivel de Excitación (Azul)',
            data: dataAzul,
            borderColor: 'blue',
            borderWidth: 2,
            fill: false,
            tension: 0.4
        }, {
            label: 'Punto Móvil',
            data: [null],
            borderColor: 'red',
            borderWidth: 4,
            fill: false,
            pointRadius: 5,
            showLine: false
        }]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tiempo'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Nivel de Excitación'
                },
                min: 0,
                max: 1
            }
        }
    }
});

// Crear la gráfica rosa
const ctxRosa = document.getElementById('graficaRosa').getContext('2d');
const graficaRosa = new Chart(ctxRosa, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Nivel de Excitación (Rosa)',
            data: dataRosa,
            borderColor: 'pink',
            borderWidth: 2,
            fill: false,
            tension: 0.4
        }, {
            label: 'Punto Móvil',
            data: [null],
            borderColor: 'red',
            borderWidth: 4,
            fill: false,
            pointRadius: 5,
            showLine: false
        }]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tiempo'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Nivel de Excitación'
                },
                min: 0,
                max: 1
            }
        }
    }
});

// Función para actualizar el punto móvil en las gráficas
function updateGraphs(value) {
    const interpolatedValueAzul = interpolate(dataAzul, value);
    const interpolatedValueRosa = interpolate(dataRosa, value);

    // Actualizar gráfica azul
    const datasetAzul = graficaAzul.data.datasets[1];
    datasetAzul.data = new Array(dataAzul.length).fill(null);
    const indexAzul = Math.floor(value * (dataAzul.length - 1));
    datasetAzul.data[indexAzul] = interpolatedValueAzul;
    graficaAzul.update();

    // Actualizar gráfica rosa
    const datasetRosa = graficaRosa.data.datasets[1];
    datasetRosa.data = new Array(dataRosa.length).fill(null);
    const indexRosa = Math.floor(value * (dataRosa.length - 1));
    datasetRosa.data[indexRosa] = interpolatedValueRosa;
    graficaRosa.update();

    // Actualizar las ondas según el valor interpolado de las gráficas
    waveAmplitudeInputAzul.value = interpolatedValueAzul * 50;  // Escalar el valor interpolado a la amplitud de la onda azul
    waveAmplitudeInputRosa.value = interpolatedValueRosa * 50;  // Escalar el valor interpolado a la amplitud de la onda rosa
}

// Event listener para el slider azul
document.getElementById('sliderAzul').addEventListener('input', function () {
    const value = this.value / 100;
    updateGraphs(value);
});

// Event listener para el slider rosa
document.getElementById('sliderRosa').addEventListener('input', function () {
    const value = this.value / 100;
    updateGraphs(value);
});

// Event listener para el slider maestro
document.getElementById('sliderMaestro').addEventListener('input', function () {
    const value = this.value / 100;
    // Actualizar sliders individuales
    document.getElementById('sliderAzul').value = this.value;
    document.getElementById('sliderRosa').value = this.value;
    updateGraphs(value);
});

// JS de ondas
const waveAmplitudeInputAzul = document.getElementById('waveAmplitudeInput');
const waveAmplitudeInputRosa = document.getElementById('waveAmplitudeInputRosa');

//const waveAmplitudeInputRosa = document.getElementById('waveAmplitudeInputRosa');

// Constante para la frecuencia de muestreo
const SAMPLE_RATE = 60;

// Constante para el tiempo de muestreo
const SAMPLE_TIME = 1000 / SAMPLE_RATE;

// Variable para controlar el tiempo actual
let currentTime = 0;

// Variable para controlar el desplazamiento de las ondas
let waveOffset = 0;

function drawWaves() {
    // Obtener el contexto del canvas azul
    const ctxAzul = document.getElementById('canvasAzul').getContext('2d');
    // Limpiar el canvas azul
    ctxAzul.clearRect(0, 0, ctxAzul.canvas.width, ctxAzul.canvas.height);
    // Obtener el valor actual de la barra de entrada de la onda azul
    const waveAmplitudeAzul = parseInt(waveAmplitudeInputAzul.value);
    // Dibujar las ondas azul
    ctxAzul.beginPath();
    ctxAzul.moveTo(0, ctxAzul.canvas.height / 2);
    for (let i = 0; i < ctxAzul.canvas.width; i++) {
        ctxAzul.lineTo(i, ctxAzul.canvas.height / 2 + waveAmplitudeAzul * Math.sin(2 * Math.PI * (i + waveOffset) / 50));
    }
    ctxAzul.strokeStyle = 'blue';
    ctxAzul.stroke();

    // Obtener el contexto del canvas rosa
    const ctxRosa = document.getElementById('canvasRosa').getContext('2d');
    // Limpiar el canvas rosa
    ctxRosa.clearRect(0, 0, ctxRosa.canvas.width, ctxRosa.canvas.height);
    // Obtener el valor actual de la barra de entrada de la onda rosa
    const waveAmplitudeRosa = parseInt(waveAmplitudeInputRosa.value);
    // Dibujar las ondas rosa
    ctxRosa.beginPath();
    ctxRosa.moveTo(0, ctxRosa.canvas.height / 2);
    for (let i = 0; i < ctxRosa.canvas.width; i++) {
        ctxRosa.lineTo(i, ctxRosa.canvas.height / 2 + waveAmplitudeRosa * Math.sin(2 * Math.PI * (i + waveOffset) / 50));
    }
    ctxRosa.strokeStyle = 'red';
    ctxRosa.stroke();
}


function updateAnimation() {
    // Actualizar el tiempo actual
    currentTime += SAMPLE_TIME;
    // Actualizar el desplazamiento de las ondas
    waveOffset += 1;
    // Dibujar las ondas actualizadas
    drawWaves();
}


let animationInterval = setInterval(updateAnimation, SAMPLE_TIME);

const openHTMLButton = document.getElementById('openHTMLButton');
openHTMLButton.addEventListener('click', openHTMLFile);

function openHTMLFile() {
    const htmlFilePath = 'markmap.html';
    window.location.href = htmlFilePath;
}
// Iniciar la animación
//let animationInterval = setInterval(updateAnimation, SAMPLE_TIME);