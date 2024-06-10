// Sidebar.test.js
import React from "react" // Ensure React is imported
import {render, screen, fireEvent} from "@testing-library/react"
import "@testing-library/jest-dom"
import Sidebar from "../src/components/sidebar/Sidebar"

describe("Sidebar Component Tests", () => {
	beforeEach(() => {
		// Mocking localStorage for user and channels
		Storage.prototype.getItem = jest.fn((key) => {
			if (key === "user") return JSON.stringify({uid: "user@test.com"})
			if (key === "channels")
				return JSON.stringify([
					{name: "General", id: "general", type: "public"},
					{name: "Tech Talk", id: "tech_talk", type: "private"},
				])
			return null
		})
		Storage.prototype.setItem = jest.fn()
	})

	it("renders the sidebar with the initial user details", () => {
		render(<Sidebar />)
		expect(screen.getByText(/user/i)).toBeInTheDocument()
	})

	it("checks for the presence of the Logout button", () => {
		render(<Sidebar />)
		expect(screen.getByText("Logout")).toBeInTheDocument()
	})

	it("displays default channels", () => {
		render(<Sidebar />)
		expect(screen.getByText("General")).toBeInTheDocument()
		expect(screen.getByText("Tech Talk")).toBeInTheDocument()
	})
})
