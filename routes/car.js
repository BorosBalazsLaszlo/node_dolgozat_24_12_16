import express from 'express';
import { DbRun, DbQuery } from '../database.js';

router = express.router();

// GET - /cars 
router.get("/cars", async (req, res) =>{
    try{
        const car = await DbQuery("SELECT * FROM Cars", []);
        res.json(car);
    }
    catch (err) {
    res.status(500).json({ message: err.message});
    }
});

// GET - /cars:id
router.get("/cars/:id", async (req, res) =>{
    const carId = req.params.id;
    try{
        const [car] = await DbRun("SELECT * FROM Cars WHERE id = ?", [carId]);
        if (!car)
        {
            res.status(404).json({ message: "Nem található ilyen autó!"});
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST - /cars
router.post("/cars", async (req, res) =>{
    const { brand, model, color, year} = req.body;
    if (!brand || !model || !color || !year)
    {
        res.status(400).json({ message: "Töltsd ki az összes mezőt!"});
    }
    try{
        const result = await DbRun("INSERT INTO Cars (brand, model, color, year) VALUES(?,?,?,?)", 
            [brand, model, color, year]
        );
        res.status(201).json({message: "Új autó hozzáadva!"});
    }
    catch (err)
    {
        res.status(500).json({ message: err.message});
    }
});

// PUT - /cars/:id
router.put("/cars/:id", async (req, res) =>{
    const carId = req.params.id;
    const { brand, model, color, year} = req.body;
    if (!brand || !model || !color || !year)
    {
        res.status(400).json({ message: "Töltsd ki az összes mezőt!"});
    }
    try{
        const result = await DbRun("UPDATE Cars SET brand = ?, model = ?, color = ?, year = ?, id = ?",
            [brand, model, color, year, carId]
        );
        res.json(result);
    }
    catch (err)
    {
        res.status(500).json({ message: err.message});
    }
});

// DELETE - /cars/:id
router.delete("/cars/:id", async (req, res) =>{
    const carId = req.params.id;
    try{
        const result = await DbRun("DELETE FROM Cars WHERE id = ? ", [carId]);
        res.json(result)
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

export default router;