# Mon École

Plateforme web + mobile de cours, exercices et corrections, du primaire à la fac.

## Stack

- **Web** : React + Vite + TypeScript + Tailwind CSS
- **Mobile** : React Native (Expo)
- **Backend** : NestJS (TypeScript) + Prisma
- **Base de données** : PostgreSQL
- **Monorepo** : npm workspaces + Turborepo

## Prérequis à installer

1. **Node.js 20 LTS** (indispensable, pas encore présent sur cette machine) — télécharger sur nodejs.org
2. **PostgreSQL** (local via Docker, ou un service managé type Supabase/Neon/Railway)
3. **Git**
4. (Mobile) **Expo Go** sur ton téléphone pour tester sans build natif

## Démarrage

```bash
# 1. Installer toutes les dépendances du monorepo
npm install

# 2. Configurer l'API
cp apps/api/.env.example apps/api/.env
# → remplir DATABASE_URL avec ta base PostgreSQL

# 3. Générer le client Prisma et créer les tables
npm run db:migrate

# 4. Charger les données de départ (cycles, niveaux, plans d'abonnement)
npm run --workspace=apps/api prisma:seed

# 5. Configurer le web
cp apps/web/.env.example apps/web/.env

# 6. Lancer tout en parallèle (web + api)
npm run dev
```

- Web : http://localhost:5173
- API : http://localhost:3000/api

Pour le mobile :

```bash
cd apps/mobile
npx expo install   # complète les dépendances natives manquantes
npm run dev
```

## Structure

```
apps/
  web/       → site React
  mobile/    → app Expo/React Native
  api/       → backend NestJS + Prisma
packages/
  shared-types/  → types TypeScript partagés
  api-client/    → client HTTP partagé (web + mobile)
```

## État d'avancement (Phase 1 : Fondations)

- [x] Schéma de base de données complet (hiérarchie pédagogique, exercices, abonnements, paiements)
- [x] Authentification JWT (register/login) + rôles (STUDENT, PARENT, TEACHER, ADMIN)
- [x] Endpoint catalogue (cycles → niveaux → matières → chapitres → leçons)
- [x] Logique d'accès freemium sur les leçons (`isFree` vs abonnement actif)
- [x] Squelette web (accueil, catalogue, connexion) et mobile (navigation de base)
- [ ] Module Exercices & Corrections (QCM auto-corrigé, upload, corrections)
- [ ] Module Abonnements & Paiements (CinetPay / Mobile Money)
- [ ] Back-office Admin
- [ ] Notifications (push + email)
- [ ] Mode hors-ligne mobile

Voir la roadmap complète discutée avec Claude pour le détail des phases suivantes.
