FROM node:22-alpine AS build
WORKDIR /app

ARG VITE_API_BASE_URL=http://localhost:8082
ARG VITE_DEFAULT_EXPIRATION_DAYS=30
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_DEFAULT_EXPIRATION_DAYS=${VITE_DEFAULT_EXPIRATION_DAYS}

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runtime
ARG APP_UID=10001
ARG APP_GID=10001

RUN apk add --no-cache curl \
	&& addgroup -S -g ${APP_GID} appgroup \
	&& adduser -S -D -H -u ${APP_UID} -G appgroup appuser \
	&& mkdir -p /var/cache/nginx /var/run /var/log/nginx /var/lib/nginx \
	&& sed -Ei -e 's|^pid[[:space:]]+/var/run/nginx.pid;|pid /tmp/nginx.pid;|' -e 's|^pid[[:space:]]+/run/nginx.pid;|pid /tmp/nginx.pid;|' /etc/nginx/nginx.conf \
	&& chown -R appuser:appgroup /var/cache/nginx /var/run /var/log/nginx /var/lib/nginx /usr/share/nginx/html /etc/nginx /tmp

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

RUN chown -R appuser:appgroup /usr/share/nginx/html /etc/nginx/conf.d /var/cache/nginx /var/run /var/log/nginx /var/lib/nginx

USER appuser

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
