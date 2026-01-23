import prisma from "../../prisma.js";
import { canTransition } from "../../utils/transition.js";

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const {
      description,
      latitude,
      longitude,
      status,
      price,
      runnerId,
    } = req.body;

    let task;

    if (req.user.role === "USER") {
      task = await prisma.task.findFirst({
        where: {
          id,
          userId: req.user.id,
        },
      });

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      if (status && !canTransition("USER", task.status, status)) {
        return res.status(400).json({ error: "Invalid status transition" });
      }

      task = await prisma.task.update({
        where: { id },
        data: {
          description,
          latitude,
          longitude,
          status,
        },
      });
    }

    else if (req.user.role === "RUNNER") {
      task = await prisma.task.findFirst({
        where: {
          id,
          runnerId: req.user.id,
        },
      });

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      if (!canTransition("RUNNER", task.status, status)) {
        return res.status(400).json({ error: "Invalid status transition" });
      }

      task = await prisma.task.update({
        where: { id },
        data: { status },
      });
    }

    else if (req.user.role === "ADMIN") {
      task = await prisma.task.findFirst({
        where: { id },
      });

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      if (status && !canTransition("ADMIN", task.status, status)) {
        return res.status(400).json({ error: "Invalid status transition" });
      }

      task = await prisma.task.update({
        where: { id },
        data: {
          price,
          status,
          runnerId,
        },
      });
    }

    else {
      return res.status(403).json({ error: "Invalid role" });
    }

    return res.status(200).json({
      message: "Task was updated successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default updateTask;
