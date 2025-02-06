import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const tasks = await prisma.task.findMany();
  return Response.json(tasks);
}

export async function POST(req) {
  const { name, description, status } = await req.json();
  if (!name) return Response.json({ error: "Le nom est requis" }, { status: 400 });

  const newTask = await prisma.task.create({
    data: {
      name,
      description: description || "",
      status: status || "PENDING",
    },
  });

  return Response.json(newTask, { status: 201 });
}

export async function PUT(req) {
  const { id, status } = await req.json();
  const updatedTask = await prisma.task.update({
    where: { id: Number(id) },
    data: { status: status || "DONE" }, 
  });

  return Response.json(updatedTask);
}

export async function DELETE(req) {
  const { id } = await req.json();
  await prisma.task.delete({ where: { id: Number(id) } });

  return Response.json({ message: "Tâche supprimée" });
}
