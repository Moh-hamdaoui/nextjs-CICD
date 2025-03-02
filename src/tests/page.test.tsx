import { render, screen, fireEvent } from "@testing-library/react";
import Page from "../app/page";
import "@testing-library/jest-dom";

test("Affiche et ajoute une tâche", async () => {
  render(<Page />);

  const input = screen.getByPlaceholderText("Ajouter une tâche...");
  expect(input).toBeInTheDocument();

  fireEvent.change(input, { target: { value: "Nouvelle tâche" } });

  const button = screen.getByText("Ajouter");
  expect(button).toBeInTheDocument();
  fireEvent.click(button);

  const task = await screen.findByText("Nouvelle tâche");
  expect(task).toBeInTheDocument();
});
