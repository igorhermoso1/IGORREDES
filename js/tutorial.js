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
    ],
    floorplan: [
        {
            title: "🗺️ Bienvenido al editor de mapas lógicos",
            body: `
                <p>Esta herramienta funciona como <strong>draw.io pero centrada en redes</strong>. Aquí puedes:</p>
                <ul style="padding-left:24px; line-height:1.8;">
                    <li>Dibujar el <strong>plano de un edificio</strong>: paredes, zonas, puertas.</li>
                    <li>Colocar <strong>dispositivos de red</strong> (router, switch, AP, PCs, etc.) sobre el plano.</li>
                    <li>Asignar <strong>IPs, VLANs y etiquetas</strong> a cada elemento.</li>
                    <li>Cargar <strong>plantillas</strong> (casa, oficina, colegio, restaurante).</li>
                    <li>Exportar a <strong>PNG o JSON</strong> para compartir.</li>
                </ul>
                <div class="info-box" style="margin-top:14px;">💾 Todo se guarda automáticamente en tu navegador.</div>
            `
        },
        {
            title: "🛠️ Herramientas (panel izquierdo)",
            body: `
                <p>En el panel de la izquierda tienes los <strong>modos</strong>:</p>
                <ul style="padding-left:24px; line-height:1.8;">
                    <li><strong>👆 Seleccionar:</strong> arrastra elementos para moverlos, haz clic para editarlos en el panel derecho.</li>
                    <li><strong>🧱 Pared:</strong> clic y arrastra para dibujar una pared (siempre horizontal o vertical).</li>
                    <li><strong>🟦 Zona:</strong> clic y arrastra para crear una habitación rectangular con color y etiqueta.</li>
                    <li><strong>🚪 Puerta:</strong> clic donde quieras colocarla.</li>
                    <li><strong>🔤 Texto:</strong> clic y escribe una etiqueta libre.</li>
                    <li><strong>🗑️ Borrar:</strong> clic en el elemento para eliminarlo.</li>
                </ul>
            `
        },
        {
            title: "📡 Equipos de red",
            body: `
                <p>Más abajo del panel izquierdo tienes la <strong>biblioteca de equipos</strong>: router, switch, AP, firewall, servidor, PC, portátil, móvil, tablet, impresora, cámara IP, IoT, NAS, nube, smart TV, IPTV, patch panel, hub.</p>
                <p>Para colocar uno:</p>
                <ol style="padding-left:24px; line-height:1.8;">
                    <li>Haz clic en el equipo del panel</li>
                    <li>Verás que entras en modo "colocar"</li>
                    <li>Haz clic en el plano donde quieras ubicarlo</li>
                    <li>Puedes seguir colocando más del mismo tipo, o cambiar de modo con <strong>Esc</strong></li>
                </ol>
            `
        },
        {
            title: "⚙️ Panel de propiedades (derecha)",
            body: `
                <p>Cuando seleccionas un elemento, en el <strong>panel derecho</strong> aparecen sus opciones:</p>
                <ul style="padding-left:24px; line-height:1.8;">
                    <li><strong>Paredes:</strong> grosor.</li>
                    <li><strong>Zonas:</strong> nombre, color, tamaño.</li>
                    <li><strong>Puertas:</strong> ancho y rotación (para abrir hacia distintas direcciones).</li>
                    <li><strong>Textos:</strong> contenido y tamaño de fuente.</li>
                    <li><strong>Dispositivos:</strong> etiqueta, IP, VLAN. También puedes duplicar.</li>
                </ul>
            `
        },
        {
            title: "📋 Plantillas y atajos",
            body: `
                <p>Si no quieres empezar de cero, usa el selector de <strong>plantillas</strong>: ya tienes hechas casa, oficina, colegio y restaurante.</p>
                <h4>Atajos de teclado:</h4>
                <ul style="padding-left:24px; line-height:1.8;">
                    <li><strong>Esc</strong> → modo seleccionar</li>
                    <li><strong>W</strong> → modo pared</li>
                    <li><strong>Z</strong> → modo zona (Ctrl+Z = deshacer)</li>
                    <li><strong>D</strong> → modo borrar</li>
                    <li><strong>Supr</strong> → eliminar el elemento seleccionado</li>
                </ul>
                <h4>Zoom y vista:</h4>
                <p>Botones <strong>+</strong>, <strong>−</strong> y <strong>⌂</strong> en la esquina inferior derecha. Hay <strong>cuadrícula con snap</strong> automático para alinear todo.</p>
            `
        }
    ],
    routerConfig: [
        {
            title: "🖥️ Bienvenido al configurador de router",
            body: `
                <p>Este simulador emula la <strong>CLI de un router estilo Cisco IOS</strong>. Aprenderás a configurar un router como en la vida real, sin necesidad de hardware.</p>
                <p>Tienes dos modos de uso:</p>
                <ul style="padding-left:24px; line-height:1.8;">
                    <li><strong>📚 Lecciones guiadas:</strong> 8 lecciones que te llevan paso a paso por todos los aspectos (acceso, IP, DHCP, WiFi, NAT, VLANs, rutas, guardado).</li>
                    <li><strong>🚀 Modo libre:</strong> explora a tu ritmo, configura lo que quieras.</li>
                </ul>
                <div class="info-box" style="margin-top:14px;">💡 Cada lección completada te da <strong>+30 XP</strong>.</div>
            `
        },
        {
            title: "🧭 Los modos del router",
            body: `
                <p>Como en un Cisco real, hay <strong>varios modos jerárquicos</strong>. El prompt te indica dónde estás:</p>
                <ul style="padding-left:24px; line-height:1.8; font-family:'Courier New',monospace; font-size:0.95em;">
                    <li><strong>Router&gt;</strong> → modo USUARIO (solo ver)</li>
                    <li><strong>Router#</strong> → modo PRIVILEGIADO (root)</li>
                    <li><strong>Router(config)#</strong> → CONFIGURACIÓN GLOBAL</li>
                    <li><strong>Router(config-if)#</strong> → dentro de una INTERFAZ</li>
                    <li><strong>Router(dhcp-config)#</strong> → dentro de un pool DHCP</li>
                    <li><strong>Router(config-wifi)#</strong> → dentro del WiFi</li>
                </ul>
                <p style="margin-top:14px;">Para subir de modo: <code>enable</code>, <code>configure terminal</code>, <code>interface g0/0</code>... Para bajar: <code>exit</code> o <code>end</code>.</p>
            `
        },
        {
            title: "⌨️ Trucos del terminal",
            body: `
                <p>El terminal es <strong>interactivo de verdad</strong>:</p>
                <ul style="padding-left:24px; line-height:1.8;">
                    <li><strong>↑ / ↓</strong> → navegar por el historial de comandos.</li>
                    <li><strong>Tab</strong> → autocompletar (si hay un solo match) o sugerir.</li>
                    <li><strong>?</strong> → muestra los comandos disponibles en el modo actual.</li>
                    <li><strong>Abreviaturas</strong>: como en Cisco real, <code>en</code> = enable, <code>conf t</code> = configure terminal, <code>sh ip int br</code> = show ip interface brief, <code>no shut</code> = no shutdown.</li>
                </ul>
            `
        },
        {
            title: "🎯 Cómo funcionan las lecciones",
            body: `
                <p>Las lecciones guiadas te muestran <strong>en el panel derecho</strong> los pasos que debes ejecutar:</p>
                <ol style="padding-left:24px; line-height:1.8;">
                    <li>Lees el objetivo y los comandos sugeridos</li>
                    <li>Tecleas el comando en el terminal</li>
                    <li>Cuando coincide con el esperado, el paso se marca como ✓</li>
                    <li>Al completar todos los pasos, ¡lección superada y +30 XP!</li>
                </ol>
                <p>El sistema acepta <strong>equivalencias</strong> (enable ≡ en, configure terminal ≡ conf t...) y <strong>valores libres</strong> (la IP que tú elijas, el nombre de hostname que quieras...).</p>
            `
        },
        {
            title: "🚀 Empieza ya",
            body: `
                <p>Empezar es fácil. Te recomiendo este orden:</p>
                <ol style="padding-left:24px; line-height:1.8;">
                    <li>Lección 1 — acceso básico</li>
                    <li>Lección 2 — IP en una interfaz LAN</li>
                    <li>Lección 3 — DHCP</li>
                    <li>Lección 4 — WiFi</li>
                    <li>Lección 5 — NAT (la salida a internet)</li>
                    <li>Lección 6 — VLANs</li>
                    <li>Lección 7 — Ruta estática</li>
                    <li>Lección 8 — Guardar la config</li>
                </ol>
                <p>El panel derecho (<strong>"En qué modo estoy"</strong> y <strong>"Comandos disponibles"</strong>) se actualiza en tiempo real para ayudarte sin agobiar. ¡Suerte!</p>
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
