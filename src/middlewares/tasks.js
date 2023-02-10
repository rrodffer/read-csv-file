async function createTask(req, res) {
  try {
    return res.status(200).json({ message: 'POST' })
  } catch (error) {
    res.status(500).json({ message: 'Internal sever error' })
  }
}

async function getTasks(req, res) {
  try {
    return res.status(200).json({ message: 'GET' })
  } catch (error) {
    res.status(500).json({ message: 'Internal sever error' })
  }
}

async function putTask(req, res) {
  try {
    return res.status(200).json({ message: 'PUT' })
  } catch (error) {
    res.status(500).json({ message: 'Internal sever error' })
  }
}

async function patchTask(req, res) {
  try {
    return res.status(200).json({ message: 'PATCH' })
  } catch (error) {
    res.status(500).json({ message: 'Internal sever error' })
  }
}

async function deleteTask(req, res) {
  try {
    return res.status(200).json({ message: 'DELETE' })
  } catch (error) {
    res.status(500).json({ message: 'Internal sever error' })
  }
}

export default { createTask, getTasks, putTask, patchTask, deleteTask }
