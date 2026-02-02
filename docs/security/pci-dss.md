# PCI DSS Notizen

## Was ist das eigentlich?

PCI DSS Version 4.0.1 ist seit Juni 2024 aktuell. Wenn man mit Kreditkartendaten arbeitet, muss man sich an diese Regeln
halten.

Die grossen Kreditkartenunternehmen (Visa, Mastercard, etc.) haben diesen Standard entwickelt, um auf die zunehmenden
Datendiebstähle zu reagieren und einheitliche Sicherheitsstandards zu schaffen.

## Die 12 Hauptanforderungen

Die 12 Hauptanforderungen sind logisch strukturiert:

### 1. Firewall & Co richtig aufsetzen

Früher hiess das nur "Firewall". Jetzt ist es breiter - alle Netzwerk-Sicherheitskontrollen. Das macht Sinn, weil sich
die Technik weiterentwickelt hat.

### 2. Standard-Konfigurationen ändern

Standard-Passwörter wie "admin/admin" oder "password123" müssen geändert werden. Sichere Konfiguration ist von Anfang an
erforderlich.

### 3. Gespeicherte Daten absichern

Falls Kartendaten gespeichert werden müssen (sollte vermieden werden), dann nur stark verschlüsselt.

### 4. Übertragung verschlüsseln

TLS ist erforderlich. Alle Datenübertragungen müssen verschlüsselt sein. Klartext ist nicht zulässig.

### 5. Malware-Schutz

Nicht nur Antivirus, das wurde erweitert. Alle Systeme müssen geschützt sein.

### 6. Software sicher entwickeln

Code-Reviews, sichere Programmierung, regelmässige Updates.

### 7. Need-to-know Prinzip

Nicht jeder braucht Zugang zu allem. Zugriff nur nach Geschäftsnotwendigkeit.

### 8. Wer ist wer?

Multi-Faktor-Authentifizierung ist häufiger Pflicht. SMS-Codes reichen oft nicht mehr.

### 9. Physischer Schutz

Server müssen physisch geschützt werden.

### 10. Alles loggen

Alle Aktivitäten müssen protokolliert werden. Logs sind bei Sicherheitsvorfällen entscheidend.

### 11. Testen, testen, testen

Pen-Tests, Vulnerability-Scans, Code-Reviews regelmässig durchführen.

### 12. Richtlinien haben

Schriftliche Sicherheitsrichtlinien sind erforderlich.

## Compliance-Level

Je nach Anzahl der jährlichen Transaktionen gelten unterschiedliche Compliance-Level mit entsprechenden Anforderungen:

### Level 1 - Die Grossen

Über 6 Millionen Transaktionen/Jahr. Erfordert ein jährliches On-Site-Audit durch einen Qualified Security Assessor (
QSA). Ausserdem alle die schon mal gehackt wurden egal wie klein.

### Level 2-4 - Alle anderen

- **Level 2**: 1-6 Millionen Transaktionen
- **Level 3**: 20.000-1 Million
- **Level 4**: Unter 20.000

Hier reicht meist ein Self-Assessment Questionnaire (SAQ). Vierteljährliche Netzwerk-Scans sind dennoch erforderlich.

*Hinweis: Acquiring-Banken können unabhängig vom Level zusätzliche Anforderungen stellen.*

## Wichtige Begriffe (die immer auftauchen)

### CDE - Cardholder Data Environment

Der Netzwerkbereich, in dem Kartendaten gespeichert, verarbeitet oder übertragen werden. Dieser Bereich erfordert
besonderen Schutz.

### PAN - Primary Account Number

Die eindeutige Kartennummer mit 13-19 Ziffern.

### SAD - Sensitive Authentication Data

Das sind:

- CVV/CVC (die 3-4 Ziffern hinten)
- PIN-Daten
- Magnetstreifen-Info

Diese Daten dürfen niemals dauerhaft gespeichert werden.

## Implementierungserkenntnisse

**Datenmapping:** Zuerst alle Orte identifizieren, wo Kartendaten gespeichert sind. Diese finden sich oft in Logs,
Backups und Test-Datenbanken.

**Netzwerk-Segmentierung:** CDE muss vom Rest des Netzwerks getrennt sein.

**Logging:** Umfassendes Logging implementieren, dabei aber niemals Kartendaten in Logfiles speichern.

**Schulungen:** Mitarbeiterschulungen sind wichtig, da technische Massnahmen ohne Security Awareness wirkungslos sind.

**Incident Response:** Ein Incident-Response-Plan muss vor einem Sicherheitsvorfall vorhanden sein.

## Tools die wirklich helfen

**Vulnerability Scanner**: Nessus ist Standard, OpenVAS als kostenlose Alternative. Qualys für die Cloud.

**File Integrity Monitoring**: AIDE (Linux), Tripwire (kommerzielle Lösung). Erkennt Dateiänderungen.

**Logs**: Splunk ist der Standard, ELK Stack als Open Source Lösung. Zentrale Sammlung ist wichtig.

**Tokenization**: Statt echter Kartennummer nur Token speichern. Effektiv, aber komplex umzusetzen.

**P2P Encryption**: Kartendaten vom Terminal bis zum Prozessor verschlüsselt. Teuer aber sicher.

## Was neu ist in 4.0.1

Die wichtigsten Verschärfungen in Version 4.0.1:

**MFA überall**: Früher nur für Admins, jetzt für alle die auf Kartendaten zugreifen. SMS reicht oft nicht mehr.

**Alte Crypto entfernt**: TLS 1.0/1.1 und SHA-1 werden nicht mehr akzeptiert. Nur moderne Verschlüsselungsstandards sind
zulässig.

**Mehr Monitoring**: Real-time Anomalie-Erkennung ist häufiger Pflicht. Machine Learning wird Standard.

**Risk Assessments**: Nicht mehr nur jährlich, bei jeder grösseren Änderung neu bewerten.

## Wichtige Termine

**März 2024**: 4.0 wurde verpflichtend. Wer noch auf 3.2.1 war, musste upgraden.

**März 2025**: Dann werden nochmals 60 Anforderungen verpflichtend die bisher "nur" Best Practice waren.

**Juni 2024**: 4.0.1 wurde veröffentlicht. Hauptsächlich Klarstellungen, keine neuen grossen Änderungen.

## Links

- [PCI SSC Homepage](https://www.pcisecuritystandards.org/) - Die offizielle Quelle
- [Document Library](https://www.pcisecuritystandards.org/document_library/) - Alle relevanten Dokumente
- [SAQ Fragebogen](https://www.pcisecuritystandards.org/document_library?category=saqs) - Für Level 2-4
- [Quick Reference](https://www.pcisecuritystandards.org/documents/) - Übersichtsdokumente