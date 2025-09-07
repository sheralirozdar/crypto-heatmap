# Crypto Heatmap

A web application that visualizes cryptocurrency market data as an interactive heatmap.

## Features

- Real-time cryptocurrency price updates
- Interactive heatmap visualization
- Filtering and sorting options

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/crypto-heatmap.git
    cd crypto-heatmap
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Create a `.env` file in the root directory and set the following variables:

    ```env
    # Example .env file

    # API key for your crypto data provider
    REACT_APP_CRYPTO_API_KEY=your_api_key_here

    # (Optional) API endpoint override
    REACT_APP_CRYPTO_API_URL=https://api.example.com
    ```

### Running the App

```bash
npm start
# or
yarn start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## License

MIT