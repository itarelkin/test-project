
# Text Data Processing and Visualization App

This is a simple web application built with React and TypeScript that allows users to import text data from a file, process it using the TextRazor API for Named Entity Recognition, and visualize the results with graphs and entity highlighting.

## Technologies Used

- React
- TypeScript
- [react-bootstrap](https://react-bootstrap.github.io/) for UI components
- [recharts](https://recharts.org/en-US) for graph visualization

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/text-processing-visualization-app.git
   cd text-processing-visualization-app
Install dependencies:

bash
Copy code
npm install
Set Up API Key:

Sign up for an account and obtain an API key from TextRazor.
Store the API key securely in your environment variables or a configuration file.
Set Up Proxy:

Access the CORS proxy service by visiting https://cors-anywhere.herokuapp.com/.
Click the "Request temporary access to the demo server" button to unlock access.
Start the development server:

npm start
Open your browser and navigate to http://localhost:3000.

Features
Upload Text File for Analysis:

Choose a text file to import and process.
Each line of the text file will be sent to the TextRazor API for Named Entity Recognition.
Entity Highlighting and Content Visualization:

Recognized entities will be highlighted in the imported text.
Entity types (Person, Country, etc.) will be indicated through bold and underline styles.
Entity Statistics:

Display statistics on the entities that were found in the text.
Show a count of each entity type (Person, Country, etc.).
Graph Analytics:

Generate graphs to visualize the distribution of entity types.
Choose from various graph visualizations (bar chart, pie chart) to analyze the data.
Dashboard Layout:

The user interface includes a dashboard layout for a seamless user experience.
TextRazor API and Entity Recognition
TextRazor is an online service for performing various operations on text, including Named Entity Recognition.
The application utilizes the TextRazor API to recognize entities in the imported text.
Deployment
Deploy your application to a hosting platform of your choice (e.g., Vercel, Netlify, GitHub Pages) to make it accessible online.
Contributions and Issues
Contributions are welcome! If you encounter any issues or have ideas for enhancements, feel free to open an issue or submit a pull request.

License
This project is licensed under the MIT License.

Feel free to copy and paste this content into your `README.md` file. Remember to replace `your-username` with your actual GitHub username and update any other URLs or project-specific details as needed.



