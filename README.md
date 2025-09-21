# React + TypeScript + Vite

# AxGrid – Architecture Overview  

AxGrid is a dynamic front-end for energy trading, designed to handle multiple energy sources (solar, wind, gas, hydro, thermal, kinetic, etc.) with **real-time updates** and a **modular architecture**.  

---

## 🔑 Key Idea  

We follow a **modular architecture** with a clear separation of concerns.  
This ensures the platform can grow from a lightweight demo to a production-ready system without rewriting the core logic.  

---

## 🏗️ Layers  

### 1. **UI Layer (React)**  
- Components handle only **presentation and user interaction**.  
- Examples: `Table`, `Select`, `Form`.  
- No business logic is stored here.  

---

### 2. **State Management (Zustand)**  
- Holds the global list of offers.  
- Exposes simple actions:  
  - `addOffer`  
  - `updateOffer`  
  - `confirmOffer`  
- React components subscribe to the store to re-render automatically.  

### 🤔 Why Zustand?  
We use **Zustand** instead of Context or Redux because it’s lightweight, avoids unnecessary re-renders, and integrates seamlessly with real-time updates (RxJS/Socket.IO).  
It keeps AxGrid simple to build today while remaining scalable for future growth.  

---

### 3. **Services (Infrastructure)**  
- **RxJS Streams** simulate real-time updates (mocking WebSocket/Socket.IO).  
- Later, these can be replaced by actual APIs or sockets without touching the UI.  
- Also includes mock data providers (`mockOffers`).  

---

### 4. **Domain (Business Rules)**  
- Defines **types and interfaces** like `EnergyOffering` and `EnergyTypeConfig`.  
- Encodes rules (e.g. *don’t update offers that are already confirmed*).  
- Independent from React, Zustand, or RxJS.  

---

## 📂 Folder Structure  
src/
├── assets/
│ ├── images/ #Energy types cards images
│
├── components/
│ ├── Card
│ ├── Charts #Graphics
│ ├── Form
│ ├── Select
│ ├── Table
│ ├── Tabs
│ ├── TypeFilter
│
├── modules/
│ ├── Offers/
│ ├── Stats/ 
│ └── Trades/
│
├── services/ # RxJS 
├── config/ # Energy type configs
└── App.tsx
