# 🌳 Family Tree App

A modern web application for **managing family members and visualizing a family tree**, built with **React + Vite** and a contemporary tech stack focused on performance, type safety, and developer experience.

This project allows you to:

* Register and manage family members
* Define family relationships using `parentId`
* Visualize an interactive family tree
* Navigate to detailed views of each member (parent and children)
* Persist data locally using LocalStorage

---

## 🚀 Tech Stack

* **React**
* **Vite**
* **TypeScript**
* **Tailwind CSS v4**
* **shadcn/ui** (design system)
* **TanStack Router** (routing)
* **TanStack React Query** (async state management)
* **Zustand** (lightweight global state)
* **Zod** (schema validation)
* **React Flow** (graph visualization)
* **D3.js (d3-hierarchy / stratify)** (tree construction)

---

## 🧠 Tree Concept

The family tree is built using **only `parentId`**:

* `parentId` → points to the **direct ancestor** (father/mother)
* Members without a `parentId` are considered **root nodes**
* Children are inferred automatically

This approach enables:

* High scalability
* Simple data modeling
* Seamless integration with `d3.stratify`

---

## 📂 Project Structure

```bash
src/
├─ pages/
│  ├─ HomePage.tsx
│  ├─ MembersPage.tsx
│  └─ MemberDetailsPage.tsx
│
├─ routes/
│  ├─ index.tsx
│  ├─ members.tsx
│  └─ members.$memberId.tsx
│
├─ features/family/
│  ├─ FamilyTree.tsx
│  ├─ MemberForm.tsx
│  ├─ family.store.ts
│  ├─ family.schema.ts
│  ├─ family.storage.ts
│  └─ buildGraph.ts
│
├─ styles/
│  └─ index.css
│
└─ main.tsx
```

---

## 🧭 Main Routes

* `/` → Home
* `/members` → Members list + family tree
* `/members/:memberId` → Member details (parent + children)

Routing is handled by **TanStack Router**, including navigation triggered by React Flow node clicks.

---

## 🌳 Tree Visualization

* Built with **d3-hierarchy (`stratify`)**
* Rendered using **React Flow**
* Each node represents a family member
* Clicking a node navigates to the member’s details page

---

## 💾 Data Persistence

* Data stored in **LocalStorage**
* Accessed and synced using **React Query** (`useQuery` / `invalidateQueries`)
* Designed for easy migration to a backend API in the future

---

## 🛠️ Running the Project

```bash
# install dependencies
npm install

# start development server
npm run dev
```

---

## 🎯 Roadmap

* [ ] Photo upload
* [ ] Edit member details
* [ ] Genealogical breadcrumb navigation
* [ ] Sub-tree visualization per member
* [ ] Export family tree
* [ ] Authentication
* [ ] Backend API + database

---

## 👨‍💻 Author

Developed by **Dedaldino Daniel**
Educational project and foundation for real-world family management applications.

---

## 📜 License
