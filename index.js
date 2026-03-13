function startGame() {
    alert("Добро пожаловать в игру 'Угадай число'!\n\nПравила:\n• Я загадал число от 1 до 1000\n• У тебя 10 попыток\n• После каждой попытки будет подсказка");

    const secretNumber = Math.floor(Math.random() * 1000) + 1;
    let attemptsLeft = 10;
    let isGuessed = false;

    let ready = confirm("Готов?");
    
    if (!ready) {
        alert("Слабак!");
        return;
    }

    while (attemptsLeft > 0 && !isGuessed) {
        let userInput = prompt(`У тебя осталось попыток: ${attemptsLeft}\nВведи число от 1 до 1000:`);

        if (userInput === null) {
            let confirmExit = confirm(" Точно хочешь выйти из игры?");
            if (confirmExit) {
                alert(`Игра окончена. Загаданное число было: ${secretNumber}`);
                return;
            } else {
                continue;
            }
        }

        if (userInput.trim() === "") {
            alert("Ошибка! Ты ничего не ввёл.");
            continue;
        }

        if (isNaN(userInput)) {
            alert("Ошибка! Это не число.");
            continue;
        }

        let guess = Number(userInput);

        if (!Number.isInteger(guess)) {
            alert("Ошибка! Число должно быть целым.");
            continue;
        }

        if (guess < 1 || guess > 1000) {
            alert("Ошибка! Число должно быть от 1 до 1000.");
            continue;
        }

        attemptsLeft--;

        if (guess === secretNumber) {
            let attemptsUsed = 10 - attemptsLeft;
            alert(`Молодец! Ты угадал число ${secretNumber}!\nТы справился за ${attemptsUsed} ${getAttemptsWord(attemptsUsed)}!`);
            isGuessed = true;
        } 
        else if (guess < secretNumber) {
            if (attemptsLeft > 0) {
                alert(`Загаданное число БОЛЬШЕ, чем ${guess}.\nОсталось попыток: ${attemptsLeft}`);
            } else {
                alert(`К сожалению, попытки закончились...\nЗагаданное число было: ${secretNumber}`);
            }
        } 
        else {
            if (attemptsLeft > 0) {
                alert(`Загаданное число МЕНЬШЕ, чем ${guess}.\nОсталось попыток: ${attemptsLeft}`);
            } else {
                alert(`К сожалению, попытки закончились...\nЗагаданное число было: ${secretNumber}`);
            }
        }
    }

    if (isGuessed) {
        let playAgain = confirm("Хочешь сыграть ещё раз?");
        if (playAgain) {
            startGame();
        } else {
            alert("Спасибо за игру!");
        }
    } else {
        let playAgain = confirm("Попытки закончились... Сыграем ещё раз?");
        if (playAgain) {
            startGame();
        } else {
            alert("Спасибо за игру!");
        }
    }
}
function getAttemptsWord(count) {
    if (count === 1) return "попытку";
    if (count >= 2 && count <= 4) return "попытки";
    return "попыток";
}