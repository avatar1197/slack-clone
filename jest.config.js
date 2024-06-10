module.exports = {
	testEnvironment: "jsdom",
	transformIgnorePatterns: ["node_modules/(?!(axios)/)"],
	transform: {
		"^.+\\.[t|j]sx?$": "babel-jest",
	},
	moduleNameMapper: {
		"\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/fileMock.js",
		"\\.(css)$": "<rootDir>/styleMock.js",
	},
}
