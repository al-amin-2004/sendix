# 📭 Sendix

A powerful and developer-friendly notification scheduler built with TypeScript. Easily schedule and send Emails with full control and flexibility.

### ✨ Features

- ✅ Custom-built scheduler
- 📦 Dual format support: CommonJS (CJS) + ECMAScript Module (ESM)
- 📧 Email reminder support (via nodemailer)
- 🕒 Flexible time-based message scheduling
- 💡 Beginner-friendly API design
- 🟢 Built with TypeScript (ESM)
- ⚡ Super lightweight and fast
- 📱 SMS support (coming soon)


<br>

## 🚀 Quick Start

### 📦 Installation
---
```bash
# npm
npm install sendix
```
or
```bash
# yarn
yarn add sendix
```
or
```bash
# bun
bun add sendix
```

<br>

### Basic Usage
---

```javascript
# commonJS
const { sendix } = require("sendix");
```

```javascript
# ES6
import { sendix } from 'sendix';
```


```javascript
# Besic Example

sendix({
    type: "now",
    mail: {
        auth: {
            user: "sender@example.com",
            pass: "password"
        },
        from: "sender@example.com",
        to: "recipient@example.com",
        subject: "Scheduled Email",
        message: "This is a scheduled email sent using Sendix.",
    }
})
```

<br>

## 🔐 Environment Variables (optional)
Sendix uses environment variables to securely manage sensitive credentials like API keys and SMTP login information. Before using the package, make sure to configure your `.env` file properly. <br>
These variables allow Sendix to authenticate your email server, manage access tokens, and set the default sending email.

### Create a `.env` file in your project root and add the following:

```.env
SENDIX_SMTP_USER=your@example.com
SENDIX_SMTP_PASS=wyeundhfftnghfku
```
> Make sure to keep these credentials secure and never commit .env files to version control.
<br>

### 🛠 Loading Environment Variables
If you’re not using a framework that loads .env automatically, you can use dotenv:
```bash
npm i dotenv
```
Then, at the top of your entry file:
```javascript
import 'dotenv/config';
```

### 🧪 Example Usage with Environment
```javascript
import 'dotenv/config';
import { sendix } from 'sendix';


sendix({
    type: "now",
    mail: {
        auth: {
            user: process.env.SENDIX_SMTP_USER,
            pass: process.env.SENDIX_SMTP_PASS,
        },
        from: "sender@example.com",
        to: "recipient@example.com",
        subject: "Scheduled Email",
        message: "This is a scheduled email sent using Sendix.",
    }
})
```

---

<br>

## 🤝 Contributing

Contributions, issues and feature requests are welcome!  
Feel free to open an [issue](https://github.com/yourusername/sendix/issues) or submit a pull request.

---

<br>

## 🙋 Support & Questions

If you have any questions, feel free to reach out via [GitHub Discussions](https://github.com/yourusername/sendix/discussions) or open an issue.

---

<br>

## 📜 License

This project is licensed under the [MIT License](./LICENSE).


<br>
<div align="center">

# Made with ❤️ by [Al amin](https://github.com/al-amin-2004)

[⭐ Star this repo](https://github.com/al-amin-2004/sendix) | [🐛 Report Bug](https://github.com/al-amin-2004/sendix/issues) | [💡 Request Feature](https://github.com/al-amin-2004/sendix/issues)

</div>

