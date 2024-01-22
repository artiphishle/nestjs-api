# Nest.js API Design

Chapters 7-9 of the course [NestJS – The complete developers guide](https://www.udemy.com/course/nestjs-the-complete-developers-guide/).

## Project

### Description

This app allows users to estimate their car value and report on how much they sold their vehicles for. Yey: We're doing some user/admin authentication, here the workflow:

1. User signs up with email and password.
2. Users get an estimate for how much their car is worth based on the make/model/year/mileage.
3. Users can report what the sold their vehicles for.
4. Admins have to approve reported sales.

### API Endpoints

| Method | Route        | Body or Query String                                             | Description                        |
| ------ | ------------ | ---------------------------------------------------------------- | ---------------------------------- |
| POST   | /auth/signup | Body: { email, password }                                        | Create a new user and sign in      |
| POST   | /auth/signin | Body: { email, password }                                        | Signs in an existing user          |
| GET    | /reports     | Query String: make, model, year, mileage, longitude, latitude    | Get an estimate for the cars value |
| POST   | /reports     | Body: { make, model, year, mileage, longitude, latitude, price } | Report how much a vehicle sold for |
| PATCH  | /reports     | Body: { approved }                                               | Approve/Reject a report            |

### Project Structure

We're going to use two modules: UserModule & ReportsModule. Each module will have its own controllers, services and repositories:

| Controllers       | Services       | Repositories      |
| ----------------- | -------------- | ----------------- |
| UserController    | UsersService   | UsersRepository   |
| ReportsController | ReportsService | ReportsRepository |

Use Nest CLI to generate the project structure:

[Nest.js CLI Usage](https://docs.nestjs.com/cli/usages)

```bash
# Generate modules
nest g mo users
nest g mo reports

# Generate controllers
nest g co users
nest g co reports

# Generate services
nest g s users
nest g s reports
```

What about repositories? ...wait for it...

### TypeORM vs Mongoose

Nest works with any ORM, but out of the box it supports TypeORM and Mongoose. Depending on the database we're using, we'll use one or the other:

| Technology | Database                         |
| ---------- | -------------------------------- |
| TypeORM    | SQLite, Postgres, MySQL, MongoDB |
| Mongoose   | MongoDB                          |

#### TypeORM

```bash
# Install TypeORM
npm i @nestjs/typeorm typeorm sqlite3
```

##### Setup Database Connection

Add the following to `app.module.ts`:

```ts
@Module({
  imports: [
    TypeOrmModule.forRoot({
      database: 'db.sqlite',
      entities: [],
      synchronize: true,
      type: 'sqlite',
    }),
  ],
})
```

- Start the app with `npm run start:dev`.
- Seen the new file: `db.sqlite` in the root of your project?

#### Entities

Entities are classes that represent tables in our database. We'll create two entities: User and Report.

Create a `src/users/user.entity.ts` file:

```ts
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
// Naming convention: 'User' instad of 'UserEntity'
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
```

In the `users.module.ts` file, add the following to the `imports` array:

```ts
TypeOrmModule.forFeature([User]),
```

Now do the same for `src/reports/report.entity.ts` using the correct columns.

Great! Now in the `app.module.ts` file, add the following to the `imports` array:

```ts
TypeOrmModule.forRoot({
  database: 'db.sqlite',
  entities: [User, Report], // <-- Add this
  synchronize: true,
  type: 'sqlite',
}),
```
