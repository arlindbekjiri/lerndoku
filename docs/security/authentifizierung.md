---
title: Authentifizierung
sidebar_position: 2
---

# Authentifizierung

Authentifizierung beantwortet die Frage: **Wer bist du?** Der Benutzer beweist, dass er der ist, für den er sich ausgibt, meistens mit Benutzername und Passwort. Davon abzugrenzen ist die Autorisierung, die fragt: **Was darfst du?**

### Hauptmerkmale

- Authentifizierung = Identität prüfen (wer bist du?)
- Autorisierung = Berechtigungen prüfen (was darfst du?)
- Passwörter werden niemals im Klartext gespeichert
- Häufige Verfahren: Sessions, JWT, OAuth
- Zusätzliche Sicherheit durch 2FA

## Authentifizierung vs. Autorisierung

Diese beiden Begriffe werden oft verwechselt.

```plaintext
Authentifizierung   "Bist du wirklich Arlind?"      -> Login mit Passwort
Autorisierung       "Darf Arlind diese Seite sehen?" -> Rollen und Rechte prüfen
```

Zuerst kommt immer die Authentifizierung, danach die Autorisierung.

## Passwörter sicher speichern

Passwörter dürfen **nie** im Klartext gespeichert werden. Stattdessen speichert man einen **Hash** des Passworts. Ein Hash lässt sich nicht zurückrechnen.

### Hashing mit bcrypt

```bash
npm install bcrypt
```

```typescript
import * as bcrypt from "bcrypt";

// Beim Registrieren: Passwort hashen
const passwort = "geheim123";
const hash = await bcrypt.hash(passwort, 10); // 10 = Cost-Faktor (Anzahl Runden)

// Beim Login: Passwort mit Hash vergleichen
const stimmt = await bcrypt.compare("geheim123", hash); // true
```

### Salt

Ein **Salt** ist ein zufälliger Wert, der vor dem Hashen ans Passwort gehängt wird. Dadurch ergeben gleiche Passwörter unterschiedliche Hashes, und vorberechnete Tabellen (Rainbow Tables) funktionieren nicht. bcrypt erzeugt den Salt automatisch.

## Sessions

Bei der Session-basierten Authentifizierung merkt sich der Server, wer eingeloggt ist.

```plaintext
1. Benutzer loggt sich ein.
2. Server erstellt eine Session und speichert sie (z. B. im Speicher oder einer DB).
3. Server schickt eine Session-ID als Cookie zurück.
4. Bei jeder Anfrage schickt der Browser das Cookie mit.
5. Server prüft die Session-ID und weiss, wer der Benutzer ist.
```

Der Zustand liegt also auf dem **Server** (stateful).

## JWT (JSON Web Token)

Ein JWT ist ein Token, das alle nötigen Infos selbst enthält. Der Server muss sich nichts merken (stateless). Das ist heute der Standard für APIs.

### Aufbau eines JWT

Ein JWT besteht aus drei Teilen, getrennt durch Punkte:

```plaintext
xxxxx.yyyyy.zzzzz

Header     -> Algorithmus und Typ
Payload    -> die Daten (z. B. userId, Rolle) - NICHT verschlüsselt!
Signature  -> Unterschrift, die das Token vor Manipulation schützt
```

Wichtig: Die Payload ist nur kodiert, **nicht verschlüsselt**. Man darf dort keine Passwörter oder Geheimnisse reinschreiben.

### Ablauf

```plaintext
1. Benutzer loggt sich ein.
2. Server erstellt ein JWT, signiert es mit einem geheimen Schlüssel.
3. Server schickt das JWT an den Client.
4. Client speichert das JWT und schickt es bei jeder Anfrage im Header mit:
   Authorization: Bearer <token>
5. Server prüft die Signatur und vertraut dem Token.
```

### JWT erstellen und prüfen

```bash
npm install jsonwebtoken
```

```typescript
import * as jwt from "jsonwebtoken";

const SECRET = "mein-geheimer-schluessel";

// Token erstellen (z. B. nach erfolgreichem Login)
const token = jwt.sign({ userId: 1, rolle: "admin" }, SECRET, {
  expiresIn: "1h", // läuft nach einer Stunde ab
});

// Token prüfen (bei einer geschützten Anfrage)
try {
  const daten = jwt.verify(token, SECRET);
  console.log(daten); // { userId: 1, rolle: "admin", ... }
} catch (err) {
  console.log("Token ungültig oder abgelaufen");
}
```

## Beispiel in NestJS

In NestJS schützt man Routen typischerweise mit einem Guard, der das JWT prüft.

```bash
npm install @nestjs/jwt
```

```typescript
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(" ")[1]; // "Bearer xxx"

    if (!token) throw new UnauthorizedException("Kein Token");

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload; // Benutzer an den Request hängen
      return true;
    } catch {
      throw new UnauthorizedException("Ungültiges Token");
    }
  }
}
```

```typescript
// Route schützen
@UseGuards(AuthGuard)
@Get("profil")
getProfil(@Request() req) {
  return req.user;
}
```

## OAuth

OAuth ermöglicht das Einloggen über einen externen Anbieter wie Google, GitHub oder Apple ("Login with Google"). Der Benutzer muss kein neues Passwort anlegen, und die App bekommt das Passwort nie zu sehen.

```plaintext
1. Benutzer klickt auf "Login with Google".
2. Er wird zu Google weitergeleitet und loggt sich dort ein.
3. Google schickt ihn mit einem Code zurück zur App.
4. Die App tauscht den Code bei Google gegen ein Access Token.
5. Mit dem Token kann die App die Benutzerdaten von Google abfragen.
```

## Zwei-Faktor-Authentifizierung (2FA)

Bei 2FA braucht man zusätzlich zum Passwort einen zweiten Nachweis. Das macht ein gestohlenes Passwort allein wertlos.

```plaintext
Faktor 1  Wissen   -> Passwort
Faktor 2  Besitz   -> Code aus einer App (z. B. Google Authenticator) oder SMS
          Inhärenz -> Fingerabdruck, Gesicht
```

## Best Practices

- Passwörter immer hashen (bcrypt), nie im Klartext speichern
- JWT-Secret geheim halten und nicht ins Repository committen
- Tokens mit Ablaufzeit (`expiresIn`) versehen
- HTTPS verwenden, damit Tokens nicht abgefangen werden
- Keine sensiblen Daten in die JWT-Payload schreiben
- Wo möglich 2FA anbieten

## Häufige Fehler

```typescript
// Passwort im Klartext speichern
const user = { name: "Arlind", passwort: "geheim123" };

// Besser: Hash speichern
const user = { name: "Arlind", passwort: await bcrypt.hash("geheim123", 10) };

// Secret hart im Code (und im Repo)
const token = jwt.sign(daten, "1234");

// Besser: aus Umgebungsvariable laden
const token = jwt.sign(daten, process.env.JWT_SECRET);

// Token ohne Ablaufzeit
jwt.sign({ userId: 1 }, SECRET);

// Besser mit Ablaufzeit
jwt.sign({ userId: 1 }, SECRET, { expiresIn: "1h" });
```

## Ressourcen

- [JWT Einführung (jwt.io)](https://jwt.io/introduction)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [NestJS Authentication](https://docs.nestjs.com/security/authentication)
- [bcrypt auf npm](https://www.npmjs.com/package/bcrypt)
