# Проект

Тема: Модели и методы распознавания образов на видео (для решения задачи оценки
концентрации внимания учащихся во время аудиторных занятий)

## Задачи

-   Изучение данных (видео с ЕГЭ)
-   Сбор датасета
-   Построение модели для распознавания людей на видео
-   Написание прототипа системы, позволяющей оценивать количество присутствующих
    людей на паре по видео файлу

### Кейс 1

#### Описание

Хранение датасета.

#### Структура таблицы:

```
CREATE TABLE IF NOT EXISTS labs.images (
    // uuid изображения
    id uuid,

    // расширение загруженного файла
    extension text,

    // uuid категории
    category_id uuid,

    // массив ограничительных рамок
    bbox list<frozen<bbox>>,

    //первичный ключ, состоящий из двух полей
    PRIMARY KEY (id, category_id)
);
```

Структура типа bbox:

```
CREATE TYPE IF NOT EXISTS labs.bbox (
    xmin int,
    xmax int,
    ymin int,
    ymax int
);
```

#### Запросы в рамках данного кейса:

1. Загрузить изображение

    ```
    BEGIN BATCH

    INSERT INTO labs.images (id, category_id, extension, bbox)
    VALUES (
       c87d5ce1-505c-4fdd-b432-4bf97102c651,
       b580aae8-3f73-4d7d-80db-bbc0d81e8416,
       'png',
       [{"xmin":1,"xmax":2,"ymin":1,"ymax":2}]
    );

    INSERT INTO labs.images (id, category_id, extension, bbox)
    VALUES (
       c87d5ce1-505c-4fdd-b432-4bf97102c651,
       b580aae8-3f73-4d7d-80db-bc09d81e8461,
       'png',
       [
           {"xmin":1,"xmax":2,"ymin":1,"ymax":2},
           {"xmin":1,"xmax":2,"ymin":1,"ymax":2},
           {"xmin":1,"xmax":2,"ymin":1, "ymax":2}
       ]
    );

    APPLY BATCH;
    ```

2. Получить список всех изображений

    ```
    SELECT * FROM labs.images;
    ```

3. Получить список изображений, относящихся к конкретной категории

    ```
    SELECT * FROM labs.images
    WHERE category_id=b580aae8-3f73-4d7d-80db-bbc0d81e8416
    ALLOW FILTERING;
    ```

4. Получить конкретное изображение по его id
    ```
    SELECT * FROM labs.images WHERE id=48a97e31-d244-4bb7-9f30-302b1880dea3;
    ```

### Кейс 2

#### Описание

Хранение категорий

#### Структура таблицы:

```
CREATE TABLE IF NOT EXISTS labs.categories (
    // id категории
    id uuid PRIMARY KEY,

    // название категории
    name text,

    // описание категории
    description text
);
```

#### Запросы в рамках данного кейса

1. Создание категории

    ```
    INSERT INTO labs.categories (id, name, description)
    VALUES (14bd2cc7-1cee-4aca-b8d3-01999b548608, 'person', 'person');
    ```

2. Получить список всех категорий
    ```
    SELECT id, name, description FROM labs.categories;
    ```

### Кейс 3

#### Описание

Хранение результатов работы прототипа

#### Структура таблицы:

```
CREATE TABLE IF NOT EXISTS labs.video (
    // id видео
    id uuid PRIMARY KEY,

    // расширение загруженного файла
    extension text,

    // количество кадров в секунду
    fps int,

    // массив, в котором индекс - номер кадра, значение - количество людей на кадре
    count_people_on_frames list<int>
);
```

#### Запросы в рамках данного кейса

1. Добавить видео для распознавания

    ```
    INSERT INTO labs.video (id, extension, fps, count_people_on_frames)
    VALUES (
        ec30acd5-c06c-4603-a340-ca6a4f153143,
        'mp4',
         15,
        [2,8,5,3,5,1,8,6,5,4,1,7,6,...]
    );
    ```

2. Получить список распознанных видео

    ```
    SELECT id FROM labs.video;
    ```

3. Получить информацию о видео по его id
    ```
    SELECT * FROM labs.video WHERE id=ecb85d12-803c-4728-91de-5ebc2695d509;
    ```
