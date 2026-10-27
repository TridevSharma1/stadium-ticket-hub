# Stadium Ticket Hub

Copy This Repo And Complete it https://github.com/tridevsosync/screenshot-match.gitBuild 

a fully responsive, modern, professional Stadium Ticket Booking Website named XYZ Stadium.

The website is for selling Cricket and Football match tickets.

The website should look premium, modern, clean, fast and attractive similar to international sports booking websites.
Technology Stack (Very Important)
Use ONLY:
- React + Vite
- Tailwind CSS
DO NOT use
- Firebase
- Supabase
- MongoDB
- MySQL
- PostgreSQL
- Express
- Node backend
- NextJS
- Material UI
- Bootstrap
- Ant Design
- Chakra UI
- Redux
- Framer Motion
- Any third-party UI library
- Any authentication library
Everything should work using React State, Context API (optional) and Mock JSON Data.

No backend.

No database.

No API.

Everything should be stored inside local React state or mock JSON files.
Business Information
Business Name

XYZ Stadium

Client Name

XYZ Stadium

Address

Pune, Maharashtra

Phone

+91 8672112345

Email

xyzstadium@gmail.com
Website Theme
Use colors inspired by sports stadiums.

Primary Color

#0B3D91 (Royal Blue)

Secondary Color

#16A34A (Sports Green)

Accent Color

#F59E0B (Golden Yellow)

Background

#F8FAFC

Dark Background

#111827

Text

#1F2937

Buttons

Blue with hover Green

Cards

White

Border Radius

16px

Soft Shadows

Modern gradients

Smooth hover animations using Tailwind only.
Website Style
Modern

Premium

Sports Theme

Responsive

Minimal

Professional

Fast

Rounded UI

Large banners

Glassmorphism where suitable

Proper spacing

Beautiful typography

No clutter
Navbar
Sticky Navbar

Logo on left

Menu
- Home
- Matches
- Sports
- Tickets
- Gallery
- About
- Contact
Right side

Search Button

Login Button

Book Tickets Button

Mobile Hamburger Menu
Hero Section
Create a full-width hero section.

Use a large stadium banner image as the background.

Overlay with dark transparent layer.

Content:

Heading

"Experience the Thrill of Live Cricket & Football"

Subheading

"Book tickets instantly for exciting matches at XYZ Stadium."

Buttons

Book Tickets

View Matches

Show upcoming match highlights below the hero.
Home Page Sections
Featured Matches
Cards containing
- Match Image
- Team A
- Team B
- Date
- Time
- Stadium
- Sport Type
- Ticket Starting Price
- Book Now button
Use mock data.
Sports Categories
Cards
- Cricket
- Football
Each with icon/image.
Why Choose XYZ Stadium
Cards

Secure Booking

Instant Confirmation

Affordable Tickets

Premium Seating

Easy Refund Policy

Fast Support
Upcoming Events Timeline
Display multiple upcoming matches.
Stadium Gallery
Grid of stadium images.
Testimonials
Mock customer reviews.
FAQ
Accordion component.
Newsletter
Email input

Subscribe button

Mock success message.
Matches Page
Display all matches.

Features

Search

Filter by Sport

Filter by Date

Sort

Price

Date

Newest

Cards

Book Ticket Button
Match Details Page
Banner

Match Details

Venue

Date

Time

Teams

Available Seats

Price

Seat Categories
- VIP
- Premium
- Standard
- Economy
Book Ticket button.
Booking Page
Booking Form

Fields

Name

Email

Phone

Number of Tickets

Seat Category

Payment Method (Mock)

Booking Summary

Total Price

Confirm Booking

After booking

Show success page.

No payment gateway.

Everything mocked.
Gallery Page
Responsive image gallery.

Sports images

Crowd

Players

Stadium

Night view

VIP Lounge
About Page
Company Information

Mission

Vision

History

Achievements

Stadium Capacity

Sports Hosted

Facilities
Contact Page
Contact Form

Fields

Name

Email

Phone

Subject

Message

Show Google Map placeholder image.

Business Information

Phone

Email

Address

Working Hours
Footer
Footer should contain

Business Logo

Quick Links

Sports

Support

Privacy Policy

Terms

Contact Details

Address

Phone

Email

Social Icons

Copyright
IMPORTANT
At the bottom-right of the footer add a text link:

Admin Login

This should redirect to:
/admin

Authentication
Mock Authentication only.

Create

Admin Login Page

Fields

Username

Password

Mock Credentials

Username

admin

Password

admin123

After login

Redirect to Admin Dashboard.

Store login state in LocalStorage.

Logout button.
Admin Dashboard
Modern Sidebar

Dashboard

Matches

Bookings

Users

Gallery

Testimonials

FAQ

Banners

Settings

Logout
Dashboard Overview
Cards

Total Matches

Total Bookings

Revenue

Visitors

Upcoming Matches

Charts should be simple CSS progress bars (No chart libraries).
Admin - Manage Hero Banner
Admin can

Add Banner

Edit Banner

Delete Banner

Change Title

Change Subtitle

Change Button Text

Change Background Image

Store using mock local state.
Admin - Matches Management
CRUD

Add Match

Edit Match

Delete Match

Fields

Image

Sport

Teams

Date

Time

Venue

Ticket Price

Seats

Status
Admin - Booking Management
View bookings

Approve

Reject

Delete

Search bookings

Filter

Mock only.
Admin - Gallery Management
Add Image

Delete Image

Edit Image Title

Mock storage.
Admin - Testimonials
CRUD

Customer Name

Photo

Review

Rating
Admin - FAQ
CRUD

Question

Answer
Admin - Contact Information
Editable

Business Name

Phone

Email

Address

Google Map Image

Working Hours
Admin - Website Settings
Logo

Website Name

Theme Color

Footer Text

Social Links
Mock Data
Create separate mock files.

Example
src/mock/

matches.js

bookings.js

gallery.js

testimonials.js

faq.js

banner.js

users.js

No backend.

No API.

Everything local.
Folder Structure
src/

components/

pages/

admin/

layouts/

assets/

mock/

hooks/

context/

utils/

App.jsx

main.jsx

Reusable Components
Navbar

Footer

Button

Card

Input

Modal

Table

Badge

Sidebar

Loader

Pagination

Search Bar

Filter Bar

Breadcrumb
Responsive Design
Desktop

Laptop

Tablet

Mobile

Perfect responsiveness using Tailwind.
Animations
Only Tailwind CSS transitions.

No animation libraries.

Hover Effects

Fade

Scale

Smooth Buttons

Card Hover
SEO
Dynamic Page Titles

Meta Description

Semantic HTML

Accessible Buttons

Alt Tags
Code Quality
Use reusable React components.

Proper folder structure.

Clean code.

Comments where needed.

No duplicate code.
Final Requirements
- Use React + Vite + Tailwind CSS ONLY.
- Do not use any backend, database, authentication service, API, or external UI libraries.
- Use mock JSON/JS data files for all content.
- Use LocalStorage only to simulate authentication and admin-managed data persistence.
- Build a fully responsive, premium sports ticket booking website with a polished user experience.
- Ensure most content (banners, matches, gallery, FAQs, testimonials, contact info, settings, etc.) is manageable from the Admin Panel.
- Include an Admin Login page with mock credentials (admin / admin123) and place an "Admin Login" link in the footer that redirects to /admin.
- Display a large stadium banner image in the hero section with compelling call-to-action buttons.
- The entire project should be ready to run with:npm install
  npm run dev
- No placeholders that require a backend or additional setup. Everything should work immediately using mock data and React state.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/164eda97-49b1-4d81-975c-7cac61e830d3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
