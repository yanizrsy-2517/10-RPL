# Webyani - Portfolio Japanese Ocean (React + Laravel)

## Backend (Laravel)
- [x] Create Sanctum-auth API routes: /api/login, /api/logout, /api/contact, /api/messages
- [x] Create ContactMessage model + migration (contact_messages)
- [x] Add temporary debug route GET /api/debug/users
- [x] Seed admin user via TestAdminSeeder
- [ ] (optional later) Remove debug route

## Frontend (React)
- [ ] Rebuild SPA structure with React Router DOM
- [ ] Create components: Navbar, Hero, About, Services, Contact, Login, Footer
- [ ] Create pages: Home, LoginPage, Dashboard
- [ ] Theme: deep ocean blue + sakura pink accents + sea foam + ivory
- [ ] Animations: wave hero (SVG/CSS), sakura falling (canvas), scroll reveal (Framer Motion)
- [ ] Contact form: React Hook Form + POST /api/contact
- [ ] Login: React Hook Form + POST /api/login, store token, logout
- [ ] Dashboard: GET /api/messages (protected) with token

## Dev / Testing
- [ ] Run migrations + seed (backend)
- [ ] npm install in /fronted-react
- [ ] npm run dev and test flows

