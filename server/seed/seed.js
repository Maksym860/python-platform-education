require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');

const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Theory = require('../models/Theory');
const Practice = require('../models/Practice');
const Test = require('../models/Test');

async function seed() {
  await connectDB();

  console.log('[Seed] Очищення старих даних...');
  await Promise.all([
    Course.deleteMany({}),
    Module.deleteMany({}),
    Lesson.deleteMany({}),
    Theory.deleteMany({}),
    Practice.deleteMany({}),
    Test.deleteMany({})
  ]);

  console.log('[Seed] Створення курсу...');
  const course = await Course.create({
    title: 'Основи програмування мовою Python',
    slug: 'python-basics',
    description:
      'Інтерактивний курс для учнів 7–8 класів: перші кроки у програмуванні мовою Python — від "Hello, world!" до умовних операторів.',
    level: 'beginner',
    image: 'python-course-cover.svg'
  });

  // ---------- Модуль 1: Знайомство з Python ----------
  const module1 = await Module.create({
    title: 'Знайомство з Python',
    slug: 'intro-to-python',
    description: 'Дізнаємось, що таке Python, навіщо він потрібен і як написати свою першу програму.',
    order: 1,
    icon: '🐍',
    courseId: course._id
  });

  const m1l1 = await Lesson.create({
    title: 'Що таке Python і навіщо він потрібен',
    slug: 'what-is-python',
    description: 'Знайомство з мовою програмування Python та сферами її застосування.',
    order: 1,
    moduleId: module1._id,
    estimatedMinutes: 8
  });

  await Theory.create([
    {
      lessonId: m1l1._id,
      order: 1,
      heading: 'Що таке Python?',
      text:
        'Python — це мова програмування, яку люди використовують, щоб "спілкуватися" з комп\'ютером і давати йому чіткі інструкції. Її створив нідерландський програміст Гвідо ван Россум у 1991 році. Python вважається однією з найпростіших мов для початківців, тому що її код нагадує звичайну англійську мову.',
      codeExamples: []
    },
    {
      lessonId: m1l1._id,
      order: 2,
      heading: 'Де застосовують Python',
      text:
        'Python використовують у розробці вебсайтів, аналізі даних, штучному інтелекті, автоматизації, іграх та навіть у керуванні роботами. Такі компанії, як Google, YouTube, Instagram та NASA, активно використовують Python у своїх проєктах.',
      codeExamples: []
    },
    {
      lessonId: m1l1._id,
      order: 3,
      heading: 'Перша програма: print()',
      text:
        'Функція print() виводить текст або результат обчислення на екран. Це перше, з чого починають вивчати будь-яку мову програмування — виведення привітання "Hello, world!".',
      codeExamples: [
        {
          caption: 'Наша перша програма',
          code: 'print("Hello, world!")',
          output: 'Hello, world!'
        },
        {
          caption: 'Виведення кількох рядків',
          code: 'print("Привіт!")\nprint("Мене звати Python.")',
          output: 'Привіт!\nМене звати Python.'
        }
      ]
    }
  ]);

  await Test.create({
    lessonId: m1l1._id,
    title: 'Перевір себе: Що таке Python',
    questions: [
      {
        question: 'Хто створив мову програмування Python?',
        options: ['Білл Гейтс', 'Гвідо ван Россум', 'Стів Джобс', 'Марк Цукерберг'],
        correctAnswerIndex: 1,
        explanation: 'Python створив нідерландський програміст Гвідо ван Россум у 1991 році.'
      },
      {
        question: 'Яка функція використовується для виведення тексту на екран?',
        options: ['input()', 'echo()', 'print()', 'show()'],
        correctAnswerIndex: 2,
        explanation: 'Функція print() виводить текст або значення змінних на екран.'
      },
      {
        question: 'Що виведе команда print("Hello!")?',
        options: ['Hello!', '"Hello!"', 'print', 'Помилку'],
        correctAnswerIndex: 0,
        explanation: 'Лапки лише позначають межі тексту (рядка), самі лапки на екран не виводяться.'
      }
    ]
  });

  await Practice.create({
    lessonId: m1l1._id,
    intro: 'Спробуй самостійно вивести на екран кілька рядків тексту.',
    tasks: [
      {
        order: 1,
        title: 'Виведи привітання',
        instructions: 'Напиши програму, яка виводить на екран текст "Привіт, Python!".',
        starterCode: '# Напиши свій код тут\n',
        solutionCode: 'print("Привіт, Python!")',
        expectedOutput: 'Привіт, Python!',
        hint: 'Використай функцію print() і не забудь про лапки навколо тексту.'
      },
      {
        order: 2,
        title: 'Три рядки про себе',
        instructions: 'Виведи три окремі рядки: своє ім\'я, улюблений колір і улюблену страву (можна вигадати).',
        starterCode: '# Три команди print()\n',
        solutionCode: 'print("Мене звати Настя")\nprint("Улюблений колір — бірюзовий")\nprint("Улюблена страва — вареники")',
        expectedOutput: "Мене звати Настя\nУлюблений колір — бірюзовий\nУлюблена страва — вареники",
        hint: 'Кожен рядок тексту виводь окремою командою print().'
      }
    ]
  });

  const m1l2 = await Lesson.create({
    title: 'Встановлення Python та перший запуск',
    slug: 'python-installation',
    description: 'Як встановити Python та запустити свій перший скрипт.',
    order: 2,
    moduleId: module1._id,
    estimatedMinutes: 10
  });

  await Theory.create([
    {
      lessonId: m1l2._id,
      order: 1,
      heading: 'Як встановити Python',
      text:
        'Щоб почати писати код, потрібно завантажити Python з офіційного сайту python.org та встановити його на комп\'ютер. Під час встановлення важливо поставити позначку "Add Python to PATH" — це дозволить запускати Python з будь-якої теки.',
      codeExamples: []
    },
    {
      lessonId: m1l2._id,
      order: 2,
      heading: 'Файл з розширенням .py',
      text:
        'Програми на Python зберігають у файлах з розширенням .py, наприклад hello.py. Такий файл можна запустити через термінал (командний рядок) або в спеціальних середовищах розробки, таких як VS Code чи PyCharm.',
      codeExamples: [
        {
          caption: 'Запуск файлу через термінал',
          code: 'python hello.py',
          output: 'Hello, world!'
        }
      ]
    },
    {
      lessonId: m1l2._id,
      order: 3,
      heading: 'Коментарі в коді',
      text:
        'Коментарі — це текст у коді, який Python ігнорує під час виконання. Вони допомагають пояснювати, що робить програма. Однорядковий коментар починається символом #.',
      codeExamples: [
        {
          caption: 'Приклад коментаря',
          code: '# Це коментар, він не виконується\nprint("Код працює!")',
          output: 'Код працює!'
        }
      ]
    }
  ]);

  await Test.create({
    lessonId: m1l2._id,
    title: 'Перевір себе: Встановлення та перший запуск',
    questions: [
      {
        question: 'З якого сайту офіційно завантажують Python?',
        options: ['python.org', 'python.com.ua', 'getpython.net', 'python-download.io'],
        correctAnswerIndex: 0,
        explanation: 'Офіційний сайт мови Python — python.org.'
      },
      {
        question: 'Яке розширення мають файли з кодом Python?',
        options: ['.pyt', '.python', '.py', '.pt'],
        correctAnswerIndex: 2,
        explanation: 'Файли з програмним кодом Python мають розширення .py.'
      },
      {
        question: 'Яким символом починається однорядковий коментар у Python?',
        options: ['//', '#', '<!--', '**'],
        correctAnswerIndex: 1,
        explanation: 'У Python однорядкові коментарі починаються символом решітки #.'
      }
    ]
  });

  await Practice.create({
    lessonId: m1l2._id,
    intro: 'Потренуйся писати код із коментарями — це корисна звичка з перших кроків.',
    tasks: [
      {
        order: 1,
        title: 'Код із поясненням',
        instructions:
          'Напиши програму з одним коментарем, що пояснює її мету, і однією командою print(), яка виводить назву твоєї улюбленої гри чи фільму.',
        starterCode: '# Тут напиши коментар\n# А тут — команду print()\n',
        solutionCode: '# Ця програма виводить мій улюблений фільм\nprint("Гаррі Поттер")',
        expectedOutput: 'Гаррі Поттер',
        hint: 'Коментар починається з #, і Python його просто ігнорує під час виконання.'
      }
    ]
  });

  const m1l3 = await Lesson.create({
    title: 'Змінні: перше знайомство',
    slug: 'variables-first-look',
    description: 'Що таке змінна і як зберігати дані в програмі.',
    order: 3,
    moduleId: module1._id,
    estimatedMinutes: 9
  });

  await Theory.create([
    {
      lessonId: m1l3._id,
      order: 1,
      heading: 'Що таке змінна',
      text:
        'Змінна — це "коробка" з іменем, у якій зберігається значення: число, текст або інше дане. Значення можна змінювати під час виконання програми, звідси й назва — "змінна".',
      codeExamples: [
        {
          caption: 'Створення змінних',
          code: 'name = "Оля"\nage = 13\nprint(name)\nprint(age)',
          output: 'Оля\n13'
        }
      ]
    },
    {
      lessonId: m1l3._id,
      order: 2,
      heading: 'Правила іменування змінних',
      text:
        'Ім\'я змінної може містити літери, цифри та символ підкреслення _, але не може починатися з цифри. Python чутливий до регістру: age та Age — це різні змінні.',
      codeExamples: [
        {
          caption: 'Коректні та некоректні імена',
          code: 'student_age = 13   # правильно\n2age = 13          # помилка: не можна починати з цифри',
          output: ''
        }
      ]
    }
  ]);

  await Test.create({
    lessonId: m1l3._id,
    title: 'Перевір себе: Змінні',
    questions: [
      {
        question: 'Що таке змінна в програмуванні?',
        options: [
          'Ім\'я файлу програми',
          '"Коробка" для зберігання значення',
          'Тип помилки',
          'Функція виведення тексту'
        ],
        correctAnswerIndex: 1,
        explanation: 'Змінна — це іменована область пам\'яті для зберігання значення.'
      },
      {
        question: 'Яке ім\'я змінної є некоректним у Python?',
        options: ['student_age', 'age2', '2age', '_score'],
        correctAnswerIndex: 2,
        explanation: 'Ім\'я змінної не може починатися з цифри.'
      }
    ]
  });

  await Practice.create({
    lessonId: m1l3._id,
    intro: 'Створи власні змінні та виведи їх значення на екран.',
    tasks: [
      {
        order: 1,
        title: 'Змінні про улюблену тварину',
        instructions:
          'Створи змінну animal з назвою твоєї улюбленої тварини та змінну legs_count із кількістю її лап. Виведи обидві змінні.',
        starterCode: 'animal = ""\nlegs_count = 0\n# Виведи обидві змінні\n',
        solutionCode: 'animal = "кіт"\nlegs_count = 4\nprint(animal)\nprint(legs_count)',
        expectedOutput: 'кіт\n4',
        hint: 'Спочатку створи змінну через знак =, а потім передай її ім\'я у print().'
      }
    ]
  });

  // ---------- Модуль 2: Змінні та типи даних ----------
  const module2 = await Module.create({
    title: 'Змінні та типи даних',
    slug: 'variables-and-data-types',
    description: 'Розбираємось із типами даних Python та вчимось отримувати дані від користувача.',
    order: 2,
    icon: '🧩',
    courseId: course._id
  });

  const m2l1 = await Lesson.create({
    title: 'Типи даних у Python',
    slug: 'data-types',
    description: 'Числа, рядки, логічні значення та як їх розрізняти.',
    order: 1,
    moduleId: module2._id,
    estimatedMinutes: 10
  });

  await Theory.create([
    {
      lessonId: m2l1._id,
      order: 1,
      heading: 'Основні типи даних',
      text:
        'У Python найпоширеніші типи даних: int (цілі числа), float (дробові числа), str (рядки, тобто текст) та bool (логічний тип: True або False). Тип даних визначає, які дії можна виконувати зі значенням.',
      codeExamples: [
        {
          caption: 'Приклади різних типів',
          code: 'age = 13          # int\nheight = 1.62     # float\nname = "Максим"   # str\nis_student = True # bool',
          output: ''
        }
      ]
    },
    {
      lessonId: m2l1._id,
      order: 2,
      heading: 'Функція type()',
      text:
        'Щоб дізнатися тип значення, використовують функцію type(). Це особливо корисно під час налагодження програми.',
      codeExamples: [
        {
          caption: 'Перевірка типу',
          code: 'age = 13\nprint(type(age))',
          output: "<class 'int'>"
        }
      ]
    }
  ]);

  await Test.create({
    lessonId: m2l1._id,
    title: 'Перевір себе: Типи даних',
    questions: [
      {
        question: 'Який тип даних у Python зберігає дробові числа?',
        options: ['int', 'float', 'str', 'bool'],
        correctAnswerIndex: 1,
        explanation: 'Дробові числа зберігаються у типі float.'
      },
      {
        question: 'Яке значення поверне type("Привіт")?',
        options: ["<class 'int'>", "<class 'str'>", "<class 'bool'>", "<class 'float'>"],
        correctAnswerIndex: 1,
        explanation: 'Текст у лапках — це рядок, тобто тип str.'
      },
      {
        question: 'Які значення може приймати тип bool?',
        options: ['0 і 1 тільки', 'True і False', 'Yes і No', 'Будь-яке число'],
        correctAnswerIndex: 1,
        explanation: 'Логічний тип bool приймає лише два значення: True або False.'
      }
    ]
  });

  await Practice.create({
    lessonId: m2l1._id,
    intro: 'Створи змінні різних типів і перевір їх за допомогою type().',
    tasks: [
      {
        order: 1,
        title: 'Чотири типи даних',
        instructions:
          'Створи чотири змінні: ціле число, дробове число, рядок і логічне значення. Виведи тип кожної за допомогою type().',
        starterCode: 'a = 0\nb = 0.0\nc = ""\nd = True\n# Виведи тип кожної змінної\n',
        solutionCode: 'a = 5\nb = 3.14\nc = "Python"\nd = True\nprint(type(a))\nprint(type(b))\nprint(type(c))\nprint(type(d))',
        expectedOutput: "<class 'int'>\n<class 'float'>\n<class 'str'>\n<class 'bool'>",
        hint: 'Функція type(значення) повертає тип переданого значення.'
      }
    ]
  });

  const m2l2 = await Lesson.create({
    title: 'Введення даних: input()',
    slug: 'input-function',
    description: 'Як отримати дані від користувача під час виконання програми.',
    order: 2,
    moduleId: module2._id,
    estimatedMinutes: 9
  });

  await Theory.create([
    {
      lessonId: m2l2._id,
      order: 1,
      heading: 'Функція input()',
      text:
        'Функція input() дозволяє програмі "запитати" користувача та отримати від нього текст. Усе, що вводить користувач, input() завжди повертає як рядок (str), навіть якщо це число.',
      codeExamples: [
        {
          caption: 'Запит імені користувача',
          code: 'name = input("Як тебе звати? ")\nprint("Привіт, " + name + "!")',
          output: 'Як тебе звати? Оля\nПривіт, Оля!'
        }
      ]
    },
    {
      lessonId: m2l2._id,
      order: 2,
      heading: 'Перетворення типів',
      text:
        'Щоб перетворити введений текст на число, використовують функції int() або float(). Це потрібно, наприклад, коли треба виконати математичні обчислення з введеним значенням.',
      codeExamples: [
        {
          caption: 'Перетворення рядка на число',
          code: 'age = input("Скільки тобі років? ")\nage = int(age)\nprint(age + 1)',
          output: 'Скільки тобі років? 13\n14'
        }
      ]
    }
  ]);

  await Test.create({
    lessonId: m2l2._id,
    title: 'Перевір себе: input()',
    questions: [
      {
        question: 'Який тип даних завжди повертає функція input()?',
        options: ['int', 'float', 'str', 'bool'],
        correctAnswerIndex: 2,
        explanation: 'input() завжди повертає введений текст як рядок (str).'
      },
      {
        question: 'Яка функція перетворює рядок на ціле число?',
        options: ['str()', 'int()', 'input()', 'print()'],
        correctAnswerIndex: 1,
        explanation: 'Функція int() перетворює значення на ціле число.'
      }
    ]
  });

  await Practice.create({
    lessonId: m2l2._id,
    intro: 'Попрактикуйся отримувати дані від користувача та працювати з ними.',
    tasks: [
      {
        order: 1,
        title: 'Привітання за іменем',
        instructions: 'Запитай в користувача ім\'я через input() і виведи привітання з цим іменем.',
        starterCode: 'name = input("Як тебе звати? ")\n# Виведи привітання\n',
        solutionCode: 'name = input("Як тебе звати? ")\nprint("Привіт, " + name + "! Раді бачити тебе на уроці Python.")',
        expectedOutput: 'Як тебе звати? Дмитро\nПривіт, Дмитро! Раді бачити тебе на уроці Python.',
        hint: 'Об\'єднати текст і змінну можна знаком +, якщо обидва — рядки (str).'
      },
      {
        order: 2,
        title: 'Наступний рік',
        instructions: 'Запитай вік користувача, перетвори на число і виведи, скільки йому буде років через рік.',
        starterCode: 'age = input("Скільки тобі років? ")\n# Перетвори на число і виведи age + 1\n',
        solutionCode: 'age = input("Скільки тобі років? ")\nage = int(age)\nprint("Через рік тобі буде", age + 1)',
        expectedOutput: 'Скільки тобі років? 13\nЧерез рік тобі буде 14',
        hint: 'Спочатку перетвори значення функцією int(), інакше додавання 1 викличе помилку.'
      }
    ]
  });

  // ---------- Модуль 3: Умовні оператори ----------
  const module3 = await Module.create({
    title: 'Умовні оператори',
    slug: 'conditional-statements',
    description: 'Навчаємо програму приймати рішення за допомогою if, elif та else.',
    order: 3,
    icon: '🔀',
    courseId: course._id
  });

  const m3l1 = await Lesson.create({
    title: 'Оператор if та else',
    slug: 'if-else',
    description: 'Як програма може обирати одну з двох дій залежно від умови.',
    order: 1,
    moduleId: module3._id,
    estimatedMinutes: 10
  });

  await Theory.create([
    {
      lessonId: m3l1._id,
      order: 1,
      heading: 'Що таке умовний оператор',
      text:
        'Умовний оператор дозволяє програмі приймати рішення: якщо умова істинна (True) — виконується один блок коду, інакше (False) — інший. Ключове слово if перекладається як "якщо", а else — "інакше".',
      codeExamples: [
        {
          caption: 'Перевірка віку',
          code: 'age = 13\nif age >= 12:\n    print("Ти учень середньої школи")\nelse:\n    print("Ти ще молодший учень")',
          output: 'Ти учень середньої школи'
        }
      ]
    },
    {
      lessonId: m3l1._id,
      order: 2,
      heading: 'Відступи мають значення',
      text:
        'На відміну від багатьох інших мов, у Python відступи (зазвичай 4 пробіли) визначають, які рядки належать до блоку коду всередині if чи else. Без правильних відступів програма видасть помилку.',
      codeExamples: [
        {
          caption: 'Порівняльні оператори',
          code: '# ==  дорівнює\n# !=  не дорівнює\n# >   більше\n# <   менше\n# >=  більше або дорівнює\n# <=  менше або дорівнює',
          output: ''
        }
      ]
    }
  ]);

  await Test.create({
    lessonId: m3l1._id,
    title: 'Перевір себе: if / else',
    questions: [
      {
        question: 'Що виконується, якщо умова в if є хибною (False)?',
        options: ['Нічого не виконується', 'Блок коду після else, якщо він є', 'Програма завершується з помилкою', 'Блок if виконується все одно'],
        correctAnswerIndex: 1,
        explanation: 'Якщо умова хибна, виконується блок else (якщо він присутній).'
      },
      {
        question: 'Що визначає, які рядки належать до блоку if у Python?',
        options: ['Фігурні дужки {}', 'Відступи (пробіли)', 'Крапка з комою ;', 'Слово end'],
        correctAnswerIndex: 1,
        explanation: 'У Python приналежність рядка до блоку визначається відступом.'
      },
      {
        question: 'Який оператор перевіряє, чи два значення НЕ рівні?',
        options: ['==', '=', '!=', '<>'],
        correctAnswerIndex: 2,
        explanation: 'Оператор != перевіряє нерівність значень.'
      }
    ]
  });

  await Practice.create({
    lessonId: m3l1._id,
    intro: 'Напиши свою першу програму з умовним оператором.',
    tasks: [
      {
        order: 1,
        title: 'Перевірка числа',
        instructions:
          'Створи змінну number зі значенням 7. Якщо число більше за 5 — вивести "Число більше за 5", інакше — "Число 5 або менше".',
        starterCode: 'number = 7\n# Твій if / else тут\n',
        solutionCode: 'number = 7\nif number > 5:\n    print("Число більше за 5")\nelse:\n    print("Число 5 або менше")',
        expectedOutput: 'Число більше за 5',
        hint: 'Не забудь про двокрапку після умови та відступ у 4 пробіли на наступному рядку.'
      }
    ]
  });

  const m3l2 = await Lesson.create({
    title: 'Оператор elif та вкладені умови',
    slug: 'elif-nested-conditions',
    description: 'Перевіряємо кілька умов підряд за допомогою elif.',
    order: 2,
    moduleId: module3._id,
    estimatedMinutes: 11
  });

  await Theory.create([
    {
      lessonId: m3l2._id,
      order: 1,
      heading: 'Оператор elif',
      text:
        'Коли потрібно перевірити більше двох варіантів, використовують elif (скорочення від "else if"). Python перевіряє умови по черзі й виконує перший блок, умова якого істинна.',
      codeExamples: [
        {
          caption: 'Оцінювання результату тесту',
          code: 'score = 82\nif score >= 90:\n    print("Відмінно")\nelif score >= 70:\n    print("Добре")\nelif score >= 50:\n    print("Задовільно")\nelse:\n    print("Потрібно повторити тему")',
          output: 'Добре'
        }
      ]
    },
    {
      lessonId: m3l2._id,
      order: 2,
      heading: 'Вкладені умови',
      text:
        'Умовний оператор можна розмістити всередині іншого — це називається вкладеною умовою. Так можна перевіряти складніші комбінації умов.',
      codeExamples: [
        {
          caption: 'Приклад вкладеної умови',
          code: 'age = 13\nhas_id = True\n\nif age >= 12:\n    if has_id:\n        print("Доступ дозволено")\n    else:\n        print("Потрібен учнівський квиток")\nelse:\n    print("Доступ заборонено")',
          output: 'Доступ дозволено'
        }
      ]
    }
  ]);

  await Test.create({
    lessonId: m3l2._id,
    title: 'Перевір себе: elif та вкладені умови',
    questions: [
      {
        question: 'Що означає ключове слово elif?',
        options: ['"else if" — інакше якщо', '"end if" — кінець умови', '"equal if" — рівність', '"else final" — остаточно інакше'],
        correctAnswerIndex: 0,
        explanation: 'elif — це скорочення від "else if", тобто "інакше, якщо".'
      },
      {
        question: 'Скільки блоків коду виконається, якщо є кілька елементів elif і всі умови істинні?',
        options: ['Усі, що мають істинну умову', 'Жодного', 'Лише перший блок з істинною умовою', 'Лише останній блок'],
        correctAnswerIndex: 2,
        explanation: 'Python виконує лише перший блок, умова якого виявилась істинною, і пропускає решту.'
      },
      {
        question: 'Як називається умовний оператор, розміщений всередині іншого умовного оператора?',
        options: ['Дублікат', 'Вкладена умова', 'Рекурсивна умова', 'Побічна умова'],
        correctAnswerIndex: 1,
        explanation: 'Умова всередині іншої умови називається вкладеною.'
      }
    ]
  });

  await Practice.create({
    lessonId: m3l2._id,
    intro: 'Об\'єднай усе, що вивчив: змінні, введення даних та кілька умов підряд.',
    tasks: [
      {
        order: 1,
        title: 'Оцінка за балами',
        instructions:
          'Створи змінну score зі значенням 65. Виведи "Відмінно" якщо score >= 90, "Добре" якщо score >= 70, "Задовільно" якщо score >= 50, інакше — "Потрібно повторити тему". Використай if / elif / else.',
        starterCode: 'score = 65\n# Твоя перевірка тут\n',
        solutionCode:
          'score = 65\nif score >= 90:\n    print("Відмінно")\nelif score >= 70:\n    print("Добре")\nelif score >= 50:\n    print("Задовільно")\nelse:\n    print("Потрібно повторити тему")',
        expectedOutput: 'Задовільно',
        hint: 'Умови elif перевіряються по черзі зверху вниз — постав їх у правильному порядку, від більшого до меншого.'
      }
    ]
  });

  console.log('[Seed] Готово! Дані успішно завантажено в базу даних.');
  console.log(`[Seed] Курс: ${course.title}`);
  console.log('[Seed] Модулі: 3, Уроки: 7, Тестів: 7, Практичних блоків: 7');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('[Seed] Помилка:', err);
  process.exit(1);
});
