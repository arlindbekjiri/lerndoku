---
title: SolidJS
sidebar_position: 3
---

# SolidJS

SolidJS ist ein JavaScript-Framework für Benutzeroberflächen. Es sieht React ähnlich aus, funktioniert aber komplett anders. Statt Virtual DOM verwendet es feinkörnige Reaktivität.

### Hauptmerkmale

- Kein Virtual DOM
- Feinkörnige Reaktivität
- JSX-Syntax
- Kleine Bundle-Grösse
- TypeScript Support

## Installation

```bash
npx degit solidjs/templates/ts mein-projekt
cd mein-projekt
npm install
npm run dev
```

## Komponenten

Komponenten in SolidJS sind normale Funktionen, werden aber nur einmal ausgeführt, nicht bei jedem Update wie in React.

```tsx
function Gruss() {
  return <h1>Hallo Welt</h1>;
}
```

## Signals

Signals sind das Herzstück von SolidJS. Ein Signal ist ein reaktiver Wert. Wenn er sich ändert, wird nur der DOM-Knoten aktualisiert der ihn verwendet.

```tsx
import { createSignal } from "solid-js";

function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <div>
      <p>Zähler: {count()}</p>
      <button onClick={() => setCount(count() + 1)}>Erhöhen</button>
    </div>
  );
}
```

Signal-Werte müssen als Funktion aufgerufen werden, also `count()` und nicht `count`.

## createMemo

`createMemo` berechnet einen Wert automatisch neu wenn sich seine Abhängigkeiten ändern.

```tsx
import { createSignal, createMemo } from "solid-js";

function App() {
  const [preis, setPreis] = createSignal(100);
  const [menge, setMenge] = createSignal(3);

  const total = createMemo(() => preis() * menge());

  return <p>Total: {total()} CHF</p>;
}
```

## createEffect

Läuft automatisch wenn sich abhängige Signals ändern. Ähnlich wie `useEffect` in React, aber ohne Dependency Array.

```tsx
import { createSignal, createEffect } from "solid-js";

function App() {
  const [name, setName] = createSignal("Arlind");

  createEffect(() => {
    console.log("Name hat sich geändert:", name());
  });

  return <input value={name()} onInput={(e) => setName(e.target.value)} />;
}
```

## Props

```tsx
type Props = {
  name: string;
  age?: number;
};

function UserCard(props: Props) {
  return (
    <div>
      <p>{props.name}</p>
      <p>{props.age ?? "Kein Alter"}</p>
    </div>
  );
}

// Verwendung
<UserCard name="Arlind" age={25} />;
```

In SolidJS Props nicht destructuren, das bricht die Reaktivität. Stattdessen `props.name` verwenden.

### splitProps

```tsx
import { splitProps } from "solid-js";

function Button(props: { label: string; color: string }) {
  const [local, rest] = splitProps(props, ["label"]);
  return <button {...rest}>{local.label}</button>;
}
```

## Control Flow

SolidJS hat eigene Komponenten für bedingte Anzeige und Listen.

### Show

```tsx
import { Show } from "solid-js";

<Show when={isLoggedIn()} fallback={<p>Bitte einloggen</p>}>
  <p>Willkommen zurück</p>
</Show>;
```

### For

```tsx
import { For } from "solid-js";

const [items, setItems] = createSignal(["Apfel", "Banane", "Orange"]);

<For each={items()}>{(item) => <li>{item}</li>}</For>;
```

### Switch / Match

```tsx
import { Switch, Match } from "solid-js";

<Switch fallback={<p>Unbekannt</p>}>
  <Match when={status() === "loading"}>Lädt...</Match>
  <Match when={status() === "error"}>Fehler</Match>
  <Match when={status() === "success"}>Fertig</Match>
</Switch>;
```

## Stores

Für Objekte und verschachtelte Daten gibt es `createStore`.

```tsx
import { createStore } from "solid-js/store";

const [user, setUser] = createStore({
  name: "Arlind",
  address: {
    city: "Zuerich",
    zip: "8000",
  },
});

setUser("name", "Arlind Bekjiri");
setUser("address", "city", "Zuerich");
```

## createResource

Für asynchrone Daten gibt es `createResource`.

```tsx
import { createResource } from "solid-js";

async function fetchUser(id: number) {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}

function UserProfile() {
  const [user] = createResource(1, fetchUser);

  return (
    <div>
      <Show when={user.loading}>Lädt...</Show>
      <Show when={user.error}>Fehler beim Laden</Show>
      <Show when={user()}>{(u) => <p>{u().name}</p>}</Show>
    </div>
  );
}
```

## Lifecycle

```tsx
import { onMount, onCleanup } from "solid-js";

onMount(() => {
  console.log("Komponente bereit");
});

onCleanup(() => {
  console.log("Komponente entfernt");
});
```

## Best Practices

- Props nicht destructuren
- `<For>` statt `.map()` für Listen
- `<Show>` statt Ternary für bedingte Anzeige
- `createMemo` für berechnete Werte
- `createStore` für verschachtelte State-Objekte

## Ressourcen

- [Offizielle Dokumentation](https://docs.solidjs.com/)
- [SolidJS Playground](https://playground.solidjs.com/)
- [SolidJS vs React](https://docs.solidjs.com/guides/comparing-solid)
