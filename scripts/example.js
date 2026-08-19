console.log("Jeu du pendu !");

//! Récuperation du formulaire dans le DOM de la page
const gameForm = document.getElementById('game-form');
const msgGameForm = document.getElementById('message-game-form');
const displayWord = document.getElementById('le-mot-à-trouver');
const displayTries = document.getElementById('essais-restants');
const displayLettersUsed = document.getElementById('lettres-essayees');

//! La liste des mots possibles
const words = ['Soleil', 'Jupiter', 'Saturne', 'Uranus', 'Neptune', 'Terre', 'Venus', 'Mars', 'Ganymede', 'Titan', 'Mercure', 'Callisto', 'Io', 'Lune', 'Europa', 'Triton', 'Pluton', 'Titania', 'Rhea', 'Oberon', 'Japet', 'Charon', 'Umbriel', 'Ariel', 'Dione', 'Tethys', 'Ceres', 'Vesta', 'Pallas', 'Encelade', 'Miranda', 'Protee', 'Mimas', 'Hyperion', 'Iris', 'Phoebe', 'Janus', 'Epimethee', 'Lutece', 'Promethee', 'Pandore', 'Mathilde', 'Helene', 'Ida', 'Arrokoth', 'Phobos', 'Déimos', 'Tchourioumov-Guérassimenko', 'Hartley 2', 'Sagittarius A'];

//! Variable de stockage
const letterAlreadySubmit = [];
let mysteryWord;
let lettersFound;
const maxTries = 10;
let triesLeft;

//! Setup du jeu
function startGame() {
    mysteryWord = pickRandomWord();
    lettersFound = [];
    triesLeft = maxTries;
    // Les caractères qui ne sont pas des lettres (espace, tiret, chiffre)
    // sont offerts : on les considère comme déjà trouvés
    for(const character of mysteryWord) {
        if(!isLetter(character)) {
            lettersFound.push(character);
        }
    }
    // Reset des lettres envoyées
    letterAlreadySubmit.splice(0, letterAlreadySubmit.length);
    updateDisplayWord();
    updateDisplayTries();
    updateDisplayLettersUsed();
}
startGame();

//! Réaction à la validation du formulaire
gameForm.addEventListener('submit', function (event) {
    // Annulation du comportement par defaut => Refresh
    event.preventDefault();

    // Récuperer la valeur (depuis le form)
    // - La balise "input" via son "name"
    const userInput = gameForm['user-input'];
    // - On lit la valeur contenu
    const letter = userInput.value.toUpperCase();
    console.log(letter);

    // Traitement de la lettre
    if(letter.length !== 1 || !isLetter(letter)) {
        msgGameForm.textContent = 'La lettre invalide';
    }
    else if(letterAlreadySubmit.includes(letter)) {
        msgGameForm.textContent = `La lettre ${letter} a déjà été proposé ! Boulet ♥`;
    }
    else {
        letterAlreadySubmit.push(letter);
        updateDisplayLettersUsed();

        if(checkLetterIsValid(letter)) {
            msgGameForm.textContent = `La lettre ${letter} est dans le mot`;
            updateDisplayWord();
        }
        else {
            triesLeft--;
            updateDisplayTries();
            msgGameForm.textContent = `La lettre ${letter} n'est pas dans le mot (${triesLeft} essai(s) restant(s))`;
        }
    }
    
    // Efface la valeur de l'input
    userInput.value = '';
    
    // On continue ?
    if(triesLeft <= 0) {
        msgGameForm.textContent = `Perdu ! Le mot était : ${mysteryWord.join('')}`;
        gameForm.querySelector('button').disabled = true;
        userInput.disabled = true;
    }
    else if(checkGameOver()) {
        msgGameForm.textContent = `Bravo, vous avez gagné`;
        gameForm.querySelector('button').disabled = true;
        userInput.disabled = true;
    }
});

function pickRandomWord() {
    // Un indice au hasard entre 0 et (words.length - 1)
    const index = Math.floor(Math.random() * words.length);

    return words[index]
        // "Déimos" => "Deimos" : on retire les accents
        .normalize('NFD').replace(/\p{Diacritic}/gu, '')
        .toUpperCase()
        // "SOLEIL" => ['S', 'O', 'L', 'E', 'I', 'L']
        .split('');
}

function isLetter(character) {
    return /[A-Z]/.test(character);
}

function checkLetterIsValid(letter) {
    if(mysteryWord.includes(letter)) {
        lettersFound.push(letter);
        return true;
    }
    return false;
}

function updateDisplayWord() {
    displayWord.innerHTML = '';

    for(const letter of mysteryWord) {

        // Création d'un balise "span" en JS (Pas afficher)
        const span = document.createElement('span');

        // Moficiation du contenu du "span"
        if(lettersFound.includes(letter)) {
            span.textContent = letter;
        }
        else {
            span.textContent = '_';
            
        }

        // Ajoute la balise "span" à la balise "p"
        displayWord.append(span);
    }
}

function updateDisplayTries() {
    displayTries.textContent = `Essais restants : ${triesLeft} / ${maxTries}`;
}

function updateDisplayLettersUsed() {
    // BONUS : on n'affiche que les lettres fausses
    const wrongLetters = letterAlreadySubmit.filter(letter => !mysteryWord.includes(letter));

    displayLettersUsed.textContent = `Lettres essayées (fausses) : ${wrongLetters.join(', ')}`;
}

function checkGameOver() {
    // Les letters du mots (sans doublon)
    const mysteryWordSet = new Set(mysteryWord);
    const lettersFoundSet = new Set(lettersFound);

    return lettersFoundSet.isSupersetOf(mysteryWordSet);
}