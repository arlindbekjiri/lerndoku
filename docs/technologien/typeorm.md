---
title: TypeORM
sidebar_position: 6
---

# TypeORM

TypeORM ist ein Object-Relational Mapping (ORM) Framework für TypeScript und JavaScript, das mit verschiedenen Datenbanken arbeitet. Es ermöglicht die Arbeit mit Datenbanken auf einer höheren Abstraktionsebene durch die Verwendung von Klassen und Objekten.

### Hauptmerkmale

- TypeScript und JavaScript Unterstützung
- Unterstützung für verschiedene Datenbanken
- Entity-basierte Entwicklung
- Migrationen
- Query Builder
- Relations Management

## Installation

```bash
npm install typeorm reflect-metadata
npm install @types/node --save-dev
```

## Grundlegende Konfiguration

1. **tsconfig.json**:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

2. **ormconfig.json**:

```json
{
  "type": "sqlite",
  "database": "database.sqlite",
  "entities": ["src/entity/**/*.ts"],
  "migrations": ["src/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}
```

## Entities definieren

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}
```

## Datenbankverbindung herstellen

```typescript
import "reflect-metadata";
import { createConnection } from "typeorm";

createConnection()
  .then(async (connection) => {
    // Hier kann mit der Datenbank gearbeitet werden
  })
  .catch((error) => console.log(error));
```

## CRUD-Operationen

### Erstellen

```typescript
const user = new User();
user.firstName = "Arlind";
user.lastName = "Beqiri";
user.age = 17;
await connection.manager.save(user);
```

### Lesen

```typescript
const users = await connection.manager.find(User);
const user = await connection.manager.findOne(User, 1);
```

### Aktualisieren

```typescript
const user = await connection.manager.findOne(User, 1);
user.age = 26;
await connection.manager.save(user);
```

### Löschen

```typescript
await connection.manager.delete(User, 1);
```

## Relations

```typescript
@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne((type) => User, (user) => user.photos)
  user: User;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => Photo, (photo) => photo.user)
  photos: Photo[];
}
```

## Migrationen

```bash
typeorm migration:create -n CreateUsersTable
```

## Best Practices

- Entities sauber strukturieren
- Indexes für Performance
- Caching nutzen
- Transaktionen verwenden
- Fehlerbehandlung implementieren

## Debugging

- Logging aktivieren
- Query Builder nutzen
- SQL-Ausgaben überprüfen

## Ressourcen

- [Offizielle Dokumentation](https://typeorm.io/)
- [GitHub Repository](https://github.com/typeorm/typeorm)
- [Beispiele](https://github.com/typeorm/typeorm/tree/master/sample)
