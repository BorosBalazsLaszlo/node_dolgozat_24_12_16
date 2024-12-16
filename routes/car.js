import express from 'express';
import { DbRun, DbQuery } from '../database.js';

const router = express.Router();

// GET - /cars 
router.get("/cars", async (req, res) => {
    try {
        const cars = await DbQuery("SELECT * FROM Cars", []);
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET - /cars/:id
router.get("/cars/:id", async (req, res) => {
    const carId = req.params.id;
    try {
        const car = await DbQuery("SELECT * FROM Cars WHERE id = ?", [carId]);
        if (car.length === 0) {
            res.status(404).json({ message: "Nem található ilyen autó!" });
        } else {
            res.json(car[0]);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST - /cars
router.post("/cars", async (req, res) => {
    const { brand, model, color, year } = req.body;
    if (!brand || !model || !color || !year) {
        res.status(400).json({ message: "Töltsd ki az összes mezőt!" });
        return;
    }
    try {
        await DbRun("INSERT INTO Cars (brand, model, color, year) VALUES(?,?,?,?)", 
            [brand, model, color, year]
        );
        res.status(201).json({ message: "Új autó hozzáadva!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT - /cars/:id
router.put("/cars/:id", async (req, res) => {
    const carId = req.params.id;
    const { brand, model, color, year } = req.body;
    if (!brand || !model || !color || !year) {
        res.status(400).json({ message: "Töltsd ki az összes mezőt!" });
        return;
    }
    try {
        await DbRun("UPDATE Cars SET brand = ?, model = ?, color = ?, year = ? WHERE id = ?", 
            [brand, model, color, year, carId]
        );
        res.json({ message: "Autó frissítve!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE - /cars/:id
router.delete("/cars/:id", async (req, res) => {
    const carId = req.params.id;
    try {
        await DbRun("DELETE FROM Cars WHERE id = ?", [carId]);
        res.json({ message: "Autó törölve!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;