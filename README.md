# 🛒 DemoWebShop – Cypress Automation Framework

Framework complet d’automatisation End-to-End pour le site  
👉 [https://demowebshop.tricentis.com/](https://demowebshop.tricentis.com/)

Développé avec **Cypress + TypeScript + Cucumber + POM**.

## 🚀 Fonctionnalités

- 🧩 **Architecture POM** (pages, composants, modèles)
- 🥒 **Cucumber BDD** (scénarios .feature)
- 📑 **Séparation claire des suites** : smoke, regression, workflows, security…
- 📊 **Allure Reports** (screenshots, vidéos, steps, logs)
- 🔁 **Retry intelligent** pour éviter les tests flaky
- 🔐 **API helpers** (login, register via backend)
- 🌐 **Cross-browser** (Chrome, Edge, Firefox)
- ⚙️ **CI/CD ready** (GitHub Actions)
- 🧪 **Mock API** (cy.intercept())

## 📦 Installation

```bash
git clone https://github.com/akremhammamii/demowebshop-automation.git
cd demowebshop-automation
npm install
```

## 🏃‍♂️ Exécuter les tests

### ▶ Mode interactif (Cypress GUI)
```bash
npx cypress open
```

### 🤖 Mode headless (CI)
```bash
npm test
```

### 🎯 Suites spécifiques
```bash
npm run test:smoke
npm run test:regression
npm run test:workflows
```

## 📊 Rapport Allure

Générer & ouvrir le rapport :
```bash
npm run report
```

**Contient :**
- Steps détaillés
- Screenshots
- Vidéos
- Historique des exécutions

## 📁 Structure du projet

```
demowebshop-automation/
│
├── cypress/
│   ├── e2e/
│   │   ├── smoke/
│   │   ├── regression/
│   │   ├── security/
│   │   ├── accessibility/
│   │   ├── performance/
│   │   ├── workflows/
│   │   └── features/            # Cucumber .feature files
│   │
│   ├── page-objects/
│   │   ├── pages/               # LoginPage, RegisterPage...
│   │   ├── components/          # Header, Footer...
│   │   ├── api/                 # API services
│   │   └── models/              # Interfaces TS
│   │
│   ├── fixtures/
│   │   ├── data/                # JSON data
│   │   ├── factories/           # Fake data
│   │   └── validators/          # Data validation
│   │
│   ├── support/
│   │   ├── commands/            # Custom commands
│   │   ├── hooks/               # Cucumber hooks
│   │   ├── assertions/          # Custom assertions
│   │   ├── interceptors/        # cy.intercept()
│   │   ├── selectors/           # Central selectors
│   │   ├── logger/              # Logs
│   │   └── retry/               # Retry helpers
│   │
│   ├── downloads/               # Downloaded files
│   └── steps/                   # Step definitions
│
├── reports/                     # Allure, screenshots, videos
├── scripts/                     # Utilities (setup, report, seed)
│
├── cypress.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🤝 Contribution

1. **Fork** le projet
2. Crée une branche :
   ```bash
   git checkout -b feature/new-feature
   ```
3. Commit :
   ```bash
   git commit -m "New feature"
   ```
4. Push :
   ```bash
   git push origin feature/new-feature
   ```
5. Ouvre une **Pull Request**

## 📧 Contact

**Développé par Akrem Hammami**  
💼 QA Automation Engineer  
📬 Disponible sur LinkedIn
