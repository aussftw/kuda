# 💸 Kuda Finance App

A simple, elegant onboarding and account management app built with **React Native** using **Expo Go**.  
This project was developed as part of a technical assessment, following a provided Figma design and REST API specification.

---

## ✨ Features

- 📱 **Onboarding Flow**

  - Swipeable intro screen shown only on first launch using `AsyncStorage`
  - Motivational copy encouraging users to understand their finances

- 📝 **Create Account Screen**

  - Fields for name, email, and password
  - Form validation and password visibility toggle
  - Agreement checkbox with a Terms of Service link
  - Handles loading and error states gracefully

- 🧾 **My Account Screen**
  - Displays account details (type, number, balance)
  - Shows recent transactions dynamically based on API response
  - Clean and modular UI matching the design specification

---

## 🧱 Tech Stack

- **React Native** + **Expo SDK 53**
- **React Navigation** for seamless screen transitions
- **AsyncStorage** for onboarding persistence
- **Fetch API** for HTTP requests
- **Zustand** for state management
- **React Hook Form** for handlings forms

---

## ⚙️ Requirements

| Tool    | Version   |
| ------- | --------- |
| Node.js | `v20+`    |
| Java    | `Java 17` |
| Expo Go | `SDK 53`  |

> 🧪 App is built for Expo Go and is not intended for standalone native builds (no EAS required).

---

## 🚀 Getting Started

1. **Clone the repo**

```bash
git clone git@github.com:aussftw/kuda.git
cd kuda
```

2. **Install dependencies**

```
yarn install
```

**or**

```
npm install
```

3. **Start the Expo server**

```
npx expo start
```

4. **Select Expo Go**

Press s to select Expo Go
