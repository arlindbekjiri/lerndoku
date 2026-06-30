---
title: TypeScript
sidebar_position: 1
---

# TypeScript

TypeScript ist eine Erweiterung von JavaScript, die statische Typen hinzufügt. Der Code wird zu normalem JavaScript kompiliert und läuft überall, wo auch JavaScript läuft. Der grosse Vorteil ist, dass viele Fehler schon beim Schreiben auffallen und nicht erst zur Laufzeit.

### Hauptmerkmale

- Statische Typisierung
- Wird zu JavaScript kompiliert
- Bessere Autovervollständigung im Editor
- Fehler werden früh erkannt
- Grosse Verbreitung (React, NestJS, Angular, ...)

## Installation

```bash
# Global installieren
npm install -g typescript

# Version prüfen
tsc --version

# Im Projekt installieren
npm install --save-dev typescript
```

### Kompilieren

```bash
# Einzelne Datei kompilieren
tsc datei.ts

# Im Watch-Modus (kompiliert bei jeder Änderung)
tsc --watch
```

## Grundlegende Typen

```typescript
// Primitive Typen
let name: string = "Arlind";
let alter: number = 25;
let aktiv: boolean = true;

// Array
let zahlen: number[] = [1, 2, 3];
let namen: string[] = ["Arlind", "Mehmet", "Dion"];

// Tuple (feste Länge und Reihenfolge)
let person: [string, number] = ["Arlind", 25];

// any (vermeiden, schaltet die Typprüfung aus)
let irgendwas: any = "kann alles sein";

// unknown (sicherer als any)
let unbekannt: unknown = 4;
```

## Typ-Inferenz

TypeScript erkennt den Typ oft selbst, dann muss man ihn nicht hinschreiben.

```typescript
let name = "Arlind"; // wird automatisch als string erkannt
let alter = 25; // wird automatisch als number erkannt

// name = 5; // Fehler: number ist nicht string
```

## Funktionen

```typescript
// Parameter- und Rückgabetyp
function addieren(a: number, b: number): number {
  return a + b;
}

// Arrow Function
const multiplizieren = (a: number, b: number): number => a * b;

// Optionaler Parameter mit ?
function gruss(name: string, titel?: string): string {
  return titel ? `Hallo ${titel} ${name}` : `Hallo ${name}`;
}

// Standardwert
function zaehle(start: number = 0): number {
  return start + 1;
}

// void = gibt nichts zurück
function logge(nachricht: string): void {
  console.log(nachricht);
}
```

## Objekte und Interfaces

Ein Interface beschreibt die Form eines Objekts.

```typescript
interface Benutzer {
  id: number;
  name: string;
  email: string;
  alter?: number; // optional
}

const user: Benutzer = {
  id: 1,
  name: "Arlind",
  email: "arlind@bekjiri.ch",
};
```

### Readonly

```typescript
interface Konfiguration {
  readonly apiUrl: string;
}

const config: Konfiguration = { apiUrl: "https://api.example.com" };
// config.apiUrl = "anders"; // Fehler: ist readonly
```

## Type Aliases

`type` ist eine Alternative zu `interface` und kann mehr als nur Objekte beschreiben.

```typescript
type ID = number | string;
type Status = "aktiv" | "inaktiv" | "gesperrt";

type Produkt = {
  name: string;
  preis: number;
};

const status: Status = "aktiv";
// const falsch: Status = "irgendwas"; // Fehler
```

## Union und Intersection Types

```typescript
// Union: einer von mehreren Typen
let wert: string | number;
wert = "Text";
wert = 42;

// Intersection: kombiniert mehrere Typen
type Name = { name: string };
type Alter = { alter: number };
type Person = Name & Alter;

const p: Person = { name: "Arlind", alter: 25 };
```

## Generics

Generics machen Funktionen und Typen flexibel, ohne `any` zu verwenden.

```typescript
// Funktion, die jeden Typ durchreicht
function erstesElement<T>(liste: T[]): T {
  return liste[0];
}

const ersteZahl = erstesElement([1, 2, 3]); // number
const ersterName = erstesElement(["Arlind", "Mehmet"]); // string

// Generisches Interface
interface ApiAntwort<T> {
  data: T;
  status: number;
}

const antwort: ApiAntwort<Benutzer> = {
  data: { id: 1, name: "Arlind", email: "arlind@bekjiri.ch" },
  status: 200,
};
```

## Enums

```typescript
enum Rolle {
  Admin,
  Benutzer,
  Gast,
}

const meineRolle: Rolle = Rolle.Admin;

// Mit eigenen Werten
enum Status {
  Aktiv = "AKTIV",
  Inaktiv = "INAKTIV",
}
```

## Klassen

```typescript
class Auto {
  // Zugriffsmodifizierer
  private marke: string;
  public farbe: string;
  readonly baujahr: number;

  constructor(marke: string, farbe: string, baujahr: number) {
    this.marke = marke;
    this.farbe = farbe;
    this.baujahr = baujahr;
  }

  beschreibung(): string {
    return `${this.marke} in ${this.farbe}, Baujahr ${this.baujahr}`;
  }
}

const auto = new Auto("VW", "schwarz", 2020);
console.log(auto.beschreibung());
```

### Vererbung

```typescript
class Elektroauto extends Auto {
  reichweite: number;

  constructor(
    marke: string,
    farbe: string,
    baujahr: number,
    reichweite: number,
  ) {
    super(marke, farbe, baujahr);
    this.reichweite = reichweite;
  }
}
```

## Null und Undefined

```typescript
// Optional Chaining (?.)
const user = { profil: { name: "Arlind" } };
const name = user?.profil?.name; // kein Fehler wenn profil fehlt

// Nullish Coalescing (??)
const eingabe = null;
const wert = eingabe ?? "Standardwert"; // nimmt rechts, wenn links null/undefined
```

## Type Assertions

Wenn man es besser weiss als der Compiler, kann man den Typ erzwingen.

```typescript
const eingabe = document.getElementById("input") as HTMLInputElement;
console.log(eingabe.value);
```

## tsconfig.json

Die zentrale Konfigurationsdatei für ein TypeScript-Projekt.

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

`strict: true` aktiviert alle strengen Prüfungen und ist sehr empfehlenswert.

## Best Practices

- `strict`-Modus in der `tsconfig.json` aktivieren
- `any` vermeiden, lieber `unknown` verwenden
- Typ-Inferenz nutzen, wo es klar ist (nicht alles annotieren)
- Interfaces für die Form von Objekten verwenden
- Union Types statt loser Strings (z. B. `"aktiv" | "inaktiv"`)

## Häufige Fehler

```typescript
// any verwenden und damit die Typprüfung umgehen
let daten: any = ladeDaten();

// Besser: konkreten Typ angeben
let daten: Benutzer[] = ladeDaten();

// Typ erzwingen, obwohl er nicht stimmt
const wert = "text" as unknown as number;

// Optionale Werte ohne Prüfung verwenden
console.log(user.profil.name); // Fehler wenn profil fehlt

// Besser mit Optional Chaining
console.log(user.profil?.name);
```

## Ressourcen

- [Offizielle Dokumentation](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
