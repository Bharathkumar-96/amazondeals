# Redux and Redis Setup Guide

## Overview

This project now includes:
- **Redux**: A predictable state management library for React
- **Redis**: An in-memory data store for caching and performance optimization

## Project Structure

### Frontend (Redux)
```
src/
├── redux/
│   ├── store.js              # Redux store configuration
│   └── slices/
│       ├── productsSlice.js   # Products state management
│       ├── bookmarksSlice.js  # Bookmarks state management
│       └── uiSlice.js         # UI state management (search, category, theme)
├── components/               # React components connected to Redux
└── pages/
```

### Backend (Redis + Express)
```
server/
├── index.js                  # Express server with Redis integration
├── redis.js                  # Redis client and utility functions
└── data/
    └── products.json         # Product data
```

## Redux Setup

### Store Configuration (`src/redux/store.js`)
- Configured using Redux Toolkit's `configureStore`
- Three main slices:
  - **products**: Manages product data, loading, and errors
  - **bookmarks**: Manages bookmarked products with localStorage persistence
  - **ui**: Manages UI state (search query, selected category, theme)

### Redux Slices

#### 1. **Products Slice** (`src/redux/slices/productsSlice.js`)
Manages the list of products:
```javascript
import { useSelector, useDispatch } from 'react-redux'

// In your component:
const dispatch = useDispatch()
const products = useSelector(state => state.products.items)
const loading = useSelector(state => state.products.loading)

// Dispatch actions:
dispatch(setProducts(newProducts))
dispatch(setLoading(true))
dispatch(updateProduct({ id: 1, name: 'Updated Name' }))
```

#### 2. **Bookmarks Slice** (`src/redux/slices/bookmarksSlice.js`)
Manages bookmarked products with localStorage sync:
```javascript
import { useSelector, useDispatch } from 'react-redux'

const dispatch = useDispatch()
const bookmarks = useSelector(state => state.bookmarks.items)

// Add/remove bookmarks:
dispatch(addBookmark(product))
dispatch(removeBookmark(productId))

// Load from localStorage:
dispatch(loadBookmarks(savedBookmarks))
```

#### 3. **UI Slice** (`src/redux/slices/uiSlice.js`)
Manages UI state:
```javascript
import { useSelector, useDispatch } from 'react-redux'

const dispatch = useDispatch()
const searchQuery = useSelector(state => state.ui.searchQuery)
const selectedCategory = useSelector(state => state.ui.selectedCategory)
const showBookmarkPopup = useSelector(state => state.ui.showBookmarkPopup)
const theme = useSelector(state => state.ui.theme)

// Update UI state:
dispatch(setSearchQuery('laptop'))
dispatch(setSelectedCategory('Electronics'))
dispatch(setShowBookmarkPopup(true))
dispatch(setTheme('dark'))
dispatch(resetUI())
```

### Using Redux in Components

Example in `App.jsx`:
```javascript
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedCategory, setSearchQuery } from './redux/slices/uiSlice'

export default function App() {
  const dispatch = useDispatch()
  const selectedCategory = useSelector(state => state.ui.selectedCategory)
  const searchQuery = useSelector(state => state.ui.searchQuery)

  return (
    <NavBar
      selectedCategory={selectedCategory}
      onSelectCategory={(cat) => dispatch(setSelectedCategory(cat))}
    />
  )
}
```

## Redis Setup

### Installation

Redis packages are already installed:
```bash
npm install redis
```

### Start Redis Server

#### Option 1: Using Docker (Recommended)
```bash
docker run -d -p 6379:6379 --name redis-db redis:latest
```

#### Option 2: Install Redis locally
- **macOS**: `brew install redis`
- **Ubuntu/Debian**: `sudo apt-get install redis-server`
- **Windows**: Download from https://redis.io/download

#### Option 3: Use a managed Redis service
- AWS ElastiCache
- Redis Cloud
- Google Cloud Memorystore
- Azure Cache for Redis

### Redis Configuration

Set environment variables in `.env` file:
```
REDIS_HOST=localhost
REDIS_PORT=6379
# REDIS_PASSWORD=your_password  # If Redis requires auth
```

### Redis Utility Functions (`server/redis.js`)

Available functions:

#### Cache Operations
```javascript
const { getCache, setCache, deleteCache, clearCache } = require('./redis')

// Get from cache
const data = await getCache('products:all')

// Set cache with 1-hour expiry
await setCache('products:all', data, 3600)

// Delete specific cache key
await deleteCache('products:all')

// Clear all cache
await clearCache()
```

#### Counter Operations
```javascript
const { incrementCounter, getCounter } = require('./redis')

// Increment a counter
const clicks = await incrementCounter('product:123:clicks')

// Get counter value
const count = await getCounter('product:123:clicks')
```

### Backend Usage

The Express server now includes:

1. **GET /api/products** - Returns products with Redis caching
   - First request: Reads from file, caches in Redis
   - Subsequent requests: Served from cache (1-hour expiry)
   - Response includes cached data

2. **POST /api/click** - Records product clicks
   - Increments click counter in Redis
   - Updates product file
   - Invalidates product cache
   - Returns updated product with Redis click count

3. **GET /api/health** - Health check endpoint
   - Returns server status

### Cache Strategy

The backend implements a simple cache-aside pattern:
1. Check Redis for cached data
2. If not found, read from file
3. Store in Redis with expiry
4. On updates, invalidate cache

### Performance Benefits

- **Faster responses**: Redis (in-memory) is much faster than file I/O
- **Reduced file reads**: Cache reduces disk load
- **Real-time counters**: Redis counters are fast and atomic
- **Scalability**: Easy to scale with Redis cluster

## Complete Workflow Example

### Frontend Flow with Redux:
1. User enters search query
2. `setSearchQuery()` action updates Redux state
3. Component reads updated `searchQuery` from Redux
4. Filter logic applies the search
5. UI updates automatically

### Backend Flow with Redis:
1. Frontend requests `/api/products`
2. Server checks Redis cache (key: `products:all`)
3. If cached, return immediately
4. If not cached:
   - Read from `products.json`
   - Store in Redis with 1-hour expiry
   - Return to client
5. On click event:
   - Increment Redis counter for product
   - Update product file
   - Invalidate product cache

## Monitoring and Debugging

### Check Redis Connection
```javascript
// In server/index.js, Redis connection logs will show:
// ✓ Connected to Redis
```

### View Redis Cache
Using Redis CLI:
```bash
redis-cli
> KEYS *                    # List all keys
> GET products:all          # Get cached products
> GET product:123:clicks    # Get click count for product 123
> FLUSHDB                   # Clear all cache
```

### Environment Variables

Create `.env` file (copy from `.env.example`):
```
PORT=4000
REDIS_HOST=localhost
REDIS_PORT=6379
NODE_ENV=development
```

## Best Practices

### Redux
- Keep state normalized and flat
- Use selectors to access state
- Dispatch actions instead of modifying state directly
- Use Redux DevTools for debugging (optional)

### Redis
- Set appropriate cache expiry times
- Invalidate cache after updates
- Handle Redis connection failures gracefully
- Use meaningful key names with namespacing (e.g., `product:123:clicks`)
- Monitor memory usage in production
- Use Redis persistence if data durability is needed

## Troubleshooting

### Redux not working
- Ensure `Provider` is wrapping the app in `main.jsx`
- Check Redux DevTools browser extension for state inspection
- Verify slices are properly exported

### Redis connection failing
- Ensure Redis server is running: `redis-cli ping` should return "PONG"
- Check host and port in `.env` match your Redis setup
- Verify firewall allows connection to Redis port
- App will continue to work without Redis (falls back to file I/O)

### Cache not updating
- Check cache expiry time (default: 1 hour)
- Manually delete cache key: `redis-cli DEL products:all`
- Verify cache invalidation logic in server

## Next Steps

1. **Testing**: Add Redux tests using Redux Toolkit testing utilities
2. **Async Thunks**: Use Redux Thunk for async operations
3. **Persistence**: Add Redux Persist for localStorage persistence
4. **Monitoring**: Set up Redis monitoring in production
5. **Optimization**: Implement selective caching for frequently accessed data

## Resources

- [Redux Documentation](https://redux.js.org)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React-Redux Hooks](https://react-redux.js.org/api/hooks)
- [Redis Documentation](https://redis.io/documentation)
- [Redis Node.js Client](https://github.com/redis/node-redis)
