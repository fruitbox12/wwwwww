FROM node:current-alpine3.17
COPY . .
RUN yarn 
RUN yarn add axios --save-dev
RUN yarn build
ENV PORT=3777 \
    GOOGLE_CLIENT_ID=128651632434-icruuqtde2mpibudt2kcum63o9v75vag.apps.googleusercontent.com \
    GOOGLE_CLIENT_SECRET=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 \
    NEXTAUTH_URL=http://localhost:3777 \
    NEXTAUTH_SECRET=sPCvCrK59zq6c2IzGIeE0ucOqZULe9MGq6ZBtx7qKYY= \
    MONGO_URL=mongodb+srv://admin:hAENzMMG1X6b6UR6@cluster0.4vhv3lt.mongodb.net/simply-fi?retryWrites=true&w=majority

EXPOSE 3777
CMD ["yarn", "start"]