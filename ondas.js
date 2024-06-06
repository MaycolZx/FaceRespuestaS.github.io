        const waveAmplitudeInput = document.getElementById('waveAmplitudeInput');

        // Constante para la frecuencia de muestreo
        const SAMPLE_RATE = 60;

        // Constante para el tiempo de muestreo
        const SAMPLE_TIME = 1000 / SAMPLE_RATE;

        // Variable para controlar el tiempo actual
        let currentTime = 0;

        // Variable para controlar el desplazamiento de las ondas
        let waveOffset = 0;

        // Función para dibujar las ondas
        function drawWaves() {
            // Obtener el contexto del canvas
            const ctx = document.getElementById('canvas').getContext('2d');

            // Limpiar el canvas
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            // Obtener el valor actual de la barra de entrada
            const waveAmplitude = parseInt(waveAmplitudeInput.value);

            // Dibujar las ondas
            ctx.beginPath();
            ctx.moveTo(0, ctx.canvas.height / 2);
            for (let i = 0; i < ctx.canvas.width; i++) {
                ctx.lineTo(i, ctx.canvas.height / 2 + waveAmplitude * Math.sin(2 * Math.PI * (i + waveOffset) / 50));
            }
            ctx.stroke();
        }

        // Función para actualizar la animación
        function updateAnimation() {
            // Actualizar el tiempo actual
            currentTime += SAMPLE_TIME;

            // Actualizar el desplazamiento de las ondas
            waveOffset += 1;

            // Dibujar las ondas actualizadas
            drawWaves();
        }

        // Iniciar la animación
        let animationInterval = setInterval(updateAnimation, SAMPLE_TIME);
