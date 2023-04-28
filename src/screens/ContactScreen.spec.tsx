/* eslint-disable testing-library/no-unnecessary-act */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import ContactScreen, { SEND_MAIL } from "./ContactScreen";

const mocks: Array<MockedResponse> = [
  { request: { query: SEND_MAIL }, result: { data: {} } },
];

describe("Contact page", () => {
  describe("with valid input", () => {
    it("calls the onSubmit function", async () => {
      render(
        <MockedProvider mocks={mocks}>
          <ContactScreen />
        </MockedProvider>,
      );

      await act(async () => {
        fireEvent.change(screen.getByPlaceholderText("Enter your name"), {
          target: { value: "test" },
        });

        fireEvent.change(screen.getByPlaceholderText("Enter your mail"), {
          target: { value: "email@test.com" },
        });

        fireEvent.change(screen.getByPlaceholderText("Explain your problem"), {
          target: { value: "this is a good reason" },
        });
      });

      await act(async () => {
        fireEvent.click(screen.getByRole("button"));
      });

      expect(screen.getByRole("button", { name: "SEND" })).toBeDefined();
    });
  });

  describe("with invalid name", () => {
    it("renders the name validation error", async () => {
      const { container } = render(
        <MockedProvider mocks={mocks}>
          <ContactScreen />
        </MockedProvider>,
      );

      await act(async () => {
        const nameInput = screen.getByPlaceholderText("Enter your name");
        fireEvent.change(nameInput, { target: { value: null } });
        fireEvent.blur(nameInput);
      });
      await act(async () => {
        fireEvent.click(screen.getByRole("button"));
      });

      expect(container.innerHTML).toMatch("Name is required");
    });
  });

  describe("with invalid email", () => {
    it("renders the name validation error", async () => {
      const { container } = render(
        <MockedProvider mocks={mocks}>
          <ContactScreen />
        </MockedProvider>,
      );

      await act(async () => {
        const mailInput = screen.getByPlaceholderText("Enter your mail");
        fireEvent.change(mailInput, { target: { value: null } });
        fireEvent.blur(mailInput);
      });
      await act(async () => {
        fireEvent.click(screen.getByRole("button"));
      });

      expect(container.innerHTML).toMatch("Email is required");
    });
  });

  describe("with invalid reason", () => {
    it("renders the name validation error", async () => {
      const { container } = render(
        <MockedProvider mocks={mocks}>
          <ContactScreen />
        </MockedProvider>,
      );

      await act(async () => {
        const reasonInput = screen.getByPlaceholderText("Explain your problem");
        fireEvent.change(reasonInput, { target: { value: null } });
        fireEvent.blur(reasonInput);
      });
      await act(async () => {
        fireEvent.click(screen.getByRole("button"));
      });

      expect(container.innerHTML).toMatch("Reason is required");
    });
  });
});
