---
title: SQL Grundlagen
sidebar_position: 1
---

# SQL Grundlagen

SQL (Structured Query Language) ist die Sprache, mit der man mit relationalen Datenbanken arbeitet. Damit erstellt man Tabellen, fügt Daten ein, fragt sie ab und ändert sie. SQL ist standardisiert und funktioniert in fast allen Datenbanken ähnlich (PostgreSQL, MySQL, SQLite, ...).

### Hauptmerkmale

- Standardisierte Abfragesprache
- Funktioniert mit fast allen relationalen Datenbanken
- Deklarativ (man sagt was man will, nicht wie)
- Aufgeteilt in DDL, DML und DQL
- Grundlage für jedes ORM (z. B. TypeORM)

## Die drei Teilsprachen

SQL wird oft in drei Bereiche aufgeteilt:

```plaintext
DDL  Data Definition Language    CREATE, ALTER, DROP   -> Struktur
DML  Data Manipulation Language  INSERT, UPDATE, DELETE -> Daten ändern
DQL  Data Query Language         SELECT                 -> Daten abfragen
```

## Tabellen erstellen (DDL)

```sql
CREATE TABLE benutzer (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    alter INTEGER
);
```

### Tabelle ändern und löschen

```sql
-- Spalte hinzufügen
ALTER TABLE benutzer ADD COLUMN telefon VARCHAR(20);

-- Spalte entfernen
ALTER TABLE benutzer DROP COLUMN telefon;

-- Ganze Tabelle löschen
DROP TABLE benutzer;
```

## Daten einfügen (INSERT)

```sql
-- Einzelner Datensatz
INSERT INTO benutzer (name, email, alter)
VALUES ('Arlind', 'arlind@bekjiri.ch', 25);

-- Mehrere Datensätze auf einmal
INSERT INTO benutzer (name, email, alter) VALUES
('Mehmet', 'mehmet@mde.com', 30),
('Dion', 'dion@example.com', 28);
```

## Daten abfragen (SELECT)

SELECT ist der wichtigste Befehl. Damit holt man Daten aus einer oder mehreren Tabellen.

```sql
-- Alle Spalten
SELECT * FROM benutzer;

-- Nur bestimmte Spalten
SELECT name, email FROM benutzer;
```

### WHERE (filtern)

```sql
SELECT * FROM benutzer WHERE alter > 25;
SELECT * FROM benutzer WHERE name = 'Arlind';
SELECT * FROM benutzer WHERE alter BETWEEN 20 AND 30;
SELECT * FROM benutzer WHERE name IN ('Arlind', 'Dion');
SELECT * FROM benutzer WHERE email LIKE '%@mde.com';
SELECT * FROM benutzer WHERE alter IS NULL;
```

### Operatoren

```sql
=    -- gleich
<>   -- ungleich (auch != )
>    -- grösser
<    -- kleiner
>=   -- grösser oder gleich
<=   -- kleiner oder gleich
AND  -- beide Bedingungen
OR   -- mindestens eine Bedingung
NOT  -- Verneinung
```

### Sortieren und begrenzen

```sql
-- Sortieren (ASC = aufsteigend, DESC = absteigend)
SELECT * FROM benutzer ORDER BY alter DESC;

-- Anzahl begrenzen
SELECT * FROM benutzer ORDER BY name LIMIT 10;

-- Doppelte Werte entfernen
SELECT DISTINCT alter FROM benutzer;
```

## Daten ändern und löschen

```sql
-- UPDATE: immer mit WHERE, sonst werden ALLE Zeilen geändert
UPDATE benutzer SET alter = 26 WHERE name = 'Arlind';

-- DELETE: ebenfalls immer mit WHERE
DELETE FROM benutzer WHERE alter < 18;
```

## Aggregatfunktionen

Aggregatfunktionen fassen mehrere Zeilen zu einem Wert zusammen.

```sql
SELECT COUNT(*) FROM benutzer;        -- Anzahl Zeilen
SELECT AVG(alter) FROM benutzer;      -- Durchschnitt
SELECT MIN(alter) FROM benutzer;      -- Kleinster Wert
SELECT MAX(alter) FROM benutzer;      -- Grösster Wert
SELECT SUM(alter) FROM benutzer;      -- Summe
```

### GROUP BY und HAVING

`GROUP BY` gruppiert Zeilen, `HAVING` filtert die Gruppen (so wie WHERE die Zeilen filtert).

```sql
-- Wie viele Benutzer pro Alter?
SELECT alter, COUNT(*) AS anzahl
FROM benutzer
GROUP BY alter;

-- Nur Gruppen mit mehr als einem Benutzer
SELECT alter, COUNT(*) AS anzahl
FROM benutzer
GROUP BY alter
HAVING COUNT(*) > 1;
```

## Beziehungen und Schlüssel

### Primary Key und Foreign Key

Ein **Primary Key** identifiziert eine Zeile eindeutig. Ein **Foreign Key** verweist auf den Primary Key einer anderen Tabelle und stellt so eine Beziehung her.

```sql
CREATE TABLE bestellungen (
    id INTEGER PRIMARY KEY,
    benutzer_id INTEGER REFERENCES benutzer(id),  -- Foreign Key
    produkt VARCHAR(100),
    menge INTEGER
);
```

## Joins

Mit Joins kombiniert man Daten aus mehreren Tabellen.

```plaintext
INNER JOIN   nur Zeilen, die in BEIDEN Tabellen passen
LEFT JOIN    alle Zeilen der linken Tabelle, passende rechts (sonst NULL)
RIGHT JOIN   alle Zeilen der rechten Tabelle, passende links (sonst NULL)
FULL JOIN    alle Zeilen beider Tabellen
```

### INNER JOIN

```sql
-- Benutzer mit ihren Bestellungen (nur wer bestellt hat)
SELECT b.name, best.produkt, best.menge
FROM benutzer b
INNER JOIN bestellungen best ON b.id = best.benutzer_id;
```

### LEFT JOIN

```sql
-- Alle Benutzer, auch die ohne Bestellung
SELECT b.name, best.produkt
FROM benutzer b
LEFT JOIN bestellungen best ON b.id = best.benutzer_id;
```

## Normalisierung

Normalisierung bedeutet, Daten so aufzuteilen, dass sie nicht doppelt gespeichert werden (Redundanz vermeiden). Das ist ein wichtiges Theoriethema in der Berufsschule.

### Die ersten drei Normalformen

```plaintext
1. NF  Jede Spalte enthält nur einen Wert (atomar), keine Listen.
2. NF  1. NF erfüllt + jede Spalte hängt vom GANZEN Primary Key ab.
3. NF  2. NF erfüllt + keine Spalte hängt von einer anderen Nicht-Schlüssel-Spalte ab.
```

### Beispiel

```plaintext
Nicht normalisiert (alles in einer Tabelle, redundant):

bestellung_id | benutzer_name | benutzer_email      | produkt
1             | Arlind        | arlind@bekjiri.ch   | Laptop
2             | Arlind        | arlind@bekjiri.ch   | Maus

-> Der Name und die E-Mail von Arlind stehen mehrfach drin.

Normalisiert (in zwei Tabellen aufgeteilt):

benutzer:                          bestellungen:
id | name   | email               id | benutzer_id | produkt
1  | Arlind | arlind@bekjiri.ch   1  | 1           | Laptop
                                  2  | 1           | Maus

-> Jeder Benutzer steht nur einmal da, verbunden über die benutzer_id.
```

## ER-Modell

Das Entity-Relationship-Modell ist eine Skizze der Datenbank, bevor man sie baut. Es zeigt **Entitäten** (Tabellen), ihre **Attribute** (Spalten) und die **Beziehungen** zwischen ihnen.

### Arten von Beziehungen

```plaintext
1:1   Ein Benutzer hat genau ein Profil.
1:n   Ein Benutzer hat mehrere Bestellungen.
n:m   Ein Student besucht mehrere Kurse, ein Kurs hat mehrere Studenten.
```

Eine `n:m`-Beziehung wird mit einer zusätzlichen Zwischentabelle aufgelöst.

```sql
-- Zwischentabelle für n:m
CREATE TABLE student_kurs (
    student_id INTEGER REFERENCES studenten(id),
    kurs_id INTEGER REFERENCES kurse(id),
    PRIMARY KEY (student_id, kurs_id)
);
```

## Best Practices

- Bei UPDATE und DELETE immer ein WHERE setzen
- Primary Key für jede Tabelle definieren
- Foreign Keys für Beziehungen nutzen (Datenintegrität)
- Sprechende Tabellen- und Spaltennamen verwenden
- Daten normalisieren, um Redundanz zu vermeiden

## Häufige Fehler

```sql
-- UPDATE ohne WHERE ändert ALLE Zeilen
UPDATE benutzer SET alter = 30;

-- Besser mit WHERE
UPDATE benutzer SET alter = 30 WHERE id = 1;

-- NULL mit = vergleichen funktioniert nicht
SELECT * FROM benutzer WHERE alter = NULL;

-- Richtig ist IS NULL
SELECT * FROM benutzer WHERE alter IS NULL;
```

## Ressourcen

- [SQL Tutorial (W3Schools)](https://www.w3schools.com/sql/)
- [PostgreSQL Dokumentation](https://www.postgresql.org/docs/)
- [SQLBolt (interaktiv)](https://sqlbolt.com/)
