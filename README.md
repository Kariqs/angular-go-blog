# Blog Storage App

This project is a full-stack application that allows users to store blogs and associated images. The backend is powered by **Go**, with a **MySQL** database and **Amazon S3** used for image storage. The frontend is built using **Angular**. The project can is hosted on Vercel and can be accessed by clicking [**HERE**](https://blog-two-zeta-67.vercel.app/)

---

## How to Run the Project Locally

### Prerequisites

Make sure you have the following installed on your system:

- [MySQL Server](https://dev.mysql.com/downloads/)
- [Golang](https://golang.org/dl/) (latest version recommended)
- [Node.js & npm](https://nodejs.org/) (Node latest recommended)
- [Angular CLI](https://angular.io/cli)

---

## Backend (API) Setup

### 1. Create a MySQL Database

Start your MySQL server and create a database named `blog`:

```sql
CREATE DATABASE blog;
```

### 2. Configure AWS S3

- Create an AWS account: [AWS Console](https://aws.amazon.com/console/)
- Create an **S3 bucket** with **public access** for image uploads.
- Create an **IAM user** with programmatic access and permissions for S3.
- Save the **Access Key ID** and **Secret Access Key**.

### 3. Clone the Repository

```bash
git https://github.com/Kariqs/angular-go-blog.git
cd angular-go-blog
```

### 4. Setup Environment Variables

Navigate to the `blog-api` folder and create a `.env` file with the following:

```env
PORT=3000
DB_URL=user:password@tcp(127.0.0.1:3306)/blog?charset=utf8mb4&parseTime=True&loc=Local

AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY
AWS_REGION=YOUR_BUCKET_REGION
AWS_BUCKET_NAME=YOUR_BUCKET_NAME
```

> Ensure you replace `user`, `password`, and AWS credentials with your actual values.

### 5. Install Go Dependencies

```bash
cd blog-api
go mod download
```

### 6. Run the Server

```bash
go run .
```

The API server will be running at `http://localhost:3000`.

---

## Frontend (Angular UI) Setup

### 1. Navigate to Frontend Folder

```bash
cd ../blog-ui
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
ng serve
```

The Angular app will run at `http://localhost:4200`.

---

## Project Structure

```
angular-go-blog/
├── blog-api/       # Golang backend
│   └── ...
├── blog-ui/        # Angular frontend
│   └── ...
└── README.md
```

---
