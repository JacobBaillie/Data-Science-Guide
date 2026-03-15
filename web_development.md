# Web Development

---

## HTML

**Role:** Structure and content — defines *what* is on the page and *what each thing is* (text, link, image, etc.)

- Include content: what text to write and where
- Define the identity of each element (text, link, graphic, etc.)
- Link to other pages
- **Avoid** using tags to control appearance — delegate that to CSS

---

## CSS

**Role:** Style and presentation — defines *how* the page looks

### Types (prefer external)

| Type | Description | Use? |
|------|-------------|------|
| Inline | CSS directly in HTML tag | ❌ Only for one-off single occurrences |
| Internal | `<style>` block in HTML | ❌ Avoid |
| External | Linked `.css` file | ✅ Always prefer this |

- Use `styles.css` as the main stylesheet

---

## Bootstrap / Angular

**Role:** Premade CSS and UI components for frontend

- Insert components into HTML as needed
- Trusted, consistent, well-documented
- Access via a **CDN (Content Delivery Network)** — no local install needed

---

## JavaScript

**Role:** Complex computation, interactivity, and logic on the frontend

- Interpreted line by line (like Python)
- **Style guide:** Follow [idiomatic.js](https://github.com/rwaldron/idiomatic.js/) for consistent code structure

### Tips

- Aim for **minimal styles and minimal JS first** — add complexity only as needed

---

## Backend

**Role:** The logic layer running 24/7; includes databases and server-side processing

- Can be written in Python, JavaScript, Java, etc.
- Each language has its own framework (e.g., Django for Python, Node.js for JS)
- **Java + Spring Boot** for better performance and reliability at scale

---

## Frameworks (e.g., Node.js for JS)

**Role:** Abstracts low-level backend plumbing so you can write application logic faster

- Provides a runtime environment for local development
- Enables faster development cycles
- Runs synchronously (always-on server process)

### Node.js Tips

- **Nodemon** — integrates live code changes with the running server (auto-restart on save)
