/* ============================================
   LAB.JS - Laboratorio experimental
   Tendencias modernas en redes
   ============================================ */

const LAB_TOPICS = [
    {
        icon: "📡",
        title: "WiFi 7 (802.11be)",
        tag: "Wireless 2025",
        desc: "La nueva generación que combina las 3 bandas simultáneamente.",
        content: `
            <p>WiFi 7 (IEEE 802.11be) es la última generación de WiFi, ratificada en 2024. Brutal en velocidad y latencia.</p>
            <h4 style="margin-top:16px; color:var(--azul-oscuro);">⚡ Lo nuevo</h4>
            <ul style="padding-left:24px; line-height:1.9;">
                <li><strong>MLO (Multi-Link Operation):</strong> usa 2.4 + 5 + 6 GHz a la vez. Más velocidad y fiabilidad.</li>
                <li><strong>Canales de 320 MHz:</strong> el doble que WiFi 6E. Más ancho = más capacidad.</li>
                <li><strong>4096-QAM:</strong> modulación más densa = 20% más datos por símbolo.</li>
                <li><strong>Velocidad teórica:</strong> hasta ~46 Gbps. En la realidad, 3-5 Gbps muy alcanzables.</li>
                <li><strong>Latencia &lt; 5 ms:</strong> ideal para juegos, AR/VR y videollamadas.</li>
            </ul>
            <div class="tip-box">💡 Para aprovechar WiFi 7, necesitas router + cliente compatibles. Los móviles flagship 2024-2025 ya lo soportan.</div>
        `
    },
    {
        icon: "☁️",
        title: "Cloud Networking",
        tag: "Cloud",
        desc: "Redes virtuales globales que viven en AWS, Azure y GCP.",
        content: `
            <p>Las empresas modernas ya no montan redes solo on-premise. Suben gran parte a la nube y conectan oficinas con la nube y entre sí mediante redes virtuales.</p>
            <h4 style="margin-top:16px; color:var(--azul-oscuro);">🌐 Conceptos clave</h4>
            <ul style="padding-left:24px; line-height:1.9;">
                <li><strong>VPC (Virtual Private Cloud):</strong> tu red privada dentro de AWS/Azure. Eliges CIDR, subredes, routing.</li>
                <li><strong>Transit Gateway:</strong> punto central que conecta múltiples VPCs y oficinas.</li>
                <li><strong>Direct Connect / ExpressRoute:</strong> enlaces dedicados de tu oficina al proveedor cloud. No pasan por internet.</li>
                <li><strong>Multi-cloud:</strong> empresas usan AWS + Azure + GCP a la vez. La red debe unirlos.</li>
            </ul>
            <div class="info-box">📊 Hoy, una "red empresarial" típica incluye oficina física + 2-3 clouds públicos + decenas de SaaS (Office365, Salesforce, Slack...). Diseñarla requiere otra mentalidad.</div>
        `
    },
    {
        icon: "🛡️",
        title: "Zero Trust",
        tag: "Seguridad",
        desc: "Nunca confíes, siempre verifica. Adiós a la red 'de confianza'.",
        content: `
            <p>El modelo de seguridad tradicional asumía que <strong>dentro de la red interna</strong> todo era seguro. Eso ya no es válido. Zero Trust dice: <strong>verifica cada conexión, esté donde esté</strong>.</p>
            <h4 style="margin-top:16px; color:var(--azul-oscuro);">🔐 Principios</h4>
            <ul style="padding-left:24px; line-height:1.9;">
                <li><strong>Identidad como perímetro:</strong> autentica usuarios y dispositivos en cada acceso.</li>
                <li><strong>Microsegmentación:</strong> divide la red en zonas mínimas, no por departamento.</li>
                <li><strong>Acceso de menor privilegio:</strong> cada usuario solo a lo justo.</li>
                <li><strong>Inspección continua:</strong> monitoriza el comportamiento, no solo el login inicial.</li>
            </ul>
            <div class="warning-box">⚠️ Implementar Zero Trust no es comprar un producto: es rediseñar identidad, red y aplicaciones. Es proyecto de años.</div>
        `
    },
    {
        icon: "🤖",
        title: "SDN (Software-Defined Networking)",
        tag: "Avanzado",
        desc: "Configura toda la red con código, no con CLIs uno a uno.",
        content: `
            <p>SDN separa el <strong>plano de control</strong> (decisiones) del <strong>plano de datos</strong> (reenvío). Un controlador central programa toda la red.</p>
            <h4 style="margin-top:16px; color:var(--azul-oscuro);">🧠 ¿Qué cambia?</h4>
            <ul style="padding-left:24px; line-height:1.9;">
                <li>Configuras la red <strong>como código</strong> (Ansible, Terraform, Python).</li>
                <li>Cambios en segundos en cientos de dispositivos a la vez.</li>
                <li>Versionado en Git: cada cambio queda registrado.</li>
                <li>Ejemplos: <strong>Cisco DNA Center</strong>, <strong>VMware NSX</strong>, <strong>Arista CloudVision</strong>.</li>
            </ul>
            <div class="new-concept-box">
                <strong>📜 NaaC (Network as Code)</strong><br>
                Es el lema moderno: tu red entera definida en YAML/Terraform. Si quieres recrear el datacenter, ejecutas el código.
            </div>
        `
    },
    {
        icon: "🌐",
        title: "IPv6 moderno",
        tag: "Direccionamiento",
        desc: "Ya no es 'el futuro'. En 2026 está aquí y crece sin parar.",
        content: `
            <p>IPv6 lleva años "viniendo". En 2026 ya es realidad: Google reporta &gt;45% del tráfico mundial en IPv6. Móviles y redes corporativas lo usan masivamente.</p>
            <h4 style="margin-top:16px; color:var(--azul-oscuro);">📐 Características clave</h4>
            <ul style="padding-left:24px; line-height:1.9;">
                <li><strong>128 bits:</strong> 340 sextillones de direcciones. Sobran para siglos.</li>
                <li><strong>Notación hex:</strong> ejemplo <code>2001:db8:abcd::1</code>. Más corta que parece.</li>
                <li><strong>SLAAC:</strong> auto-configuración sin DHCP. Cada equipo genera su IP.</li>
                <li><strong>Sin NAT (en general):</strong> cada dispositivo tiene IP pública. Vuelve la conectividad real.</li>
                <li><strong>Multicast nativo:</strong> mejor para streaming y descubrimiento de servicios.</li>
            </ul>
            <div class="info-box">🌐 Curiosamente, en redes domésticas españolas con CGNAT, IPv6 te DA la conectividad punto-a-punto que IPv4 te quita.</div>
        `
    },
    {
        icon: "🚀",
        title: "QUIC y HTTP/3",
        tag: "Transporte",
        desc: "La nueva pila de transporte. Más rápido, más fiable, más privado.",
        content: `
            <p><strong>QUIC</strong> es un protocolo de transporte moderno (sobre UDP) desarrollado por Google. <strong>HTTP/3</strong> es la versión actual de HTTP que va sobre QUIC.</p>
            <h4 style="margin-top:16px; color:var(--azul-oscuro);">⚡ Por qué mola</h4>
            <ul style="padding-left:24px; line-height:1.9;">
                <li><strong>Handshake en 1 RTT</strong> (incluso 0 RTT) vs los 3 RTT de TCP+TLS.</li>
                <li><strong>Sin head-of-line blocking:</strong> si un paquete se pierde no bloquea los demás streams.</li>
                <li><strong>Cifrado obligatorio</strong> (TLS 1.3 integrado).</li>
                <li><strong>Connection migration:</strong> si cambias de WiFi a 5G no se rompe la conexión.</li>
            </ul>
            <div class="tip-box">🎯 YouTube, Facebook, CDNs grandes ya usan HTTP/3 mayoritariamente. En 2026 es prácticamente el estándar.</div>
        `
    },
    {
        icon: "🏎️",
        title: "Edge Networking",
        tag: "Latencia",
        desc: "Procesar datos cerca del usuario, no en un datacenter lejano.",
        content: `
            <p>El <strong>edge</strong> traslada cómputo y datos lo más cerca posible del usuario o del sensor. Reduce latencia drásticamente.</p>
            <h4 style="margin-top:16px; color:var(--azul-oscuro);">🌍 Casos de uso</h4>
            <ul style="padding-left:24px; line-height:1.9;">
                <li><strong>Coches autónomos:</strong> deciden en milisegundos, no pueden esperar a un servidor en Virginia.</li>
                <li><strong>AR/VR:</strong> latencia &lt; 20 ms o se marea el usuario.</li>
                <li><strong>Smart factory:</strong> sensores y robots con tiempos de respuesta de microsegundos.</li>
                <li><strong>5G MEC (Multi-access Edge Computing):</strong> operadores ofrecen cómputo en sus antenas.</li>
            </ul>
            <div class="info-box">📡 5G + edge + IA es la combinación que está habilitando casos imposibles antes (ciudades inteligentes, agricultura de precisión, etc).</div>
        `
    },
    {
        icon: "🧠",
        title: "AIOps en redes",
        tag: "IA",
        desc: "La inteligencia artificial monitoriza y arregla la red antes que tú.",
        content: `
            <p>Las herramientas modernas usan <strong>IA y machine learning</strong> para detectar anomalías, predecir fallos y automatizar respuestas.</p>
            <h4 style="margin-top:16px; color:var(--azul-oscuro);">🤖 Lo que hace</h4>
            <ul style="padding-left:24px; line-height:1.9;">
                <li><strong>Detección de anomalías:</strong> "esta hora suele haber 100 Mbps, ahora hay 800. Algo pasa."</li>
                <li><strong>Predicción de fallos:</strong> "este switch va a morir en 2 semanas según patrones."</li>
                <li><strong>Auto-remediación:</strong> reinicia servicios, cambia rutas, abre tickets.</li>
                <li><strong>Análisis de causa raíz:</strong> "la app va lenta por X, no por la red."</li>
            </ul>
            <p>Herramientas líderes: <strong>Cisco ThousandEyes</strong>, <strong>Juniper Mist AI</strong>, <strong>NetBrain</strong>, <strong>BigPanda</strong>.</p>
        `
    },
    {
        icon: "🛰️",
        title: "Mega-constelaciones (Starlink, Kuiper)",
        tag: "Conectividad",
        desc: "Internet por satélite de baja órbita. Cambio de paradigma.",
        content: `
            <p>Las nuevas redes de satélites en órbita baja (LEO) están cambiando la conectividad global. Velocidades de fibra en mitad del desierto.</p>
            <h4 style="margin-top:16px; color:var(--azul-oscuro);">🛰️ Comparativa</h4>
            <table class="data-table">
                <thead><tr><th>Red</th><th>Satélites</th><th>Velocidad</th><th>Latencia</th></tr></thead>
                <tbody>
                    <tr><td><strong>Starlink (SpaceX)</strong></td><td>~6000+</td><td>100-300 Mbps</td><td>25-50 ms</td></tr>
                    <tr><td><strong>OneWeb</strong></td><td>~650</td><td>50-150 Mbps</td><td>40-70 ms</td></tr>
                    <tr><td><strong>Kuiper (Amazon)</strong></td><td>En despliegue</td><td>—</td><td>—</td></tr>
                </tbody>
            </table>
            <div class="curiosity-box">🌟 Compara con satélites tradicionales geoestacionarios: 600-800 ms de latencia. Inutilizables para videollamadas o gaming.</div>
        `
    },
    {
        icon: "🔐",
        title: "DNS over HTTPS / TLS",
        tag: "Privacidad",
        desc: "Tus consultas DNS, cifradas. Adiós a la espía del ISP.",
        content: `
            <p>El DNS tradicional viaja <strong>en claro</strong>: tu ISP, redes WiFi públicas y cualquiera puede ver qué webs visitas. <strong>DoH</strong> y <strong>DoT</strong> cifran esas consultas.</p>
            <h4 style="margin-top:16px; color:var(--azul-oscuro);">🛡️ Quién lo soporta</h4>
            <ul style="padding-left:24px; line-height:1.9;">
                <li><strong>Cloudflare (1.1.1.1):</strong> DoH y DoT abiertos.</li>
                <li><strong>Google (8.8.8.8):</strong> DoH desde Chrome y Android.</li>
                <li><strong>Quad9 (9.9.9.9):</strong> con bloqueo de dominios maliciosos.</li>
                <li><strong>Mozilla Firefox:</strong> DoH activado por defecto en muchos países.</li>
            </ul>
            <div class="warning-box">⚠️ Lado oscuro: cuando los navegadores hacen DoH a Cloudflare/Google, el ISP local ya no puede aplicar filtrado parental ni de seguridad. Hay debate en empresas.</div>
        `
    },
    {
        icon: "📡",
        title: "5G y 6G",
        tag: "Móvil",
        desc: "Mucho más que velocidad: cambio en la arquitectura de redes móviles.",
        content: `
            <p>5G no es solo "4G más rápido". Introduce conceptos que ya están preparando 6G (esperado para 2030).</p>
            <h4 style="margin-top:16px; color:var(--azul-oscuro);">⚡ Lo importante de 5G</h4>
            <ul style="padding-left:24px; line-height:1.9;">
                <li><strong>Network slicing:</strong> "rebanadas" de red dedicadas para cada caso (emergencias, IoT, gaming...).</li>
                <li><strong>Latencia &lt; 10 ms:</strong> habilita gaming en la nube, AR/VR, cirugía remota.</li>
                <li><strong>Massive IoT:</strong> millones de sensores por km² (1.000.000/km²).</li>
                <li><strong>mmWave:</strong> ondas milimétricas para velocidades brutales en zonas densas.</li>
            </ul>
            <div class="new-concept-box">
                <strong>🚀 6G (en preparación)</strong><br>
                Velocidades hasta 1 Tbps, latencia microsegundos, integración con satélites LEO, IA nativa en cada elemento. Aún en investigación.
            </div>
        `
    },
    {
        icon: "🌍",
        title: "SD-WAN",
        tag: "WAN",
        desc: "Red de área amplia inteligente: el ISP ya no manda, manda tu software.",
        content: `
            <p>SD-WAN aplica SDN al mundo WAN. En vez de MPLS rígido y caro de un operador, montas tu propia "WAN inteligente" sobre múltiples enlaces (fibra, 5G, internet, satélite).</p>
            <h4 style="margin-top:16px; color:var(--azul-oscuro);">💡 Ventajas</h4>
            <ul style="padding-left:24px; line-height:1.9;">
                <li><strong>Multi-conexión:</strong> usas fibra + 5G de respaldo. Si una falla, sigues vivo.</li>
                <li><strong>Optimización por aplicación:</strong> Office365 va por internet, ERP por fibra dedicada.</li>
                <li><strong>Gestión centralizada:</strong> 200 sedes desde un único panel.</li>
                <li><strong>Coste:</strong> hasta 70% más barato que MPLS tradicional.</li>
            </ul>
            <p>Vendedores líderes: <strong>Cisco Viptela</strong>, <strong>VMware VeloCloud</strong>, <strong>Fortinet</strong>, <strong>Versa</strong>.</p>
        `
    }
];

function renderLabPage() {
    const container = document.getElementById('labContent');
    if (!container) return;
    container.innerHTML = `
        <div class="info-grid" style="grid-template-columns:repeat(auto-fill, minmax(300px, 1fr));">
            ${LAB_TOPICS.map((t, idx) => `
                <div class="module-card" onclick="openLabTopic(${idx})">
                    <div class="module-icon">${t.icon}</div>
                    <div class="module-title">${t.title}</div>
                    <div class="module-desc">${t.desc}</div>
                    <div style="margin-top:14px;">
                        <span class="module-tag">${t.tag}</span>
                    </div>
                </div>
            `).join('')}
        </div>
        <div id="labDetail" style="display:none; margin-top:48px;"></div>
    `;
}

function openLabTopic(idx) {
    const t = LAB_TOPICS[idx];
    if (!t) return;
    const detail = document.getElementById('labDetail');
    detail.innerHTML = `
        <button class="back-button" onclick="closeLabTopic()">← Volver al laboratorio</button>
        <div class="module-detail-header">
            <div class="module-detail-icon">${t.icon}</div>
            <div class="module-detail-title">${t.title}</div>
            <div class="module-detail-subtitle">${t.desc}</div>
        </div>
        <div class="lesson-section">
            ${t.content}
        </div>
    `;
    detail.style.display = 'block';
    detail.scrollIntoView({ behavior: 'smooth' });
}

function closeLabTopic() {
    document.getElementById('labDetail').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
