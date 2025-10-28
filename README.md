# 📝 ToDoList Frontend - Angular 18

[![Angular CI/CD](https://github.com/yourusername/todolist-frontend-angular/workflows/Angular%20CI/CD/badge.svg)](https://github.com/yourusername/todolist-frontend-angular/actions)
[![Angular Version](https://img.shields.io/badge/Angular-18.0+-red.svg)](https://angular.io)
[![Node Version](https://img.shields.io/badge/Node-18+-green.svg)](https://nodejs.org)

## 🎯 Description

Frontend de l'application ToDoList développé avec **Angular 18** dans le cadre d'un projet DevOps. Cette Single Page Application (SPA) consomme l'API Laravel pour fournir une interface utilisateur moderne et responsive.

## 🚀 Fonctionnalités

- ✅ **Interface moderne** et responsive
- ✅ **Composants Angular** (TaskList, TaskForm)
- ✅ **Service HTTP** pour consommer l'API Laravel
- ✅ **Tests unitaires** avec Jasmine/Karma
- ✅ **Gestion d'état** réactive avec RxJS
- ✅ **CI/CD** avec GitHub Actions
- ✅ **Déploiement** sur GitHub Pages

## 🧩 Composants

### TaskListComponent
- Affiche la liste des tâches
- Gestion des tâches terminées/en attente
- Actions : basculer l'état, supprimer

### TaskFormComponent
- Formulaire d'ajout de nouvelles tâches
- Validation côté client
- Soumission par Enter ou bouton

### TaskService
- Service HTTP pour communiquer avec l'API Laravel
- Méthodes CRUD complètes
- Gestion des erreurs

## 🛠️ Installation locale

```bash
# Cloner le repository
git clone https://github.com/yourusername/todolist-frontend-angular.git
cd todolist-frontend-angular

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start
```

L'application sera disponible sur `http://localhost:4200`

## 🧪 Tests

```bash
npm test
```

## 🚀 CI/CD avec GitHub Actions

Le projet inclut un workflow GitHub Actions complet :
- ✅ **Tests automatisés** avec Jasmine/Karma
- ✅ **Build** de l'application Angular
- ✅ **Déploiement** sur GitHub Pages

## 🌐 Déploiement

### GitHub Pages
Le déploiement sur GitHub Pages est automatique via GitHub Actions :

1. Le workflow se déclenche sur push vers `main`
2. Les tests sont exécutés
3. L'application est buildée
4. Elle est déployée sur GitHub Pages

**URL de déploiement** : `https://yourusername.github.io/todolist-frontend-angular`

## 📄 Licence

Ce projet est sous licence MIT.