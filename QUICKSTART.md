# Quick Start Guide

Get Weather Intelligence running in 5 minutes.

## 1. Setup API Key

1. Go to [weather-ai.co](https://weather-ai.co)
2. Create a free account
3. Get your API key from the dashboard

## 2. Configure Environment

```bash
# Create environment file
echo "NEXT_PUBLIC_WEATHER_AI_API_KEY=your_api_key_here" > .env.local
```

Replace `your_api_key_here` with your actual API key.

## 3. Install & Run

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open in browser
# http://localhost:3000
```

## 4. Test the App

1. Open the app in your browser
2. Search for a city (e.g., "New York", "London", "Tokyo")
3. View current weather, forecasts, and AI insights
4. Toggle between light and dark mode

## Done!

Your Weather Intelligence app is now running locally. Start exploring weather data and AI-powered recommendations.

## Troubleshooting

### API Key Issues
- Verify API key in `.env.local`
- Restart dev server after changing env file
- Check API quota in weather-ai.co dashboard

### Port Already in Use
```bash
# Run on different port
pnpm dev -p 3001
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
pnpm install
```

## Next Steps

- **Deploy**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Customize**: Edit [globals.css](./app/globals.css) for colors
- **Features**: Check [README.md](./README.md) for all features
- **API Docs**: Visit [weather-ai.co/docs](https://weather-ai.co/docs)

## Support

- Check the troubleshooting section above
- Review [README.md](./README.md) for detailed docs
- Visit [weather-ai.co](https://weather-ai.co) for API help

---

Built with Next.js 16, React 19, and Tailwind CSS
