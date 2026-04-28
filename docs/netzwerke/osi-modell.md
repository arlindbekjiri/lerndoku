# OSI-Modell

Das OSI-Modell (Open Systems Interconnection) ist ein Referenzmodell, das beschreibt wie Netzwerkkommunikation funktioniert. Es teilt die Kommunikation in 7 Schichten auf, damit verschiedene Systeme und Hersteller miteinander kommunizieren können.

## Die 7 Schichten

```
7  Anwendungsschicht      (Application Layer)
6  Darstellungsschicht    (Presentation Layer)
5  Sitzungsschicht        (Session Layer)
4  Transportschicht       (Transport Layer)
3  Vermittlungsschicht    (Network Layer)
2  Sicherungsschicht      (Data Link Layer)
1  Bitübertragungsschicht (Physical Layer)
```

## Schicht 1 - Bitübertragungsschicht

Zuständig für die physische Übertragung von Bits über ein Medium.

- Bits in elektrische Signale, Lichtsignale oder Funkwellen umwandeln
- Übertragungsmedium definieren (Kupfer, Glasfaser, Funk)
- Bitrate und Taktung

Beispiele: Ethernet-Kabel (RJ45), Glasfaser, WLAN
Protokolle: DSL, ISDN, 802.11

## Schicht 2 - Sicherungsschicht

Sorgt für eine zuverlässige Übertragung zwischen zwei direkt verbundenen Geräten und erkennt Fehler die auf Schicht 1 entstehen.

- Daten in Frames verpacken
- MAC-Adressen zur Adressierung
- Fehlererkennung mit CRC-Prüfsumme

Beispiele: MAC-Adresse (`00:1A:2B:3C:4D:5E`), Switch
Protokolle: Ethernet (IEEE 802.3), WLAN (IEEE 802.11), PPP

## Schicht 3 - Vermittlungsschicht

Leitet Pakete durch das Netzwerk weiter, auch über mehrere Netzwerke hinweg. Auf dieser Schicht arbeiten IP-Adressen.

- Logische Adressierung mit IP-Adressen
- Routing

Beispiele: IP-Adresse (`192.168.1.1`), Router
Protokolle: IP (IPv4, IPv6), ICMP, ARP

## Schicht 4 - Transportschicht

Stellt eine Verbindung zwischen zwei Endgeräten her und sorgt dafür dass Daten vollständig und in der richtigen Reihenfolge ankommen.

- Segmentierung der Daten
- Ports zur Adressierung von Anwendungen
- Fehlerbehebung und Neuübertragung bei TCP

### TCP vs UDP

|                 | TCP                   | UDP                    |
| --------------- | --------------------- | ---------------------- |
| Verbindung      | Verbindungsorientiert | Verbindungslos         |
| Zuverlässigkeit | Garantiert            | Keine Garantie         |
| Verwendung      | HTTP, FTP, E-Mail     | Streaming, DNS, Gaming |

## Schicht 5 - Sitzungsschicht

Verwaltet Sitzungen zwischen zwei Geräten.

- Sitzungen aufbauen, verwalten, beenden
- Wiederaufnahme unterbrochener Sitzungen

Protokolle: NetBIOS, RPC, PPTP

## Schicht 6 - Darstellungsschicht

Übersetzt Daten in ein Format das die Anwendung versteht.

- Verschlüsselung und Entschlüsselung (SSL/TLS)
- Datenkomprimierung
- Zeichenkodierung (ASCII, UTF-8)

Beispiele: SSL/TLS, JPEG, PNG, UTF-8

## Schicht 7 - Anwendungsschicht

Die oberste Schicht. Hier interagieren Anwendungen mit dem Netzwerk.

- Netzwerkdienste für Anwendungen bereitstellen
- Protokolle für spezifische Dienste

Protokolle: HTTP, HTTPS, FTP, SMTP, IMAP, DNS, SSH

## Dateneinheiten pro Schicht

| Schicht | Bezeichnung                     |
| ------- | ------------------------------- |
| 7-5     | Daten                           |
| 4       | Segment (TCP) / Datagramm (UDP) |
| 3       | Paket                           |
| 2       | Frame                           |
| 1       | Bits                            |

## Ablauf einer HTTPS-Anfrage

Beim Aufruf von `https://google.com` läuft folgendes ab:

1. Browser erstellt HTTP-Request (Schicht 7)
2. TLS verschlüsselt die Daten (Schicht 6)
3. Session wird verwaltet (Schicht 5)
4. TCP teilt Daten in Segmente auf, Port 443 (Schicht 4)
5. IP-Paket mit Ziel-IP wird erstellt (Schicht 3)
6. Frame mit MAC-Adresse wird erstellt (Schicht 2)
7. Bits werden über das Kabel gesendet (Schicht 1)

Beim Empfänger läuft es umgekehrt.

## TCP/IP-Modell

In der Praxis wird meistens das TCP/IP-Modell mit 4 Schichten verwendet. Das OSI-Modell ist eher theoretisch.

```
OSI                     TCP/IP
7  Anwendung   ┐
6  Darstellung ├──────  Anwendung
5  Sitzung     ┘
4  Transport   ────────  Transport
3  Vermittlung ────────  Internet
2  Sicherung   ┐
1  Physisch    ┘──────   Netzzugang
```

## Wichtige Ports

| Port   | Protokoll  | Verwendung                |
| ------ | ---------- | ------------------------- |
| 20, 21 | FTP        | Dateiübertragung          |
| 22     | SSH        | Sichere Remote-Verbindung |
| 25     | SMTP       | E-Mail senden             |
| 53     | DNS        | Domainauflösung           |
| 80     | HTTP       | Webseiten                 |
| 443    | HTTPS      | Webseiten verschlüsselt   |
| 3306   | MySQL      | Datenbank                 |
| 5432   | PostgreSQL | Datenbank                 |

## Ressourcen

- [OSI-Modell Wikipedia](https://de.wikipedia.org/wiki/OSI-Modell)
- [Cloudflare Erklärung](https://www.cloudflare.com/de-de/learning/ddos/glossary/open-systems-interconnection-model-osi/)

## Cheatsheet

```
Schicht  Name                  Protokolle / Geräte
7        Anwendung             HTTP, HTTPS, FTP, DNS, SMTP, SSH
6        Darstellung           SSL/TLS, JPEG, UTF-8
5        Sitzung               NetBIOS, RPC
4        Transport             TCP, UDP - Ports
3        Vermittlung           IP, ICMP - Router
2        Sicherung             Ethernet, WLAN - Switch, MAC-Adresse
1        Bitübertragung        Kabel, Glasfaser, Funk
```
