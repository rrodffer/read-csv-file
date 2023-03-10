import xlsx from "xlsx";
import Tasks from '../models/tasks.js';

async function createTask(req, res) {
  try {
    const { file } = req;

    const readXLSXFile = xlsx.read(file.buffer, { type: 'buffer', cellDates: true, dateNF: 'dd/MM/yyyy' });
    const sheetNameList = readXLSXFile.SheetNames;


    let convertWorksheetToArray = xlsx.utils.sheet_to_json(readXLSXFile.Sheets[sheetNameList[0]], { origin: 'A2' });

    let createdTasks = [];
    for (let task of convertWorksheetToArray) {
      const createTask = await Tasks.create(task);
      createdTasks.push(createTask)
    }

    return res.status(201).json(createdTasks)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal sever error' })
  }
}

async function getTasks(req, res) {
  try {
    let searchByTitle = '';
    let searchByDesc = '';

    if (req.query.title) {
      searchByTitle = req.query.title
    }

    if (req.query.description) {
      searchByDesc = req.query.description
    }

    const getAllTasks = await Tasks.find({ "title": { "$regex": searchByTitle, "$options": "i" }, "description": { "$regex": searchByDesc, "$options": "i" } });

    return res.status(200).json(getAllTasks)
  } catch (error) {
    res.status(500).json({ message: 'Internal sever error' })
  }
}

async function putTask(req, res) {
  try {
    const { id } = req.params;

    const existsTaskId = await Tasks.exists({ _id: id })

    if (!existsTaskId) {
      return res.status(400).json({ message: 'Task não encontrada' })
    }

    const updateTask = await Tasks.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      {
        new: true,
      },
    )

    return res.status(200).json(updateTask)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal sever error' })
  }
}

async function patchTask(req, res) {
  try {
    const { id } = req.params;

    const existsTaskId = await Tasks.exists({ _id: id })

    if (!existsTaskId) {
      return res.status(400).json({ message: 'Task não encontrada' })
    }

    const completedTask = await Tasks.findByIdAndUpdate(
      { _id: id },
      { $set: { completed_at: new Date() } },
      {
        new: true,
      },
    )

    return res.status(200).json(completedTask)
  } catch (error) {
    res.status(500).json({ message: 'Internal sever error' })
  }
}

async function deleteTask(req, res) {
  try {
    const { id } = req.params;

    const existsTaskId = await Tasks.exists({ _id: id })

    if (!existsTaskId) {
      return res.status(400).json({ message: 'Task não encontrada' })
    }

    const deleteTask = await Tasks.findByIdAndDelete({ _id: id })

    return res.status(200).json(deleteTask)
  } catch (error) {
    res.status(500).json({ message: 'Internal sever error' })
  }
}

export default { createTask, getTasks, putTask, patchTask, deleteTask }
