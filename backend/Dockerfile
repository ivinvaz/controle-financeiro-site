FROM node:20-alpine

WORKDIR /usr/src/app

# Install only production dependencies and keep the final image small
COPY package*.json ./
RUN npm ci --only=production

# Copy application source code
COPY . .

EXPOSE 8000

ENV NODE_ENV=production
ENV PORT=8000

CMD ["npm", "start"]
