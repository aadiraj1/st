# Interactive Global Map Update Plan

The user requested a massive overhaul of the `GlobalMap` component to showcase an extensive list of real-world dealers permanently visible on screen (Google Maps style), rather than hidden behind hover tooltips. When hovered, individual cards will visually pop and scale to draw attention.

## Proposed Changes

### 1. Data Integration (32 Dealers)
I have extracted all 32 dealer results provided in the prompt (ranging from "PPF Guys" to "Bespoke PPF Solutions") including their names, ratings, review counts, types, and addresses. This data will be hardcoded into the component.

### 2. Layout & Visual Strategy
Instead of trying to squeeze 32 massive tooltips onto a single localized mini-map (which would cause severe overlapping and look chaotic), we will build a **Split UI or Interactive Slider over a Map**:

**The Design Protocol:**
- **Background:** A high-quality placeholder image of a sleek dark-mode stylized map covering the entire section to firmly establish context.
- **The Foreground (Dealer Cards):** A prominent, scrollable horizontal layout (like a Google Maps results ticker at the bottom of the map, or an overlapping grid) where the cards are **always visible**. 
- **The Information:** Each card will display exactly like a premium Google Maps listing (Stars, Reviews, Service Type, Address, Quote).
- **The Interaction (Zoom on Hover):** When a user hovers over any visible dealer card, it will utilize `framer-motion` to smoothly scale up (zoom), glow with the brand's Electric Blue (`#00AEEF`), and elevate above the rest, becoming highly attractive and readable.

## Open Questions

> [!WARNING]
> Displaying 32 full detail cards on top of a map simultaneously without overlapping is a complex UX challenge. 
> 
> **My recommendation:** I will implement an interactive, horizontally draggable "Slider" (carousel) of these dealer cards overlapping the bottom half of a beautiful Map Background. This means they are always visible, you can swipe through them, and they scale up beautifully on hover. 
> 
> Does this approach sound perfect to you?
