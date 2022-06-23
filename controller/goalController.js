import { goal } from "../model/goal.js"
import { user } from "../model/usermodal.js"

export const getGoals = async (req, res) => {
    const goals = await goal.find({ user: req.user.id })

    res.status(200).json(goals)
}
export const setGoal = async (req, res) => {
    if (!req.body) return res.status(400).json("Pls add a text field")

    const _goal = await goal.create({
        text: req.body.text,
        user: req.user.id,
    })
    res.status(200).json(_goal)
}
export const updateGoal = async (req, res) => {
    const goal1 = await goal.findById(req.params.id)
    if (!goal1) return res.status(400).json("User not found")
    ///token-i user
    const _user = await user.findById(req.user.id)
    ///toke-i userin id, post update hiih gej bga userin ID tai taarq bol butsaana
    if (goal1.user.toString() !== _user.id) {
        return res.status(400).send('User not authorized')
    }
    const updated = await goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updated)
}
export const deleteGoal = async (req, res) => {
    const goal1 = await goal.findById(req.params.id)
    const _user = await user.findById(req.user.id)
    if (goal1.user.toString() !== _user.id) {
        return res.status(400).send('user not authorized')
    }
    const del = await goal.findByIdAndDelete(req.params.id, req.body)
    res.status(200).json(del)
}