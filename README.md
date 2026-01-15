# Vayu Suraksha (AQI-vibe)

**Vayu Suraksha** is a comprehensive Air Quality Monitoring and Reporting System designed to empower citizens and authorities with real-time environmental data. The platform provides a live map of air quality indices (AQI), visualized data trends, and a direct channel for users to report pollution issues to NGOs and government bodies.

## Key Features

### 🌍 Real-Time AQI Map
- Interactive map powered by **Leaflet.js** displaying real-time Air Quality Index (AQI) across various locations.
- Color-coded markers indicate AQI severity (Good, Satisfactory, Moderate, Poor, Very Poor, Severe).

### 👥 Role-Based Access
- **Public Portal**: 
  - View real-time AQI levels.
  - Report environmental issues anonymously or as a registered user.
  - Access educational resources on potential health impacts.
- **NGO Dashboard**: 
  - View real-time reports submitted by the public.
  - Track report status and coordinate on-ground action.
  - Directly contact reporters via email.
- **Government Login**: 
  - Dedicated access for government officials to monitor regional air quality and public grievances.

### 📢 Reporting System
- Citizens can report pollution sources (e.g., waste burning, industrial emissions via the "Report Issue" feature.
- Reports include location data and issue descriptions.
- Reports are seamlessly routed to the NGO dashboard for immediate attention.

### 📊 Data Visualization
- **AQ Trends**: Analyze historical air quality data using interactive charts (powered by **Chart.js**).
- Compare AQI levels across major cities.

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Mapping**: Leaflet.js
- **Charts**: Chart.js
- **Icons**: FontAwesome, Google Fonts (Inter)
- **Data Source**: OpenAQ API (implied)

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/vibevnr.git
   ```

2. **Open the application**:
   - Navigate to the project directory.
   - Open `index.html` in your preferred web browser.

3. **Explore**:
   - Use **Public Login** to report issues.
   - Use **NGO Login** to view the report dashboard.

## File Structure

- `index.html`: Main landing page with the AQI map.
- `public-login.html`: Login/Entry point for public reporting.
- `ngo.html`: Dashboard for NGOs to manage reports.
- `js/`: Contains all JavaScript logic (map, api, ui, etc.).
- `css/`: Stylesheets for the application.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
