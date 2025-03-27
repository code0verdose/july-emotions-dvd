// Создание звезд на фоне
function createStars() {
  const starsContainer = document.getElementById('stars');
  const starsCount = 200;
  
  for (let i = 0; i < starsCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Разный размер звезд
    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Случайное положение
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    
    // Случайная длительность анимации
    const duration = Math.random() * 4 + 3;
    star.style.animationDuration = `${duration}s`;
    
    // Случайная задержка начала анимации
    star.style.animationDelay = `${Math.random() * 5}s`;
    
    starsContainer.appendChild(star);
  }
}

// Запускаем создание звезд
createStars();

// Размер объектов (с учётом контейнера)
const logoSize = 220;

// Код для первого объекта (лицо)
const logo = document.getElementById('dvd-logo');
const logoContainer = document.getElementById('dvd-container');
let posX1 = Math.random() * (window.innerWidth - logoSize);
let posY1 = Math.random() * (window.innerHeight - logoSize);
let speedX1 = 2;
let speedY1 = 2;
let currentImage1 = 1;

// Код для второго объекта (собака)
const dogLogo = document.getElementById('dog-logo');
const dogContainer = document.getElementById('dog-container');
let posX2 = Math.random() * (window.innerWidth - logoSize);
let posY2 = Math.random() * (window.innerHeight - logoSize);
let speedX2 = -2; // Начальное направление противоположное первому объекту
let speedY2 = -2;
let currentImage2 = 1;

// Предзагрузка изображений лица
const faceImages = [];
for (let i = 1; i <= 6; i++) {
  const img = new Image();
  img.src = `assets/face/${i}.png`;
  faceImages.push(img);
}

// Предзагрузка изображений собаки
const dogImages = [];
for (let i = 1; i <= 7; i++) {
  const img = new Image();
  img.src = `assets/dog/${i}.png`;
  dogImages.push(img);
}

function changeFaceImage() {
  currentImage1 = currentImage1 % 6 + 1;
  logo.src = `assets/face/${currentImage1}.png`;
}

function changeDogImage() {
  currentImage2 = currentImage2 % 7 + 1;
  dogLogo.src = `assets/dog/${currentImage2}.png`;
}

// Проверка столкновения двух объектов
function checkCollision() {
  // Проверяем перекрытие объектов
  const face = {
    left: posX1,
    right: posX1 + logoSize,
    top: posY1,
    bottom: posY1 + logoSize
  };
  
  const dog = {
    left: posX2,
    right: posX2 + logoSize,
    top: posY2,
    bottom: posY2 + logoSize
  };
  
  // Проверка перекрытия
  if (face.left < dog.right && 
      face.right > dog.left && 
      face.top < dog.bottom && 
      face.bottom > dog.top) {
    
    // Вычисляем центры объектов
    const centerX1 = posX1 + logoSize / 2;
    const centerY1 = posY1 + logoSize / 2;
    const centerX2 = posX2 + logoSize / 2;
    const centerY2 = posY2 + logoSize / 2;
    
    // Вектор от центра первого объекта к центру второго
    const dx = centerX2 - centerX1;
    const dy = centerY2 - centerY1;
    
    // Меняем направление скоростей
    speedX1 = -Math.sign(dx) * Math.abs(speedX1);
    speedY1 = -Math.sign(dy) * Math.abs(speedY1);
    speedX2 = Math.sign(dx) * Math.abs(speedX2);
    speedY2 = Math.sign(dy) * Math.abs(speedY2);
    
    // Меняем изображения при столкновении
    changeFaceImage();
    changeDogImage();
    
    // Немного отодвигаем объекты друг от друга, чтобы избежать залипания
    posX1 += speedX1 * 2;
    posY1 += speedY1 * 2;
    posX2 += speedX2 * 2;
    posY2 += speedY2 * 2;
  }
}

function animate() {
  // Перемещение первого объекта
  posX1 += speedX1;
  posY1 += speedY1;
  
  // Проверка столкновений с краями экрана для первого объекта
  if (posX1 <= 0 || posX1 >= window.innerWidth - logoSize) {
    speedX1 = -speedX1;
    changeFaceImage();
  }
  
  if (posY1 <= 0 || posY1 >= window.innerHeight - logoSize) {
    speedY1 = -speedY1;
    changeFaceImage();
  }
  
  // Перемещение второго объекта
  posX2 += speedX2;
  posY2 += speedY2;
  
  // Проверка столкновений с краями экрана для второго объекта
  if (posX2 <= 0 || posX2 >= window.innerWidth - logoSize) {
    speedX2 = -speedX2;
    changeDogImage();
  }
  
  if (posY2 <= 0 || posY2 >= window.innerHeight - logoSize) {
    speedY2 = -speedY2;
    changeDogImage();
  }
  
  // Проверка столкновения объектов между собой
  checkCollision();
  
  // Обновление позиций
  logoContainer.style.left = posX1 + 'px';
  logoContainer.style.top = posY1 + 'px';
  dogContainer.style.left = posX2 + 'px';
  dogContainer.style.top = posY2 + 'px';
  
  requestAnimationFrame(animate);
}

// Перезапуск анимации при изменении размера окна
window.addEventListener('resize', () => {
  // Проверка для первого объекта
  if (posX1 > window.innerWidth - logoSize) posX1 = window.innerWidth - logoSize;
  if (posY1 > window.innerHeight - logoSize) posY1 = window.innerHeight - logoSize;
  
  // Проверка для второго объекта
  if (posX2 > window.innerWidth - logoSize) posX2 = window.innerWidth - logoSize;
  if (posY2 > window.innerHeight - logoSize) posY2 = window.innerHeight - logoSize;
});

// Запуск анимации
animate(); 