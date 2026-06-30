---
title: Capacitor
sidebar_position: 7
---

# Capacitor

Capacitor ist ein Open-Source-Tool, mit dem man Web-Apps relativ einfach in echte native Mobile-Apps verwandeln kann – für iOS, Android und sogar den Desktop.

### Hauptmerkmale

- Cross-Platform (iOS, Android, Web)
- Native Gerätefunktionen
- Einfache Integration in bestehende Web-Projekte
- Plugin-System für erweiterte Funktionalität

## Installation

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
```

## Grundlegende Konfiguration

1. **capacitor.config.ts**:

```typescript
import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "My App",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
```

## Plattformen hinzufügen

```bash
# Android
npx cap add android

# iOS
npx cap add ios
```

## Native Funktionen nutzen

Beispiel für Kamera-Zugriff:

```typescript
import { Camera } from "@capacitor/camera";

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: "uri",
  });
};
```

## Häufige Plugins

- @capacitor/camera
- @capacitor/geolocation
- @capacitor/storage
- @capacitor/filesystem

## Best Practices

- Regelmäßige Updates der Plattformen
- Fehlerbehandlung implementieren
- Performance-Optimierung
- Sicherheitsaspekte beachten

## Debugging

- Chrome DevTools für Android
- Safari Web Inspector für iOS
- Capacitor DevTools

## Deployment

1. Build der Web-App
2. Kopieren der Assets
3. Öffnen der nativen Projekte
4. Build und Signing

## Ressourcen

- [Offizielle Dokumentation](https://capacitorjs.com/docs)
- [GitHub Repository](https://github.com/ionic-team/capacitor)
- [Community Forum](https://forum.ionicframework.com/)
