# KRA Dev Snippets 2026

A VS Code extension designed for developers in Kenya integrating with KRA (Kenya Revenue Authority) systems like eTIMS and TIMS fiscal devices.

## Features

- **KRA Tax Calculation**: Select a number in your editor and run the command `KRA: Calculate 16% VAT on Selection` to generate a formatted tax summary.
- **eTIMS Payload Templates**: Quick insertion of eTIMS JSON headers and payload structures.
- **Smart Snippets**: Built-in support for JavaScript, TypeScript, and JSON files.

## Snippets

- `kra-tims-payload`: Full TIMS API JSON structure.
- `kra-vat-calc`: JavaScript utility function for VAT calculations.
- `kra-tax-codes`: Documentation reference for KRA tax category codes (A, B, C, D, E).

## Usage

1. Open a JS or JSON file.
2. Type `kra-` to see available snippets.
3. Highlight a number (e.g., `5000`) and press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Win/Linux) and search for **KRA: Calculate 16% VAT on Selection**.

## Release Notes

### 1.0.0
- Initial release with 16% VAT logic and eTIMS boilerplate.