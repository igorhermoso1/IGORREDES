/* ============================================
   FLASHCARDS.JS - Tarjetas de repaso por categorías
   ============================================ */

const FLASHCARDS = {
    'basicos': {
        title: '🧱 Conceptos básicos',
        cards: [
            { front: '¿Qué es una LAN?', back: 'Local Area Network. Red de área local, limitada a un edificio o campus. Velocidades altas (1-10 Gbps) y baja latencia.' },
            { front: '¿Qué diferencia hay entre LAN, MAN y WAN?', back: 'LAN: local (edificio). MAN: metropolitana (ciudad). WAN: extensa (países, mundo). Internet es la WAN más grande.' },
            { front: '¿Qué es una topología de red?', back: 'La forma física o lógica en que se conectan los dispositivos: estrella, bus, anillo, malla, árbol, híbrida.' },
            { front: '¿Qué es un protocolo?', back: 'Un conjunto de reglas que dispositivos siguen para comunicarse. Ejemplos: TCP, IP, HTTP, DNS.' },
            { front: '¿Qué es el ancho de banda?', back: 'La cantidad de datos que se pueden transmitir en un periodo. Se mide en bps (bits por segundo): Mbps, Gbps.' },
            { front: '¿Qué es la latencia?', back: 'El tiempo que tarda un paquete en ir de origen a destino. Se mide en ms. A menor latencia, mejor (para gaming, videollamadas...).' }
        ]
    },
    'modelos': {
        title: '🎯 Modelos de red',
        cards: [
            { front: '¿Cuántas capas tiene el modelo OSI?', back: '7 capas: Física, Enlace, Red, Transporte, Sesión, Presentación, Aplicación.' },
            { front: '¿En qué capa OSI trabaja un switch?', back: 'Capa 2 (Enlace de datos). Usa direcciones MAC para reenviar tramas.' },
            { front: '¿En qué capa OSI trabaja un router?', back: 'Capa 3 (Red). Usa direcciones IP para enrutar paquetes entre redes.' },
            { front: '¿Cuántas capas tiene TCP/IP?', back: '4 capas: Acceso a red, Internet, Transporte, Aplicación. Más simple que OSI, pero equivalente en concepto.' },
            { front: '¿Qué hace la capa de transporte?', back: 'Garantiza la entrega de datos extremo a extremo. Protocolos clave: TCP (fiable) y UDP (rápido).' },
            { front: 'TCP vs UDP, ¿en una frase?', back: 'TCP: confiable, ordenado, con confirmación (webs, email). UDP: rápido, sin garantías (streaming, gaming, DNS).' }
        ]
    },
    'cableado': {
        title: '🔌 Cableado',
        cards: [
            { front: '¿Qué es UTP?', back: 'Unshielded Twisted Pair: cable de par trenzado sin blindaje. El más común. Categorías: Cat5e, Cat6, Cat6a, Cat7, Cat8.' },
            { front: '¿Diferencia entre T568A y T568B?', back: 'Son dos estándares de colocación de los hilos en el conector RJ45. T568B es el más usado en empresas.' },
            { front: '¿Cuándo se usa cable cruzado?', back: 'Para conectar dispositivos del mismo tipo: PC↔PC, switch↔switch, router↔router. Con Auto-MDIX ya casi no hace falta.' },
            { front: '¿Velocidad máxima de Cat6?', back: '10 Gbps en distancias cortas (hasta 55m). 1 Gbps en 100m. Cat6a llega a 10 Gbps en 100m completos.' },
            { front: '¿Qué es la fibra óptica?', back: 'Cable que transmite luz a través de hilos de vidrio o plástico. Velocidades muy altas (10-400 Gbps), sin interferencias, larga distancia.' },
            { front: 'Fibra multimodo vs monomodo', back: 'Multimodo (MM): cortas distancias (~500m), más barata. Monomodo (SM): larga distancia (decenas de km), láser, más cara.' }
        ]
    },
    'ip': {
        title: '📍 IP y direccionamiento',
        cards: [
            { front: '¿Cuántos bits tiene una IPv4?', back: '32 bits, organizados en 4 octetos de 8 bits cada uno. Ejemplo: 192.168.1.1' },
            { front: '¿Qué es una IP privada?', back: 'IP solo usable dentro de redes locales. Rangos: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. No se enrutan en internet.' },
            { front: '¿Qué es CIDR?', back: 'Classless Inter-Domain Routing. Notación tipo 192.168.1.0/24 que indica cuántos bits son de red. Reemplazó al sistema de clases A/B/C.' },
            { front: '¿Qué hace NAT?', back: 'Network Address Translation. Traduce IPs privadas a una pública. Permite que muchos equipos compartan una sola IP pública.' },
            { front: '¿Cuántos bits tiene IPv6?', back: '128 bits. 340 sextillones de direcciones. Notación hexadecimal: 2001:db8::1' },
            { front: '¿Qué es la dirección de broadcast?', back: 'La última IP de una subred. Se envía a todos los hosts de esa red. En 192.168.1.0/24, broadcast = 192.168.1.255' }
        ]
    },
    'subnetting': {
        title: '🧮 Subnetting',
        cards: [
            { front: '¿Qué significa /24?', back: 'Que los primeros 24 bits son de red y los 8 restantes de host. Máscara: 255.255.255.0. Hay 254 hosts útiles.' },
            { front: 'Hosts útiles en /27', back: '2^(32-27) - 2 = 32 - 2 = 30 hosts útiles.' },
            { front: 'Máscara de /26', back: '255.255.255.192. Tiene 64 IPs (62 útiles).' },
            { front: '¿Cuántos bits para 8 subredes?', back: '3 bits (2³ = 8). Si parto de /24, las subredes serán /27.' },
            { front: '¿Qué es la dirección de red?', back: 'La primera IP de cada subred. Tiene todos los bits de host a 0. No se asigna a hosts.' },
            { front: '¿Qué pasa con /30?', back: '4 IPs totales, 2 útiles. Se usa para enlaces punto a punto entre routers.' }
        ]
    },
    'dispositivos': {
        title: '⚙️ Dispositivos',
        cards: [
            { front: '¿Qué hace un switch?', back: 'Conecta dispositivos en una LAN. Aprende las MACs y reenvía tramas solo al puerto correcto (no a todos como un hub).' },
            { front: '¿Qué hace un router?', back: 'Conecta redes diferentes. Decide la mejor ruta para los paquetes usando tablas de enrutamiento y direcciones IP.' },
            { front: '¿Qué es un hub?', back: 'Dispositivo obsoleto que repite todo lo que recibe por todos los puertos. Generaba colisiones. Reemplazado por switches.' },
            { front: '¿Qué es un AP?', back: 'Access Point. Punto de acceso WiFi. Convierte una conexión cableada en inalámbrica.' },
            { front: '¿Para qué sirve un firewall?', back: 'Filtra tráfico según reglas de seguridad. Bloquea o permite conexiones según puerto, IP, protocolo, etc.' },
            { front: '¿Qué es un módem?', back: 'Modulador-Demodulador. Convierte señales digitales en analógicas (y viceversa) para usar líneas tipo ADSL, cable, fibra GPON.' }
        ]
    },
    'protocolos': {
        title: '🔄 Protocolos y servicios',
        cards: [
            { front: '¿Qué hace DHCP?', back: 'Asigna automáticamente IP, máscara, gateway y DNS a los equipos cuando se conectan. Evita configurar a mano.' },
            { front: '¿Qué hace DNS?', back: 'Traduce nombres (google.com) a IPs (142.250.78.78). La guía telefónica de internet.' },
            { front: '¿Qué hace ARP?', back: 'Resuelve direcciones IP a direcciones MAC dentro de una LAN. "¿Quién tiene la IP X? Que me dé su MAC."' },
            { front: '¿Qué es HTTPS?', back: 'HTTP cifrado con TLS. Puerto 443. Protege la comunicación web del espionaje.' },
            { front: '¿Para qué sirve ICMP?', back: 'Protocolo de mensajes de control. Lo usan ping y traceroute para diagnosticar problemas de red.' },
            { front: '¿Qué es VPN?', back: 'Virtual Private Network. Túnel cifrado sobre internet que conecta redes o usuarios de forma segura, como si estuvieran en la misma LAN.' }
        ]
    },
    'wireless': {
        title: '📶 WiFi e inalámbricas',
        cards: [
            { front: '¿En qué bandas opera WiFi?', back: '2.4 GHz (más alcance, menos velocidad, más interferencias) y 5 GHz (más rápido, menos alcance). WiFi 6E/7 añaden 6 GHz.' },
            { front: '¿Qué es WPA3?', back: 'El protocolo de cifrado WiFi más moderno (2018+). Más seguro que WPA2. Obligatorio en WiFi 6 certificado.' },
            { front: '¿Diferencia entre SSID y BSSID?', back: 'SSID: el nombre de la red WiFi. BSSID: la MAC del AP que la emite. Una red con varios APs comparte SSID pero tiene varios BSSIDs.' },
            { front: '¿Qué es WiFi 6?', back: 'IEEE 802.11ax. Velocidades de varios Gbps, mejor gestión de muchos clientes (OFDMA), eficiencia energética (TWT).' },
            { front: '¿Qué es roaming WiFi?', back: 'Cuando un dispositivo cambia de AP a otro (con mismo SSID) sin perder la conexión. Útil en edificios grandes.' },
            { front: '¿Qué es un canal WiFi?', back: 'Una porción del espectro radioeléctrico. En 2.4 GHz hay 11-13 canales, pero solo 3 no se solapan (1, 6, 11).' }
        ]
    },
    'vlans': {
        title: '🏷️ VLANs y avanzado',
        cards: [
            { front: '¿Qué es una VLAN?', back: 'Virtual LAN. Divide un switch en redes lógicas independientes. Equipos en VLANs distintas no se comunican sin router.' },
            { front: '¿Qué es 802.1Q?', back: 'El estándar de etiquetado de VLANs. Añade una etiqueta de 4 bytes a la trama Ethernet indicando a qué VLAN pertenece.' },
            { front: '¿Qué es un puerto trunk?', back: 'Puerto de switch que transporta tráfico de varias VLANs etiquetadas. Conecta switches entre sí o switches con routers.' },
            { front: '¿Qué es un puerto access?', back: 'Puerto que pertenece a una sola VLAN. Conecta dispositivos finales (PCs, impresoras).' },
            { front: '¿Qué es STP?', back: 'Spanning Tree Protocol. Evita bucles cuando hay caminos redundantes entre switches, desactivando enlaces secundarios.' },
            { front: '¿Qué es QoS?', back: 'Quality of Service. Priorización de tráfico para garantizar calidad a aplicaciones críticas (voz, video) sobre tráfico menos urgente.' }
        ]
    },
    'comandos': {
        title: '💻 Comandos útiles',
        cards: [
            { front: '¿Qué hace ipconfig?', back: 'En Windows, muestra la configuración IP de todas las interfaces de red. En Linux/Mac: ifconfig o ip a.' },
            { front: '¿Qué hace ping?', back: 'Envía paquetes ICMP echo al destino y mide si responde. Sirve para comprobar conectividad y latencia.' },
            { front: '¿Qué hace tracert/traceroute?', back: 'Muestra la ruta que siguen los paquetes hasta el destino, listando todos los routers intermedios y su latencia.' },
            { front: '¿Qué hace nslookup?', back: 'Consulta servidores DNS. Útil para comprobar qué IP devuelve un nombre, o si el DNS funciona.' },
            { front: '¿Qué hace netstat?', back: 'Muestra conexiones de red activas, puertos en escucha y estadísticas. Útil para detectar conexiones sospechosas.' },
            { front: '¿Qué es ipconfig /release y /renew?', back: 'Liberan y vuelven a pedir IP al DHCP. Útil cuando hay problemas con la configuración automática.' }
        ]
    }
};

let flashcardState = { currentCat: 'basicos', seenInSession: 0 };

function renderFlashcardsPage() {
    const container = document.getElementById('flashcardsContent');
    if (!container) return;

    const cats = Object.entries(FLASHCARDS);

    container.innerHTML = `
        <div class="info-box" style="margin-bottom:24px;">
            🧠 Las flashcards son ideales para repasar conceptos rápido. Haz clic en cada tarjeta para girarla y ver la respuesta. Cuando hayas visto al menos 5 tarjetas, ganas XP.
        </div>

        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:24px;">
            ${cats.map(([key, cat]) => `
                <button class="sim-tab ${key === flashcardState.currentCat ? 'active' : ''}"
                        onclick="switchFlashcardCategory('${key}')"
                        style="background:none; border:2px solid var(--borde); border-radius:14px; padding:8px 16px; cursor:pointer; font-weight:700; color:var(--azul-oscuro); font-family:inherit; transition:all 0.25s ease; ${key === flashcardState.currentCat ? 'background:linear-gradient(135deg, var(--azul-medio), var(--turquesa)); color:white; border-color:var(--azul-medio);' : ''}">
                    ${cat.title}
                </button>
            `).join('')}
        </div>

        <div id="flashcardsGrid"></div>

        <div style="margin-top:32px; text-align:center;">
            <button class="btn btn-secondary" onclick="resetFlashcardsSession()">🔄 Reiniciar sesión</button>
        </div>
    `;

    renderFlashcardsGrid();
}

function switchFlashcardCategory(catKey) {
    flashcardState.currentCat = catKey;
    renderFlashcardsPage();
}

function renderFlashcardsGrid() {
    const grid = document.getElementById('flashcardsGrid');
    if (!grid) return;
    const cat = FLASHCARDS[flashcardState.currentCat];
    if (!cat) return;

    grid.innerHTML = `
        <h3 style="color:var(--azul-oscuro); margin-bottom:16px; font-size:1.3em;">${cat.title}</h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:16px;">
            ${cat.cards.map((c, idx) => {
                const seenKey = `${flashcardState.currentCat}::${idx}`;
                const seen = userProgress.flashcardsSeen?.[seenKey];
                return `
                    <div class="flashcard" onclick="flipFlashcard(this, '${seenKey}')">
                        <div class="flashcard-inner">
                            <div class="flashcard-front">
                                ${seen ? '<div style="position:absolute; top:8px; right:12px; font-size:0.8em; color:var(--turquesa);">✓ vista</div>' : ''}
                                <div>${c.front}</div>
                            </div>
                            <div class="flashcard-back">
                                ${c.back}
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        <div style="margin-top:20px; padding:14px; background:var(--celeste); border-radius:14px; text-align:center; font-weight:700; color:var(--azul-oscuro);">
            👀 Vistas en esta sesión: <span id="flashSessionCount">${flashcardState.seenInSession}</span>
        </div>
    `;
}

function flipFlashcard(el, seenKey) {
    el.classList.toggle('flipped');
    if (el.classList.contains('flipped')) {
        userProgress.flashcardsSeen = userProgress.flashcardsSeen || {};
        if (!userProgress.flashcardsSeen[seenKey]) {
            userProgress.flashcardsSeen[seenKey] = true;
            flashcardState.seenInSession++;
            const cnt = document.getElementById('flashSessionCount');
            if (cnt) cnt.textContent = flashcardState.seenInSession;
            saveProgress();
            // Cada 5 flashcards nuevas → +10 XP
            if (flashcardState.seenInSession > 0 && flashcardState.seenInSession % 5 === 0) {
                addXP(10, `Has repasado ${flashcardState.seenInSession} flashcards`);
            }
        }
    }
}

function resetFlashcardsSession() {
    flashcardState.seenInSession = 0;
    document.querySelectorAll('.flashcard.flipped').forEach(c => c.classList.remove('flipped'));
    renderFlashcardsGrid();
}
