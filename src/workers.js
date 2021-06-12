class Data {
  getWorkers(quantity) {
    let workers = [];

    for (let i = 0; i < quantity; i++) {
      workers.push({
        number: `${i + 1}`,
        name: "John Wick",
        shift: {
          start: "00:00",
          end: "01:00",
          sum: 1,
          getFormat: function () {
            return `${this.start} - ${this.end} (${this.sum}h.)`; //Форматирует под таблицу, удобнее иметь все эти значения по отдельности
          },
        },
      });
    }

    return workers;
  }

  getTasks(quantity){
    let tasks = [];

    for (let i = 0; i < quantity; i++) {
      tasks.push({
        id: `${i + 1}`,
        name: `Task name ${i + 1}`,
        color_id: `${i + 1}`,
        shift_key: '',
      })      

    }

    return tasks;
  }
}

export default new Data();
