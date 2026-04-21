# 🎬 Kinnect

> Rent · Watch · Connect — a social movie rental platform

**Members:** Dylan Crawford, Khang Vy O, Vick Velumani, Gavin Carrick

---

## Project Structure

```
kinnect/          ← React frontend (Create React App)
kinnect-server/   ← Node.js + Express API
```

---

## Quick Start

### 1. Frontend

```bash
cd kinnect
npm install
npm start          # runs on http://localhost:3000
```

**Demo login:** any email + password ≥ 6 chars  
**Moderator access:** use an email starting with `admin@`

---

### 2. Backend

```bash
cd kinnect-server
npm install

# Set up environment
cp .env.example .env
# Edit .env — fill in DB credentials, JWT_SECRET, etc.

npm run dev        # runs on http://localhost:4000
```

#### Set up PostgreSQL

```bash
# Create the database
createdb kinnect

# Run the schema
psql -d kinnect -f src/db/schema.sql
```

---

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | — | Create account |
| POST | `/api/auth/login` | — | Sign in, get JWT |
| GET | `/api/auth/me` | ✓ | Current user |
| GET | `/api/movies` | — | Browse catalog |
| GET | `/api/movies/:id` | — | Movie detail |
| POST | `/api/movies` | Mod | Add movie |
| PUT | `/api/movies/:id` | Mod | Edit movie |
| DELETE | `/api/movies/:id` | Mod | Delete movie |
| GET | `/api/rentals` | ✓ | My rentals |
| POST | `/api/rentals` | ✓ | Rent a movie |
| POST | `/api/rentals/:id/return` | ✓ | Return rental |
| GET | `/api/parties` | ✓ | Active parties |
| POST | `/api/parties` | ✓ | Create party |
| POST | `/api/parties/:id/join` | ✓ | Join party |
| PATCH | `/api/parties/:id/status` | ✓ Host | Update status |

**Auth header:** `Authorization: Bearer <token>`

---

## Frontend Pages

| Route | Page | Auth |
|-------|------|------|
| `/` | Landing page | — |
| `/login` | Sign in | — |
| `/register` | Create account | — |
| `/browse` | Movie catalog | — |
| `/movie/:id` | Movie detail + rent | — |
| `/rentals` | My rentals | ✓ |
| `/watch-party` | Watch Party | ✓ |
| `/admin` | Moderator panel | Mod only |

---

## Database Schema

```
users       — user_id, name, email, password_hash, role
genres      — genre_id, name
movies      — movie_id, title, genre_id, director, year, stock_count, ...
rentals     — rental_id, user_id, movie_id, rented_at, expiry_date, returned_at
parties     — party_id, host_id, movie_id, status
party_members — party_id, user_id
```

---

## Milestones

### Milestone 1 (current)
- [x] React frontend — login, register, browse, movie detail
- [x] Express API — auth, movies CRUD, rentals, parties
- [x] PostgreSQL schema with all 4 core tables
- [ ] Connect frontend to real API (swap mock data)
- [ ] AWS RDS setup

### Milestone 2
- [ ] Full rental system (frontend ↔ backend)
- [ ] Recommendation engine (content-based filtering)
- [ ] Watch Party with WebSocket live sync + chat
- [ ] Admin panel UI for moderators
- [ ] AWS S3 for poster images
- [ ] Deployment

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router 6 |
| Backend | Node.js, Express 4 |
| Database | PostgreSQL (AWS RDS) |
| Auth | JWT + bcrypt |
| Storage | AWS S3 |
| Hosting | AWS (TBD) |
