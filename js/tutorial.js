/* ============================================
   TUTORIAL.JS - Modo guiado / Onboarding
   ============================================ */

const TUTORIALS = {
    simulator: [
        {
            title: "🔌 Bienvenido al simulador",
            body: `
                <p>Este es un <strong>simulador de red tipo Cisco Packet Tracer</strong>, hecho a tu medida. Aquí puedes:</p>
                <ul style="padding-left:24px; line-height:1.8;">
                    <li>Arrastrar dispositivos al canvas</li>
                    <li>Conectarlos con cables</li>
                    <li>Configurar sus IPs, máscaras, gateways, DNS, VLANs</li>
                    <li>Hacer ping entre ellos para comprobar conectividad</li>
                    <li>Guardar tus topologías</li>
                </ul>
                <p style="margin-top:14px;">En los próximos pasos te enseño cómo funciona cada parte.</p>
            `
        },
        {
            title: "🧰 Toolbox de dispositivos (izquierda)",
            body: `
                <p>En el panel <strong>de la izquierda</strong> tienes todos los dispositivos disponibles, agrupados por categoría:</p>
                <ul style="padding-left:24px; line-height:1.8;">
                    <li><strong>Equipos finales:</strong> PC, portátil, móvil, servidor, impresora, cámara IP, teléfono IP, smart TV, tablet, NAS, IoT</li>
                    <li><strong>Interconexión:</strong> hub, switch, router, patch panel</li>
                    <li><strong>Inalámbrico:</strong> Access Point</li>
                    <li><strong>Seguridad:</strong> firewall</li>
                    <li><strong>Otros:</strong> nube (internet)</li>
                </ul>
                <p style="margin-top:14px;">Para añadir uno al canvas, <strong>haz clic</strong> sobre él o <strong>arrástralo</strong> a la zona central.</p>
                <div class="info-box">💡 Puedes plegar el toolbox con el botón ◀ para tener más espacio.</div>
            `
        },
        {
            title: "🎨 Canvas central — Tu lienzo",
            body: `
                <p>El <strong>canvas</strong> es el área grande donde construyes tu red. Es un espacio amplio (2000×1400 px) con cuadrícula de fondo.</p>
                <h4>Acciones disponibles:</h4>
                <ul style="padding-left:24px; line-height:1.8;">
                    <li><strong>Arrastrar dispositivos:</strong> haz clic + arrastra para moverlos.</li>
                    <li><strong>Hacer scroll:</strong> con la rueda del ratón o las barras laterales si la red es grande.</li>
                    <li><strong>Zoom in/out:</strong> con los botones <strong>+</strong> y <strong>−</strong> en la esquina inferior derecha.</li>
                    <li><strong>Resetear zoom:</strong> botón ⌂ para volver al 100%.</li>
                    <li><strong>Centrar canvas:</strong> botón 🎯 Centrar en la barra superior.</li>
                </ul>
            `
        },
        {
            title: "🛠️ Modos de interacción",
            body: `
                <p>En la <strong>barra superior</strong> del canvas tienes tres modos:</p>
                <ul style="padding-left:24px; line-height:1.8;">
                    <li><strong>👆 Seleccionar:</strong> modo por defecto. Click en un dispositivo abre su panel de configuración. Arrastra para moverlos.</li>
                    <li><strong>🔗 Conectar:</strong> haz click en dos dispositivos seguidos para crear un cable entre ellos. El sistema detecta automáticamente si necesita cable directo, cruzado o inalámbrico.</li>
                    <li><strong>🗑️ Borrar:</strong> click en un dispositivo o conexión para eliminarlo.</li>
                </ul>
                <div class="tip-box">💡 Para volver al modo normal, pulsa <strong>👆 Seleccionar</strong>.</div>
            `
        },
        {
            title: "⚙️ Panel de configuración (derecha)",
            body: `
                <p>Cuando seleccionas un dispositivo, en el <strong>panel derecho</strong> aparecen sus opciones de configuración:</p>
                <ul style="padding-left:24px; line-height:1.8;">
                    <li><strong>Nombre:</strong> ponle uno descriptivo (ej: PC-Juan).</li>
                    <li><strong>IP, máscara, gateway, DNS:</strong> configuración de red.</li>
                    <li><strong>VLAN:</strong> opcional, para segmentar.</li>
                    <li><strong>Para APs:</strong> SSID, contraseña, banda (2.4/5 GHz).</li>
                    <li><strong>Para routers:</strong> múltiples interfaces (LAN y WAN).</li>
                </ul>
                <div class="info-box">📌 El sistema <strong>valida</strong> las IPs en tiempo real y te avisa si hay duplicados.</div>
            `
        },
        {
            title: "📡 Hacer ping",
            body: `
                <p>El comando estrella para comprobar si dos equipos se "ven" entre sí.</p>
                <h4>Dos formas de hacer ping:</h4>
                <ol style="padding-left:24px; line-height:1.8;">
                    <li>Seleccionas un dispositivo → en su panel haz clic en <strong>📡 Ping desde aquí</strong> → eliges destino.</li>
                    <li>Pulsa <strong>📡 Ping</strong> en la barra superior → eliges origen y destino.</li>
                </ol>
                <p>El simulador comprobará:</p>
                <ul style="padding-left:24px; line-height:1.8;">
                    <li>✅ Que ambos tengan IP válida</li>
                    <li>✅ Que haya camino físico entre ellos</li>
                    <li>✅ Que estén en la misma subred (o que haya router con gateway válido)</li>
                    <li>✅ Que las VLANs sean compatibles</li>
                </ul>
                <p>Si todo va bien, verás <strong>animación del paquete</strong> recorrer la red.</p>
            `
        },
        {
            title: "📋 Escenarios pre-cargados",
            body: `
                <p>Debajo del canvas tienes <strong>escenarios listos</strong> para cargar:</p>
                <ul style="padding-left:24px; line-height:1.8;">
                    <li>🏠 Red doméstica</li>
                    <li>🏢 Pequeña oficina</li>
                    <li>🏫 Instituto</li>
                    <li>📚 Biblioteca</li>
                    <li>🏭 Empresa con departamentos</li>
                    <li>🛍️ Centro comercial</li>
                    <li>🎓 Colegio multinivel</li>
                    <li>🏟️ Estadio de fútbol</li>
                    <li>⛲ Plaza pública con WiFi</li>
                    <li>🏥 Hospital</li>
                    <li>🍴 Restaurante con TPV</li>
                    <li>📝 <strong>EJERCICIO EXAMEN de Igor</strong></li>
                </ul>
                <p>Click en cualquiera y tendrás la red base montada. Te toca configurar las IPs y hacer que funcione.</p>
                <div class="highlight-box">
                    <div class="highlight-box-title">🎯 Reto</div>
                    <p>Carga el "EJERCICIO EXAMEN", configura todas las VLANs e IPs, y haz ping entre departamentos. Si lo consigues, eres ya un crack.</p>
                </div>
            `
        },
        {
            title: "🎉 ¡Listo para empezar!",
            body: `
                <p>Ya conoces todo lo importante. Resumen rápido:</p>
                <ul style="padding-left:24px; line-height:1.8;">
                    <li><strong>1️⃣</strong> Añade dispositivos al canvas (clic en el toolbox).</li>
                    <li><strong>2️⃣</strong> Cambia a modo <strong>🔗 Conectar</strong> y une los dispositivos.</li>
                    <li><strong>3️⃣</strong> Vuelve a <strong>👆 Seleccionar</strong> y configura las IPs.</li>
                    <li><strong>4️⃣</strong> Haz <strong>📡 Ping</strong> y comprueba que funciona.</li>
                    <li><strong>5️⃣</strong> Guarda tu trabajo con <strong>💾 Guardar</strong>.</li>
                </ul>
                <p style="margin-top:14px;">Puedes volver a ver este tutorial en cualquier momento desde el botón <strong>📖 Ver tutorial</strong> en la cabecera.</p>
                <div class="tip-box">🚀 Cada ping exitoso te da <strong>+15 XP</strong>. ¡A construir redes!</div>
            `
        }
    ],
    subnetting: [
        {
            title: "🧮 Bienvenido al laboratorio de Subnetting",
            body: `
                <p>El subnetting (dividir una red en subredes) es uno de los conceptos más importantes — y temidos — de redes. Este laboratorio te lo va a hacer fácil.</p>
                <p>Aquí encontrarás <strong>cinco apartados</strong>:</p>
                <ul style="padding-left:24px; line-height:1.8;">
                    <li>📚 <strong>Teoría:</strong> el procedimiento completo paso a paso, tal y como está en los apuntes.</li>
                    <li>🧮 <strong>Calculadora:</strong> introduce una IP y prefijo y te calcula todo.</li>
                    <li>📐 <strong>Dividir red:</strong> introduce una red y nº de subredes y te las genera.</li>
                    <li>🎯 <strong>Ejercicios:</strong> 11 ejercicios resueltos paso a paso + generador aleatorio.</li>
                    <li>📋 <strong>Tabla rápida:</strong> referencia de máscaras, wildcards y hosts.</li>
                </ul>
            `
        },
        {
            title: "📚 Apartado de Teoría",
            body: `
                <p>El más importante. Aquí tienes <strong>todo lo que necesitas saber</strong>:</p>
                <ol style="padding-left:24px; line-height:1.8;">
                    <li><strong>Introducción:</strong> ¿por qué hacer subnetting?</li>
                    <li><strong>Fundamentos:</strong> bits, máscaras, clases, dirección de red, potencias de 2, hosts.</li>
                    <li><strong>Caso práctico 1:</strong> 192.178.45.6 → 5 subredes, paso a paso.</li>
                    <li><strong>Enfoque rewind:</strong> ¿cómo identifico una subred si ya me dan el prefijo?</li>
                    <li><strong>Resumen 10 pasos:</strong> el procedimiento completo de Igor.</li>
                    <li><strong>NAT explicado:</strong> la "Conversación entre borrachos" de los apuntes.</li>
                </ol>
                <div class="info-box">📌 Recomendación: lee la teoría completa una vez ANTES de hacer ejercicios. Te ahorrará tiempo.</div>
            `
        },
        {
            title: "🧮 Calculadora",
            body: `
                <p>Pestaña "Calculadora". Introduce:</p>
                <ul style="padding-left:24px; line-height:1.8;">
                    <li>Una dirección IP cualquiera (ej: 192.168.45.137).</li>
                    <li>Un prefijo /N (usa el slider o botones rápidos /24, /27...).</li>
                </ul>
                <p>Te calculará automáticamente:</p>
                <ul style="padding-left:24px; line-height:1.8;">
                    <li>🌐 Dirección de red</li>
                    <li>📡 Dirección de broadcast</li>
                    <li>🥇 Primera y última IP útil</li>
                    <li>🧮 Número de hosts útiles</li>
                    <li>🏷️ Clase y tipo (pública/privada)</li>
                    <li>🔬 Visualización binaria coloreada (bits de red vs bits de host)</li>
                </ul>
            `
        },
        {
            title: "📐 Dividir red",
            body: `
                <p>Pestaña "Dividir red". Aquí haces el proceso clásico: tienes una red y necesitas N subredes.</p>
                <p>Introduce:</p>
                <ul style="padding-left:24px; line-height:1.8;">
                    <li><strong>Red base:</strong> ej. 192.168.10.0</li>
                    <li><strong>Prefijo original:</strong> ej. 24</li>
                    <li><strong>Nº de subredes:</strong> ej. 5</li>
                </ul>
                <p>Te mostrará el <strong>procedimiento paso a paso</strong>:</p>
                <ol style="padding-left:24px; line-height:1.8;">
                    <li>Bits necesarios calculados con ⌈log₂(N)⌉</li>
                    <li>Nuevo prefijo y nueva máscara</li>
                    <li>Tamaño de bloque e incremento</li>
                    <li>Hosts útiles por subred</li>
                    <li>Lista completa de las subredes generadas (con red, rango útil y broadcast)</li>
                </ol>
            `
        },
        {
            title: "🎯 Ejercicios resueltos y aleatorios",
            body: `
                <p>El apartado más didáctico. Tienes <strong>dos modos</strong>:</p>
                <h4>1. Ejercicios resueltos (11 ejemplos paso a paso)</h4>
                <p>Desde fáciles (/25 para 2 subredes) hasta expertos (calcular todo de 10.20.30.45/22). Cada uno tiene:</p>
                <ul style="padding-left:24px; line-height:1.8;">
                    <li>Enunciado</li>
                    <li>Botón "Ver solución" para revelar la respuesta paso a paso</li>
                    <li>Etiqueta de dificultad (fácil/medio/difícil/experto)</li>
                </ul>
                <h4>2. Generador aleatorio</h4>
                <p>Te plantea un ejercicio nuevo cada vez:</p>
                <ul style="padding-left:24px; line-height:1.8;">
                    <li>Hallar dirección de red, broadcast, número de hosts, máscara, división en subredes...</li>
                    <li>Cada acierto te da <strong>+20 XP</strong>.</li>
                    <li>Botón "Pista" si te atascas.</li>
                </ul>
            `
        },
        {
            title: "🎉 ¡A practicar!",
            body: `
                <p>El secreto del subnetting: <strong>práctica, práctica y práctica</strong>. No memorices, comprende.</p>
                <p>Plan recomendado:</p>
                <ol style="padding-left:24px; line-height:1.8;">
                    <li>Lee la teoría completa (15 minutos).</li>
                    <li>Juega con la calculadora cambiando prefijos para ver cómo cambia todo.</li>
                    <li>Haz 5 ejercicios resueltos sin ver la solución, luego compara.</li>
                    <li>Empieza con el generador aleatorio y no pares hasta acertar 10 seguidos.</li>
                </ol>
                <p style="margin-top:14px;">Si llegas a ese punto, ya no se te resiste un examen de subnetting.</p>
                <div class="tip-box">🚀 Puedes volver a ver este tutorial cuando quieras desde el botón <strong>📖 Ver tutorial</strong>.</div>
            `
        }
    ]
};

let tutorialState = {
    active: null,
    step: 0
};

function openTutorial(name) {
    if (!TUTORIALS[name]) return;
    tutorialState.active = name;
    tutorialState.step = 0;
    renderTutorial();
    document.getElementById('tutorialOverlay').classList.add('active');
}

function closeTutorial() {
    document.getElementById('tutorialOverlay').classList.remove('active');
    // Marcar como visto para no auto-abrir más
    if (tutorialState.active) {
        const seen = JSON.parse(localStorage.getItem('redacademia_tutorials_seen') || '{}');
        seen[tutorialState.active] = true;
        localStorage.setItem('redacademia_tutorials_seen', JSON.stringify(seen));
    }
    tutorialState.active = null;
    tutorialState.step = 0;
}

function renderTutorial() {
    const t = TUTORIALS[tutorialState.active];
    if (!t) return;
    const step = t[tutorialState.step];
    if (!step) return;

    document.getElementById('tutorialStepNum').textContent = `Paso ${tutorialState.step + 1} de ${t.length}`;
    document.getElementById('tutorialTitle').textContent = step.title;
    document.getElementById('tutorialBody').innerHTML = step.body;

    // Progress dots
    const prog = document.getElementById('tutorialProgress');
    prog.innerHTML = t.map((_, i) =>
        `<div class="tutorial-progress-dot ${i === tutorialState.step ? 'active' : ''}"></div>`
    ).join('');

    // Botones
    const prev = document.getElementById('tutorialPrev');
    const next = document.getElementById('tutorialNext');
    prev.style.visibility = tutorialState.step > 0 ? 'visible' : 'hidden';
    if (tutorialState.step === t.length - 1) {
        next.textContent = '✅ Empezar';
    } else {
        next.textContent = 'Siguiente →';
    }
}

function tutorialNext() {
    const t = TUTORIALS[tutorialState.active];
    if (!t) return;
    if (tutorialState.step < t.length - 1) {
        tutorialState.step++;
        renderTutorial();
    } else {
        closeTutorial();
    }
}

function tutorialPrev() {
    if (tutorialState.step > 0) {
        tutorialState.step--;
        renderTutorial();
    }
}

// Auto-mostrar tutorial la primera vez
function maybeShowTutorial(name) {
    try {
        const seen = JSON.parse(localStorage.getItem('redacademia_tutorials_seen') || '{}');
        if (!seen[name]) {
            setTimeout(() => openTutorial(name), 600);
        }
    } catch (e) {
        // ignore
    }
}
