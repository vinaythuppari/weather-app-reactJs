# 🌤️ Weather App  

A simple and modern **React Weather App** built using **React + Material UI + Bootstrap** that fetches real-time weather data from the [Open-Meteo API](https://open-meteo.com/).  

This app allows users to search for a city and view current weather details such as **temperature, wind speed, and weather conditions** with dynamic visuals and responsive design.  

---

## 🚀 Features  

✅ **Responsive Design** – Works smoothly on mobile, tablet, and desktop.  
✅ **Modern Styling** – Clean UI with cards, shadows, and soft colors.  
✅ **Weather Icons & Visuals** – Displays weather-specific icons (☀️ 🌧️ ☁️).  
✅ **Dynamic Backgrounds** – Background color changes based on weather conditions.  
✅ **Error Handling** – Shows friendly error messages when a city is not found or API fails.  
✅ **Loading Indicator** – Displays a spinner while fetching weather data.  
✅ **Accessibility** – Readable font sizes, contrast, and screen-reader friendly.  

---

## 🛠️ Tech Stack  

- **Frontend:** React, Material UI, Bootstrap 5  
- **API:** [Open-Meteo API](https://open-meteo.com/) (free, no key required)  
- **Styling:** CSS, Responsive Layout  
- **Icons:** Emoji-based + weather condition mapping  

---

## 📦 Installation & Setup  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/vinaythuppari/weather-app-reactJs.git
   cd weather-app
Install dependencies :
npm install

Start the development server :
npm run dev

Open in your browser:
http://localhost:5173


⚙️ Project Structure

weather-app/
│── public/                # Static files
│── src/
│   ├── components/
│   │   ├── WeatherForm.jsx   # Input form for searching city
│   │   ├── WeatherCard.jsx   # Weather details card
│   ├── App.jsx               # Main app logic
│   ├── App.css               # Styling & dynamic background
│   ├── main.jsx              # Entry point
│── index.html                # HTML template
│── package.json
│── README.md
🌐 API Usage
Geocoding (City → Lat/Lon):

https://geocoding-api.open-meteo.com/v1/search?name={city}
Weather Forecast:

https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true
📌 Example
Searching for London:

API fetches coordinates: latitude: 51.5072, longitude: -0.1276

API fetches current weather:
{
  "temperature": 15.2,
  "windspeed": 12.3,
  "weathercode": 3
}

App displays:
🌤️ London, UK
🌡️ 15°C
💨 Wind: 12 km/h
☁️ Weather: Cloudy

🚧 Improvements (Future Scope)
🌎 Multi-language support

📅 7-day forecast view

📍 Detect user’s current location automatically

💾 Save favorite cities

👨‍💻 Author
Vinay
