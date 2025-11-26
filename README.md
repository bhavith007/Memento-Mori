# Memento Mori - Life Grid

> *"You could leave life right now. Let that determine what you do and say and think."* — Marcus Aurelius

A stoic visualization of human existence, mapping the average life expectancy into a grid of months. This application serves as a digital "Memento Mori" (remember you must die), designed to inspire urgency, gratitude, and perspective.

![App Screenshot](https://via.placeholder.com/1200x675/09090b/f4f4f5?text=Memento+Mori+Interface)

## Features

- **The Void Grid**: A visual representation of ~960 months (80 years).
  - **Lived Time**: Bright, solid markers representing the past.
  - **The Now**: A pulsing, glowing beacon representing the present month. Includes a dramatic zoom effect on hover to emphasize the singularity of the present moment.
  - **The Future**: Dark, hollow markers fading into the void.
- **AI-Powered Reflection**: Integrates with Google's **Gemini API** to generate piercing, existential quotes based on the specific amount of time the user has left.
- **Dramatic Statistics**: High-contrast, minimalist display of years lived, months remaining, and percentage complete.
- **Atmospheric UI**: Deep black background, elegant serif typography (`Cinzel`), and smooth animations built with **Tailwind CSS**.

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google GenAI SDK (`@google/genai`)
- **Icons**: Lucide React
- **Typography**: Google Fonts (Cinzel, Inter)

## Getting Started

### Prerequisites

You need a Google Gemini API Key to enable the philosophical quote generation.

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   Create a `.env` file in the root directory:
   ```env
   API_KEY=your_google_gemini_api_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- **`App.tsx`**: Main application controller handling state and layout.
- **`components/LifeGrid.tsx`**: The core visualization component rendering the month dots.
- **`components/Onboarding.tsx`**: The initial dramatic date input screen.
- **`services/gemini.ts`**: Handles the prompt engineering and API calls to Google's Gemini models for philosophical text generation.
- **`utils/time.ts`**: Logic for calculating life statistics based on an 80-year expectancy.

## Philosophy

This project is inspired by the *Memento Mori* stoic meditation and "Your Life in Weeks" visualizations. It aims to strip away the noise of daily life and present the raw data of our finite time in a way that is both terrifying and beautiful.

---

*Built with code and existential dread.*
