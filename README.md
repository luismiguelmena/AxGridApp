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
## 📂 Project Structure Diagram  

```mermaid
flowchart TD

  subgraph src
    subgraph assets
      A1[images<br/>Energy types cards images]
    end

    subgraph components
      B1[Card]
      B2[Charts<br/>Graphics]
      B3[Form]
      B4[Select]
      B5[Table]
      B6[Tabs]
      B7[TypeFilter]
    end

    subgraph modules
      C1[Offers]
      C2[Stats]
      C3[Trades]
    end

    subgraph services
      D1[RxJS Streams]
    end

    subgraph config
      E1[Energy type configs]
    end

    F1[App.tsx]
  end

