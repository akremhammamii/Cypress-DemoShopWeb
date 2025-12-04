# 🛒 DemoWebShop Automation Framework
> **Cypress • TypeScript • Cucumber • Allure • Modern POM Architecture**

Un framework E2E complet, scalable, basé sur **Cypress + TypeScript + Cucumber**, optimisé pour les tests web, API, workflows complexes et reporting avancé.

Construit pour automatiser le site :  
👉 [https://demowebshop.tricentis.com](https://demowebshop.tricentis.com)

## 🚀 Fonctionnalités Principales

- 🔥 **Architecture POM moderne et modulaire**
- 📘 **BDD via Cucumber** avec des scénarios compréhensibles par le métier
- 🧪 **Tests UI + API** (login, register, cart, orders…)
- 📁 **Factories & Validators** (test data + validations JSON)
- 🧱 **Components Models** (Header, Footer, Navbar…)
- 🤖 **Custom retry & commands avancées**
- 🔐 **Dossiers Security & Regression**
- 📦 **Mocks / Intercepts** pour stabiliser les tests
- 📸 **Allure Report** avec screenshots + vidéos
- 🧷 **Dossier downloads** pour vérifier les fichiers téléchargés
- 🧩 **Séparation Steps / Hooks / Assertions**
- ⚙️ **CI/CD ready** (GitHub Actions / Jenkins)
- 🌍 **Cross-browser** : Chrome, Edge, Electron, Firefox

## 🛠️ Prérequis

- **Node.js** ≥ 16
- **npm** ≥ 8
- **Java** (pour Allure)
- *Facultatif : Git, Allure CLI*

## 📦 Installation

```bash
git clone https://github.com/akremhammamii/Cypress-DemoShopWeb.git
cd Cypress-DemoShopWeb
npm install
```

## 🏃 Exécuter les Tests

### � Mode interactif
```bash
npm run test:open
```

### 👉 Headless + Allure
```bash
npm test
```

### 🎯 Exécuter une suite spécifique
```bash
npm run test:smoke
npm run test:regression
npm run test:workflows
```

## 📊 Générer et Ouvrir le Rapport Allure

```bash
npm run report
```

**Fonctionnalités du rapport :**
- 🔎 Screenshots, vidéos attachées automatiquement
- 🏷️ Catégories (Timeouts, Product defects…)
- 📈 Historique et tendances
- 👁️ Steps détaillés + logs réseau

## 📂 Structure du Projet

```
cypress/
├── api/                     # API services + models
│   ├── models/              # Request / response interfaces
│   └── services/            # API calls (login, register…)
│
├── downloads/               # Fichiers téléchargés
│
├── e2e/
│   ├── features/            # Scénarios Cucumber
│   ├── regression/          # Suite regression
│   ├── security/            # Tests sécurité
│   └── workflows/           # Scénarios E2E complets
│
├── fixtures/                # Données statiques
│
├── mocks/                   # Interceptions & stubs
│
├── page-objects/
│   ├── pages/               # Pages POM complètes
│   ├── components/          # Header, footer, mini-cart, menu…
│   ├── factories/           # Génération de données dynamiques
│   ├── validators/          # Validations UI + API
│   └── utils/               # Helpers + commons
│
├── support/
│   ├── assertions/          # Assertions custom (ex: expectLoginSuccess)
│   ├── commands/            # Commands Cypress personnalisées
│   ├── hooks/               # before, after, beforeEach…
│   ├── step-definitions/    # Steps Cucumber
│   ├── allure-config/       # Paramétrage allure
│   └── e2e.ts               # Entrée globale Cypress
│
reports/
├── allure-results/          # Résultats bruts
├── allure-report/           # Rapport final
│
cypress.config.ts
package.json
```

## 🧩 Scripts Disponibles

```json
"scripts": {
  "test:open": "cypress open",
  "test": "cypress run",
  "report": "allure generate ./allure-results --clean && allure open",
  "test:smoke": "cypress run --env suite=smoke",
  "test:regression": "cypress run --env suite=regression",
  "test:workflows": "cypress run --env suite=workflows"
}
```

## 🤝 Contribuer

1. **Fork** le repo
2. Crée une branche :
   ```bash
   git checkout -b feature/ma-feature
   ```
3. Commit :
   ```bash
   git commit -m "Nouvelle fonctionnalité"
   ```
4. Push :
   ```bash
   git push origin feature/ma-feature
   ```
5. Ouvre une **Pull Request**

## ⭐ Support

Si vous aimez ce framework, n’hésitez pas à mettre une étoile ⭐ sur GitHub !
