 # Rapport de test — Jeu du Pendu (JavaScript)

## 1. Contexte

Application testée : Jeu du Pendu (JS/HTML/CSS)
Fichier testé : script.js (logique du jeu)
Testeur : Sofian Chairi
Date : 19/08/2026
Environnement : Navigateur (Chrome/Firefox), via le DOM (game-form, le-mot-à-trouver, essais-restants, lettres-essayees)
Type de test : Test fonctionnel manuel (boîte noire)

## 2. Objectif

Vérifier que le jeu du pendu se comporte conformément au comportement attendu : sélection du mot, saisie des lettres, gestion des essais, affichage, conditions de victoire/défaite.

## 3. Périmètre

Inclus dans les tests :
- Démarrage d'une partie (startGame)
- Validation de la saisie utilisateur
- Détection lettre correcte / incorrecte
- Décompte des essais
- Affichage du mot, des essais restants et des lettres essayées (fausses)
- Conditions de fin de partie (victoire / défaite)

Exclus (hors périmètre — non visible dans le fichier fourni) :
- Le fichier HTML/CSS (mise en page, accessibilité)
- Un éventuel bouton "Rejouer" (non présent dans script.js)

## 4. Stratégie de test

- Tests aux limites (0 essai restant, dernière lettre à trouver)
- Tests de valeurs invalides (chaîne vide, plusieurs caractères, chiffres/symboles)
- Tests d'équivalence (lettre présente / absente du mot)
- Tests de non-régression sur les cas particuliers (mots avec accents, espaces, tirets)

## 5. Cas de test

### TC01 — Démarrage d'une partie
Préconditions : Page chargée
Étapes : Charger la page
Résultat attendu : Un mot est choisi aléatoirement, triesLeft = 10, le mot s'affiche en "_" (sauf caractères non-lettres déjà révélés)
Résultat obtenu :
Statut :

### TC02 — Saisie vide
Préconditions : Partie en cours
Étapes : Soumettre le formulaire sans rien saisir
Résultat attendu : Message "La lettre invalide", triesLeft inchangé
Résultat obtenu :
Statut :

### TC03 — Saisie de plusieurs caractères
Préconditions : Partie en cours
Étapes : Saisir "AB" et valider
Résultat attendu : Message "La lettre invalide" (longueur ≠ 1)
Résultat obtenu :
Statut :

### TC04 — Saisie d'un chiffre
Préconditions : Partie en cours
Étapes : Saisir "5" et valider
Résultat attendu : Message "La lettre invalide" (isLetter renvoie faux)
Résultat obtenu :
Statut :

### TC05 — Saisie d'un caractère spécial
Préconditions : Partie en cours
Étapes : Saisir "@" et valider
Résultat attendu : Message "La lettre invalide"
Résultat obtenu :
Statut :

### TC06 — Lettre correcte
Préconditions : Le mot mystère contient la lettre saisie
Étapes : Saisir une lettre présente dans le mot
Résultat attendu : Message "La lettre X est dans le mot", la lettre apparaît dans l'affichage du mot, triesLeft inchangé
Résultat obtenu :
Statut :

### TC07 — Lettre incorrecte
Préconditions : Le mot mystère ne contient pas la lettre saisie
Étapes : Saisir une lettre absente du mot
Résultat attendu : triesLeft décrémenté de 1, message avec le nombre d'essais restants, la lettre s'ajoute aux "lettres essayées (fausses)"
Résultat obtenu :
Statut :

### TC08 — Lettre déjà proposée
Préconditions : Une lettre a déjà été soumise
Étapes : Resoumettre la même lettre
Résultat attendu : Message "La lettre X a déjà été proposé ! Boulet ♥", triesLeft inchangé, la lettre n'est pas comptée deux fois
Résultat obtenu :
Statut :

### TC09 — Insensibilité à la casse
Préconditions : Partie en cours
Étapes : Saisir une lettre en minuscule
Résultat attendu : La lettre est convertie en majuscule et traitée normalement (userInput.value.toUpperCase())
Résultat obtenu :
Statut :

### TC10 — Défaite (0 essai restant)
Préconditions : triesLeft = 1
Étapes : Proposer une lettre absente du mot
Résultat attendu : triesLeft = 0, message "Perdu ! Le mot était : ...", formulaire et bouton désactivés
Résultat obtenu :
Statut :

### TC11 — Victoire (mot complet trouvé)
Préconditions : Toutes les lettres sauf une sont trouvées
Étapes : Proposer la dernière lettre manquante
Résultat attendu : Message "Bravo, vous avez gagné", formulaire et bouton désactivés
Résultat obtenu :
Statut :

### TC12 — Mot avec accent (ex. "Déimos")
Préconditions : Le mot tiré contient un accent
Étapes : Tirer un mot accentué et proposer "E"
Résultat attendu : L'accent est normalisé (normalize('NFD')), la lettre "E" est reconnue même si le mot original contient "É"
Résultat obtenu :
Statut :

### TC13 — Mot avec espace/tiret (ex. "Sagittarius A", "Tchourioumov-Guérassimenko")
Préconditions : Le mot tiré contient un espace ou un tiret
Étapes : Démarrer une partie avec ce mot
Résultat attendu : L'espace/le tiret est révélé d'office dans l'affichage (pré-rempli dans lettersFound), pas besoin de le "deviner"
Résultat obtenu :
Statut :

### TC14 — Affichage des lettres essayées (fausses uniquement)
Préconditions : Plusieurs lettres correctes et incorrectes proposées
Étapes : Proposer un mélange de lettres correctes/incorrectes
Résultat attendu : Seules les lettres incorrectes apparaissent dans "Lettres essayées (fausses)"
Résultat obtenu :
Statut :

### TC15 — Réinitialisation du champ de saisie
Préconditions : Partie en cours
Étapes : Soumettre une lettre (valide ou non)
Résultat attendu : Le champ user-input est vidé après chaque soumission
Résultat obtenu :
Statut :

(Statut à remplir par toi après exécution : Passé / Échoué)

## 6. Anomalies constatées

A01 — liée à TC10 / hors périmètre
Description : Aucun bouton "Rejouer" visible dans le code fourni : après une victoire/défaite, il faut recharger la page pour relancer une partie
Sévérité : Mineure (ergonomie)

A02 — liée à TC02
Description : Le message "La lettre invalide" ne précise pas pourquoi elle est invalide (vide, trop longue, non-lettre) — pourrait perturber l'utilisateur
Sévérité : Mineure

(À compléter avec les anomalies réellement observées lors de l'exécution)

## 7. Synthèse

Nombre de cas de test : 15
Cas passés : À compléter
Cas échoués : À compléter
Taux de réussite : À compléter

Conclusion générale : (à rédiger après exécution)
