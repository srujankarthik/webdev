const Task = require('../models/Task');
const express = require('express');

// @desc    Get all tasks
// @route   Get /api/v1/tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(201).json({tasks});
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

// @desc    Create a single task
// @route   POST /api/v1/tasks
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

// @desc    Get a single task
// @route   Get /api/v1/tasks/:id
const getSingleTask = async (req, res) => {
    try {
        const {id: taskID} = req.params
        const task = await Task.findOne({_id: taskID}); 
        if(!task) {
            return res.status(404).json({msg: `No task with id: ${taskID}`})
        }
        res.status(201).json({task});
    } catch (error) {
        res.status(500).json({msg: error});
    }
    // res.json({id: req.params.id})
}

// @desc    Update a single task
// @route   PUT /api/v1/tasks/:id
const updateTask = async (req, res) => {
    try {
        const {id: taskID} = req.params
        const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
            new: true, 
            runValidators: true
        });
        if(!task) {
            return res.status(404).json({msg: `Can't replace task id: ${taskID}`});
        }
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg: error});
    }
} 

// @desc    Delete a single task
// @route   DELETE /api/v1/tasks/:id
const deleteTask = async (req, res) => {
    try {
        const {id: taskID} = req.params
        const task = await Task.findOneAndDelete({_id: taskID});
        if(!task) {
            return res.status(404).json({msg: `Cant delete task id: ${taskID}`});
        }
        res.status(200).json({task, msg: `Deleted task id of ${taskID}`})
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

module.exports = {
    getTasks,
    createTask,
    getSingleTask, 
    updateTask, 
    deleteTask
}