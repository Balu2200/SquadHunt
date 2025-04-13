# Admin Dashboard – User Management System

## An admin-only dashboard for managing users in a web application. Features include:

✅ User listing with pagination
🔍 Search by name/email
🧑‍💼 Filter by role (Admin, Player, Organizer)
🗑️ Soft delete users
🚫 Prevent access to deleted users
⚡ Responsive UI with loading/error states

## Tech Stack
### Frontend
  React
  TailwindCSS
  Axios
### Backend
  Node.js with Express.js
  MongoDB with Mongoose
  JWT-based Authentication Middleware


🧪 Features in Detail
✅ Soft Delete
Users are not permanently removed, just flagged with isDeleted: true.

Deleted users are excluded from all queries by default.

🔍 Filter & Search
Filter users by role using dropdown.

Search by name or email using the input field.

📜 Pagination
Navigate through users using next/previous page buttons.

Each page shows a configurable limit of users (default: 10).

📦 Sample API Endpoints

GET /admin/users
Fetch users with optional filters:
page
role
name
email
DELETE /admin/user/:id
Soft delete a user (only marks them as deleted).







