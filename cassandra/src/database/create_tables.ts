// Кейс 1 - сохранение результатов работы прототипа
// У нас стояла задача подсчета количества людей в аудитории, есть видосы егэ, на них пробовали
// Так же по этим данным можно посмотреть статистику в какой момент сколько людей было в аудитории, может кто-то выходил или наоборот приходил, для этого мы создали еще одну табличку со следующей структурой
// Таблица результатов
//      Путь до файла
//      Номер кадра
//      Количество людей в аудитории

export const createVideoTable = `
  CREATE TABLE IF NOT EXISTS labs.video (
    id uuid PRIMARY KEY,
    extension text,
    fps int,
    count_people_on_frames list<int>
  );
`;

// Кейс 2 - загрузка датасета в Cassandra
// В будущем мы планировали уже сами как-то собирать датасет и на данный момент предполагаем, что нам понадобится следующая структура данных для этого
// Таблица для датасета
//      id
//      Путь до изображения
//      4 значения bbox
//      id категории
export const createBboxType = `
    CREATE TYPE IF NOT EXISTS labs.bbox (
      xmin int,
      xmax int, 
      ymin int,
      ymax int
    );
`;

export const createImagesTable = `
  CREATE TABLE IF NOT EXISTS labs.images (
      id uuid,
      extension text,
      category_id uuid, 
      bbox list<frozen<bbox>>,
      PRIMARY KEY (id, category_id)
  );
`;

// Кейс 3 - загрузка словаря категорий
// Таблица для категорий
//      id
//      Наименование категории
export const createCategoriesTable = `CREATE TABLE IF NOT EXISTS labs.categories (
    id uuid PRIMARY KEY,
    name text,
    description text
);`;
