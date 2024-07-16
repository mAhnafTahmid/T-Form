import { nanoid } from "nanoid";
import Form from "../Models/formModel.js";
import User from "../Models/userModel.js";

export const createForm = async (req, res) => {
  try {
    const questions = req.body.questions;
    const userId = req.user._id;
    const code = nanoid(10);

    const existingForm = await Form.findOne({ code: code });
    if (existingForm) {
      return res
        .status(400)
        .json({ error: "Form with the same code already exists" });
    }

    const newForm = new Form({
      code: code,
      questions: questions,
    });

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.codes.push(code);
    await Promise.all([user.save(), newForm.save()]);

    res.status(200).json({ message: "Form creation successful", newForm });
  } catch (error) {
    console.error("Server error in creating answer:", error);
    res.status(500).json({ error: "Server error in creating form" });
  }
};

export const getForm = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Form code is required" });
    }

    const form = await Form.findOne({ code });

    if (!form) return res.status(404).json({ error: "Form not found" });

    res.status(200).json(form);
  } catch (error) {
    console.error("Server error in getting form:", error);
    res.status(500).json({ error: "Server error in fetching form" });
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { code, questions } = req.body;
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ error: "Invalid User" });
    }

    if (!code || !questions) {
      return res.status(400).json({ error: "Incomplete data received" });
    }

    const form = await Form.findOne({ code });
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    form.answers.push({ userId, questions });
    await form.save();

    res.status(200).json({ message: "Answers submitted successfully" });
  } catch (error) {
    console.error("Server error in submitting answer:", error);
    res.status(500).json({ error: "Server error in submitting answer" });
  }
};

export const findAnswer = async (req, res) => {
  try {
    const { code, id } = req.body;

    if (!code || !id) {
      return res.status(400).json({ error: "Incomplete data received" });
    }

    const form = await Form.findOne({ code });
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    const userAnswer = form.answers.find((ans) => ans.userId === id);
    if (!userAnswer) {
      return res
        .status(404)
        .json({ error: "Answer not found for the given user ID" });
    }

    const { questions } = userAnswer;
    res.status(200).json(questions);
  } catch (error) {
    console.error("Server error in finding answer:", error);
    res.status(500).json({ error: "Server error in finding answer" });
  }
};

export const getAllAnswer = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Incomplete data received" });
    }

    const form = await Form.findOne({ code });
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    const answers = form.answers;

    res.status(200).json(answers);
  } catch (error) {
    console.error("Server error in fetching answers:", error);
    res.status(500).json({ error: "Server error in fetching answers" });
  }
};
