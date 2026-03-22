class Card {
    constructor(name, cost, description, power, health, imageUrl = '') {
        this.name = name;
        this.cost = cost;
        this.description = description;
        this.power = power;
        this.health = health;
        this.imageUrl = imageUrl;
        this.id = Date.now() + Math.random() * 10000;
    }

    getHTML(isEditMode = false, onDelete = null, onEdit = null) {
        throw new Error('Метод getHTML должен быть переопределен');
    }

    getTypeClass() { return 'card'; }
    getTypeName() { return 'Карта'; }
    
    escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}

class BeastCard extends Card {
    constructor(name, cost, description, power, health, sigil = '', imageUrl = '') {
        super(name, cost, description, power, health, imageUrl);
        this.sigil = sigil || this.generateDefaultSigil();
    }
    
    generateDefaultSigil() {
        const sigils = ['Прожорливый', 'Стая', 'Полет', 'Ярость', 'Строитель'];
        return sigils[Math.floor(Math.random() * sigils.length)];
    }

    getTypeClass() { return 'type-beast'; }
    getTypeName() { return 'ЗВЕРЬ'; }

    getHTML(isEditMode = false, onDelete = null, onEdit = null) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        if (isEditMode) cardDiv.classList.add('edit-mode');
        
        const defaultImage = 'https://placehold.co/300x180/2c261c/ecd9b4?text=Card+Image';
        const imageHtml = this.imageUrl ? 
            `<img src="${this.escapeHtml(this.imageUrl)}" class="card-image" onerror="this.src='${defaultImage}'">` : 
            `<img src="${defaultImage}" class="card-image">`;
        
        cardDiv.innerHTML = `
            ${imageHtml}
            <div class="card-type ${this.getTypeClass()}">${this.getTypeName()}</div>
            <div class="card-name">${this.escapeHtml(this.name)}</div>
            <div class="card-description">${this.escapeHtml(this.description)}</div>
            <div class="card-stats">
                <div class="stat"><span>СИЛА:</span> <span>${this.power}</span></div>
                <div class="stat"><span>ЗДОРОВЬЕ:</span> <span>${this.health}</span></div>
                <div class="stat"><span>ЦЕНА:</span> <span>${this.cost}</span></div>
            </div>
            <div class="sigil">${this.escapeHtml(this.sigil)}</div>
        `;
        
        if (isEditMode) {
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'card-actions';
            
            const editBtn = document.createElement('button');
            editBtn.textContent = 'РЕДАКТИРОВАТЬ';
            editBtn.className = 'btn-edit-card';
            editBtn.onclick = (e) => {
                e.stopPropagation();
                if (onEdit) onEdit(this);
            };
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'УДАЛИТЬ';
            deleteBtn.className = 'btn-delete';
            deleteBtn.onclick = (e) => {
                e.stopPropagation();
                if (onDelete) onDelete(this.id);
            };
            
            actionsDiv.appendChild(editBtn);
            actionsDiv.appendChild(deleteBtn);
            cardDiv.appendChild(actionsDiv);
        }
        
        return cardDiv;
    }
}

class BoneCard extends Card {
    constructor(name, cost, description, power, health, boneAbility = '', imageUrl = '') {
        super(name, cost, description, power, health, imageUrl);
        this.boneAbility = boneAbility || this.generateBoneAbility();
    }
    
    generateBoneAbility() {
        const abilities = ['Призыв скелета', 'Костяной дождь', 'Воскрешение', 'Ритуал костей'];
        return abilities[Math.floor(Math.random() * abilities.length)];
    }

    getTypeClass() { return 'type-bone'; }
    getTypeName() { return 'СКЕЛЕТ'; }

    getHTML(isEditMode = false, onDelete = null, onEdit = null) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        if (isEditMode) cardDiv.classList.add('edit-mode');
        
        const defaultImage = 'https://placehold.co/300x180/2c261c/ecd9b4?text=Card+Image';
        const imageHtml = this.imageUrl ? 
            `<img src="${this.escapeHtml(this.imageUrl)}" class="card-image" onerror="this.src='${defaultImage}'">` : 
            `<img src="${defaultImage}" class="card-image">`;
        
        cardDiv.innerHTML = `
            ${imageHtml}
            <div class="card-type ${this.getTypeClass()}">${this.getTypeName()}</div>
            <div class="card-name">${this.escapeHtml(this.name)}</div>
            <div class="card-description">${this.escapeHtml(this.description)}</div>
            <div class="card-stats">
                <div class="stat"><span>СИЛА:</span> <span>${this.power}</span></div>
                <div class="stat"><span>ЗДОРОВЬЕ:</span> <span>${this.health}</span></div>
                <div class="stat"><span>ЦЕНА:</span> <span>${this.cost}</span></div>
            </div>
            <div class="sigil">${this.escapeHtml(this.boneAbility)}</div>
        `;
        
        if (isEditMode) {
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'card-actions';
            const editBtn = document.createElement('button');
            editBtn.textContent = 'РЕДАКТИРОВАТЬ';
            editBtn.className = 'btn-edit-card';
            editBtn.onclick = (e) => { e.stopPropagation(); if (onEdit) onEdit(this); };
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'УДАЛИТЬ';
            deleteBtn.className = 'btn-delete';
            deleteBtn.onclick = (e) => { e.stopPropagation(); if (onDelete) onDelete(this.id); };
            actionsDiv.appendChild(editBtn);
            actionsDiv.appendChild(deleteBtn);
            cardDiv.appendChild(actionsDiv);
        }
        return cardDiv;
    }
}

class BloodCard extends Card {
    constructor(name, cost, description, power, health, ritualEffect = '', imageUrl = '') {
        super(name, cost, description, power, health, imageUrl);
        this.ritualEffect = ritualEffect || this.generateRitual();
    }
    
    generateRitual() {
        const rituals = ['Жертвоприношение', 'Лунная пощада', 'Гнев предков', 'Кровавый ритуал'];
        return rituals[Math.floor(Math.random() * rituals.length)];
    }

    getTypeClass() { return 'type-blood'; }
    getTypeName() { return 'ЖЕРТВА'; }

    getHTML(isEditMode = false, onDelete = null, onEdit = null) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        if (isEditMode) cardDiv.classList.add('edit-mode');
        
        const defaultImage = 'https://placehold.co/300x180/2c261c/ecd9b4?text=Card+Image';
        const imageHtml = this.imageUrl ? 
            `<img src="${this.escapeHtml(this.imageUrl)}" class="card-image" onerror="this.src='${defaultImage}'">` : 
            `<img src="${defaultImage}" class="card-image">`;
        
        cardDiv.innerHTML = `
            ${imageHtml}
            <div class="card-type ${this.getTypeClass()}">${this.getTypeName()}</div>
            <div class="card-name">${this.escapeHtml(this.name)}</div>
            <div class="card-description">${this.escapeHtml(this.description)}</div>
            <div class="card-stats">
                <div class="stat"><span>СИЛА:</span> <span>${this.power}</span></div>
                <div class="stat"><span>ЗДОРОВЬЕ:</span> <span>${this.health}</span></div>
                <div class="stat"><span>ЦЕНА:</span> <span>${this.cost}</span></div>
            </div>
            <div class="sigil">${this.escapeHtml(this.ritualEffect)}</div>
        `;
        
        if (isEditMode) {
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'card-actions';
            const editBtn = document.createElement('button');
            editBtn.textContent = 'РЕДАКТИРОВАТЬ';
            editBtn.className = 'btn-edit-card';
            editBtn.onclick = (e) => { e.stopPropagation(); if (onEdit) onEdit(this); };
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'УДАЛИТЬ';
            deleteBtn.className = 'btn-delete';
            deleteBtn.onclick = (e) => { e.stopPropagation(); if (onDelete) onDelete(this.id); };
            actionsDiv.appendChild(editBtn);
            actionsDiv.appendChild(deleteBtn);
            cardDiv.appendChild(actionsDiv);
        }
        return cardDiv;
    }
}

function validateCardData(name, cost, power, health) {
    if (!name || name.trim() === '') {
        alert('Назови карту');
        return false;
    }
    
    if (isNaN(cost) || isNaN(power) || isNaN(health)) {
        alert('Проверь статы, это должны быть числа и они не должны быть пустыми');
        return false;
    }
    
    if (cost < 0 || cost > 8) {
        alert('Стоимость должна быть от 0 до 8');
        return false;
    }

    if (power < 0 || power > 15) {
        alert('Сила должна быть от 0 до 15');
        return false;
    }
    
    if (health < 1 || health > 20) {
        alert('Здоровье должно быть от 1 до 20');
        return false;
    }
    
    return true;
}

class CardCollection {
    constructor() {
        this.cards = [];
        this.isEditMode = false;
        this.loadFromLocalStorage();
        if (this.cards.length === 0) this.initDefaultCards();
    }

    initDefaultCards() {
    this.cards = [];
    
   const cardsList = [
    { type: 'beast', name: 'Горностай', cost: 1, power: 1, health: 3, special: 'Мудрость', desc: 'Карта из Колоды зверей, даётся в каждом забеге. Имея неплохие показатели здоровья за 1 Каплю крови, становится отличным компаньоном. Может разговаривать с персонажем.', imageUrl: 'https://i.imgur.com/jnywpXN.png' },
    { type: 'beast', name: 'Клоп-вонючка', cost: 2, power: 1, health: 2, special: 'Вонючка', desc: 'Карта из Колоды зверей, класса насекомых. Может разговаривать с игроком. Неожиданный подарок из сейфа. Уменьшает урон карты стоящей перед ней на 1.', imageUrl: 'https://i.imgur.com/g8UJUA8.png' },
    { type: 'beast', name: 'Малорослый Волк', cost: 1, power: 2, health: 2, special: 'Говорящий', desc: 'Карта из Колоды зверей, класса псовых. Разблокируется вводом времени на часах с кукушкой. Одна из трёх говорящих карт.', imageUrl: 'https://i.imgur.com/ODnnOxG.png' },
    { type: 'beast', name: 'Волк', cost: 2, power: 3, health: 2, special: 'Стая', desc: 'Карта из Колоды зверей, класса псовых. Самая сильная стартовая карта первого акта. Цена в 2 Капли крови, 3 единицы урона и 2 жизни делают её сбалансированной.', imageUrl: 'https://i.imgur.com/Xl8x4tv.png' },
    { type: 'beast', name: 'Волчонок', cost: 1, power: 1, health: 1, special: 'Рост', desc: 'Карта из Колоды зверей, класса псовых. Детёныш обычного Волка. Спустя один ход становится взрослым Волком.', imageUrl: 'https://i.imgur.com/Rtk0Q1i.png' },  // ← запятая здесь!
    { type: 'beast', name: 'Койот', cost: 4, power: 2, health: 1, special: 'Нет', desc: 'Карта из Колоды зверей, класса псовых. Близкий родственник Волка, но уступает по параметрам. Одна из худших карт в игре.', imageUrl: 'https://i.imgur.com/D8p0lQz.png'},
    { type: 'beast', name: 'Альфа', cost: 5, power: 1, health: 2, special: 'Лидер', desc: 'Карта из Колоды зверей, класса псовых. Единственной, но уникальной способностью является символ Лидер, наделяющий 2 близлежащие карты дополнительной силой.', imageUrl: 'https://i.imgur.com/HndT3eJ.png'},
    { type: 'beast', name: 'Гончая', cost: 2, power: 2, health: 3, special: 'Страж', desc: 'Карта из Колоды зверей, класса псовых. Её символ позволяет перемещаться к любой карте, что приблизится к пустой ячейке на вашей стороне.', imageUrl: 'https://i.imgur.com/2ye8h8U.png'},
    { type: 'beast', name: 'Волк в клетке', cost: 2, power: 0, health: 6, special: 'Заточение', desc: 'Карта из Колоды зверей, класса псовых. Когда он погибает, то навсегда заменяется картой Волка.', imageUrl: 'https://i.imgur.com/XdbszzE.png'},
    { type: 'beast', name: 'Бобр', cost: 2, power: 1, health: 3, special: 'Плотинный мастер', desc: 'Символ Плотинный мастер означает, что Бобр, появившись на столе, построит на соседних ячейках Плотины, играющие роль препятствий.', imageUrl: 'https://i.imgur.com/sW38H0Q.png'},
    { type: 'beast', name: 'Кошка', cost: 1, power: 0, health: 1, special: 'Много жизней', desc: 'Кошка обладательница символа Много жизней. Может быть пожертвована 9 раз, после чего сменит облик.', imageUrl: 'https://i.imgur.com/amY4FJc.png'},
    { type: 'beast', name: 'Крот', cost: 1, power: 0, health: 4, special: 'Землерой', desc: 'Крот — отличная карта защиты. Не имеет урона, но наделена неплохим показателем здоровья за свою цену.', imageUrl: 'https://i.imgur.com/h74uaKy.png'},
    { type: 'beast', name: 'Бездомный Крот', cost: 1, power: 0, health: 6, special: 'Стойкость', desc: 'Улучшенная версия Крота. Очень защитная карта по низкой цене.', imageUrl: 'https://i.imgur.com/zVpHwaf.png'},
    { type: 'beast', name: 'Дикобраз', cost: 1, power: 1, health: 2, special: 'Колючки', desc: 'Символ дикобраза заставляет нападающих получать урон.', imageUrl: 'https://i.imgur.com/wSRXBWl.png'},
    { type: 'beast', name: 'Вьючная Крыса', cost: 2, power: 2, health: 2, special: 'Рюкзак', desc: 'Вспомогательная карта для получения предметов. Более слабая версия Волка.', imageUrl: 'https://i.imgur.com/4FYEZ8l.png'},
    { type: 'beast', name: 'Белая Акула', cost: 3, power: 4, health: 2, special: 'Ныряние', desc: 'Погружается под воду на ход врага. Почти невосприимчива к контратакам.', imageUrl: 'https://i.imgur.com/LVSVG9G.png'},
    { type: 'beast', name: 'Гризли', cost: 3, power: 4, health: 6, special: 'Мощь', desc: 'Просто страшная и сильная карта.', imageUrl: 'https://i.imgur.com/TAS9fzq.png'},
    { type: 'beast', name: 'Летучая Мышь', cost: 4, power: 2, health: 1, special: 'Полет', desc: 'Хороший способ нанести прямой урон противнику.', imageUrl: 'https://i.imgur.com/9fQO9O9.png'},
    { type: 'beast', name: 'Выдра', cost: 1, power: 1, health: 1, special: 'Ныряние', desc: 'Слабая карта, но её символ не позволяет ей получать прямой урон.', imageUrl: 'https://i.imgur.com/p7wMtZO.png'},
    { type: 'beast', name: 'Скунс', cost: 1, power: 0, health: 3, special: 'Вонючка', desc: 'Чисто защитная карта. Вонючий знак позволяет уменьшить силу противоборствующих карт на 1.', imageUrl: 'https://i.imgur.com/qts953u.png'},
    { type: 'beast', name: 'Зимородок', cost: 1, power: 1, health: 1, special: 'Полет', desc: 'Атакует противника напрямую, избегая урона, открывая противнику прямой встречный урон.', imageUrl: 'https://i.imgur.com/cC7SEsU.png'},
    { type: 'beast', name: 'Ворон', cost: 2, power: 2, health: 3, special: 'Полет', desc: 'Ворон очень полезен для быстрого завершения драки благодаря своему символу летунов.', imageUrl: 'https://i.imgur.com/ml1COjX.png'},
    { type: 'beast', name: 'Яйцо Ворона', cost: 1, power: 0, health: 2, special: 'Рост', desc: 'Из данного яйца вырастает взрослая особь Ворона. Можно использовать в качестве стены.', imageUrl: 'https://i.imgur.com/ZOR8atx.png'},
    { type: 'beast', name: 'Воробей', cost: 1, power: 1, health: 2, special: 'Полет', desc: 'Слабая, но дешёвая летающая карта. Более слабая версия Ворона.', imageUrl: 'https://i.imgur.com/LWoqJ1w.png'},
    { type: 'beast', name: 'Гриф-Индейка', cost: 8, power: 3, health: 3, special: 'Полет', desc: 'Сильная, но очень дорогая карта. Лучшее окончание для длинных игр.', imageUrl: 'https://i.imgur.com/SnMtnBd.png'},
    { type: 'beast', name: 'Сорока', cost: 2, power: 1, health: 1, special: 'Воровство', desc: 'Истинная сила заключается в её символе. Может получить любую карту из вашей колоды.', imageUrl: 'https://i.imgur.com/PxGwR8S.png'},
    { type: 'beast', name: 'Олень', cost: 2, power: 2, health: 4, special: 'Бегун', desc: 'Наделён символом бегуна, позволяющим передвигаться по незанятым соседним клеткам после нанесения урона.', imageUrl: 'https://i.imgur.com/QaJUe1Q.png'},
    { type: 'beast', name: 'Оленёнок', cost: 1, power: 1, health: 1, special: 'Рост', desc: 'Юная версия Оленя. Через ход становится Оленем.', imageUrl: 'https://i.imgur.com/NHKDL3w.png'},
    { type: 'beast', name: 'Вилорог', cost: 2, power: 1, health: 3, special: 'Разворот', desc: 'Наносит урон по всем направлениям в стиле бей-беги, не фокусируясь на конкретном месте.', imageUrl: 'https://i.imgur.com/UVO3P0o.png'},
    { type: 'beast', name: 'Лось', cost: 3, power: 3, health: 7, special: 'Таран', desc: 'Очень мощная карта, которую можно использовать как в защите, так и в нападении.', imageUrl: 'https://i.imgur.com/zkDV2cH.png'},
    { type: 'beast', name: 'Черная Коза', cost: 1, power: 0, health: 1, special: 'Достойная жертва', desc: 'После нанесения урона противника карта погибает, но взамен даёт три капли крови.', imageUrl: 'https://i.imgur.com/hI1Pfuw.png' },
    { type: 'beast', name: '13-е Дитя', cost: 1, power: 0, health: 1, special: 'Двойственная душа', desc: 'Имеет две формы: спящую и пробуждённую. Принесение в жертву заставляет проснуться и нанести урон.', imageUrl: 'https://i.imgur.com/LuvNp6G.png' },
    { type: 'beast', name: 'Длинный Олень', cost: 4, power: 1, health: 2, special: 'Смертельный укус', desc: 'Символ Прикосновение смерти позволяет быстро уничтожать множество карт.', imageUrl: 'https://i.imgur.com/BV2w55e.png' },
    { type: 'beast', name: 'Туз', cost: 2, power: 2, health: 2, special: 'Ярость', desc: 'При разыгрывании два колокольчика появляются на смежных ячейках.', imageUrl: 'https://i.imgur.com/M6LYLev.png' },
    { type: 'beast', name: 'Опоссум', cost: 2, power: 1, health: 1, special: 'Нет', desc: 'Слабая карта, но у нее очень низкая стоимость.', imageUrl: 'https://i.imgur.com/kZA9IL4.png' },
    { type: 'beast', name: 'Пчела', cost: 0, power: 1, health: 1, special: 'Полет', desc: 'Бесплатная карта. Способность Пчелы — символ Летун, возможность наносить урон сопернику напрямую.', imageUrl: 'https://i.imgur.com/EYC3DpQ.png' },
    { type: 'beast', name: 'Пчелиный Улей', cost: 1, power: 0, health: 2, special: 'Полный улей', desc: 'Имеет символ Полный улей. Выдаёт бесплатные карты Пчёл после получения урона.', imageUrl: 'https://i.imgur.com/L5liyok.png' },
    { type: 'beast', name: 'Богомол', cost: 1, power: 1, health: 1, special: 'Раздвоенный удар', desc: 'Имеет символ раздвоенного удара, который заставляет атаковать слева и справа, а не спереди.', imageUrl: 'https://i.imgur.com/vqlt7wr.png' },
    { type: 'beast', name: 'Бог Богомолов', cost: 1, power: 1, health: 1, special: 'Тройной удар', desc: 'Атакует 3 раза: прямо, влево и вправо. Может атаковать карты за укрытием.', imageUrl: 'https://i.imgur.com/ZkMMCkC.png' },
    { type: 'beast', name: 'Рабочий Муравей', cost: 1, power: 0, health: 2, special: 'Колония', desc: 'Сила определяется количеством муравьёв на поле. Лучше всего работает в группах.', imageUrl: 'https://i.imgur.com/7xxodb7.png' },
    { type: 'beast', name: 'Муравьиная Матка', cost: 2, power: 0, health: 3, special: 'Роженица', desc: 'Благодаря способности вызывать муравья и её вкладу в силу муравьёв, может позволить сильное нападение.', imageUrl: 'https://i.imgur.com/nOagTR5.png' },
    { type: 'beast', name: 'Таракан', cost: 4, power: 1, health: 1, special: 'Неуязвимость', desc: 'Символ Неуязвимости даёт способность возвращаться после смерти в руку игрока.', imageUrl: 'https://i.imgur.com/FSJQHfW.jpeg' },
    { type: 'beast', name: 'Опарыши', cost: 5, power: 1, health: 2, special: 'Трупоед', desc: 'Символ трупоед: если карта в руке, бесплатно займёт место умершей карты.', imageUrl: 'https://i.imgur.com/6m7nRlI.png' },
    { type: 'beast', name: 'Кольцевой Червь', cost: 1, power: 0, health: 1, special: 'Пожиратель', desc: 'Если съеден Выжившими у костра, они исчезают навсегда.', imageUrl: 'https://i.imgur.com/kIuNqIp.jpeg' },
    { type: 'beast', name: 'Странная Личинка', cost: 1, power: 0, health: 3, special: 'Метаморфоза', desc: 'Эволюционирует через три стадии: жизнь до кокона, кокон и вылупление в сильную форму.', imageUrl: 'https://i.imgur.com/v3LdsrY.png' },
    { type: 'beast', name: 'Жаба', cost: 1, power: 1, health: 2, special: 'Мощный прыжок', desc: 'Идеальная зенитная установка против летающих существ. Отбивает воздушные атаки.', imageUrl: 'https://i.imgur.com/t1HNlS9.png' },
    { type: 'beast', name: 'Гадюка', cost: 2, power: 1, health: 1, special: 'Смертельный укус', desc: 'Достаточно одной атаки, чтобы убить любого противника, сколько бы здоровья у него ни было.', imageUrl: 'https://i.imgur.com/Ajsejde.png' },
    { type: 'beast', name: 'Черепаха', cost: 2, power: 1, health: 6, special: 'Панцирь', desc: 'Одна из самых объёмных карт в игре. Отличная защита.', imageUrl: 'https://i.imgur.com/OSKrujM.png' },
    { type: 'beast', name: 'Сцинк', cost: 1, power: 1, health: 2, special: 'Потеря хвоста', desc: 'Единственная карта с символом потери хвоста. При смерти оставляет хвост.', imageUrl: 'https://i.imgur.com/LEvON0S.png' },
    { type: 'beast', name: 'Гекк', cost: 0, power: 1, health: 1, special: 'Нет', desc: 'Бесплатная карта. Суть в том, что вы сами должны создать её характеристики.', imageUrl: 'https://i.imgur.com/NAkDuWH.png' },
    { type: 'beast', name: 'Гремучник', cost: 6, power: 3, health: 1, special: 'Нет', desc: 'Быстрый дамагер с высокой стоимостью в 6 костей. Не выдержит более 2 ходов.', imageUrl: 'https://i.imgur.com/QcQl6B8.png' },
    { type: 'beast', name: 'Уроборос', cost: 2, power: 1, health: 1, special: 'Бессмертие', desc: 'Бессмертный и вечный: после смерти возвращается в руку, увеличивая параметры на 1.', imageUrl: 'https://i.imgur.com/sWOMk51.png' },
    { type: 'beast', name: 'Полевые мыши', cost: 2, power: 2, health: 2, special: 'Размножение', desc: 'Продолжает давать копии карты. Если символ передать другой карте, может быть чрезвычайно силён.', imageUrl: 'https://i.imgur.com/gzCI0Ht.png' },
    { type: 'beast', name: 'Крысиный Король', cost: 2, power: 2, health: 1, special: 'Костяной дар', desc: 'Когда погибает, даёт игроку 4 кости. Позволяет легко разыгрывать сильные костяные карты.', imageUrl: 'https://i.imgur.com/I5NsDdU.png' },
    { type: 'beast', name: 'Амальгама', cost: 2, power: 3, health: 3, special: 'Все родства', desc: 'Сочетает части тел всех животных: от белок до рептилий, псовых, птиц и насекомых.', imageUrl: 'https://i.imgur.com/Vhna4nW.png' },
    { type: 'bone', name: 'Амёба', cost: 2, power: 1, health: 2, special: 'Аморфность', desc: 'Бесформенное существо. Аморфность даёт возможность получить любой доступный символ.', imageUrl: 'https://i.imgur.com/uTKVD7w.png' },
    { type: 'bone', name: 'Крольчатник', cost: 1, power: 0, health: 2, special: 'Плодовитость', desc: 'Карта поддержки. После того, как сыграна, создаёт в руке Кролика, которого можно разыграть бесплатно.', imageUrl: 'https://i.imgur.com/knSj6yK.png' },
    { type: 'bone', name: 'Щупальце Звонка', cost: 2, power: 0, health: 3, special: 'Резонанс', desc: 'Сила зависит от расположения на поле. Чем ближе к звонку, тем выше урон. Максимум 4.', imageUrl: 'https://i.imgur.com/IvsRmFG.png' },
    { type: 'bone', name: 'Щупальце Руки', cost: 1, power: 0, health: 1, special: 'Счётчик карт', desc: 'Урон меняется в зависимости от карт в руке у игрока.', imageUrl: 'https://i.imgur.com/h82hzzJ.png' },
    { type: 'blood', name: 'Щупальце Зеркала', cost: 1, power: 0, health: 3, special: 'Зеркало', desc: 'Имеет ту же силу, что и карта противника напротив.', imageUrl: 'https://i.imgur.com/xn5fzdr.png' },
    { type: 'beast', name: 'Волчья Шкура', cost: 1, power: 1, health: 2, special: 'Превращение', desc: 'Может быть превращена в Волка.', imageUrl: 'https://i.imgur.com/Zrumd2x.png' },
    { type: 'beast', name: 'Золотая Шкура', cost: 2, power: 2, health: 3, special: 'Ценность', desc: 'Ценная шкура для торговли.', imageUrl: 'https://i.imgur.com/qwU09Id.png' },
    { type: 'beast', name: 'Кроличья Шкура', cost: 1, power: 1, health: 2, special: 'Мягкий мех', desc: 'Мягкая и тёплая шкура кролика.', imageUrl: 'https://i.imgur.com/RoWzd2E.png' },
    { type: 'blood', name: 'Белка', cost: 0, power: 0, health: 1, special: 'Жертва', desc: 'Бесплатная карта для жертвоприношений.', imageUrl: 'https://i.imgur.com/MDBPOcT.png' },
    
];
    
    for (const data of cardsList) {
        let card;
        if (data.type === 'beast') {
            card = new BeastCard(data.name, data.cost, data.desc, data.power, data.health, data.special, data.imageUrl ||'');
        } else if (data.type === 'bone') {
            card = new BoneCard(data.name, data.cost, data.desc, data.power, data.health, data.special, data.imageUrl ||'');
        } else {
            card = new BloodCard(data.name, data.cost, data.desc, data.power, data.health, data.special, data.imageUrl ||'');
        }
        this.cards.push(card);
    }
    
    this.saveToLocalStorage();
}

    saveToLocalStorage() {
        const cardsData = this.cards.map(card => {
            const base = {
                type: card.constructor.name,
                name: card.name,
                cost: card.cost,
                description: card.description,
                power: card.power,
                health: card.health,
                imageUrl: card.imageUrl,
                id: card.id
            };
            if (card instanceof BeastCard) base.sigil = card.sigil;
            if (card instanceof BoneCard) base.boneAbility = card.boneAbility;
            if (card instanceof BloodCard) base.ritualEffect = card.ritualEffect;
            return base;
        });
        localStorage.setItem('inscryptionCards', JSON.stringify(cardsData));
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('inscryptionCards');
        if (saved) {
            const cardsData = JSON.parse(saved);
            this.cards = cardsData.map(data => {
                let card;
                if (data.type === 'BeastCard') {
                    card = new BeastCard(data.name, data.cost, data.description, data.power, data.health, data.sigil, data.imageUrl);
                } else if (data.type === 'BoneCard') {
                    card = new BoneCard(data.name, data.cost, data.description, data.power, data.health, data.boneAbility, data.imageUrl);
                } else if (data.type === 'BloodCard') {
                    card = new BloodCard(data.name, data.cost, data.description, data.power, data.health, data.ritualEffect, data.imageUrl);
                } else return null;
                if (data.id) card.id = data.id;
                return card;
            }).filter(c => c !== null);
        }
    }

    addCard(card) {
        this.cards.push(card);
        this.saveToLocalStorage();
        this.render();
    }
    
    deleteCard(id) {
        this.cards = this.cards.filter(c => c.id !== id);
        this.saveToLocalStorage();
        this.render();
    }
    
    editCard(id, newData) {
        const index = this.cards.findIndex(c => c.id === id);
        if (index !== -1) {
            const old = this.cards[index];
            let newCard;
            if (old instanceof BeastCard) {
                newCard = new BeastCard(newData.name, newData.cost, newData.description, newData.power, newData.health, newData.special, newData.imageUrl);
            } else if (old instanceof BoneCard) {
                newCard = new BoneCard(newData.name, newData.cost, newData.description, newData.power, newData.health, newData.special, newData.imageUrl);
            } else {
                newCard = new BloodCard(newData.name, newData.cost, newData.description, newData.power, newData.health, newData.special, newData.imageUrl);
            }
            newCard.id = id;
            this.cards[index] = newCard;
            this.saveToLocalStorage();
            this.render();
        }
    }

    setEditMode(mode) {
        this.isEditMode = mode;
        this.render();
    }

    render() {
        const container = document.getElementById('cardsContainer');
        container.innerHTML = '';
        if (this.cards.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'empty-message';
            empty.innerHTML = 'НЕТ КАРТ В КОЛЛЕКЦИИ\nСоздайте новую карту в режиме редактирования';
            container.appendChild(empty);
        } else {
            this.cards.forEach(card => {
                const el = card.getHTML(this.isEditMode, (id) => this.deleteCard(id), (card) => this.showEditModal(card));
                container.appendChild(el);
            });
        }
    }

    showEditModal(card) {
        const modal = document.createElement('div');
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);display:flex;justify-content:center;align-items:center;z-index:2000;';
        
        const content = document.createElement('div');
        content.style.cssText = 'background:#1e1b14;border:3px solid #ecd9b4;border-radius:20px;padding:30px;min-width:400px;max-width:600px;';
        
        let specialLabel = '';
        let specialValue = '';
        if (card instanceof BeastCard) {
            specialLabel = 'Сигила';
            specialValue = card.sigil;
        } else if (card instanceof BoneCard) {
            specialLabel = 'Способность';
            specialValue = card.boneAbility;
        } else {
            specialLabel = 'Ритуальный эффект';
            specialValue = card.ritualEffect;
        }
        
        content.innerHTML = `
            <h3 style="color:#ecd9b4;margin-bottom:20px;">РЕДАКТИРОВАНИЕ КАРТЫ</h3>
            <input type="text" id="editName" value="${this.escapeHtml(card.name)}" placeholder="Название" style="width:100%;margin:8px 0;padding:10px;background:#0f0e0a;border:1px solid #8b7355;color:#ecd9b4;"><br>
            <input type="number" id="editCost" value="${card.cost}" placeholder="Стоимость" style="width:100%;margin:8px 0;padding:10px;background:#0f0e0a;border:1px solid #8b7355;color:#ecd9b4;"><br>
            <textarea id="editDesc" placeholder="Описание" style="width:100%;margin:8px 0;padding:10px;background:#0f0e0a;border:1px solid #8b7355;color:#ecd9b4;min-height:80px;">${this.escapeHtml(card.description)}</textarea><br>
            <div style="display:flex;gap:10px;">
                <input type="number" id="editPower" value="${card.power}" placeholder="Сила" style="flex:1;margin:8px 0;padding:10px;background:#0f0e0a;border:1px solid #8b7355;color:#ecd9b4;">
                <input type="number" id="editHealth" value="${card.health}" placeholder="Здоровье" style="flex:1;margin:8px 0;padding:10px;background:#0f0e0a;border:1px solid #8b7355;color:#ecd9b4;">
            </div>
            <input type="text" id="editSpecial" value="${this.escapeHtml(specialValue)}" placeholder="${specialLabel}" style="width:100%;margin:8px 0;padding:10px;background:#0f0e0a;border:1px solid #8b7355;color:#ecd9b4;"><br>
            <input type="text" id="editImage" value="${this.escapeHtml(card.imageUrl)}" placeholder="URL изображения" style="width:100%;margin:8px 0;padding:10px;background:#0f0e0a;border:1px solid #8b7355;color:#ecd9b4;"><br>
            <div style="margin-top:20px;">
                <button id="saveModalBtn" style="background:#4a5b3a;color:#ecd9b4;border:none;padding:10px 20px;margin-right:10px;cursor:pointer;">СОХРАНИТЬ</button>
                <button id="cancelModalBtn" style="background:#5a2a2a;color:#ecd9b4;border:none;padding:10px 20px;cursor:pointer;">ОТМЕНА</button>
            </div>
        `;
        
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        const saveBtn = document.getElementById('saveModalBtn');
        const cancelBtn = document.getElementById('cancelModalBtn');
        
        saveBtn.onclick = () => {
            const name = document.getElementById('editName').value;
            const cost = parseInt(document.getElementById('editCost').value);
            const power = parseInt(document.getElementById('editPower').value);
            const health = parseInt(document.getElementById('editHealth').value);

            if (!validateCardData(name, cost, power, health)) {
                return;
            }
    

            const newData = {
                name: name,
                cost: cost,
                description: document.getElementById('editDesc').value,
                power: power,
                health: health,
                special: document.getElementById('editSpecial').value,
                imageUrl: document.getElementById('editImage').value
            };
            
             this.editCard(card.id, newData);
            modal.remove();
        };
        
        cancelBtn.onclick = () => {
            modal.remove();
        };
    }
    
    escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}

const collection = new CardCollection();

const viewBtn = document.getElementById('viewModeBtn');
const editBtn = document.getElementById('editModeBtn');
const editPanel = document.getElementById('editPanel');

viewBtn.addEventListener('click', () => {
    viewBtn.classList.add('active');
    editBtn.classList.remove('active');
    collection.setEditMode(false);
    editPanel.classList.add('hidden');
});

editBtn.addEventListener('click', () => {
    editBtn.classList.add('active');
    viewBtn.classList.remove('active');
    collection.setEditMode(true);
    editPanel.classList.remove('hidden');
});

document.getElementById('addCardBtn').addEventListener('click', () => {
    const name = document.getElementById('newCardName').value;
    const type = document.getElementById('newCardType').value;
    const cost = parseInt(document.getElementById('newCardCost').value);
    const power = parseInt(document.getElementById('newCardPower').value);
    const health = parseInt(document.getElementById('newCardHealth').value);
    const sigil = document.getElementById('newCardSigil').value;
    const description = document.getElementById('newCardDescription').value;
    const imageUrl = document.getElementById('newCardImage').value;
    
    if (!validateCardData(name, cost, power, health)) {
        return;
    }
    
    let newCard;
    if (type === 'beast') {
        newCard = new BeastCard(name, cost, description || 'Обычная карта зверя', power, health, sigil, imageUrl);
    } else if (type === 'bone') {
        newCard = new BoneCard(name, cost, description || 'Обычная карта скелета', power, health, sigil, imageUrl);
    } else {
        newCard = new BloodCard(name, cost, description || 'Обычная карта жертвы', power, health, sigil, imageUrl);
    }
    
    collection.addCard(newCard);
    alert('Карта добавлена!');
    document.getElementById('newCardName').value = '';
    document.getElementById('newCardSigil').value = '';
    document.getElementById('newCardDescription').value = '';
    document.getElementById('newCardImage').value = '';
    document.getElementById('newCardCost').value = '';
    document.getElementById('newCardPower').value = '';
    document.getElementById('newCardHealth').value = '';
});

document.getElementById('saveToLocalBtn').addEventListener('click', () => {
    collection.saveToLocalStorage();
    alert('Коллекция сохранена!');
});

collection.render();
