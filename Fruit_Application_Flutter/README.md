# 🔍 Fruit Application Flutter

A Flutter fruit store UI demo showcasing core layout widgets through a colorful scrollable mobile interface.

![Flutter](https://img.shields.io/badge/Flutter-3.x-02569B?logo=flutter&logoColor=white)
![Dart](https://img.shields.io/badge/Dart-3.11.5-0175C2?logo=dart&logoColor=white)
![Status](https://img.shields.io/badge/Status-Mobile%20UI%20Demo-blue)
![License](https://img.shields.io/badge/License-Not%20Specified-lightgrey)

## 📌 Overview

Fruit Application Flutter is a mobile UI demo for a fresh fruit store. It presents fruit products, categories, promo sections, and order status using common Flutter layout widgets.

The project is designed as a practical Flutter learning exercise. It demonstrates `Container`, `Stack`, `GridView`, `ListView`, `ListView.builder`, and `ListView.separated` in one scrollable page.

The target use case is educational: showing how different Flutter layout widgets can be combined into a polished product-style interface.

## 🧠 Model & Methodology

This project does not use a machine learning model. Its methodology is a **widget-based Flutter UI implementation**:

| Component | Purpose | Notes |
|---|---|---|
| `Container` | Promo and point cards | Uses gradients, borders, padding, and radius. |
| `Stack` | Layered hero section | Combines background, decorative circles, text, and badge. |
| `GridView` | Fruit category display | Shows six fruit items in a 3-column grid. |
| `ListView.builder` | Dynamic fruit list | Renders fruit data from `daftarBuah`. |
| `ListView.separated` | Order status list | Adds dividers between order rows. |

## ✨ Features

- ✅ Single-page fruit store interface.
- 🍎 Fruit data model with name, emoji, price, and color.
- 🧱 Demonstrates six core Flutter layout patterns.
- 🛒 Product list with price labels.
- 📦 Order status list with colored badges.
- 🎨 Material 3 theme with green color seed.

## 🛠️ Tech Stack

**Core:** Dart, Flutter  
**Frontend:** Material 3 widgets  
**Data:** In-memory fruit and order lists  
**Tools:** Flutter SDK, flutter_lints

![Flutter](https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white)
![Dart](https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=dart&logoColor=white)

## ⚡ Strengths & Limitations

**Strengths:**

- Clear demonstration of multiple Flutter layout widgets in one app.
- Uses reusable widget sections for each layout concept.
- Simple data model makes the UI easy to understand and extend.

**Limitations:**

- Data is hardcoded in `main.dart`.
- No navigation, backend, cart persistence, or checkout flow.
- No screenshots are included in the folder.

Future improvements may include adding cart interaction and moving fruit data into a separate model/service file.

## 📁 Project Structure

```text
Fruit_Application_Flutter/
├── lib/
│   └── main.dart          # Main app, fruit model, data, and UI sections
├── test/
│   └── widget_test.dart   # Default Flutter widget test
├── pubspec.yaml           # Flutter project configuration
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Flutter SDK
- Android emulator, iOS simulator, desktop target, or connected device

### Installation

```bash
git clone <repository-url>
cd Fruit_Application_Flutter
flutter pub get
```

### How to Run

```bash
flutter run
```

## 📊 Results & Performance

This project is a UI demo. No model or benchmark metrics are available.

## 👨‍💻 Author

**Axandio**  
LinkedIn: Not provided in project files  
GitHub: Not provided in project files

Open to collaborations and feedback — feel free to reach out!

---
> ⭐ If you find this project useful,
> please give it a star!

## 💡 Portfolio Suggestions

1. Add app screenshots from Android or desktop.
2. Split widgets into separate files for cleaner architecture.
3. Add simple cart state management to make the demo interactive.
