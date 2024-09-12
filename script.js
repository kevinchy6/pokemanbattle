// 假设从图片中提取的Pokemon名字
const pokemonList = [
    "Arceus", "Pikachu", "Arcanine","Bulbasaur","Charizard","Dragonite","Eevee","Gardevoir","Gengar","Lucario","Rayquaza","Snorlax","Psyduck","Slowpoke"
    // ... 继续添加其他Pokemon名字
];

const player1 = { name: '', hp: 100 };
const player2 = { name: '', hp: 100 };
let currentPlayer = 1;

function populatePokemonOptions() {
    const player1Select = document.getElementById('player1-pokemon');
    const player2Select = document.getElementById('player2-pokemon');

    pokemonList.forEach(pokemon => {
        const option1 = document.createElement('option');
        option1.value = pokemon;
        option1.textContent = pokemon;
        player1Select.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = pokemon;
        option2.textContent = pokemon;
        player2Select.appendChild(option2);
    });
}

function startBattle() {
    player1.name = document.getElementById('player1-pokemon').value;
    player2.name = document.getElementById('player2-pokemon').value;

    document.getElementById('player1-name').textContent = player1.name;
    document.getElementById('player2-name').textContent = player2.name;
    document.getElementById('player1-hp').textContent = player1.hp;
    document.getElementById('player2-hp').textContent = player2.hp;

    // 设置图片路径
    const player1ImgPath = `images/${player1.name}.png`;
    const player2ImgPath = `images/${player2.name}.png`;

    document.getElementById('player1-img').src = player1ImgPath;
    document.getElementById('player2-img').src = player2ImgPath;

    // 调试信息
    console.log("Player 1 Image Path:", player1ImgPath);
    console.log("Player 2 Image Path:", player2ImgPath);

    // 检查图片是否加载成功
    document.getElementById('player1-img').onerror = function() {
        console.error("Failed to load image for Player 1:", player1ImgPath);
    };
    document.getElementById('player2-img').onerror = function() {
        console.error("Failed to load image for Player 2:", player2ImgPath);
    };

    document.getElementById('selection-screen').style.display = 'none';
    document.getElementById('battle-screen').style.display = 'block';

    updateCurrentTurn();
    generateMathQuestion();
}

function generateMathQuestion() {
    const num1 = Math.floor(Math.random() * 90) + 10;
    const num2 = Math.floor(Math.random() * 90) + 10;
    const question = `${num1} + ${num2}`;
    const answer = num1 + num2;

    document.getElementById('question').textContent = `Solve: ${question}`;
    document.getElementById('answer').value = '';
    document.getElementById('answer').dataset.correctAnswer = answer;
    document.getElementById('math-question').style.display = 'block';
    document.getElementById('attack-player1').style.display = 'none';
    document.getElementById('attack-player2').style.display = 'none';
    document.getElementById('attack-result').style.display = 'none';
    document.getElementById('ok-button').style.display = 'none';
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value, 10);
    const correctAnswer = parseInt(document.getElementById('answer').dataset.correctAnswer, 10);

    if (userAnswer === correctAnswer) {
        document.getElementById('math-question').style.display = 'none';
        if (currentPlayer === 1) {
            document.getElementById('attack-player1').style.display = 'block';
        } else {
            document.getElementById('attack-player2').style.display = 'block';
        }
    } else {
        alert('Incorrect answer. Opponent attacks!');
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updateCurrentTurn();
        generateMathQuestion();
    }
}

function attack() {
    const damage = Math.floor(Math.random() * 20) + 1;
    const attackResult = document.getElementById('attack-result');
    const attackEffect = document.getElementById('attack-effect');

    if (currentPlayer === 1) {
        player2.hp -= damage;
        if (player2.hp < 0) player2.hp = 0;
        document.getElementById('player2-hp').textContent = player2.hp;
        attackResult.textContent = `${player1.name} attacks ${player2.name} for ${damage} damage!`;
        attackEffect.style.left = '20%';
        attackEffect.style.top = '50%';
        attackEffect.style.transform = 'translateX(70%)';
    } else {
        player1.hp -= damage;
        if (player1.hp < 0) player1.hp = 0;
        document.getElementById('player1-hp').textContent = player1.hp;
        attackResult.textContent = `${player2.name} attacks ${player1.name} for ${damage} damage!`;
        attackEffect.style.left = '80%';
        attackEffect.style.top = '50%';
        attackEffect.style.transform = 'translateX(-70%)';
    }

    attackResult.style.display = 'block';
    attackEffect.style.display = 'block';
    document.getElementById('attack-player1').style.display = 'none';
    document.getElementById('attack-player2').style.display = 'none';

    setTimeout(() => {
        attackEffect.style.display = 'none';
        document.getElementById('ok-button').style.display = 'block';
    }, 1000); // 等待1秒后隐藏特效并显示OK按钮
}

function updateCurrentTurn() {
    const currentTurnText = currentPlayer === 1 ? `${player1.name}'s turn` : `${player2.name}'s turn`;
    document.getElementById('current-turn').textContent = currentTurnText;
}

function resetGame() {
    player1.hp = 100;
    player2.hp = 100;
    currentPlayer = 1;
    document.getElementById('selection-screen').style.display = 'block';
    document.getElementById('battle-screen').style.display = 'none';
}

document.getElementById('start-battle').addEventListener('click', startBattle);
document.getElementById('submit-answer').addEventListener('click', checkAnswer);
document.getElementById('attack-player1').addEventListener('click', attack);
document.getElementById('attack-player2').addEventListener('click', attack);
document.getElementById('ok-button').addEventListener('click', () => {
    document.getElementById('ok-button').style.display = 'none';
    if (player1.hp === 0 || player2.hp === 0) {
        const winner = player1.hp === 0 ? player2.name : player1.name;
        alert(`${winner} wins!`);
        resetGame();
    } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updateCurrentTurn();
        generateMathQuestion();
    }
});

populatePokemonOptions();