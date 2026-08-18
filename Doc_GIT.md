# Recap des commandes pour git

## Configurer votre identité sur git
```
git config --global user.name "..."
git config --global user.email "..."
``` 

## Initialiser "git" dans le projet
```
git init
```

## Ajouter des fichiers ou des modifications en "staged" pour les valider
```
# Un fichier
git add filename

# Le contenu d'un dossier
git add dir

# Tous (À partir du dossier du terminal)
git add .
```

## Valider les éléments en attentes (Commit)
```
git commit -m "Ceci est le message de commit"
```