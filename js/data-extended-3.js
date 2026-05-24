/* ============================================
   DATA-EXTENDED-3.JS — Seguridad
   Firewalls/NGFW, VPN, ACLs y hardening
   ============================================ */

Object.assign(EXTENDED_CONTENT, {

// ============================================================================
// FIREWALLS Y NGFW
// ============================================================================
'firewalls-ngfw': [
{
    title: '🔥 Qué es un firewall y por qué tu red lo necesita',
    content: `
<p>Un <strong>firewall</strong> es un dispositivo (hardware o software) que filtra el tráfico de red basándose en reglas de seguridad. Su trabajo es <em>"permitir lo bueno, bloquear lo malo"</em>. Pero lo malo es cada vez más sofisticado, y los firewalls han evolucionado mucho desde los años 90.</p>

<h4>📜 Evolución de los firewalls</h4>
<ul>
    <li><strong>1ª generación — Packet filter (1988)</strong>: filtra por IP origen/destino, puerto y protocolo. Sin memoria de conexiones. Lento de configurar bien.</li>
    <li><strong>2ª generación — Stateful (1994)</strong>: mantiene una <em>tabla de estados</em>. Sabe qué conexiones están establecidas y solo deja entrar respuestas a ellas. <strong>El mínimo aceptable hoy.</strong></li>
    <li><strong>3ª generación — Application layer (proxy)</strong>: inspecciona el contenido de capa 7 (HTTP, FTP, SMTP). Más lento pero más seguro.</li>
    <li><strong>4ª generación — UTM (2004)</strong>: combina firewall + antivirus + filtrado web + antispam + VPN en un solo equipo. "Unified Threat Management".</li>
    <li><strong>5ª generación — NGFW (2010+)</strong>: añade Deep Packet Inspection, IPS, identidad de usuario, integración con la nube e IA.</li>
</ul>

<h4>🧠 Stateful inspection: la base de todo</h4>
<p>Un firewall stateful mantiene una tabla de las conexiones activas. Cuando un cliente interno hace TCP SYN hacia un servidor externo, el firewall:</p>
<ol>
    <li>Verifica que la regla permite la conexión saliente.</li>
    <li>Crea una <strong>entrada en la state table</strong>: origen IP:puerto → destino IP:puerto, estado SYN_SENT.</li>
    <li>Cuando vuelve el SYN-ACK del servidor, lo deja pasar automáticamente porque coincide con la sesión.</li>
    <li>El estado pasa a ESTABLISHED.</li>
    <li>Al cerrar la conexión (FIN/RST) o por timeout, la entrada se borra.</li>
</ol>

<div class="info-box">
    💡 <strong>Sin stateful</strong>, tendrías que crear reglas explícitas para el tráfico de vuelta, lo cual es un caos. Por eso los firewalls modernos son stateful por defecto.
</div>

<h4>🎯 Zonas de seguridad</h4>
<p>Un firewall divide la red en <strong>zonas</strong> y aplica políticas entre ellas:</p>
<ul>
    <li><strong>Inside / Trust</strong>: la LAN interna, máxima confianza.</li>
    <li><strong>Outside / Untrust</strong>: internet, cero confianza.</li>
    <li><strong>DMZ</strong> (Demilitarized Zone): servidores expuestos (web, mail). Accesibles desde fuera pero aislados de la LAN.</li>
    <li><strong>Guest</strong>: WiFi de invitados, solo internet.</li>
    <li><strong>Servers</strong>: red interna de servidores.</li>
</ul>

<p>Las políticas dictan qué tráfico puede ir <em>de una zona a otra</em>. Por ejemplo: "Inside → Outside permitido HTTP/HTTPS; Outside → DMZ permitido solo a puerto 443 del web server".</p>
    `
},
{
    title: '🚀 NGFW: la nueva generación',
    content: `
<p><strong>NGFW</strong> (Next-Generation Firewall) es lo que define un firewall en 2026. Marcas líderes: Fortinet (FortiGate), Palo Alto, Check Point, Cisco Firepower, pfSense+, OPNsense.</p>

<h4>🆚 NGFW vs Firewall tradicional</h4>
<table>
    <thead><tr><th>Característica</th><th>Firewall tradicional</th><th>NGFW</th></tr></thead>
    <tbody>
        <tr><td>Filtrado por IP/puerto</td><td>✅</td><td>✅</td></tr>
        <tr><td>Stateful inspection</td><td>✅</td><td>✅</td></tr>
        <tr><td>VPN</td><td>✅</td><td>✅</td></tr>
        <tr><td>Application Awareness (L7)</td><td>❌</td><td>✅</td></tr>
        <tr><td>Deep Packet Inspection</td><td>❌</td><td>✅</td></tr>
        <tr><td>IPS integrado</td><td>❌</td><td>✅</td></tr>
        <tr><td>Identidad de usuario</td><td>❌</td><td>✅</td></tr>
        <tr><td>Inspección SSL/TLS</td><td>❌</td><td>✅</td></tr>
        <tr><td>Threat intelligence (sandbox, IA)</td><td>❌</td><td>✅</td></tr>
        <tr><td>Antivirus / Antimalware</td><td>❌</td><td>✅</td></tr>
        <tr><td>URL filtering</td><td>❌</td><td>✅</td></tr>
    </tbody>
</table>

<h4>🔍 Las funciones estrella del NGFW</h4>

<h4>1️⃣ Deep Packet Inspection (DPI)</h4>
<p>Un firewall tradicional ve "TCP puerto 443 hacia 1.2.3.4". Un NGFW ve "Conexión HTTPS hacia Dropbox, usuario Igor, sesión iniciada hace 5 minutos". Esa diferencia es DPI: inspeccionar el <em>contenido</em> de los paquetes hasta capa 7.</p>

<h4>2️⃣ Application Awareness</h4>
<p>Bloquear "Facebook" no es lo mismo que bloquear "TCP 443 hacia ciertas IPs". Los NGFW tienen <strong>bases de datos con firmas de miles de aplicaciones</strong>. Pueden:</p>
<ul>
    <li>Bloquear Facebook pero permitir LinkedIn.</li>
    <li>Permitir YouTube en horario laboral solo en modo lectura, sin uploads.</li>
    <li>Detectar tráfico de Tor o de aplicaciones P2P.</li>
</ul>

<h4>3️⃣ IPS — Intrusion Prevention System</h4>
<p>El IPS compara el tráfico contra una base de firmas de ataques conocidos. Si detecta un exploit (por ejemplo, una petición HTTP con patrones de SQL injection), bloquea la conexión y alerta.</p>

<h4>4️⃣ Inspección SSL/TLS</h4>
<p>El 95% del tráfico actual está cifrado con TLS. Un firewall ciego ante el cifrado es inútil. Los NGFW pueden:</p>
<ul>
    <li>Descifrar el tráfico al vuelo (man-in-the-middle <em>autorizado</em>).</li>
    <li>Inspeccionar el contenido.</li>
    <li>Re-cifrarlo y reenviarlo al destino.</li>
</ul>

<div class="warning-box">
    ⚠️ La inspección SSL requiere desplegar un certificado raíz del firewall en todos los clientes. Es invasiva: tu organización está rompiendo el cifrado por seguridad. Considera implicaciones legales (GDPR, RGPD).
</div>

<h4>5️⃣ Identidad de usuario</h4>
<p>Integración con Active Directory, LDAP o RADIUS. Las reglas se pueden hacer por usuario o grupo, no solo por IP:</p>
<ul>
    <li>"Permitir RRHH acceso al SAP"</li>
    <li>"Bloquear Practicantes el acceso a YouTube"</li>
    <li>"Auditar todo el tráfico del usuario root"</li>
</ul>
    `
},
{
    title: '⚙️ Cómo se escribe una regla de firewall',
    content: `
<p>Una regla de firewall tiene estos campos básicos:</p>

<table>
    <thead><tr><th>Campo</th><th>Significado</th></tr></thead>
    <tbody>
        <tr><td>Action</td><td>Permit / Deny / Reject / Log</td></tr>
        <tr><td>Source</td><td>IP origen, red o grupo</td></tr>
        <tr><td>Destination</td><td>IP destino</td></tr>
        <tr><td>Protocol</td><td>TCP, UDP, ICMP, IP</td></tr>
        <tr><td>Source port</td><td>Puerto origen (raramente filtrado)</td></tr>
        <tr><td>Destination port</td><td>Puerto destino</td></tr>
        <tr><td>Interface in / out</td><td>Zonas o interfaces</td></tr>
        <tr><td>User / Group</td><td>(NGFW) usuario autenticado</td></tr>
        <tr><td>Application</td><td>(NGFW) firma de aplicación</td></tr>
        <tr><td>Schedule</td><td>Horario en que se aplica</td></tr>
        <tr><td>Log</td><td>Registrar coincidencias</td></tr>
    </tbody>
</table>

<h4>📋 Ejemplo en iptables (Linux)</h4>
<div class="cmd-block">
<span class="cmd-comment"># Política por defecto: denegar todo</span>
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

<span class="cmd-comment"># Permitir conexiones ya establecidas (stateful)</span>
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

<span class="cmd-comment"># Permitir SSH desde la red de gestión</span>
iptables -A INPUT -s 192.168.99.0/24 -p tcp --dport 22 -j ACCEPT

<span class="cmd-comment"># Permitir HTTPS al servidor web</span>
iptables -A FORWARD -d 10.0.0.10 -p tcp --dport 443 -j ACCEPT

<span class="cmd-comment"># Permitir ping (ICMP echo)</span>
iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT

<span class="cmd-comment"># Loggear los rechazos antes de descartar</span>
iptables -A INPUT -j LOG --log-prefix "FW-DROP: "
</div>

<h4>📋 Equivalente en pfSense/OPNsense (GUI)</h4>
<ol>
    <li>Firewall → Rules → LAN</li>
    <li>Add: Action <em>Pass</em>, Protocol <em>TCP</em>, Source <em>192.168.99.0/24</em>, Destination <em>any</em>, Dest port <em>443</em>, Description <em>"HTTPS interno"</em></li>
    <li>Las reglas se evalúan <strong>de arriba abajo</strong>. La primera coincidencia gana.</li>
</ol>

<h4>🎯 Buenas prácticas</h4>
<div class="concept-box">
    <ul>
        <li><strong>Default deny</strong>: la política por defecto debe ser bloquear todo. Solo abrir lo necesario.</li>
        <li><strong>Principio de mínimo privilegio</strong>: cada regla debe ser lo más estrecha posible.</li>
        <li><strong>Documenta cada regla</strong>: descripción clara, ticket asociado, fecha.</li>
        <li><strong>Revisión periódica</strong>: cada 6 meses, audita y elimina reglas obsoletas.</li>
        <li><strong>Loggea los denies</strong> al menos para detectar ataques o errores de configuración.</li>
        <li><strong>Backup de la configuración</strong> antes de cualquier cambio.</li>
        <li><strong>No edites en producción sin commit confirmation</strong> (Junos/PAN-OS lo soportan: si en X minutos no confirmas, vuelve atrás solo).</li>
    </ul>
</div>

<h4>🎲 Reglas implícitas y orden</h4>
<p>Casi todos los firewalls tienen una regla implícita al final: <strong>"deny all"</strong>. Por eso el orden importa: las reglas más específicas arriba, las generales abajo. Una regla "permit any any" arriba anula todo lo que viene después.</p>

<h4>🛡️ NAT y firewall</h4>
<p>NAT y firewall suelen ir juntos. El firewall hace:</p>
<ul>
    <li><strong>Source NAT (SNAT) / PAT</strong>: para que la LAN salga a internet con la IP pública del firewall.</li>
    <li><strong>Destination NAT (DNAT)</strong>: redirige tráfico entrante a servidores internos (port forwarding).</li>
    <li>Las reglas de firewall se evalúan <strong>antes</strong> del NAT en sentido entrante.</li>
</ul>
    `
},
{
    title: '🎥 Vídeos para aprender',
    content: ''
},
{
    title: '📚 Libros y recursos',
    content: ''
}
],

// ============================================================================
// VPN
// ============================================================================
'vpn-ipsec-wireguard': [
{
    title: '🔐 Qué es una VPN y para qué sirve',
    content: `
<p>Una <strong>VPN</strong> (Virtual Private Network) crea un "túnel cifrado" sobre una red pública insegura (típicamente internet). Los paquetes que viajan por dentro están protegidos: no se pueden leer (confidencialidad), no se pueden modificar (integridad), y se sabe quién los envió (autenticidad).</p>

<h4>🎯 Usos típicos</h4>
<ul>
    <li><strong>Site-to-Site</strong>: conectar dos oficinas remotas como si estuvieran en la misma LAN.</li>
    <li><strong>Remote Access (Road Warrior)</strong>: un empleado teletrabaja y accede a la red de la empresa desde casa.</li>
    <li><strong>Client-to-Client</strong>: dos máquinas en internet abierto se conectan directamente.</li>
    <li><strong>VPN "comercial" de privacidad</strong>: ocultar la IP real al navegar (NordVPN, ExpressVPN, etc.). No es lo mismo que las VPN profesionales.</li>
</ul>

<h4>⚖️ Comparativa de protocolos</h4>
<table>
    <thead><tr><th>Protocolo</th><th>Velocidad</th><th>Seguridad</th><th>Complejidad</th><th>Uso ideal</th></tr></thead>
    <tbody>
        <tr><td><strong>IPsec</strong></td><td>★★★</td><td>★★★★★</td><td>Alta</td><td>Site-to-site empresarial</td></tr>
        <tr><td><strong>OpenVPN</strong></td><td>★★★</td><td>★★★★</td><td>Media</td><td>Remote access muy flexible</td></tr>
        <tr><td><strong>WireGuard</strong></td><td>★★★★★</td><td>★★★★★</td><td>Baja</td><td>Moderno, todo terreno</td></tr>
        <tr><td><strong>L2TP/IPsec</strong></td><td>★★★</td><td>★★★</td><td>Media</td><td>Compatibilidad legacy</td></tr>
        <tr><td><strong>PPTP</strong></td><td>★★★★</td><td>★</td><td>Baja</td><td>❌ Obsoleto e inseguro</td></tr>
        <tr><td><strong>SSTP</strong></td><td>★★★</td><td>★★★★</td><td>Media</td><td>Atravesar firewalls (TCP 443)</td></tr>
    </tbody>
</table>

<div class="warning-box">
    ⚠️ <strong>Nunca uses PPTP</strong>. Está roto desde 2012. La autenticación MS-CHAPv2 se puede crackear en minutos.
</div>
    `
},
{
    title: '🛡️ IPsec a fondo',
    content: `
<p>IPsec es el estándar de VPN más usado en empresas. No es un solo protocolo, es una <strong>arquitectura</strong> definida en varios RFCs (4301, 4302, 4303...).</p>

<h4>🧩 Componentes</h4>
<ul>
    <li><strong>AH</strong> (Authentication Header): solo autenticación e integridad, sin cifrado. Rara vez se usa hoy.</li>
    <li><strong>ESP</strong> (Encapsulating Security Payload): cifrado + autenticación + integridad. <strong>El que se usa siempre.</strong></li>
    <li><strong>IKE</strong> (Internet Key Exchange): negocia las claves y los parámetros. Hay IKEv1 (legacy) e IKEv2 (moderno, más rápido y seguro).</li>
</ul>

<h4>🔄 Modos</h4>
<ul>
    <li><strong>Tunnel mode</strong>: encapsula el paquete IP entero. Usado en site-to-site.</li>
    <li><strong>Transport mode</strong>: solo cifra el payload. Usado entre dos hosts directos.</li>
</ul>

<h4>📋 Negociación IKE en 2 fases</h4>
<ol>
    <li><strong>Phase 1 (ISAKMP SA)</strong>: los dos extremos se autentican (pre-shared key o certificados) y crean un canal seguro para negociar el resto.</li>
    <li><strong>Phase 2 (IPsec SA)</strong>: dentro del canal seguro, negocian los parámetros del túnel real: algoritmos de cifrado, vida útil, tráfico interesante.</li>
</ol>

<h4>🧪 Parámetros típicos modernos</h4>
<ul>
    <li><strong>Encryption</strong>: AES-256-GCM (rápido, seguro y autenticado).</li>
    <li><strong>Hash</strong>: SHA-384 o SHA-256.</li>
    <li><strong>DH Group</strong>: 19 (256-bit ECP), 20 (384-bit ECP) o 14 (2048-bit MODP).</li>
    <li><strong>Lifetime</strong>: 28800 segundos (8h) para Phase 1, 3600 (1h) para Phase 2.</li>
</ul>

<div class="warning-box">
    ⚠️ Evita: <strong>3DES, DES, MD5, SHA-1, DH Group 1/2/5</strong>. Todos obsoletos.
</div>

<h4>📋 Ejemplo de configuración (Cisco IOS)</h4>
<div class="cmd-block">
<span class="cmd-comment"># PHASE 1 (IKEv2)</span>
crypto ikev2 proposal PROP1
 encryption aes-cbc-256
 integrity sha384
 group 19
crypto ikev2 policy POL1
 proposal PROP1
crypto ikev2 keyring KEY1
 peer REMOTE
  address 200.45.10.5
  pre-shared-key MiSuperClave2026!Secreto
crypto ikev2 profile PROF1
 match identity remote address 200.45.10.5
 authentication local pre-share
 authentication remote pre-share
 keyring local KEY1

<span class="cmd-comment"># PHASE 2 (IPsec)</span>
crypto ipsec transform-set TS1 esp-aes 256 esp-sha384-hmac
 mode tunnel
crypto ipsec profile IPSEC-PROF
 set transform-set TS1
 set ikev2-profile PROF1

<span class="cmd-comment"># TÚNEL</span>
interface Tunnel0
 ip address 172.16.0.1 255.255.255.252
 tunnel source GigabitEthernet0/1
 tunnel destination 200.45.10.5
 tunnel mode ipsec ipv4
 tunnel protection ipsec profile IPSEC-PROF
</div>
    `
},
{
    title: '⚡ WireGuard: la VPN del siglo XXI',
    content: `
<p><strong>WireGuard</strong> (creada en 2018 por Jason A. Donenfeld) es la VPN moderna por excelencia. Sus principios:</p>

<ul>
    <li><strong>Simple</strong>: ~4000 líneas de código (OpenVPN tiene ~600.000, IPsec millones). Fácil de auditar.</li>
    <li><strong>Rápida</strong>: incluida en el kernel Linux desde la versión 5.6. Throughput muy superior a OpenVPN.</li>
    <li><strong>Sin negociación compleja</strong>: criptografía moderna fija (Curve25519, ChaCha20-Poly1305, BLAKE2). No hay que elegir suite.</li>
    <li><strong>Connectionless</strong>: usa UDP. Si la red falla un rato, vuelve sola sin negociar nada.</li>
    <li><strong>"Cryptokey Routing"</strong>: cada peer se identifica por su clave pública. No hay usernames/passwords.</li>
</ul>

<h4>📋 Ejemplo de configuración</h4>
<div class="cmd-block">
<span class="cmd-comment"># SERVIDOR /etc/wireguard/wg0.conf</span>
[Interface]
PrivateKey = sK4DqUv1L9...AaB=
Address = 10.0.0.1/24
ListenPort = 51820
PostUp = iptables -A FORWARD -i %i -j ACCEPT
PostUp = iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i %i -j ACCEPT
PostDown = iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

[Peer]
<span class="cmd-comment"># Portátil de Igor</span>
PublicKey = cD3eW8...P=
AllowedIPs = 10.0.0.2/32
</div>

<div class="cmd-block">
<span class="cmd-comment"># CLIENTE wg0.conf</span>
[Interface]
PrivateKey = TtZ29...A=
Address = 10.0.0.2/32
DNS = 1.1.1.1

[Peer]
PublicKey = (la pública del servidor)
Endpoint = vpn.miempresa.es:51820
AllowedIPs = 0.0.0.0/0     <span class="cmd-comment"># Todo el tráfico por la VPN</span>
PersistentKeepalive = 25
</div>

<div class="cmd-block">
<span class="cmd-comment"># Arrancar / parar el túnel</span>
sudo wg-quick up wg0
sudo wg-quick down wg0

<span class="cmd-comment"># Estado</span>
sudo wg show
</div>

<h4>🆚 IPsec vs OpenVPN vs WireGuard</h4>
<table>
    <thead><tr><th></th><th>IPsec</th><th>OpenVPN</th><th>WireGuard</th></tr></thead>
    <tbody>
        <tr><td>Estandarización</td><td>IETF RFCs</td><td>Open source</td><td>Open source moderna</td></tr>
        <tr><td>Soporte hardware</td><td>Sí (offload)</td><td>Sí (limitado)</td><td>Sí (kernel)</td></tr>
        <tr><td>Cliente nativo</td><td>Sí en todos OS</td><td>App separada</td><td>App + kernel Linux</td></tr>
        <tr><td>Configuración</td><td>Compleja</td><td>Media</td><td>Sencilla</td></tr>
        <tr><td>NAT traversal</td><td>Necesita NAT-T</td><td>Directo</td><td>Directo</td></tr>
        <tr><td>Cifrado</td><td>Configurable</td><td>Configurable</td><td>Fijo y moderno</td></tr>
        <tr><td>Throughput típico</td><td>~500 Mbps</td><td>~250 Mbps</td><td>~1 Gbps+</td></tr>
        <tr><td>Auditabilidad</td><td>Mala (M de LOC)</td><td>Media</td><td>Excelente (4K LOC)</td></tr>
    </tbody>
</table>

<h4>🌐 OpenVPN: el clásico flexible</h4>
<p>OpenVPN sigue siendo muy popular porque:</p>
<ul>
    <li>Puede usar TCP (puerto 443) y "esconderse" como tráfico HTTPS — atraviesa firewalls corporativos.</li>
    <li>Soporta usuario/contraseña, certificados, autenticación 2FA.</li>
    <li>Hay miles de tutoriales y soporte comunitario.</li>
    <li>Cliente disponible en todos los sistemas operativos.</li>
</ul>

<div class="concept-box">
    <h4>🎯 ¿Cuál elegir en 2026?</h4>
    <ul>
        <li><strong>Site-to-site empresarial</strong> con equipos Cisco/Fortinet: <strong>IPsec</strong>.</li>
        <li><strong>Teletrabajo moderno</strong>: <strong>WireGuard</strong> (más rápido, más sencillo).</li>
        <li><strong>Acceso remoto en entorno hostil</strong> (hoteles, corporate firewalls): <strong>OpenVPN/TCP</strong>.</li>
        <li><strong>Zero Trust avanzado</strong>: <strong>SASE / ZTNA</strong> (Cloudflare Access, Tailscale, Twingate).</li>
    </ul>
</div>

<h4>🎁 Mención especial: Tailscale y ZeroTier</h4>
<p>Productos modernos que usan WireGuard (Tailscale) o protocolos propios (ZeroTier) y simplifican brutalmente el despliegue: te das de alta con Google/GitHub y todos tus dispositivos quedan en una "red privada" tipo P2P. Ideal para pymes y entornos mixtos.</p>
    `
},
{
    title: '🎥 Vídeos para aprender',
    content: ''
},
{
    title: '📚 Libros y recursos',
    content: ''
}
],

// ============================================================================
// ACLs Y HARDENING
// ============================================================================
'acls-hardening': [
{
    title: '🚧 ACLs: el filtro fino del router',
    content: `
<p>Una <strong>ACL</strong> (Access Control List) es una lista ordenada de reglas que un router o switch usa para filtrar tráfico. Es la herramienta de seguridad más básica en redes Cisco, pero también una de las más potentes si se usa bien.</p>

<h4>🎨 Tipos de ACL en Cisco</h4>
<ul>
    <li><strong>Standard ACL</strong> (números 1-99 y 1300-1999): filtra <em>solo por IP origen</em>. Simple pero limitada.</li>
    <li><strong>Extended ACL</strong> (números 100-199 y 2000-2699): filtra por IP origen/destino, protocolo, puertos. Lo que usarás el 99% del tiempo.</li>
    <li><strong>Named ACL</strong>: igual que extended pero con nombre legible (recomendado).</li>
    <li><strong>VTY ACL</strong>: filtra quién puede conectarse por SSH/Telnet al router.</li>
</ul>

<h4>📋 Sintaxis básica</h4>
<div class="cmd-block">
access-list <em>nº</em> {permit|deny} <em>protocolo</em> <em>origen wildcard</em> <em>destino wildcard</em> [eq <em>puerto</em>]

<span class="cmd-comment"># Ejemplos:</span>

<span class="cmd-comment"># Permitir HTTP saliente desde la red 192.168.1.0/24</span>
access-list 100 permit tcp 192.168.1.0 0.0.0.255 any eq 80

<span class="cmd-comment"># Permitir HTTPS</span>
access-list 100 permit tcp 192.168.1.0 0.0.0.255 any eq 443

<span class="cmd-comment"># Bloquear ping desde el exterior</span>
access-list 100 deny icmp any any echo-request

<span class="cmd-comment"># Implícito al final: deny ip any any</span>
</div>

<h4>🧮 Wildcard mask: el revés de la máscara</h4>
<p>Las ACLs no usan máscara de red, usan <strong>wildcard mask</strong> (lo contrario):</p>
<ul>
    <li>Máscara <code>255.255.255.0</code> → wildcard <code>0.0.0.255</code></li>
    <li>Máscara <code>255.255.255.240</code> → wildcard <code>0.0.0.15</code></li>
    <li>Una sola IP: wildcard <code>0.0.0.0</code> (o palabra <code>host</code>).</li>
    <li>Cualquier IP: wildcard <code>255.255.255.255</code> (o palabra <code>any</code>).</li>
</ul>

<h4>📋 Named ACL (forma moderna)</h4>
<div class="cmd-block">
ip access-list extended PROTEGER_DMZ
 permit tcp any host 10.0.0.10 eq 443
 permit tcp any host 10.0.0.10 eq 80
 deny ip any 10.0.0.0 0.0.0.255 log
 permit ip any any

<span class="cmd-comment"># Aplicar a una interfaz</span>
interface GigabitEthernet0/1
 ip access-group PROTEGER_DMZ in
</div>

<h4>🧭 Dónde aplicar la ACL</h4>
<ul>
    <li><strong>Standard ACL</strong> → cerca del DESTINO (filtra solo origen, evita bloquear de más).</li>
    <li><strong>Extended ACL</strong> → cerca del ORIGEN (descarta tráfico no deseado antes de que viaje).</li>
    <li><strong>Dirección</strong>: <code>in</code> (entrando a la interfaz desde fuera del router) o <code>out</code> (saliendo de la interfaz hacia el segmento).</li>
</ul>

<div class="warning-box">
    ⚠️ Errores típicos:
    <ul>
        <li>Olvidarse del <code>permit ip any any</code> al final → bloqueas todo el tráfico.</li>
        <li>Aplicar la ACL en la dirección incorrecta.</li>
        <li>No documentar las reglas con <code>remark</code>.</li>
        <li>Editar una ACL numerada en producción: cuidado, las modificaciones se añaden AL FINAL. Mejor usar Named ACL con números de secuencia.</li>
    </ul>
</div>
    `
},
{
    title: '🛡️ Port Security: protege tus puertos de switch',
    content: `
<p><strong>Port Security</strong> es una función de los switches Cisco que limita qué dispositivos (MACs) pueden conectarse a cada puerto. Útil contra:</p>

<ul>
    <li>Suplantación de MAC (MAC flooding).</li>
    <li>Conexión no autorizada de switches o APs.</li>
    <li>Robo de cable y conexión externa.</li>
</ul>

<h4>📋 Configuración básica</h4>
<div class="cmd-block">
Switch(config)# interface Gi0/5
Switch(config-if)# switchport mode access
Switch(config-if)# switchport port-security
Switch(config-if)# switchport port-security maximum 2          <span class="cmd-comment"># Máx 2 MACs (PC + teléfono)</span>
Switch(config-if)# switchport port-security mac-address sticky <span class="cmd-comment"># Aprende y memoriza</span>
Switch(config-if)# switchport port-security violation restrict
</div>

<h4>⚠️ Modos de violación</h4>
<ul>
    <li><strong>protect</strong>: descarta tramas violadoras silenciosamente.</li>
    <li><strong>restrict</strong>: descarta + alerta + contador (SNMP, syslog).</li>
    <li><strong>shutdown</strong> (por defecto): apaga el puerto. Recuperación manual con <code>no shutdown</code>.</li>
</ul>

<h4>🔐 802.1X: autenticación de puerto</h4>
<p>Port Security se basa en MAC, fácil de falsificar. <strong>802.1X</strong> es la solución profesional: autenticación real antes de dejar al dispositivo entrar a la red.</p>

<p>Funcionamiento:</p>
<ol>
    <li>El cliente (suplicante) intenta conectarse a un puerto del switch (autenticador).</li>
    <li>El switch fuerza al cliente a autenticarse con un servidor RADIUS.</li>
    <li>El cliente envía credenciales mediante EAP.</li>
    <li>Si el servidor RADIUS valida → el switch abre el puerto y opcionalmente lo asigna a una VLAN.</li>
    <li>Si no valida → el puerto sigue bloqueado o va a una VLAN de quarantine.</li>
</ol>

<div class="cmd-block">
<span class="cmd-comment"># Configuración global</span>
aaa new-model
aaa authentication dot1x default group radius
radius-server host 192.168.99.10 key SecretoRadius2026
dot1x system-auth-control

<span class="cmd-comment"># Por puerto</span>
interface Gi0/5
 switchport mode access
 authentication port-control auto
 dot1x pae authenticator
 spanning-tree portfast
</div>
    `
},
{
    title: '🔒 Hardening: blindar el equipamiento',
    content: `
<p><strong>Hardening</strong> es endurecer la configuración del equipo eliminando vulnerabilidades y servicios innecesarios. Una checklist mínima:</p>

<h4>🔑 Acceso al equipo</h4>
<ul>
    <li><strong>Deshabilitar Telnet</strong>, usar solo SSH (versión 2).</li>
    <li>Generar par de claves RSA mínimo 2048 bits.</li>
    <li>Contraseñas con AES (<code>service password-encryption</code>) o mejor: <code>enable secret</code> (SHA-256/scrypt).</li>
    <li>ACL de gestión: solo conectarse desde la red admin.</li>
    <li>Timeout de sesión: 5-10 minutos.</li>
    <li>Banner de aviso legal.</li>
</ul>

<div class="cmd-block">
<span class="cmd-comment"># Hardening básico de IOS</span>
hostname Sw-Core-01
service password-encryption
service tcp-keepalives-in
service tcp-keepalives-out
no service pad
no ip http server
no ip http secure-server                <span class="cmd-comment"># O usa HTTPS, no HTTP</span>
no cdp run                              <span class="cmd-comment"># En equipos accesibles desde fuera</span>
no ip source-route
no ip identd
no ip finger

<span class="cmd-comment"># SSH</span>
ip domain-name redacademia.es
crypto key generate rsa modulus 2048
ip ssh version 2
ip ssh time-out 60
ip ssh authentication-retries 3
line vty 0 4
 transport input ssh
 access-class 99 in
 exec-timeout 5 0
 login local
line vty 5 15
 transport input ssh
 access-class 99 in

<span class="cmd-comment"># ACL para limitar acceso de gestión</span>
access-list 99 remark Solo desde red de admin
access-list 99 permit 192.168.99.0 0.0.0.255

<span class="cmd-comment"># Cuentas locales</span>
username admin privilege 15 secret MiContraseñaSuperLarga2026
username operador privilege 5 secret OtraContraseña

<span class="cmd-comment"># Banner</span>
banner motd #
ATENCIÓN: Acceso restringido al personal autorizado.
Toda actividad es monitorizada y registrada.
#
</div>

<h4>📜 Logging y monitorización</h4>
<div class="cmd-block">
logging host 192.168.99.20            <span class="cmd-comment"># Servidor de logs (rsyslog, Graylog)</span>
logging trap informational
logging buffered 16384
service timestamps log datetime msec localtime
clock timezone CET 1
ntp server 0.pool.ntp.org             <span class="cmd-comment"># Tiempo correcto, imprescindible para forense</span>
ntp server 1.pool.ntp.org
</div>

<h4>📊 SNMP seguro</h4>
<ul>
    <li>SNMPv2c: <strong>cambia la community por defecto "public"</strong>. Usa una difícil de adivinar.</li>
    <li>Mejor aún: <strong>SNMPv3</strong> con autenticación y cifrado.</li>
    <li>ACL para que solo el servidor de monitorización pueda consultar.</li>
</ul>

<div class="cmd-block">
<span class="cmd-comment"># SNMPv3</span>
snmp-server group GRUPO_ADMIN v3 priv read VIEW_FULL
snmp-server view VIEW_FULL iso included
snmp-server user usuario_snmp GRUPO_ADMIN v3 auth sha PasswordAuth2026 priv aes 256 PasswordCifrado2026
snmp-server host 192.168.99.30 version 3 priv usuario_snmp
</div>

<h4>🎯 Checklist de hardening (CIS Benchmark)</h4>
<div class="concept-box">
    <ul>
        <li>✅ Cambiar todas las contraseñas por defecto.</li>
        <li>✅ Deshabilitar servicios no usados (HTTP, CDP, LLDP donde no haga falta, source-route).</li>
        <li>✅ Configurar SSH versión 2, deshabilitar Telnet.</li>
        <li>✅ ACL de gestión por VTY.</li>
        <li>✅ Logging centralizado a syslog server.</li>
        <li>✅ NTP sincronizado.</li>
        <li>✅ SNMPv3 con cifrado.</li>
        <li>✅ Auth AAA con RADIUS/TACACS+.</li>
        <li>✅ Banners legales.</li>
        <li>✅ Backup de configuración automático periódico.</li>
        <li>✅ Firmware actualizado (sin CVEs críticos abiertos).</li>
        <li>✅ Port Security + BPDU Guard en puertos access.</li>
        <li>✅ DHCP Snooping + Dynamic ARP Inspection.</li>
        <li>✅ Storm-control para limitar broadcast.</li>
    </ul>
</div>
    `
},
{
    title: '🎥 Vídeos para aprender',
    content: ''
},
{
    title: '📚 Libros y recursos',
    content: ''
}
]

});
