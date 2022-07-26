# MaximeNicolau_7_200222

Septième et dernier projet du parcours Développeur Web d'Open Classrooms. 
Groupomania est un réseau social créé avec React et Material UI pour le frontend, et NodeJS et Express pour le backend.
Une base de données SQL est utilisée. 

# Compétences évaluées:

- Authentifier un utilisateur et maintenir sa session
- Implémenter un stockage de données sécurisé en utilisant une base de données
- Développer l’interface d’un site web grâce à un framework front-end

# Prérequis: 

- Installer Node.js
- Installer MySQL

# Mode d'emploi : 

Clonez le repo.

## MYSQL :

Connectez-vous à mysql et créez une database groupomania. ```CREATE DATABASE groupomania;```

Utilisez-là. ```USE groupomania;```

Importez le fichier groupomania.sql présent dans le dossier back.

Ouvrez le fichier .env situé dans le dossier back. Entrez un mot de passe pour le TOKEN (qui servira de clé pour le jsonwebtoken), votre nom d'utilisateur mysql pour SQL_USER, votre mot de passe mysql
pour SQL_PW, et le nom de la database dans SQL_DB.

## Backend: 

Ouvrir le dossier back dans votre terminal. Puis éxécutez ```npm install``` 
Exécutez ensuite ```nodemon server``` ou ```npm start```.

## Frontend :

Ouvrir le dossier front dans votre terminal. Puis exécutez ```npm install```
Exécutez ```npm start``` Si le navigateur n'ouvre pas la page, allez sur http://localhost:3001/




