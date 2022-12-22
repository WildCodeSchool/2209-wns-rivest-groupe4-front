import { test, expect } from "@playwright/test";

test("Code editor is functionnal", async ({ page }) => {
  await page.goto("http://localhost:3000/editor");

  await expect(page).toHaveTitle(/Codeless4/);
  await expect(page.getByAltText("save file")).toBeVisible();
  await expect(page.getByAltText("download file")).toBeVisible();
  await expect(page.getByAltText("share file")).toBeVisible();
  await expect(page.getByTestId("code_editor")).toBeVisible();
  await expect(page.getByAltText("arrow left")).toBeVisible();
  await expect(page.getByAltText("arrow right")).toBeHidden();
  await expect(page.getByTestId("code_result")).toBeHidden();

  const run = page.getByRole("button", { name: "Run" });
  await run.click();
  await expect(page.getByAltText("save file")).toBeVisible();
  await expect(page.getByAltText("download file")).toBeVisible();
  await expect(page.getByAltText("share file")).toBeVisible();
  await expect(page.getByTestId("code_editor")).toBeVisible();
  await expect(page.getByAltText("arrow left")).toBeHidden();
  await expect(page.getByAltText("arrow right")).toBeVisible();
  await expect(page.getByTestId("code_result")).toBeVisible();

  const arrowRight = page.getByAltText("arrow right");
  await arrowRight.click();
  await expect(page.getByAltText("save file")).toBeVisible();
  await expect(page.getByAltText("download file")).toBeVisible();
  await expect(page.getByAltText("share file")).toBeVisible();
  await expect(page.getByAltText("arrow left")).toBeVisible();
  await expect(page.getByAltText("arrow right")).toBeHidden();
  await expect(page.getByTestId("code_editor")).toBeVisible();
  await expect(page.getByTestId("code_result")).toBeHidden();

  const arrowLeft = page.getByAltText("arrow left");
  await arrowLeft.click();
  await expect(page.getByAltText("save file")).toBeVisible();
  await expect(page.getByAltText("download file")).toBeVisible();
  await expect(page.getByAltText("share file")).toBeVisible();
  await expect(page.getByTestId("code_editor")).toBeVisible();
  await expect(page.getByAltText("arrow left")).toBeHidden();
  await expect(page.getByAltText("arrow right")).toBeVisible();
  await expect(page.getByTestId("code_result")).toBeVisible();
});
