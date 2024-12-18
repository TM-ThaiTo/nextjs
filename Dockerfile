FROM node:20-alpine3.18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Thêm các ARG để nhận biến khi build
ARG BASE_URL_SOCKET
ARG BASE_URL_NEXT

# Set environment variables cho build time
ENV BASE_URL_SOCKET=$BASE_URL_SOCKET
ENV BASE_URL_NEXT=${BASE_URL_NEXT}

RUN npm run build

FROM node:20-alpine3.18
WORKDIR /app

COPY --from=builder /app ./

# Set lại environment variables cho runtime
ENV BASE_URL_SOCKET=$BASE_URL_SOCKET
ENV BASE_URL_NEXT=$BASE_URL_NEXT

EXPOSE 3000
CMD ["npm", "run", "start"]

# docker build -t nextjs-app .
# docker run -p 3000:3000 just-example

