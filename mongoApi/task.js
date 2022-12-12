const mongoTask = require('../models/task')

const create = async (task) => {
  const newTask = new mongoTask(task)

  return await newTask.save()
}

const updateStatus = async (id, active) => {
  const updateLog = await mongoTask.updateOne({_id : id}, {active})

  return updateLog
}

const updateDescription = async (id, description) => {
  const updateLog = await mongoTask.updateOne({ _id: id }, description)

  return updateLog
}

const updateLabel = async (id, label) => {
  const updateLog = await mongoTask.updateOne({ _id: id }, label)

  return updateLog
}

const remove = async (id) => {
  const removeLog = await mongoTask.deleteOne({ _id, id })

  return removeLog
}

module.exports = {
  model: mongoTask,
  create,
  updateDescription,
  updateLabel,
  updateStatus,
  remove
}