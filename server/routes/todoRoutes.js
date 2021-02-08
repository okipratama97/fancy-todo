const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todoController')
const PublicApisController = require("../controllers/publicApisController")
const authenticate = require("../middlewares/authenticate")
const authorize = require('../middlewares/authorize')

router.use(authenticate)
router.post("/", TodoController.addTodo)
router.get("/", TodoController.list)
router.get("/weather", PublicApisController.weather)
router.use("/:id", authorize)
router.get("/:id", TodoController.findTodo)
router.put("/:id", TodoController.updateTodo)
router.patch("/:id", TodoController.updateTodoStatus)
router.delete("/:id", TodoController.deleteTodo)

module.exports = router