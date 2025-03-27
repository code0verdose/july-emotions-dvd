// Функция для определения размера объектов в зависимости от устройства
function getLogoSize() {
  return window.innerWidth <= 768 ? 110 : 220; // 110px на мобильных, 220px на десктопах
}

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
const logoSize = getLogoSize();

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

// Переменные для перетаскивания
let isDragging1 = false;
let isDragging2 = false;
let dragOffsetX1 = 0;
let dragOffsetY1 = 0;
let dragOffsetX2 = 0;
let dragOffsetY2 = 0;

// Позиции и время для расчета скорости броска
let lastPosX1 = 0;
let lastPosY1 = 0;
let lastPosX2 = 0;
let lastPosY2 = 0;
let lastMoveTime1 = 0;
let lastMoveTime2 = 0;

// Коэффициент скорости броска
const throwFactor = 0.2;

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
  // Если не перетаскиваем, то объекты двигаются
  if (!isDragging1) {
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
  }
  
  if (!isDragging2) {
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
  }
  
  // Проверка столкновения объектов между собой только если оба не перетаскиваются
  if (!isDragging1 && !isDragging2) {
    checkCollision();
  }
  
  // Обновление позиций
  logoContainer.style.left = posX1 + 'px';
  logoContainer.style.top = posY1 + 'px';
  dogContainer.style.left = posX2 + 'px';
  dogContainer.style.top = posY2 + 'px';
  
  requestAnimationFrame(animate);
}

// Перезапуск анимации при изменении размера окна
window.addEventListener('resize', () => {
  // Обновление размера объектов
  const newLogoSize = getLogoSize();
  
  // Проверка для первого объекта
  if (posX1 > window.innerWidth - newLogoSize) posX1 = window.innerWidth - newLogoSize;
  if (posY1 > window.innerHeight - newLogoSize) posY1 = window.innerHeight - newLogoSize;
  
  // Проверка для второго объекта
  if (posX2 > window.innerWidth - newLogoSize) posX2 = window.innerWidth - newLogoSize;
  if (posY2 > window.innerHeight - newLogoSize) posY2 = window.innerHeight - newLogoSize;
});

// Добавляем обработчики для перетаскивания первого объекта (лицо)
logoContainer.addEventListener('mousedown', function(e) {
  isDragging1 = true;
  dragOffsetX1 = e.clientX - posX1;
  dragOffsetY1 = e.clientY - posY1;
  lastPosX1 = e.clientX;
  lastPosY1 = e.clientY;
  lastMoveTime1 = Date.now();
  
  // Стиль для перетаскивания
  logoContainer.style.cursor = 'grabbing';
});

// Добавляем обработчики для перетаскивания второго объекта (собака)
dogContainer.addEventListener('mousedown', function(e) {
  isDragging2 = true;
  dragOffsetX2 = e.clientX - posX2;
  dragOffsetY2 = e.clientY - posY2;
  lastPosX2 = e.clientX;
  lastPosY2 = e.clientY;
  lastMoveTime2 = Date.now();
  
  // Стиль для перетаскивания
  dogContainer.style.cursor = 'grabbing';
});

// Общий обработчик для движения мыши
document.addEventListener('mousemove', function(e) {
  const currentTime = Date.now();
  
  if (isDragging1) {
    posX1 = e.clientX - dragOffsetX1;
    posY1 = e.clientY - dragOffsetY1;
    
    // Ограничение перемещения в пределах экрана
    posX1 = Math.max(0, Math.min(window.innerWidth - logoSize, posX1));
    posY1 = Math.max(0, Math.min(window.innerHeight - logoSize, posY1));
    
    // Сохраняем последнюю позицию и время для расчета скорости броска
    if (currentTime - lastMoveTime1 > 20) { // Сохраняем каждые 20мс для более точного расчета
      lastPosX1 = e.clientX;
      lastPosY1 = e.clientY;
      lastMoveTime1 = currentTime;
    }
  }
  
  if (isDragging2) {
    posX2 = e.clientX - dragOffsetX2;
    posY2 = e.clientY - dragOffsetY2;
    
    // Ограничение перемещения в пределах экрана
    posX2 = Math.max(0, Math.min(window.innerWidth - logoSize, posX2));
    posY2 = Math.max(0, Math.min(window.innerHeight - logoSize, posY2));
    
    // Сохраняем последнюю позицию и время для расчета скорости броска
    if (currentTime - lastMoveTime2 > 20) {
      lastPosX2 = e.clientX;
      lastPosY2 = e.clientY;
      lastMoveTime2 = currentTime;
    }
  }
});

// Обработчик отпускания кнопки мыши
document.addEventListener('mouseup', function(e) {
  if (isDragging1) {
    // Вычисляем скорость и направление броска
    const vx = (e.clientX - lastPosX1) * throwFactor;
    const vy = (e.clientY - lastPosY1) * throwFactor;
    
    // Устанавливаем новую скорость, если бросок достаточно сильный
    if (Math.abs(vx) > 0.5 || Math.abs(vy) > 0.5) {
      speedX1 = vx;
      speedY1 = vy;
    }
    
    isDragging1 = false;
    logoContainer.style.cursor = 'grab';
  }
  
  if (isDragging2) {
    // Вычисляем скорость и направление броска
    const vx = (e.clientX - lastPosX2) * throwFactor;
    const vy = (e.clientY - lastPosY2) * throwFactor;
    
    // Устанавливаем новую скорость, если бросок достаточно сильный
    if (Math.abs(vx) > 0.5 || Math.abs(vy) > 0.5) {
      speedX2 = vx;
      speedY2 = vy;
    }
    
    isDragging2 = false;
    dogContainer.style.cursor = 'grab';
  }
});

// Обработчик потери фокуса окном (когда мышь покидает окно браузера)
document.addEventListener('mouseleave', function() {
  isDragging1 = false;
  isDragging2 = false;
  logoContainer.style.cursor = '';
  dogContainer.style.cursor = '';
});

// Обработчики для сенсорного экрана (первый объект)
logoContainer.addEventListener('touchstart', function(e) {
  e.preventDefault();
  isDragging1 = true;
  const touch = e.touches[0];
  dragOffsetX1 = touch.clientX - posX1;
  dragOffsetY1 = touch.clientY - posY1;
  lastPosX1 = touch.clientX;
  lastPosY1 = touch.clientY;
  lastMoveTime1 = Date.now();
});

// Обработчики для сенсорного экрана (второй объект)
dogContainer.addEventListener('touchstart', function(e) {
  e.preventDefault();
  isDragging2 = true;
  const touch = e.touches[0];
  dragOffsetX2 = touch.clientX - posX2;
  dragOffsetY2 = touch.clientY - posY2;
  lastPosX2 = touch.clientX;
  lastPosY2 = touch.clientY;
  lastMoveTime2 = Date.now();
});

// Общий обработчик для движения касания
document.addEventListener('touchmove', function(e) {
  const currentTime = Date.now();
  
  if (isDragging1) {
    const touch = e.touches[0];
    posX1 = touch.clientX - dragOffsetX1;
    posY1 = touch.clientY - dragOffsetY1;
    
    // Ограничение перемещения в пределах экрана
    posX1 = Math.max(0, Math.min(window.innerWidth - logoSize, posX1));
    posY1 = Math.max(0, Math.min(window.innerHeight - logoSize, posY1));
    
    // Сохраняем последнюю позицию для расчета скорости броска
    if (currentTime - lastMoveTime1 > 20) {
      lastPosX1 = touch.clientX;
      lastPosY1 = touch.clientY;
      lastMoveTime1 = currentTime;
    }
  }
  
  if (isDragging2) {
    const touch = e.touches[0];
    // Если перетаскиваем второй объект и касаемся первого, используем второе касание
    if (isDragging1 && e.touches.length > 1) {
      const touch = e.touches[1];
      posX2 = touch.clientX - dragOffsetX2;
      posY2 = touch.clientY - dragOffsetY2;
    } else {
      posX2 = touch.clientX - dragOffsetX2;
      posY2 = touch.clientY - dragOffsetY2;
    }
    
    // Ограничение перемещения в пределах экрана
    posX2 = Math.max(0, Math.min(window.innerWidth - logoSize, posX2));
    posY2 = Math.max(0, Math.min(window.innerHeight - logoSize, posY2));
    
    // Сохраняем последнюю позицию для расчета скорости броска
    if (currentTime - lastMoveTime2 > 20) {
      lastPosX2 = touch.clientX;
      lastPosY2 = touch.clientY;
      lastMoveTime2 = currentTime;
    }
  }
});

// Обработчик завершения касания
document.addEventListener('touchend', function(e) {
  if (isDragging1) {
    // Если еще остались касания, то используем их для расчета броска
    let touchX, touchY;
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      touchX = touch.clientX;
      touchY = touch.clientY;
    } else if (e.changedTouches.length > 0) {
      const touch = e.changedTouches[0];
      touchX = touch.clientX;
      touchY = touch.clientY;
    }
    
    if (touchX && touchY) {
      // Вычисляем скорость и направление броска
      const vx = (touchX - lastPosX1) * throwFactor;
      const vy = (touchY - lastPosY1) * throwFactor;
      
      // Устанавливаем новую скорость, если бросок достаточно сильный
      if (Math.abs(vx) > 0.5 || Math.abs(vy) > 0.5) {
        speedX1 = vx;
        speedY1 = vy;
      }
    }
    
    isDragging1 = false;
  }
  
  if (isDragging2) {
    // Если еще остались касания, то используем их для расчета броска
    let touchX, touchY;
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      touchX = touch.clientX;
      touchY = touch.clientY;
    } else if (e.changedTouches.length > 0) {
      const touch = e.changedTouches[0];
      touchX = touch.clientX;
      touchY = touch.clientY;
    }
    
    if (touchX && touchY) {
      // Вычисляем скорость и направление броска
      const vx = (touchX - lastPosX2) * throwFactor;
      const vy = (touchY - lastPosY2) * throwFactor;
      
      // Устанавливаем новую скорость, если бросок достаточно сильный
      if (Math.abs(vx) > 0.5 || Math.abs(vy) > 0.5) {
        speedX2 = vx;
        speedY2 = vy;
      }
    }
    
    isDragging2 = false;
  }
});

// Добавляем курсор "grab" когда наводим на объекты
logoContainer.style.cursor = 'grab';
dogContainer.style.cursor = 'grab';

// Запуск анимации
animate(); 