# Job Tracker

A React-based job application tracker that helps users organize and manage their job search using a Kanban board.

## 📌 Project Overview

Applying for jobs across multiple companies can make it difficult to track applications, interviews, follow-ups, and offers.

**Job Tracker** provides a centralized board for organizing job applications by status. Its visual workflow makes it easier to see where each application stands.

This project was built using React and Vite, with browser-based data storage.

## ✨ Features

* **Kanban Board:** Organize job applications into different stages.
* **Application Tracking:** Track applications across six statuses:

  * Wishlist
  * Applied
  * Follow-up
  * Interview
  * Offer
  * Rejected
* **Drag-and-Drop Workflow:** Move job cards between stages using the board interface.
* **Job Management:** Add and manage job application details through the application interface.
* **Persistent Storage:** Use IndexedDB for browser-based data storage.
* **Interactive Interface:** Manage applications through a component-based React UI.

*Note: Feature descriptions reflect the current project implementation and should be updated if the application changes.*

## 🛠️ Tech Stack

| Technology     | Purpose                                 |
| -------------- | --------------------------------------- |
| React          | Building the user interface             |
| Vite           | Development server and build tooling    |
| JavaScript     | Application logic                       |
| CSS            | Styling and layout                      |
| IndexedDB      | Browser-based data persistence          |
| npm            | Dependency management                   |
| Git and GitHub | Version control and source code hosting |

## 📂 Project Structure

```text
job-tracker/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Board.jsx
│   │   ├── Column.jsx
│   │   ├── ConfirmDialog.jsx
│   │   ├── Icons.jsx
│   │   ├── JobCard.jsx
│   │   ├── JobModal.jsx
│   │   └── Toolbar.jsx
│   ├── App.jsx
│   ├── constants.js
│   ├── db.js
│   ├── index.css
│   ├── main.jsx
│   └── useJobs.js
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## ⚙️ Getting Started

Follow these steps to run the project locally.

### Prerequisites

Install the following:

* [Node.js](https://nodejs.org/)
* npm, which is included with Node.js
* [Git](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone https://github.com/SneharodeQA/job-tracker.git
```

### 2. Navigate to the project directory

```bash
cd job-tracker
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Vite will display a local URL in your terminal, usually:

```text
http://localhost:5173/
```

Open the displayed URL in your browser.

## 🧪 QA Testing Scope

This project provides an opportunity to explore functional, integration, usability, and regression testing.

Potential testing areas include:

* Creating and managing job applications.
* Moving cards between Kanban columns.
* Verifying that cards appear in the correct status.
* Checking that application data persists after refreshing the browser.
* Validating dashboard counts, if displayed by the current implementation.
* Testing interactions between search filters and card movement, if search is implemented.
* Checking empty states, invalid inputs, and confirmation dialogs.
* Testing keyboard accessibility and drag-and-drop alternatives.
* Verifying behavior across supported browsers and screen sizes.

These are suggested testing areas, not a claim that every test has already been executed.

## 🔍 Future Improvements

Potential enhancements include:

* Comprehensive automated test coverage.
* Improved accessibility and keyboard navigation.
* Additional filtering and sorting options.
* Enhanced dashboard analytics.
* Exporting job application data.
* Deployment to a public hosting platform.

## 🎯 Project Goals

This project demonstrates practical experience with:

* React component-based development.
* JavaScript application logic.
* Browser-based data persistence.
* Git and GitHub workflows.
* Thinking about software quality and edge cases.

## 👩‍💻 Author

**Sneha Rode**

GitHub: [@SneharodeQA](https://github.com/SneharodeQA)

---

If you find this project useful, feel free to explore the repository and share feedback.
