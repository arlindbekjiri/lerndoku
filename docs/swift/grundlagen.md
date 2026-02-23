---
title: Swift Grundlagen
sidebar_position: 1
---

# Swift Grundlagen

Swift ist eine moderne Programmiersprache von Apple, die für die Entwicklung von Apps auf iOS, macOS, watchOS und tvOS verwendet wird.

## Installation & Setup

### Xcode Installation

```bash
# Xcode über App Store installieren
# Oder über Apple Developer Portal herunterladen
```

### Swift Playground

- Xcode → File → New → Playground
- Ideal zum Experimentieren und Lernen

## Variablen und Konstanten

### Deklaration

```swift
// Konstanten (unveränderlich)
let name = "Arlind"
let pi = 3.14159

// Variablen (veränderlich)
var age = 25
var score = 0
```

### Type Annotation

```swift
let name: String = "Arlind"
let age: Int = 30
let height: Double = 1.75
let isActive: Bool = true
```

## Datentypen

### Grundlegende Typen

```swift
// Zahlen
let integer: Int = 42
let double: Double = 3.14
let float: Float = 2.5

// Text
let string: String = "Hello World"
let character: Character = "A"

// Boolean
let isTrue: Bool = true
```

### Collections

```swift
// Arrays
var numbers = [1, 2, 3, 4, 5]
var names: [String] = ["Arlind", "Mehmet", "Dion"]

// Dictionaries
var person = ["name": "Arlind", "city": "Zuerich"]
var ages: [String: Int] = ["Dion": 25, "Arlind": 30]

// Sets
var uniqueNumbers: Set<Int> = [1, 2, 3, 4, 5]
```

## Kontrollstrukturen

### If-Statements

```swift
let temperature = 25

if temperature > 30 {
    print("Es ist heiss")
} else if temperature > 20 {
    print("Angenehm warm")
} else {
    print("Kühl")
}
```

### Switch-Statement

```swift
let grade = "s"

switch grade {
case "A":
    print("Ausgezeichnet")
case "B":
    print("Gut")
case "C":
    print("Befriedigend")
default:
    print("Unbekannte Note")
}
```

### Schleifen

```swift
// For-In Loop
for i in 1...5 {
    print("Zahl: \(i)")
}

// While Loop
var counter = 0
while counter < 5 {
    print(counter)
    counter += 1
}

// Array durchlaufen
let fruits = ["Apfel", "Banane", "Orange"]
for fruit in fruits {
    print(fruit)
}
```

## Funktionen

### Grundlegende Syntax

```swift
func greet(name: String) -> String {
    return "Hallo, \(name)!"
}

let greeting = greet(name: "Max")
print(greeting)
```

### Parameter und Return Values

```swift
// Mehrere Parameter
func add(a: Int, b: Int) -> Int {
    return a + b
}

// Ohne Return Value
func printMessage(_ message: String) {
    print(message)
}

// Default Parameter
func greet(name: String = "Welt") -> String {
    return "Hallo, \(name)!"
}
```

## Optionals

### Was sind Optionals?

```swift
var optionalName: String? = "Arlind"
var optionalAge: Int? = nil

// Optional Binding
if let name = optionalName {
    print("Name ist: \(name)")
} else {
    print("Kein Name vorhanden")
}

// Guard Statement
func processUser(name: String?) {
    guard let userName = name else {
        print("Ungültiger Name")
        return
    }

    print("Verarbeite User: \(userName)")
}
```

### Nil Coalescing

```swift
let defaultName = "Unbekannt"
let actualName = optionalName ?? defaultName
print(actualName)
```

## String Interpolation

```swift
let name = "Arlind"
let age = 25

let message = "Mein Name ist \(name) und ich bin \(age) Jahre alt."
print(message)

// Berechnungen in String Interpolation
let result = "Das Ergebnis ist: \(5 + 3)"
```

## Best Practices

1. **Naming Conventions**

   - Variablen und Funktionen: camelCase
   - Konstanten: camelCase oder PascalCase für globale Konstanten
   - Klassen: PascalCase

2. **Optionals richtig verwenden**

   - Prefer Optional Binding über Force Unwrapping
   - Verwende Guard Statements für frühe Returns

3. **Type Inference nutzen**

   ```swift
   // Gut
   let name = "Arlind"

   // Unnötig verbose (ausführlich)
   let name: String = "Arlind"
   ```
