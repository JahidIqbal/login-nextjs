FROM node:20-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    libc6 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV NODE_ENV=development
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOST=0.0.0.0

ENV NEXT_PUBLIC_API_URL=http://localhost:3000

ENV NODE_OPTIONS="--enable-source-maps --inspect=0.0.0.0:9229"

RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs nextjs

COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN mkdir -p /app/.next && \
    mkdir -p /app/node_modules && \
    chown -R nextjs:nodejs /app

RUN echo '#!/bin/sh\n\
mkdir -p /app/.next/cache /app/.next/types /app/.next/trace\n\
chown -R nextjs:nodejs /app/.next\n\
su -c "npm run dev" nextjs\n\
' > /entrypoint.sh && \
    chmod +x /entrypoint.sh

EXPOSE 3000
EXPOSE 9229

CMD ["/entrypoint.sh"]