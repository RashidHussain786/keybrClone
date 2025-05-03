# Typing Practice App with AI-Generated Content

This is a typing practice web application inspired by [keybr.com](https://www.keybr.com), enhanced with AI-generated paragraphs based on user-selected topics. It helps users improve their typing speed and fluency while reading interesting and dynamic content.

## ✨ Features

- 🧠 **Gemini AI Integration**: Generates typing paragraphs (50–100 words) based on custom topics.
- 🎯 **Typing Practice Interface**: Real-time typing feedback with WPM, accuracy, and score tracking.
- 🎹 **Visual Keyboard**: See which keys you're pressing in real-time with a virtual keyboard display.
- 📈 **Performance Metrics**: Comprehensive metrics including speed, accuracy, last speed, and top speed.
- 🎬 **Interactive Completion Screen**: View your performance statistics when you complete a test.
- 💡 **Animated Topic Suggestions**: Dynamic placeholder text that cycles through topic ideas.
- ⌨️ **Keyboard Navigation**: Press Enter to generate content without clicking the button.
- 🎯 **Daily Goals**: Track your daily practice time with a progress bar.
  
## 🖥️ Demo
![image](https://github.com/user-attachments/assets/fb0b03aa-4b0e-4179-aa28-e1739d805742)


## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **AI Integration**: Google Gemini (via `@google/generative-ai`)
- **State Management**: Custom React hooks
- **Build Tool**: Vite

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/RashidHussain786/keybrClone.git
cd keybrClone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add your Gemini API key:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

### 4. Start Development Server

```bash
npm run dev
```

Open [https://keybrclone.netlify.app/](https://keybrclone.netlify.app/) to see the app.

## 📝 How to Use

1. **Start Typing**: As soon as the application loads, you'll see a default text. Start typing to begin your practice.

2. **Generate Custom Content**:
   - Type a topic in the search bar (or choose one from the animated suggestions)
   - Press Enter or click the "Generate" button
   - A custom paragraph about your chosen topic will be generated for you to practice

3. **Track Your Progress**:
   - Watch your WPM, accuracy, and score update in real-time
   - See which keys you're pressing on the virtual keyboard
   - Monitor your daily goal progress at the bottom of the metrics panel

4. **Complete the Test**:
   - Type the entire text correctly to complete the test
   - View your final statistics in the completion overlay
   - Click "Try Again" to practice with the same text or generate a new one


## 📦 Project Structure

- `src/components/`: React components
  - `typing/`: Components related to the typing interface
  - `metrics/`: Components for displaying metrics
  - `layout/`: Layout components
- `src/hooks/`: Custom React hooks
  - `useTypingTest.ts`: Core typing test logic
  - `useKeyboard.ts`: Keyboard input handling
  - `useTopicSuggestions.ts`: Topic suggestion functionality
  - `useContentGenerator.ts`: AI content generation
- `src/utils/`: Utility functions and constants
- `src/services/`: External service integrations
- `src/types/`: TypeScript type definitions

## 🧪 Future Enhancements

- Support for letter-based typing (e.g., focus on specific characters)
- Typing test history and statistics tracking
- User accounts to save progress
- Difficulty selection or advanced topic categorization
- Offline mode with pre-generated content

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
