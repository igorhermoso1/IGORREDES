/* ============================================
   EXERCISES.JS - Ejercicios interactivos
   ============================================ */

const EXERCISES = {
    intro: [
        {
            id: "intro-1", type: "multiple", xp: 10,
            question: "¿Qué es una red informática?",
            options: [
                "Un solo ordenador con muchos programas",
                "Un conjunto de dispositivos conectados que comparten datos y recursos",
                "Un cable USB conectando dos pantallas",
                "Una carpeta compartida en Windows"
            ],
            correct: 1,
            explanation: "Una red es un conjunto de dispositivos conectados entre sí para compartir información y servicios."
        },
        {
            id: "intro-2", type: "truefalse", xp: 10,
            question: "Internet es la red más grande del mundo.",
            correct: true,
            explanation: "Correcto. Internet es una red global que conecta miles de millones de dispositivos."
        },
        {
            id: "intro-3", type: "multiple", xp: 10,
            question: "¿Cuál de estas NO es una ventaja de tener una red?",
            options: [
                "Compartir archivos entre equipos",
                "Compartir una impresora",
                "Aumentar la velocidad del procesador de cada equipo",
                "Acceder a internet desde varios dispositivos"
            ],
            correct: 2,
            explanation: "La red no cambia el procesador de cada equipo. Solo permite compartir recursos y comunicar dispositivos."
        },
        {
            id: "intro-4", type: "fillblank", xp: 15,
            question: "El protocolo que define la web cifrada se llama _____",
            answer: "https",
            acceptable: ["https", "HTTPS"],
            explanation: "HTTPS = HTTP + TLS. Es la versión segura del protocolo web."
        },
        {
            id: "intro-5", type: "multiple", xp: 10,
            question: "¿Qué tipo de conexión a internet ofrece menor latencia y mayor velocidad simétrica hoy en día?",
            options: ["ADSL", "Satelital tradicional", "Fibra óptica", "WiMAX"],
            correct: 2,
            explanation: "La fibra óptica es la reina actual: rápida, simétrica y de baja latencia."
        }
    ],

    "tipos-redes": [
        {
            id: "tipos-1", type: "multiple", xp: 10,
            question: "¿Qué tipo de red cubre típicamente un edificio o una planta?",
            options: ["PAN", "LAN", "WAN", "MAN"],
            correct: 1,
            explanation: "LAN (Local Area Network) cubre un área local: casa, oficina, edificio."
        },
        {
            id: "tipos-2", type: "multiple", xp: 10,
            question: "¿Qué red usarías para conectar tu móvil con tus auriculares Bluetooth?",
            options: ["LAN", "WAN", "PAN", "CAN"],
            correct: 2,
            explanation: "PAN (Personal Area Network) es para dispositivos personales muy cercanos: ~10 m."
        },
        {
            id: "tipos-3", type: "truefalse", xp: 10,
            question: "Una WLAN es una LAN inalámbrica.",
            correct: true,
            explanation: "Correcto. WLAN = Wireless LAN."
        },
        {
            id: "tipos-4", type: "multiple", xp: 15,
            question: "¿Qué permite tener varias redes lógicas sobre la misma red física?",
            options: ["SAN", "VLAN", "PAN", "WAN"],
            correct: 1,
            explanation: "Las VLANs (Virtual LAN) segmentan lógicamente una red física en varias subredes independientes."
        },
        {
            id: "tipos-5", type: "fillblank", xp: 15,
            question: "Una red dedicada exclusivamente a almacenamiento se llama _____ (acrónimo de 3 letras).",
            answer: "SAN",
            acceptable: ["SAN", "san"],
            explanation: "SAN = Storage Area Network. Típica en datacenters."
        },
        {
            id: "tipos-6", type: "multiple", xp: 10,
            question: "¿Qué red cubre toda una ciudad?",
            options: ["LAN", "CAN", "MAN", "PAN"],
            correct: 2,
            explanation: "MAN = Metropolitan Area Network. Cubre el área de una ciudad."
        }
    ],

    topologias: [
        {
            id: "topo-1", type: "multiple", xp: 10,
            question: "¿Cuál es la topología más usada hoy en redes LAN?",
            options: ["Bus", "Anillo", "Estrella", "Malla"],
            correct: 2,
            explanation: "La topología en estrella es la más usada: todos los equipos conectan a un switch central."
        },
        {
            id: "topo-2", type: "truefalse", xp: 10,
            question: "En una topología en bus, si el cable principal se rompe, toda la red cae.",
            correct: true,
            explanation: "Correcto. Por eso ya no se usa: era frágil."
        },
        {
            id: "topo-3", type: "multiple", xp: 15,
            question: "¿Qué topología ofrece mayor redundancia y tolerancia a fallos?",
            options: ["Bus", "Anillo", "Estrella", "Malla"],
            correct: 3,
            explanation: "La malla conecta todos con todos, así que un fallo no rompe la red. Es cara pero muy robusta."
        },
        {
            id: "topo-4", type: "multiple", xp: 10,
            question: "En una topología en estrella, si cae el dispositivo central...",
            options: [
                "No pasa nada, los equipos siguen comunicándose entre sí",
                "Cae toda la red, ningún equipo puede comunicarse",
                "Solo cae la mitad de la red",
                "Se activa una conexión de respaldo automática"
            ],
            correct: 1,
            explanation: "Es el punto único de fallo de esta topología. Por eso en redes críticas se duplica el central."
        }
    ],

    modelos: [
        {
            id: "modelos-1", type: "multiple", xp: 10,
            question: "¿Cuántas capas tiene el modelo OSI?",
            options: ["4", "5", "7", "9"],
            correct: 2,
            explanation: "El modelo OSI tiene 7 capas: Física, Enlace, Red, Transporte, Sesión, Presentación, Aplicación."
        },
        {
            id: "modelos-2", type: "multiple", xp: 10,
            question: "¿En qué capa OSI trabaja el protocolo IP?",
            options: ["Enlace (2)", "Red (3)", "Transporte (4)", "Aplicación (7)"],
            correct: 1,
            explanation: "IP es un protocolo de capa 3 (Red). Se encarga del direccionamiento lógico y el routing."
        },
        {
            id: "modelos-3", type: "multiple", xp: 15,
            question: "¿Qué diferencia principal hay entre TCP y UDP?",
            options: [
                "TCP es más rápido, UDP es más fiable",
                "TCP garantiza entrega con conexión, UDP no garantiza pero es más rápido",
                "Son lo mismo, solo cambia el nombre",
                "TCP es para web, UDP solo para email"
            ],
            correct: 1,
            explanation: "TCP es orientado a conexión y fiable. UDP es sin conexión, rápido y ligero."
        },
        {
            id: "modelos-4", type: "truefalse", xp: 10,
            question: "El modelo TCP/IP tiene 4 capas.",
            correct: true,
            explanation: "Correcto. TCP/IP simplifica OSI: Acceso a red, Internet, Transporte y Aplicación."
        },
        {
            id: "modelos-5", type: "fillblank", xp: 15,
            question: "El protocolo que se usa para diagnóstico con 'ping' se llama _____",
            answer: "ICMP",
            acceptable: ["ICMP", "icmp"],
            explanation: "ICMP (Internet Control Message Protocol) es el protocolo detrás del ping y traceroute."
        }
    ],

    cableado: [
        {
            id: "cable-1", type: "multiple", xp: 10,
            question: "¿Cuál es la longitud máxima recomendada de un tramo de cable de par trenzado?",
            options: ["50 m", "100 m", "200 m", "500 m"],
            correct: 1,
            explanation: "100 metros es la longitud máxima por tirada en Ethernet sobre par trenzado."
        },
        {
            id: "cable-2", type: "multiple", xp: 10,
            question: "¿Qué tipo de cable se usa para conectar PC ↔ Switch?",
            options: ["Cable cruzado", "Cable directo", "Cable de fibra siempre", "Cable coaxial"],
            correct: 1,
            explanation: "PC y Switch son dispositivos de distinto tipo, por lo que se usa cable directo (mismo estándar en ambos extremos)."
        },
        {
            id: "cable-3", type: "truefalse", xp: 10,
            question: "El cable UTP tiene apantallamiento alrededor de cada par.",
            correct: false,
            explanation: "Falso. UTP = Unshielded Twisted Pair. NO tiene apantallamiento. El que sí lo tiene es STP."
        },
        {
            id: "cable-4", type: "fillblank", xp: 15,
            question: "El conector RJ45 tiene _____ pines.",
            answer: "8",
            acceptable: ["8", "ocho"],
            explanation: "RJ45 tiene 8 pines, uno por cada uno de los 8 hilos del par trenzado."
        },
        {
            id: "cable-5", type: "multiple", xp: 15,
            question: "¿Qué tipo de fibra óptica se usa para grandes distancias?",
            options: ["Multimodo", "Monomodo", "Coaxial", "Cruzada"],
            correct: 1,
            explanation: "La fibra monomodo lleva un único haz de luz y permite distancias muy largas (km)."
        },
        {
            id: "cable-6", type: "multiple", xp: 10,
            question: "¿Qué categoría de cable se considera el estándar actual para 1 Gbps?",
            options: ["Cat3", "Cat5", "Cat6", "Cat8"],
            correct: 2,
            explanation: "Cat6 es el estándar actual: soporta 1 Gbps y hasta 10 Gbps en tramos cortos."
        }
    ],

    dispositivos: [
        {
            id: "disp-1", type: "multiple", xp: 10,
            question: "¿Qué dispositivo conecta dos REDES distintas?",
            options: ["Hub", "Switch", "Router", "Repetidor"],
            correct: 2,
            explanation: "El router enruta entre redes diferentes (por ejemplo, LAN ↔ internet)."
        },
        {
            id: "disp-2", type: "multiple", xp: 10,
            question: "¿En qué capa OSI trabaja un switch tradicional (L2)?",
            options: ["Física (1)", "Enlace (2)", "Red (3)", "Transporte (4)"],
            correct: 1,
            explanation: "Un switch L2 trabaja con direcciones MAC en la capa de enlace."
        },
        {
            id: "disp-3", type: "truefalse", xp: 10,
            question: "Un hub envía los datos solo al puerto correcto.",
            correct: false,
            explanation: "Falso. El hub envía a todos los puertos. Eso lo hace ineficiente y por eso fue reemplazado por switches."
        },
        {
            id: "disp-4", type: "multiple", xp: 15,
            question: "¿Qué dispositivo convierte una red cableada en WiFi?",
            options: ["Router", "Switch", "Access Point", "Bridge"],
            correct: 2,
            explanation: "Un AP (Access Point) hace de puente entre la red cableada y los clientes inalámbricos."
        },
        {
            id: "disp-5", type: "fillblank", xp: 15,
            question: "El dispositivo que filtra el tráfico según reglas de seguridad se llama _____",
            answer: "firewall",
            acceptable: ["firewall", "cortafuegos"],
            explanation: "El firewall (cortafuegos) controla qué tráfico entra y sale de la red."
        }
    ],

    ip: [
        {
            id: "ip-1", type: "multiple", xp: 10,
            question: "¿Cuántos bits tiene una dirección IPv4?",
            options: ["16", "32", "64", "128"],
            correct: 1,
            explanation: "IPv4 tiene 32 bits, divididos en 4 octetos de 8 bits cada uno."
        },
        {
            id: "ip-2", type: "multiple", xp: 10,
            question: "¿Qué rango es de IP privada?",
            options: [
                "8.8.8.0/24",
                "192.168.0.0/16",
                "200.100.50.0/24",
                "1.1.1.0/24"
            ],
            correct: 1,
            explanation: "192.168.0.0/16 es uno de los tres rangos privados (RFC 1918)."
        },
        {
            id: "ip-3", type: "truefalse", xp: 10,
            question: "La IP 127.0.0.1 representa el propio equipo (loopback).",
            correct: true,
            explanation: "Correcto. 127.0.0.1 es la dirección loopback: te apuntas a ti mismo."
        },
        {
            id: "ip-4", type: "multiple", xp: 15,
            question: "¿Qué máscara por defecto tiene una IP clase C?",
            options: [
                "255.0.0.0",
                "255.255.0.0",
                "255.255.255.0",
                "255.255.255.255"
            ],
            correct: 2,
            explanation: "Las clases C tienen máscara /24 por defecto = 255.255.255.0"
        },
        {
            id: "ip-5", type: "fillblank", xp: 15,
            question: "Cuando un equipo no consigue IP por DHCP, se autoasigna una IP del rango 169.254.x.x. Esto se llama _____",
            answer: "APIPA",
            acceptable: ["APIPA", "apipa"],
            explanation: "APIPA = Automatic Private IP Addressing. Es una señal típica de que DHCP no funciona."
        },
        {
            id: "ip-6", type: "multiple", xp: 10,
            question: "¿Qué hace el NAT?",
            options: [
                "Cifra los paquetes IP",
                "Traduce IPs privadas a una pública",
                "Asigna IPs automáticamente",
                "Filtra puertos abiertos"
            ],
            correct: 1,
            explanation: "NAT (Network Address Translation) permite que muchos equipos con IPs privadas compartan una IP pública."
        },
        {
            id: "ip-7", type: "multiple", xp: 10,
            question: "¿Cuál es la primera dirección de una subred?",
            options: [
                "El gateway",
                "La dirección de red (no asignable)",
                "La de broadcast",
                "La 0.0.0.0"
            ],
            correct: 1,
            explanation: "La primera IP de una subred es la dirección de red. La última es la de broadcast. Ninguna se asigna a hosts."
        }
    ],

    subnetting: [
        {
            id: "sub-1", type: "multiple", xp: 15,
            question: "¿Cuántos hosts útiles tiene una subred /24?",
            options: ["254", "256", "62", "126"],
            correct: 0,
            explanation: "Con /24 tienes 2⁸ = 256 direcciones, menos red y broadcast = 254 hosts útiles."
        },
        {
            id: "sub-2", type: "multiple", xp: 15,
            question: "¿Qué máscara en decimal corresponde a /26?",
            options: [
                "255.255.255.0",
                "255.255.255.128",
                "255.255.255.192",
                "255.255.255.224"
            ],
            correct: 2,
            explanation: "/26 = 255.255.255.192. Cada bit que añades al octeto duplica el incremento (128, 192, 224, 240, 248, 252)."
        },
        {
            id: "sub-3", type: "multiple", xp: 20,
            question: "Tengo 192.168.10.0/24 y quiero 4 subredes. ¿Qué prefijo necesito?",
            options: ["/25", "/26", "/27", "/28"],
            correct: 1,
            explanation: "Para 4 subredes necesito 2 bits (2² = 4). 24+2 = /26."
        },
        {
            id: "sub-4", type: "multiple", xp: 20,
            question: "¿Cuántos hosts útiles tiene una subred /27?",
            options: ["14", "30", "62", "126"],
            correct: 1,
            explanation: "/27 tiene 5 bits de host. 2⁵ = 32. Restando red y broadcast = 30 hosts útiles."
        },
        {
            id: "sub-5", type: "fillblank", xp: 20,
            question: "La IP 192.178.45.68/27 pertenece a la subred 192.178.45._____",
            answer: "64",
            acceptable: ["64"],
            explanation: "Incremento /27 = 32. 68/32=2. 2×32=64. La subred es 192.178.45.64/27."
        },
        {
            id: "sub-6", type: "truefalse", xp: 10,
            question: "VLSM permite usar máscaras de tamaño distinto en distintas subredes.",
            correct: true,
            explanation: "Correcto. VLSM (Variable Length Subnet Mask) optimiza el uso de IPs."
        }
    ],

    binario: [
        {
            id: "bin-1", type: "fillblank", xp: 10,
            question: "Convierte a decimal el binario 10110 = _____",
            answer: "22",
            acceptable: ["22"],
            explanation: "16 + 4 + 2 = 22."
        },
        {
            id: "bin-2", type: "fillblank", xp: 10,
            question: "Convierte a binario el decimal 13 = _____",
            answer: "1101",
            acceptable: ["1101"],
            explanation: "13 = 8 + 4 + 1 = 1101."
        },
        {
            id: "bin-3", type: "fillblank", xp: 10,
            question: "Convierte a hexadecimal el decimal 255 = _____",
            answer: "FF",
            acceptable: ["FF", "ff", "0xFF", "0xff"],
            explanation: "255 = FF en hex. Es el byte máximo."
        },
        {
            id: "bin-4", type: "multiple", xp: 10,
            question: "¿Cuántos bits hay en un byte?",
            options: ["4", "8", "16", "32"],
            correct: 1,
            explanation: "1 byte = 8 bits."
        },
        {
            id: "bin-5", type: "multiple", xp: 15,
            question: "El binario 11000000 equivale en decimal a:",
            options: ["128", "192", "224", "240"],
            correct: 1,
            explanation: "128 + 64 = 192. Es el valor del octeto para máscara /18."
        }
    ],

    servicios: [
        {
            id: "serv-1", type: "multiple", xp: 10,
            question: "¿Para qué sirve el DNS?",
            options: [
                "Asignar IPs automáticamente",
                "Traducir nombres de dominio a IPs",
                "Cifrar las conexiones web",
                "Filtrar tráfico malicioso"
            ],
            correct: 1,
            explanation: "DNS traduce nombres como google.com a IPs como 142.250.x.x."
        },
        {
            id: "serv-2", type: "multiple", xp: 10,
            question: "¿Qué puerto usa HTTPS?",
            options: ["80", "443", "22", "53"],
            correct: 1,
            explanation: "HTTPS usa el puerto 443 (TCP). HTTP usa el 80."
        },
        {
            id: "serv-3", type: "multiple", xp: 15,
            question: "El proceso DHCP es...",
            options: [
                "Solicitud, Confirmación, Asignación",
                "Discover, Offer, Request, Acknowledge",
                "Init, Connect, Send, Close",
                "Query, Response, Reply"
            ],
            correct: 1,
            explanation: "DHCP usa el proceso DORA: Discover, Offer, Request, Acknowledge."
        },
        {
            id: "serv-4", type: "truefalse", xp: 10,
            question: "El puerto 53 es el que usa DNS.",
            correct: true,
            explanation: "Correcto. DNS usa el puerto 53, normalmente sobre UDP."
        },
        {
            id: "serv-5", type: "fillblank", xp: 10,
            question: "El protocolo que usa el puerto 22 para acceso remoto seguro se llama _____",
            answer: "SSH",
            acceptable: ["SSH", "ssh"],
            explanation: "SSH (Secure Shell) usa el puerto 22 para acceso remoto cifrado."
        }
    ],

    wifi: [
        {
            id: "wifi-1", type: "multiple", xp: 10,
            question: "¿Qué banda WiFi tiene más alcance pero menos velocidad?",
            options: ["2.4 GHz", "5 GHz", "6 GHz", "60 GHz"],
            correct: 0,
            explanation: "2.4 GHz tiene mayor alcance pero menos velocidad y más interferencias."
        },
        {
            id: "wifi-2", type: "multiple", xp: 10,
            question: "¿Qué protocolo de seguridad WiFi es el más reciente y seguro?",
            options: ["WEP", "WPA", "WPA2", "WPA3"],
            correct: 3,
            explanation: "WPA3 (2018) es el protocolo más moderno y seguro disponible."
        },
        {
            id: "wifi-3", type: "truefalse", xp: 10,
            question: "WEP es seguro en redes WiFi modernas.",
            correct: false,
            explanation: "Falso. WEP está roto desde hace años. NUNCA lo uses."
        },
        {
            id: "wifi-4", type: "multiple", xp: 15,
            question: "¿Cuántos canales no solapados tiene la banda 2.4 GHz?",
            options: ["1", "3", "8", "13"],
            correct: 1,
            explanation: "Solo 3 canales no se solapan: 1, 6 y 11."
        },
        {
            id: "wifi-5", type: "fillblank", xp: 15,
            question: "El nombre técnico del WiFi 6 es 802.11_____",
            answer: "ax",
            acceptable: ["ax", "AX"],
            explanation: "WiFi 6 = 802.11ax. WiFi 7 = 802.11be."
        }
    ],

    vlans: [
        {
            id: "vlan-1", type: "multiple", xp: 10,
            question: "¿Qué es una VLAN?",
            options: [
                "Una red local muy lenta",
                "Una red lógica independiente dentro de una red física",
                "Un tipo de cable trenzado",
                "Un router pequeño"
            ],
            correct: 1,
            explanation: "Una VLAN segmenta lógicamente una red física en redes independientes."
        },
        {
            id: "vlan-2", type: "multiple", xp: 10,
            question: "¿Qué tipo de puerto lleva tráfico de varias VLANs?",
            options: ["Access", "Trunk", "Console", "Auxiliar"],
            correct: 1,
            explanation: "Los puertos trunk llevan tráfico etiquetado de múltiples VLANs (802.1Q)."
        },
        {
            id: "vlan-3", type: "truefalse", xp: 10,
            question: "Dos VLANs distintas se comunican entre sí por defecto.",
            correct: false,
            explanation: "Falso. Por defecto NO se comunican. Necesitas un router o switch L3."
        },
        {
            id: "vlan-4", type: "fillblank", xp: 15,
            question: "El estándar para etiquetar tráfico VLAN se llama 802.1_____",
            answer: "Q",
            acceptable: ["Q", "q"],
            explanation: "802.1Q es el estándar de etiquetado VLAN: añade 4 bytes a cada frame con el ID."
        }
    ],

    diseno: [
        {
            id: "dis-1", type: "multiple", xp: 10,
            question: "¿Cuáles son las 3 capas del modelo jerárquico?",
            options: [
                "Física, Enlace, Red",
                "Core, Distribución, Acceso",
                "Cliente, Servidor, Backbone",
                "LAN, MAN, WAN"
            ],
            correct: 1,
            explanation: "Core (núcleo), Distribución (políticas) y Acceso (usuarios finales)."
        },
        {
            id: "dis-2", type: "truefalse", xp: 10,
            question: "El patch panel es el panel del rack donde llegan los cables del edificio.",
            correct: true,
            explanation: "Correcto. Por delante salen latiguillos al switch, por detrás están los cables que vienen de las rosetas."
        },
        {
            id: "dis-3", type: "multiple", xp: 15,
            question: "¿Qué se debe instalar SIEMPRE en un CPD para mantener servicio ante cortes de luz?",
            options: ["Un router extra", "Un SAI/UPS", "Una WiFi de respaldo", "Otra puerta"],
            correct: 1,
            explanation: "El SAI (UPS) mantiene los equipos encendidos durante cortes y permite apagados controlados."
        }
    ],

    troubleshooting: [
        {
            id: "ts-1", type: "multiple", xp: 10,
            question: "¿Qué comando muestra la configuración IP en Windows?",
            options: ["ifconfig", "ipconfig", "netstat", "ping"],
            correct: 1,
            explanation: "ipconfig es de Windows. ifconfig es de Linux/Mac (aunque ya se prefiere 'ip a')."
        },
        {
            id: "ts-2", type: "multiple", xp: 10,
            question: "¿Qué hace el comando 'ping'?",
            options: [
                "Resuelve nombres DNS",
                "Comprueba conectividad enviando paquetes ICMP",
                "Muestra todos los procesos activos",
                "Cambia la IP del equipo"
            ],
            correct: 1,
            explanation: "ping envía paquetes ICMP echo y espera respuesta. Mide latencia y pérdida."
        },
        {
            id: "ts-3", type: "fillblank", xp: 15,
            question: "El comando que muestra la ruta que siguen los paquetes hasta el destino (Windows) es _____",
            answer: "tracert",
            acceptable: ["tracert", "traceroute"],
            explanation: "tracert en Windows, traceroute en Linux/Mac."
        },
        {
            id: "ts-4", type: "truefalse", xp: 10,
            question: "Si ves la IP 169.254.x.x, significa que DHCP funciona perfectamente.",
            correct: false,
            explanation: "Falso. Es justo lo contrario: APIPA significa que DHCP NO respondió."
        },
        {
            id: "ts-5", type: "multiple", xp: 15,
            question: "¿Cuál es el orden correcto para diagnosticar conectividad?",
            options: [
                "Ping a Google → tu IP → gateway → loopback",
                "Loopback (127.0.0.1) → tu IP → gateway → internet por IP → internet por nombre",
                "Reiniciar PC → reiniciar router → llamar al técnico",
                "Cambiar la WiFi → reinstalar Windows"
            ],
            correct: 1,
            explanation: "Empezar por lo más interno (yo mismo) e ir hacia fuera (gateway, internet, DNS)."
        }
    ]
};

// Render de ejercicios para un módulo
function renderExercises(moduleId) {
    const exercises = EXERCISES[moduleId] || [];
    const container = document.getElementById(`exercises-${moduleId}`);
    if (!container) return;

    container.innerHTML = exercises.map((ex, idx) => {
        const completed = userProgress.completedExercises[`${moduleId}::${ex.id}`];
        const completedClass = completed ? 'completed' : '';
        const typeLabel = {
            multiple: '🔘 Test',
            truefalse: '✅ Verdadero/Falso',
            fillblank: '✍️ Rellena el hueco'
        }[ex.type] || ex.type;

        let body = '';
        if (ex.type === 'multiple') {
            body = `
                <div class="exercise-options">
                    ${ex.options.map((opt, oIdx) => `
                        <button class="exercise-option" data-idx="${oIdx}"
                                onclick="checkAnswer('${moduleId}', '${ex.id}', ${oIdx})"
                                ${completed ? 'disabled' : ''}>
                            ${String.fromCharCode(65 + oIdx)}. ${opt}
                        </button>
                    `).join('')}
                </div>
            `;
        } else if (ex.type === 'truefalse') {
            body = `
                <div class="exercise-options">
                    <button class="exercise-option" data-tf="true" onclick="checkAnswer('${moduleId}', '${ex.id}', true)" ${completed ? 'disabled' : ''}>
                        ✅ Verdadero
                    </button>
                    <button class="exercise-option" data-tf="false" onclick="checkAnswer('${moduleId}', '${ex.id}', false)" ${completed ? 'disabled' : ''}>
                        ❌ Falso
                    </button>
                </div>
            `;
        } else if (ex.type === 'fillblank') {
            body = `
                <input class="exercise-input" id="input-${moduleId}-${ex.id}"
                       placeholder="Escribe tu respuesta..."
                       ${completed ? 'disabled' : ''}>
                <button class="btn" style="margin-top:12px;"
                        onclick="checkFillBlank('${moduleId}', '${ex.id}')"
                        ${completed ? 'disabled' : ''}>
                    Comprobar
                </button>
            `;
        }

        const feedback = completed
            ? `<div class="exercise-feedback ${completed.correct ? 'correct' : 'wrong'}">
                ${completed.correct ? '✅' : '❌'} ${ex.explanation}
               </div>`
            : `<div id="feedback-${moduleId}-${ex.id}"></div>`;

        return `
            <div class="exercise-card ${completedClass}" id="exercise-${moduleId}-${ex.id}">
                <div class="exercise-header">
                    <div>
                        <span class="exercise-type">${typeLabel}</span>
                    </div>
                    <span class="exercise-xp">+${ex.xp} XP</span>
                </div>
                <div class="exercise-question">${idx + 1}. ${ex.question}</div>
                ${body}
                ${feedback}
            </div>
        `;
    }).join('');
}

function checkAnswer(moduleId, exerciseId, answer) {
    const ex = EXERCISES[moduleId].find(e => e.id === exerciseId);
    if (!ex) return;
    const completed = userProgress.completedExercises[`${moduleId}::${exerciseId}`];
    if (completed) return;

    let isCorrect = false;
    if (ex.type === 'multiple') isCorrect = answer === ex.correct;
    else if (ex.type === 'truefalse') isCorrect = answer === ex.correct;

    markExerciseCompleted(moduleId, exerciseId, isCorrect);
    if (isCorrect) addXP(ex.xp, 'Ejercicio acertado');

    // Marcar visualmente
    const card = document.getElementById(`exercise-${moduleId}-${exerciseId}`);
    if (card) {
        card.classList.add('completed');
        const buttons = card.querySelectorAll('.exercise-option');
        buttons.forEach((btn, i) => {
            btn.disabled = true;
            if (ex.type === 'multiple') {
                if (i === ex.correct) btn.classList.add('correct');
                if (i === answer && i !== ex.correct) btn.classList.add('wrong');
            } else if (ex.type === 'truefalse') {
                const val = btn.dataset.tf === 'true';
                if (val === ex.correct) btn.classList.add('correct');
                if (val === answer && val !== ex.correct) btn.classList.add('wrong');
            }
        });
        const fb = document.getElementById(`feedback-${moduleId}-${exerciseId}`);
        if (fb) {
            fb.innerHTML = `
                <div class="exercise-feedback ${isCorrect ? 'correct' : 'wrong'}">
                    ${isCorrect ? '✅' : '❌'} ${ex.explanation}
                </div>
            `;
        }
    }
}

function checkFillBlank(moduleId, exerciseId) {
    const ex = EXERCISES[moduleId].find(e => e.id === exerciseId);
    if (!ex) return;
    const input = document.getElementById(`input-${moduleId}-${exerciseId}`);
    if (!input) return;
    const val = input.value.trim();
    if (!val) return;

    const acceptable = ex.acceptable || [ex.answer];
    const isCorrect = acceptable.some(a => a.toLowerCase() === val.toLowerCase());

    markExerciseCompleted(moduleId, exerciseId, isCorrect);
    if (isCorrect) addXP(ex.xp, 'Ejercicio acertado');

    const card = document.getElementById(`exercise-${moduleId}-${exerciseId}`);
    if (card) {
        card.classList.add('completed');
        input.disabled = true;
        const btn = card.querySelector('.btn');
        if (btn) btn.disabled = true;
        const fb = document.getElementById(`feedback-${moduleId}-${exerciseId}`);
        if (fb) {
            fb.innerHTML = `
                <div class="exercise-feedback ${isCorrect ? 'correct' : 'wrong'}">
                    ${isCorrect ? '✅' : '❌'} ${isCorrect ? '' : `La respuesta correcta era: <strong>${ex.answer}</strong>. `}${ex.explanation}
                </div>
            `;
        }
    }
}
