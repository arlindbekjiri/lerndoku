# NestJS

NestJS ist ein Framework für serverseitige Node.js-Anwendungen. Es basiert auf TypeScript und kombiniert Konzepte aus Angular, Express und objektorientierten Designmustern.

### Hauptmerkmale

- TypeScript Unterstützung
- Modulare Architektur
- Dependency Injection
- Decorator-basiert
- REST, GraphQL, WebSockets
- Integration mit TypeORM

## Installation

```bash
npm install -g @nestjs/cli
nest new mein-projekt
cd mein-projekt
npm run start:dev
```

## Projektstruktur

```plaintext
src/
├── app.module.ts
├── app.controller.ts
├── app.service.ts
└── main.ts
```

## Module

Module gruppieren zusammengehörige Teile der Applikation.

```typescript
import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

## Controller

Controller nehmen HTTP-Anfragen entgegen und geben Antworten zurück.

```typescript
import { Controller, Get, Post, Body, Param, Delete, Put } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
```

## Services

Services enthalten die Geschäftslogik. Controller rufen Services auf.

```typescript
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UsersService {
  private users = [{ id: 1, name: "Arlind", email: "arlind@bekjiri.ch" }];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException(`User ${id} nicht gefunden`);
    return user;
  }

  create(dto: CreateUserDto) {
    const user = { id: Date.now(), ...dto };
    this.users.push(user);
    return user;
  }

  update(id: number, dto: UpdateUserDto) {
    const user = this.findOne(id);
    Object.assign(user, dto);
    return user;
  }

  remove(id: number) {
    const index = this.users.findIndex((u) => u.id === id);
    this.users.splice(index, 1);
  }
}
```

## DTOs

DTOs definieren die Form der Daten die rein- und rauskommen.

```typescript
export class CreateUserDto {
  name: string;
  email: string;
  age: number;
}

export class UpdateUserDto {
  name?: string;
  email?: string;
  age?: number;
}
```

### Validation mit class-validator

```bash
npm install class-validator class-transformer
```

```typescript
import { IsString, IsEmail, IsInt, Min } from "class-validator";

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsInt()
  @Min(0)
  age: number;
}
```

In `main.ts` die globale Validierung aktivieren:

```typescript
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
```

## Mit TypeORM kombinieren

```bash
npm install @nestjs/typeorm typeorm pg
```

```typescript
// app.module.ts
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "passwort",
      database: "meine_app",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
```

### Entity definieren

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
}
```

### Repository im Service verwenden

```typescript
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  create(dto: CreateUserDto) {
    const user = this.usersRepository.create(dto);
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }
}
```

## Ressourcen mit CLI generieren

```bash
nest generate module users
nest generate controller users
nest generate service users
nest generate resource users
```

## Guards

```typescript
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.headers.authorization === "mein-token";
  }
}

@UseGuards(AuthGuard)
@Get("geschuetzt")
geschuetzt() {
  return "Nur mit Token erreichbar";
}
```

## Pipes

```typescript
@Get(":id")
findOne(@Param("id", ParseIntPipe) id: number) {
  return this.usersService.findOne(id);
}
```

## Interceptors

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    return next.handle().pipe(
      tap(() => console.log(`Request dauerte ${Date.now() - start}ms`))
    );
  }
}
```

## Exceptions

```typescript
import {
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";

throw new NotFoundException("User nicht gefunden");
throw new BadRequestException("Ungültige Eingabe");
throw new UnauthorizedException("Nicht eingeloggt");
throw new ForbiddenException("Keine Berechtigung");
```

## Best Practices

- Geschäftslogik in Services, nicht in Controllern
- DTOs für Ein- und Ausgaben verwenden
- `synchronize: true` nur in der Entwicklung, in Produktion Migrationen
- Module nach Feature aufteilen
- ValidationPipe global aktivieren

## Ressourcen

- [Offizielle Dokumentation](https://docs.nestjs.com/)
- [GitHub Repository](https://github.com/nestjs/nest)
- [NestJS mit TypeORM](https://docs.nestjs.com/recipes/sql-typeorm)
