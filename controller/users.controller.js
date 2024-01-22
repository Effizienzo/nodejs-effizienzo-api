const pool = require("../database/index")

const usersController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM users")
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("SELECT * FROM users WHERE id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    create: async (req, res) => {
        try {
            const { vorname, name, benutzername, passwort, enddatum, loggedIn, isAdmin } = req.body
            const sql = "INSERT INTO users (vorname, name, benutzername, passwort, enddatum, loggedIn, isAdmin) VALUES (?, ?, ?, ?, ?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [vorname, name, benutzername, passwort, enddatum, loggedIn, isAdmin])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    update: async (req, res) => {
        try {
            const { vorname, name, benutzername, passwort, enddatum, loggedIn, isAdmin } = req.body
            const { id } = req.params
            const sql = "UPDATE users SET vorname = ?, name = ?, benutzername = ?, passwort = ?, enddatum = ?, loggedIn = ?, isAdmin = ? WHERE id = ?"
            const [rows, fields] = await pool.query(sql, [vorname, name, benutzername, passwort, enddatum, loggedIn, isAdmin, id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }, 
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("DELETE FROM users WHERE id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }
}

module.exports = usersController
