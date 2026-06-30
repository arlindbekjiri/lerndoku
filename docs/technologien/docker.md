---
title: Docker
sidebar_position: 8
---

# Docker

Docker ist eine Plattform, mit der man Anwendungen in sogenannten Containern entwickeln, bereitstellen und ausführen kann. Die Container sind einfach, schnell und unabhängig vom System, auf dem sie laufen.

### Hauptmerkmale

- Containerisierung
- Portabilität
- Skalierbarkeit
- Ressourceneffizienz
- Isolierung
- Reproduzierbarkeit

## Installation

### Windows

1. [Docker Desktop für Windows](https://www.docker.com/products/docker-desktop) herunterladen
2. Installationsassistent ausführen
3. Nach der Installation neu starten

### macOS

1. [Docker Desktop für Mac](https://www.docker.com/products/docker-desktop) herunterladen
2. Installationsassistent ausführen
3. Docker.app starten

### Linux

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

# Fedora
sudo dnf install docker-ce docker-ce-cli containerd.io
```

## Grundlegende Konzepte

### Images

- Basis für Container
- Werden aus Dockerfiles erstellt
- Können in Registries geteilt werden

### Container

- Laufende Instanz eines Images
- Isolierte Umgebung
- Eigene Dateisysteme und Netzwerke

### Dockerfile

- Textdatei mit Anweisungen
- Definiert den Build-Prozess
- Bestimmt die Container-Umgebung

## Erste Schritte

### Image erstellen

```dockerfile
# Dockerfile
FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Image bauen

```bash
docker build -t meine-app .
```

### Container starten

```bash
docker run -p 3000:3000 meine-app
```

## Häufige Befehle

### Images verwalten

```bash
# Images auflisten
docker images

# Image herunterladen
docker pull nginx

# Image löschen
docker rmi nginx
```

### Container verwalten

```bash
# Laufende Container anzeigen
docker ps

# Alle Container anzeigen
docker ps -a

# Container starten/stoppen
docker start container_id
docker stop container_id

# Container löschen
docker rm container_id
```

### Logs und Status

```bash
# Logs anzeigen
docker logs container_id

# Container-Status
docker stats
```

## Docker Compose

### docker-compose.yml

```yaml
version: "3"
services:
  web:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    depends_on:
      - db
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: example
```

### Compose-Befehle

```bash
# Services starten
docker-compose up

# Im Hintergrund starten
docker-compose up -d

# Services stoppen
docker-compose down
```

## Volumes

### Volume erstellen

```bash
docker volume create mein-volume
```

### Volume mounten

```bash
docker run -v mein-volume:/data nginx
```

## Netzwerke

### Netzwerk erstellen

```bash
docker network create mein-netzwerk
```

### Container im Netzwerk

```bash
docker run --network mein-netzwerk nginx
```

## Best Practices

### Image-Optimierung

- Kleine Basis-Images verwenden
- Multi-Stage Builds nutzen
- Unnötige Layer vermeiden
- .dockerignore verwenden

### Sicherheit

- Nicht als root laufen
- Regelmäßige Updates
- Minimale Berechtigungen
- Secrets sicher handhaben

### Performance

- Caching nutzen
- Ressourcenlimits setzen
- Effiziente Layer-Struktur
- Gesundheitschecks implementieren

## Debugging

### Container untersuchen

```bash
# Shell im Container öffnen
docker exec -it container_id sh

# Container-Details
docker inspect container_id
```

### Logs analysieren

```bash
# Logs filtern
docker logs container_id | grep error

# Logs in Echtzeit
docker logs -f container_id
```

## Deployment

### Image taggen

```bash
docker tag meine-app:latest registry.example.com/meine-app:1.0
```

### Image pushen

```bash
docker push registry.example.com/meine-app:1.0
```

## Ressourcen

- [Offizielle Dokumentation](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Dockerfile Referenz](https://docs.docker.com/engine/reference/builder/)
- [Docker Compose Referenz](https://docs.docker.com/compose/compose-file/)

## Cheatsheet

### Container Management

```bash
# Container starten
docker start <container_id>

# Container stoppen
docker stop <container_id>

# Container neu starten
docker restart <container_id>

# Container löschen
docker rm <container_id>

# Alle gestoppten Container löschen
docker container prune

# Container im Hintergrund starten
docker run -d <image>

# Container mit interaktivem Terminal
docker run -it <image> /bin/bash

# Container mit Port-Mapping
docker run -p 8080:80 <image>

# Container mit Volume
docker run -v /host/path:/container/path <image>
```

### Image Management

```bash
# Images auflisten
docker images

# Image herunterladen
docker pull <image>

# Image löschen
docker rmi <image>

# Alle ungenutzten Images löschen
docker image prune

# Image aus Dockerfile bauen
docker build -t <name> .

# Image taggen
docker tag <image> <new_tag>

# Image pushen
docker push <image>
```

### Docker Compose

```bash
# Services starten
docker-compose up

# Services im Hintergrund
docker-compose up -d

# Services stoppen
docker-compose down

# Services neu bauen
docker-compose build

# Logs anzeigen
docker-compose logs

# Spezifischen Service starten
docker-compose up <service>
```

### Netzwerke

```bash
# Netzwerke auflisten
docker network ls

# Netzwerk erstellen
docker network create <name>

# Container im Netzwerk
docker run --network <network> <image>

# Netzwerk-Details
docker network inspect <network>
```

### Volumes

```bash
# Volumes auflisten
docker volume ls

# Volume erstellen
docker volume create <name>

# Volume mounten
docker run -v <volume>:/path <image>

# Volume löschen
docker volume rm <volume>
```

### Logs & Monitoring

```bash
# Container-Logs
docker logs <container_id>

# Logs in Echtzeit
docker logs -f <container_id>

# Container-Status
docker stats

# Container-Details
docker inspect <container_id>

# Prozesse im Container
docker top <container_id>
```

### Dockerfile Befehle

```dockerfile
FROM        # Basis-Image
WORKDIR     # Arbeitsverzeichnis
COPY        # Dateien kopieren
ADD         # Dateien hinzufügen (mit URL/Archive)
RUN         # Befehle ausführen
CMD         # Standard-Befehl
ENTRYPOINT  # Container-Startbefehl
ENV         # Umgebungsvariablen
ARG         # Build-Argumente
EXPOSE      # Ports freigeben
VOLUME      # Volume definieren
```

### Häufige Kombinationen

```bash
# Entwicklung mit Hot-Reload
docker run -v $(pwd):/app -p 3000:3000 <image>

# Datenbank mit persistenter Daten
docker run -v db_data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret postgres

# Multi-Container App
docker-compose up -d

# Shell in laufendem Container
docker exec -it <container_id> /bin/bash

# Container mit Ressourcenlimits
docker run --memory="1g" --cpus="1" <image>
```

### Troubleshooting

```bash
# Container-Logs filtern
docker logs <container_id> | grep error

# Container-Status prüfen
docker ps -a

# Netzwerk-Verbindungen testen
docker exec <container_id> ping <host>

# Speicherplatz bereinigen
docker system prune -a
```

## Workshop

Als Teil meiner Lehrzeit habe ich einen **Docker Workshop** für Entwickler konzipiert und durchgeführt. Ziel war es, Docker-Grundlagen praxisnah und verständlich zu vermitteln.

### Inhalt des Workshops

- Container vs. VM — Grundkonzepte
- Images, Container, Registries
- Dockerfile schreiben & Images bauen
- Docker Compose für Multi-Container-Apps
- 3 Hands-on Übungen mit eigenem Setup

### Materialien

Die Workshop-Materialien (Präsentation, Übungen, Cheatsheet) sind öffentlich verfügbar:

**[Docker Workshop Materialien](https://www.arlindbekjiri.com/docker-workshop)**

> Dieser Workshop wurde für Einsteiger ohne Docker-Vorkenntnisse konzipiert und umfasst ca. 1.5–2 Stunden mit praktischen Übungen.
