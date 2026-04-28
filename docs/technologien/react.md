# React

React ist eine JavaScript-Bibliothek von Meta für den Aufbau von Benutzeroberflächen. Die UI wird in wiederverwendbare Komponenten aufgeteilt, die sich automatisch aktualisieren wenn sich die Daten ändern.

### Hauptmerkmale

- Komponentenbasierte Architektur
- Virtual DOM
- Unidirektionaler Datenfluss
- JSX
- Grosses Ökosystem

## Installation

```bash
npm create vite@latest meine-app -- --template react-ts
cd meine-app
npm install
npm run dev
```

## Komponenten

Eine Komponente ist eine Funktion, die JSX zurückgibt.

```tsx
function Gruss() {
  return <h1>Hallo Welt</h1>;
}
```

## Props

Props sind Parameter die von aussen an eine Komponente übergeben werden.

```tsx
function Gruss({ name }: { name: string }) {
  return <h1>Hallo, {name}!</h1>;
}

// Verwendung
<Gruss name="Arlind" />
```

## JSX

JSX sieht aus wie HTML, ist aber JavaScript.

```tsx
// class wird zu className
<div className="container">

// Ausdrücke in geschweiften Klammern
<p>{name.toUpperCase()}</p>

// Self-closing Tags
<img src="bild.png" />
```

## State mit useState

State ist der interne Zustand einer Komponente. Wenn sich State ändert, rendert React die Komponente neu.

```tsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Zähler: {count}</p>
      <button onClick={() => setCount(count + 1)}>Erhöhen</button>
      <button onClick={() => setCount(count - 1)}>Verringern</button>
    </div>
  );
}
```

### Objekte im State

```tsx
const [user, setUser] = useState({ name: "Arlind", age: 25 });

// Immer neues Objekt erstellen, nicht direkt mutieren
setUser({ ...user, age: 26 });
```

## useEffect

useEffect wird verwendet wenn man auf Änderungen reagieren oder externe Dinge ansprechen will (API-Calls, Timer).

```tsx
import { useState, useEffect } from "react";

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [userId]);

  return <div>{user?.name}</div>;
}
```

### Dependency Array

```tsx
useEffect(() => { ... });           // läuft nach jedem Render
useEffect(() => { ... }, []);       // läuft nur einmal beim Mounten
useEffect(() => { ... }, [value]);  // läuft wenn value sich ändert
```

## Listen rendern

```tsx
const namen = ["Arlind", "Mehmet", "Dion"];

function Namensliste() {
  return (
    <ul>
      {namen.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
}
```

Jedes Element in einer Liste braucht einen eindeutigen `key`.

## Conditional Rendering

```tsx
function Status({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div>
      {isLoggedIn ? <p>Willkommen zurück</p> : <p>Bitte einloggen</p>}

      {/* Nur anzeigen wenn true */}
      {isLoggedIn && <button>Ausloggen</button>}
    </div>
  );
}
```

## Event Handling

```tsx
function Form() {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Eingabe:", input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Etwas eingeben"
      />
      <button type="submit">Absenden</button>
    </form>
  );
}
```

## Custom Hooks

Wenn Logik in mehreren Komponenten gebraucht wird, kann sie in einen eigenen Hook ausgelagert werden.

```tsx
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}

// Verwendung
function UserList() {
  const { data, loading } = useFetch<User[]>("/api/users");

  if (loading) return <p>Lädt...</p>;
  return <ul>{data?.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

## Komponenten aufteilen

```tsx
// Alles in einer Komponente
function App() {
  return (
    <div>
      <nav>...</nav>
      <main>...</main>
      <footer>...</footer>
    </div>
  );
}

// Aufgeteilt
function App() {
  return (
    <div>
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}
```

## Best Practices

- Komponenten klein halten
- State so tief wie möglich platzieren
- Keys bei Listen immer setzen, nie den Index verwenden
- State nicht direkt mutieren
- Custom Hooks für wiederverwendbare Logik

## Häufige Fehler

```tsx
// State direkt mutieren funktioniert nicht
user.name = "Neu";
setUser(user);

// Stattdessen
setUser({ ...user, name: "Neu" });

// Index als Key
items.map((item, index) => <li key={index}>{item}</li>);

// Besser eindeutige ID
items.map((item) => <li key={item.id}>{item.name}</li>);
```

## Ressourcen

- [Offizielle Dokumentation](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
