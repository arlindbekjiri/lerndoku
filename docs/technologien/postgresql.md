# PostgreSQL

PostgreSQL ist eine sehr gute Datenbank die praktisch überall läuft. Open source, stabil und hat viele nützliche Features. Besonders praktisch ist der JSON-Support.

### Hauptmerkmale

- ACID-Konformität (Atomicity, Consistency, Isolation, Durability)
- Unterstützung für komplexe Abfragen
- Erweiterbar mit benutzerdefinierten Funktionen
- JSON und XML Support
- Multi-Version Concurrency Control (MVCC)
- Trigger und gespeicherte Prozeduren

## Installation

### macOS

```bash
# Mit Homebrew
brew install postgresql

# PostgreSQL starten
brew services start postgresql
```

### Windows

1. [PostgreSQL Installer](https://www.postgresql.org/download/windows/) herunterladen
2. Installationsassistent durchlaufen
3. Passwort für Superuser festlegen

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib

# Service starten
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## Erste Schritte

### Verbindung zur Datenbank

```bash
# Als postgres User anmelden
sudo -u postgres psql

# Mit spezifischer Datenbank verbinden
psql -h localhost -U username -d databasename
```

### Grundlegende Befehle

```sql
-- Datenbanken anzeigen
\l

-- Zu Datenbank wechseln
\c databasename

-- Tabellen anzeigen
\dt

-- Tabelle beschreiben
\d tablename

-- psql verlassen
\q
```

## Datenbanken verwalten

### Datenbank erstellen

```sql
-- Neue Datenbank erstellen
CREATE DATABASE meine_app;

-- Mit spezifischen Parametern
CREATE DATABASE shop
  WITH OWNER = shopuser
       ENCODING = 'UTF8'
       TABLESPACE = pg_default;
```

### Benutzer verwalten

```sql
-- Neuen Benutzer erstellen
CREATE USER appuser WITH PASSWORD 'sicheres_passwort';

-- Berechtigungen vergeben
GRANT ALL PRIVILEGES ON DATABASE meine_app TO appuser;

-- Spezifische Berechtigungen
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO appuser;
```

## Tabellen erstellen

### Grundlegende Tabellenerstellung

```sql
CREATE TABLE benutzer (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    alter INTEGER,
    erstellt_am TIMESTAMP DEFAULT NOW()
);
```

### Datentypen

```sql
-- Zahlen
INTEGER, BIGINT, SMALLINT
DECIMAL(10,2), NUMERIC(8,3)
REAL, DOUBLE PRECISION

-- Text
VARCHAR(255), CHAR(10)
TEXT

-- Datum und Zeit
DATE, TIME, TIMESTAMP
TIMESTAMPTZ  -- mit Zeitzone

-- Boolean
BOOLEAN

-- JSON
JSON, JSONB  -- JSONB ist binär und effizienter

-- Arrays
INTEGER[], TEXT[]
```

## Daten einfügen und abfragen

### INSERT

```sql
-- Einzelner Datensatz
INSERT INTO benutzer (name, email, alter)
VALUES ('Arlind Bekjiri', 'arlind@bekjiri.ch', 25);

-- Mehrere Datensätze
INSERT INTO benutzer (name, email, alter) VALUES
('Mehmet mehmet', 'mehmet@mehmet.com', 30),
('Gabriele Logi', 'Gabriele@logi.com', 28);

-- Mit RETURNING
INSERT INTO benutzer (name, email)
VALUES ('Mehmet mde', 'mehmet@mde.com')
RETURNING id, erstellt_am;
```

### SELECT

```sql
-- Alle Datensätze
SELECT * FROM benutzer;

-- Spezifische Spalten
SELECT name, email FROM benutzer;

-- Mit WHERE-Bedingung
SELECT * FROM benutzer WHERE alter > 25;

-- Sortierung
SELECT * FROM benutzer ORDER BY name ASC;

-- LIMIT
SELECT * FROM benutzer LIMIT 10 OFFSET 20;
```

### UPDATE und DELETE

```sql
-- UPDATE
UPDATE benutzer
SET alter = 26
WHERE email = 'arlind@bekjiri.ch';

-- DELETE
DELETE FROM benutzer WHERE alter < 18;
```

## Joins und Beziehungen

### Foreign Keys

```sql
CREATE TABLE bestellungen (
    id SERIAL PRIMARY KEY,
    benutzer_id INTEGER REFERENCES benutzer(id),
    produkt VARCHAR(100),
    menge INTEGER,
    bestellt_am TIMESTAMP DEFAULT NOW()
);
```

### INNER JOIN

```sql
SELECT b.name, best.produkt, best.menge
FROM benutzer b
INNER JOIN bestellungen best ON b.id = best.benutzer_id;
```

### LEFT JOIN

```sql
-- Alle Benutzer, auch die ohne Bestellungen
SELECT b.name, best.produkt
FROM benutzer b
LEFT JOIN bestellungen best ON b.id = best.benutzer_id;
```

## Aggregationen und Gruppierungen

```sql
-- COUNT
SELECT COUNT(*) FROM benutzer;

-- GROUP BY
SELECT alter, COUNT(*) as anzahl
FROM benutzer
GROUP BY alter;

-- HAVING
SELECT alter, COUNT(*) as anzahl
FROM benutzer
GROUP BY alter
HAVING COUNT(*) > 1;

-- Weitere Aggregatfunktionen
SELECT
    AVG(alter) as durchschnittsalter,
    MIN(alter) as juengster,
    MAX(alter) as aeltester,
    SUM(menge) as gesamtmenge
FROM benutzer b
JOIN bestellungen best ON b.id = best.benutzer_id;
```

## Indizes

### Index erstellen

```sql
-- Einfacher Index
CREATE INDEX idx_benutzer_email ON benutzer(email);

-- Zusammengesetzter Index
CREATE INDEX idx_bestellungen_benutzer_datum
ON bestellungen(benutzer_id, bestellt_am);

-- Unique Index
CREATE UNIQUE INDEX idx_benutzer_email_unique ON benutzer(email);
```

### Index verwalten

```sql
-- Indizes anzeigen
\di

-- Index löschen
DROP INDEX idx_benutzer_email;
```

## JSON-Support

### JSONB verwenden

```sql
CREATE TABLE produkte (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    eigenschaften JSONB
);

-- JSON-Daten einfügen
INSERT INTO produkte (name, eigenschaften)
VALUES ('Laptop', '{"marke": "Mac", "ram": "16GB", "farbe": "schwarz"}');

-- JSON abfragen
SELECT name, eigenschaften->>'marke' as marke
FROM produkte;

-- JSON-Pfad abfragen
SELECT * FROM produkte
WHERE eigenschaften->>'ram' = '16GB';
```

## Performance-Optimierung

### EXPLAIN verwenden

```sql
-- Abfrageplan anzeigen
EXPLAIN SELECT * FROM benutzer WHERE alter > 25;

-- Detaillierte Analyse
EXPLAIN ANALYZE SELECT b.name, COUNT(best.id)
FROM benutzer b
LEFT JOIN bestellungen best ON b.id = best.benutzer_id
GROUP BY b.id, b.name;
```

### Vacuum und Analyze

```bash
# Datenbank optimieren
VACUUM ANALYZE;

# Spezifische Tabelle
VACUUM ANALYZE benutzer;
```

## Backup und Restore

### pg_dump

```bash
# Vollständiges Backup
pg_dump meine_app > backup.sql

# Nur Schema
pg_dump --schema-only meine_app > schema.sql

# Nur Daten
pg_dump --data-only meine_app > data.sql
```

### Restore

```bash
# Datenbank wiederherstellen
psql meine_app < backup.sql

# Mit createdb
createdb neue_db
psql neue_db < backup.sql
```

## Transaktionen

```sql
-- Transaction starten
BEGIN;

-- Operationen durchführen
INSERT INTO benutzer (name, email) VALUES ('Test User', 'test@example.com');
UPDATE benutzer SET alter = 25 WHERE name = 'Test User';

-- Commit oder Rollback
COMMIT;   -- Änderungen speichern
-- ROLLBACK;  -- Änderungen rückgängig machen
```

## Häufige Funktionen

### String-Funktionen

```sql
-- Text-Manipulation
SELECT
    UPPER(name),           -- Grossbuchstaben
    LOWER(email),          -- Kleinbuchstaben
    LENGTH(name),          -- Länge
    SUBSTRING(email, 1, 5) -- Teilstring
FROM benutzer;

-- Pattern Matching
SELECT * FROM benutzer WHERE name LIKE 'Arlind%';
SELECT * FROM benutzer WHERE email ~ '@gmail\.com$';  -- Regex
```

### Datum-Funktionen

```sql
-- Aktuelle Zeit
SELECT NOW(), CURRENT_DATE, CURRENT_TIME;

-- Datum-Arithmetik
SELECT erstellt_am + INTERVAL '30 days' as ablauf_datum
FROM benutzer;

-- Datum formatieren
SELECT TO_CHAR(erstellt_am, 'DD.MM.YYYY') as datum_formatiert
FROM benutzer;
```

## Best Practices

### Schema-Design

- Primary Keys definieren für alle Tabellen
- NOT NULL Constraints setzten wo nötig
- Foreign Keys nutzen für Datenintegrität

### Performance

- Indizes erstellen für häufig abgefragte Spalten
- LIMIT verwenden bei grossen Datenmengen
- EXPLAIN nutzen für Performance-Analyse
- Regelmässig VACUUM durchführen

### Sicherheit

- Parametrisierte Queries verwenden (verhindert SQL-Injection)
- Minimale Berechtigungen vergeben
- Sensible Daten verschlüsseln
- SSL-Verbindungen verwenden

## Typische Fehler vermeiden

```sql
-- Schlecht: String-Concatenation
SELECT * FROM benutzer WHERE name = 'Arlind' + ' Bekjiri';

-- Besser: Korrekte Syntax
SELECT * FROM benutzer WHERE name = 'Arlind Bekjiri';

-- Schlecht: Fehlendes WHERE
UPDATE benutzer SET alter = 30;  -- Ändert ALLE Benutzer

-- Besser: Mit WHERE
UPDATE benutzer SET alter = 30 WHERE id = 1;
```

## nützliche Erweiterungen

### pgAdmin

Grafisches Verwaltungstool für PostgreSQL:

```bash
# Installation über Browser
# https://www.pgadmin.org/download/
```

### Häufige Extensions

```sql
-- UUID Support
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Volltextsuche
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Verschlüsselung
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

## Troubleshooting

### Verbindungsprobleme

```bash
# PostgreSQL Status prüfen
sudo systemctl status postgresql

# Logs einsehen
sudo tail -f /var/log/postgresql/postgresql-14-main.log
```

### Performance-Probleme

```sql
-- Langsame Queries finden
SELECT query, mean_time, calls
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

## Ressourcen

- [Offizielle Dokumentation](https://www.postgresql.org/docs/)
- [pgAdmin](https://www.pgadmin.org/)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [Performance Tuning Guide](https://wiki.postgresql.org/wiki/Performance_Optimization)

## Cheatsheet

### Häufige Befehle

```sql
-- Datenbank-Operationen
CREATE DATABASE mydb;
DROP DATABASE mydb;
\c mydb

-- Tabellen-Operationen
CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);
DROP TABLE users;
ALTER TABLE users ADD COLUMN email TEXT;

-- Daten-Operationen
INSERT INTO users (name) VALUES ('Arlind');
SELECT * FROM users;
UPDATE users SET name = 'Arlind Bekjiri' WHERE id = 1;
DELETE FROM users WHERE id = 1;

-- Administrative Befehle
\l          -- Datenbanken anzeigen
\dt         -- Tabellen anzeigen
\d users    -- Tabelle beschreiben
\q          -- psql verlassen
```
