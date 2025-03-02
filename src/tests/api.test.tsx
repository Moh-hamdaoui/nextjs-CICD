import { POST, GET, PUT, DELETE } from "../app/api/tasks/route";

describe("API Tasks", () => {
  let taskId;

  test("Créer une tâche", async () => {
    const response = await POST({
      json: async () => ({ name: "Test Task", description: "Ceci est un test" }),
    });

    const data = await response.json();
    expect(response.status).toBe(201);
    expect(data.name).toBe("Test Task");
    taskId = data.id;
  });

  test("Récupérer les tâches", async () => {
    const response = await GET();
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  test("Mettre à jour une tâche", async () => {
    const response = await PUT({
      json: async () => ({ id: taskId, status: "DONE" }),
    });

    const data = await response.json();
    expect(data.status).toBe("DONE");
  });

  test("Supprimer une tâche", async () => {
    const response = await DELETE({
      json: async () => ({ id: taskId }),
    });

    const data = await response.json();
    expect(data.message).toBe("Tâche supprimée");
  });
});
