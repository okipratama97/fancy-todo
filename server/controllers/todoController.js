const { Todo } = require("../models")

class TodoController {

  static async addTodo(req, res, next) {
    try {
      let { title, description, status, due_date, UserId } = req.body
      let input = { title, description, status, due_date, UserId }
      input.UserId = req.decoded.id
      input.status = input.status 

      const newTodo = await Todo.create(input, { returning: true })

      res.status(201).json(newTodo)
    } catch (err) {
      next(err)
    }
  }

  static async list(req, res, next) {
    try {
      const UserId = req.decoded.id
      const todos = await Todo.findAll({ where: { UserId }, order: [["id"]] })

      res.status(200).json(todos)
    } catch (err) {
      next(err)
    }
  }

  static async findTodo(req, res, next) {
    try {
      const todo = req.todo

      res.status(200).json(todo)
    } catch (err) {
      next(err)
    }
  }

  static async updateTodo(req, res, next) {
    try {
      let { title, description, status, due_date } = req.body
      let input = { title, description, status, due_date }
      const id = req.params.id

      const data = await Todo.update(input, { where: { id }, returning: true })
      if (!data[0]) throw { name: "error_404_todo_not_found" }

      const todo = data[1][0]

      res.status(200).json(todo)
    } catch (err) {
      next(err)
    }
  }

  static async updateTodoStatus(req, res, next) {
    try {
      let { status } = req.body
      let input = { status }
      const id = req.params.id

      const data = await Todo.update(input, { where: { id }, returning: true })
      if (!data[0]) throw { name: "error_404_todo_not_found" }

      const todo = data[1][0]

      res.status(200).json(todo)
    } catch (err) {
      next(err)
    }
  }

  static async deleteTodo(req, res, next) {
    try {
      const id = req.params.id
      const todo = req.todo

      const deletedRows = await Todo.destroy({ where: { id } })
      if (!deletedRows) throw { name: "error_404_todo_not_found" }

      res.status(200).json(todo)
    } catch (err) {
      next(err)
    }
  }

  

}

module.exports = TodoController